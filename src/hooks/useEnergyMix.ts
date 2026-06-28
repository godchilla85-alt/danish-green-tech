import { useQuery } from '@tanstack/react-query';

export function useEnergyMix() {
  return useQuery<any[], Error>({
    queryKey: ['energy-mix'],
    queryFn: async () => {
      const res = await fetch('/api/co2/mix');
      if (!res.ok) throw new Error('Fehler beim Mix-Fetch');
      return res.json();
    },
    staleTime: 1000 * 60 * 30,
  });
}