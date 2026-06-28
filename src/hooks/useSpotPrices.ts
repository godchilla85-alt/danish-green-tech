import { useQuery } from '@tanstack/react-query';

export interface SpotPriceRecord {
  timestamp: string;
  region: string;
  price: number;
}

export function useSpotPrices() {
  return useQuery<SpotPriceRecord[], Error>({
    queryKey: ['spot-prices'],
    queryFn: async () => {
      const res = await fetch('/api/renewables/prices');
      if (!res.ok) throw new Error('Fehler beim Preis-Fetch');
      return res.json();
    },
    staleTime: 1000 * 60 * 15,
  });
}