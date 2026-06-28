import { useQuery } from "@tanstack/react-query";

export interface ElectricityRecord {
    Month: string;
    GridCompany: string;
    GridCompanyName: string;
    NumberofChangesforSmallConsumers: number;
    NumberofChangesforLargeConsumers: number;
}

const fetchElectricityData = async (): Promise<ElectricityRecord[]> => {
  const response = await fetch('/api/electricity');

  if (!response.ok) {
    throw new Error('Netzwerk-Fehler beim Laden der Renewable-Daten');
  }
  return response.json();
};

// Custom Hook 
export function useDanishElectricityData() {
  return useQuery<ElectricityRecord[], Error>({
    queryKey: ['danish-electricity'], 
    queryFn: fetchElectricityData,
    refetchInterval: 1000 * 60 * 5, 
    staleTime: 1000 * 60 * 5, 
  });
}