import { useQuery } from '@tanstack/react-query';

export interface ProdForecastRecord {
  timestamp: string;
  region: string;
  type: string;
  value: number;
}

export function useProductionForecast() {
  return useQuery<ProdForecastRecord[], Error>({
    queryKey: ['production-forecast'],
    queryFn: async () => {
      const res = await fetch('/api/renewables/forecast');
      if (!res.ok) throw new Error('Fehler beim Erzeugungsprognose-Fetch');
      return res.json();
    },
    staleTime: 1000 * 60 * 15,
  });
}