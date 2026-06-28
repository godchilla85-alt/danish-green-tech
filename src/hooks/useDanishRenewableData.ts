import { useQuery } from "@tanstack/react-query";

export interface RenewableRecord {
  Month: string;
  MunicipalityNo: string;
  CapacityGe100MW: number;
  CapacityLt100MW: number;
  OffshoreWindCapacity: number;
  OnshoreWindCapacity: number;
  SolarPowerCapacity: number;
  NumberOffshoreWindGenerators: number;
  NumberOnshoreWindGenerators: number;
  NumberSolarPanels: number;
}


const fetchRenewableData = async (): Promise<RenewableRecord[]> => {
  const response = await fetch('/api/renewable');

  if (!response.ok) {
    throw new Error('Netzwerk-Fehler beim Laden der Renewable-Daten');
  }
  return response.json();
};


export function useDanishRenewableData() {
  return useQuery<RenewableRecord[], Error>({
    queryKey: ['danish-renewable'], 
    queryFn: fetchRenewableData,
    refetchInterval: 1000 * 60 * 5, 
    staleTime: 1000 * 60 * 5, 
  });
}