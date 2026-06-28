import { useQuery } from '@tanstack/react-query';

export interface Co2ForecastRecord {
  timestamp: string;
  region: 'DK1' | 'DK2';
  co2EmissionForecast: number;
}

export function useCo2Forecast() {
  return useQuery<Co2ForecastRecord[], Error>({
    queryKey: ['co2-forecast'],
    queryFn: async () => {
      const res = await fetch('/api/co2/forecast');
      if (!res.ok) throw new Error('Fehler beim Forecast-Fetch');
      return res.json();
    },
    staleTime: 1000 * 60 * 15,
  });
}