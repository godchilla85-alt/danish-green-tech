import { useQuery } from '@tanstack/react-query';

export function useGridBalance() {
  return useQuery<any[], Error>({
    queryKey: ['grid-balance'],
    queryFn: async () => {
      const res = await fetch('/api/consumption/balance');
      if (!res.ok) throw new Error('Fehler beim Netzbilanz-Fetch');
      return res.json();
    },
    staleTime: 1000 * 60 * 15,
  });
}