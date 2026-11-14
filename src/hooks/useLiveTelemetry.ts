import { useEffect, useState } from 'react';

export interface LiveAnalogWeather {
  source: 'live-open-meteo' | 'unavailable';
  observedAt: string | null;
  temperatureC: number | null;
  humidityPct: number | null;
  windSpeedKmh: number | null;
  pressureKpa: number | null;
}

export interface NasaPlanetaryFeed {
  fetchedAt: string;
  perseverance: {
    status: string;
    maxSol: number | null;
    maxDate: string | null;
    totalPhotos: number | null;
    source: 'live-nasa' | 'baseline-cached';
  };
  earthEvents: Array<{
    id: string;
    title: string;
    category: string;
    date: string;
  }>;
  eonetSource: 'live-nasa-eonet' | 'unavailable';
}

export function useAnalogLiveWeather(lat: number, lng: number) {
  const [data, setData] = useState<LiveAnalogWeather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    const fetchDirectOpenMeteo = async (): Promise<LiveAnalogWeather> => {
      const resp = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure`
      );
      if (!resp.ok) throw new Error('Open-Meteo fetch failed');
      const json = (await resp.json()) as {
        current?: {
          time?: string;
          temperature_2m?: number;
          relative_humidity_2m?: number;
          wind_speed_10m?: number;
          surface_pressure?: number;
        };
      };
      return {
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
    };

    fetch(`/api/earth/analog-weather?lat=${lat}&lng=${lng}`)
      .then(async (res) => {
        const contentType = res.headers.get('content-type') || '';
        if (!res.ok || !contentType.includes('application/json')) {
          return fetchDirectOpenMeteo();
        }
        return (await res.json()) as LiveAnalogWeather;
      })
      .catch(() => fetchDirectOpenMeteo())
      .then((json: LiveAnalogWeather) => {
        if (active) setData(json);
      })
      .catch(() => {
        if (active) {
          setData({
            source: 'unavailable',
            observedAt: null,
            temperatureC: null,
            humidityPct: null,
            windSpeedKmh: null,
            pressureKpa: null,
          });
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [lat, lng]);

  return { data, loading };
}

export function useNasaPlanetaryFeed() {
  const [data, setData] = useState<NasaPlanetaryFeed | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch('/api/nasa/planetary-feed')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('NASA feed failed'))))
      .then((json: NasaPlanetaryFeed) => {
        if (active) setData(json);
      })
      .catch(() => {
        if (active) setData(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { data, loading };
}
