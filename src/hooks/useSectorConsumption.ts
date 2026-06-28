import { useQuery } from '@tanstack/react-query';

export function useSectorConsumption() {
  return useQuery<any[], Error>({
    queryKey: ['sector-consumption'],
    queryFn: async () => {
      const res = await fetch('/api/consumption/sectors');
      if (!res.ok) throw new Error('Fehler beim Sektoren-Fetch');
      return res.json();
    },
    staleTime: 1000 * 60 * 30,
  });
}