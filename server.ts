import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const weatherCache = new Map<string, CacheEntry<unknown>>();
let nasaFeedCache: CacheEntry<unknown> | null = null;

async function fetchWithTimeout(url: string, timeoutMs = 4500): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'terratwin-observatory', timestamp: new Date().toISOString() });
});

app.get('/api/earth/analog-weather', async (req, res) => {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    res.status(400).json({ error: 'Valid lat and lng query parameters are required.' });
    return;
  }

  const cacheKey = `${lat.toFixed(3)},${lng.toFixed(3)}`;
  const cached = weatherCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    res.json(cached.data);
    return;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure`;
    const response = await fetchWithTimeout(url, 4500);
    if (!response.ok) {
      throw new Error(`Open-Meteo HTTP ${response.status}`);
    }
    const json = (await response.json()) as {
      current?: {
        time?: string;
        temperature_2m?: number;
        relative_humidity_2m?: number;
        wind_speed_10m?: number;
        surface_pressure?: number;
      };
    };

    const payload = {
      source: 'live-open-meteo',
      observedAt: json.current?.time ?? new Date().toISOString(),
      temperatureC: json.current?.temperature_2m ?? null,
      humidityPct: json.current?.relative_humidity_2m ?? null,
      windSpeedKmh: json.current?.wind_speed_10m ?? null,
      pressureKpa:
        typeof json.current?.surface_pressure === 'number'
          ? Number((json.current.surface_pressure / 10).toFixed(2))
          : null,
    };

    weatherCache.set(cacheKey, { data: payload, expiresAt: Date.now() + 10 * 60 * 1000 });
    res.json(payload);
  } catch {
    res.json({
      source: 'unavailable',
      observedAt: null,
      temperatureC: null,
      humidityPct: null,
      windSpeedKmh: null,
      pressureKpa: null,
    });
  }
});

app.get('/api/nasa/planetary-feed', async (_req, res) => {
  if (nasaFeedCache && nasaFeedCache.expiresAt > Date.now()) {
    res.json(nasaFeedCache.data);
    return;
  }

  const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';

  let roverManifest: {
    status: string;
    maxSol: number | null;
    maxDate: string | null;
    totalPhotos: number | null;
    source: 'live-nasa' | 'baseline-cached';
  } = {
    status: 'active',
    maxSol: null,
    maxDate: null,
    totalPhotos: null,
    source: 'baseline-cached',
  };

  let earthEvents: { id: string; title: string; category: string; date: string }[] = [];
  let eonetSource: 'live-nasa-eonet' | 'unavailable' = 'unavailable';

  try {
    const [roverResp, eonetResp, apodResp] = await Promise.allSettled([
      fetchWithTimeout(
        'https://mars.nasa.gov/rss/api/?feed=raw_images&category=mars2020&feedtype=json&num=1',
        4500
      ),
      fetchWithTimeout('https://eonet.gsfc.nasa.gov/api/v3/events?limit=4&status=open', 4500),
      fetchWithTimeout(
        `https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(apiKey)}`,
        4500
      ),
    ]);

    if (roverResp.status === 'fulfilled' && roverResp.value.ok) {
      const rJson = (await roverResp.value.json()) as {
        total_results?: number;
        images?: Array<{
          sol?: number;
          date_taken_utc?: string;
        }>;
      };
      const latestImage = rJson.images?.[0];
      if (typeof latestImage?.sol === 'number' || typeof rJson.total_results === 'number') {
        roverManifest = {
          status: 'active',
          maxSol: latestImage?.sol ?? null,
          maxDate: latestImage?.date_taken_utc ? latestImage.date_taken_utc.slice(0, 10) : null,
          totalPhotos: rJson.total_results ?? null,
          source: 'live-nasa',
        };
      }
    }

    if (eonetResp.status === 'fulfilled' && eonetResp.value.ok) {
      const eJson = (await eonetResp.value.json()) as {
        events?: Array<{
          id: string;
          title: string;
          categories?: Array<{ title: string }>;
          geometry?: Array<{ date: string }>;
        }>;
      };
      if (Array.isArray(eJson.events)) {
        earthEvents = eJson.events.slice(0, 4).map((ev) => ({
          id: ev.id,
          title: ev.title,
          category: ev.categories?.[0]?.title ?? 'Earth Observation',
          date: ev.geometry?.[0]?.date ?? '',
        }));
        eonetSource = 'live-nasa-eonet';
      }
    }

    const nasaKeyVerified = apodResp.status === 'fulfilled' && apodResp.value.ok;
    if (nasaKeyVerified && roverManifest.source === 'live-nasa') {
      roverManifest.status = 'active';
    }
  } catch {
    // Graceful null-preserving fallback
  }

  const payload = {
    fetchedAt: new Date().toISOString(),
    perseverance: roverManifest,
    earthEvents,
    eonetSource,
  };

  nasaFeedCache = { data: payload, expiresAt: Date.now() + 15 * 60 * 1000 };
  res.json(payload);
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TerraTwin Observatory server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
