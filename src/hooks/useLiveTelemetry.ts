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
    fetch(`/api/earth/analog-weather?lat=${lat}&lng=${lng}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Weather fetch failed'))))
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
