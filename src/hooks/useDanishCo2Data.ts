import { useQuery } from "@tanstack/react-query";

export interface Co2Record{
    timestamp: string;
    region: 'DK1' | 'DK2';
    co2Emission: number;
}

// fetch function
const fetchCo2Data = async (): Promise<Co2Record[]> => {
    const response = await fetch('/api/co2');

    if(!response.ok){
        throw new Error('Netzwerk-Fehler beim Laden der CO2-Daten');
    }
    return response.json();
}

//custom hook
export function useDanishCo2Data(){
    return useQuery<Co2Record[], Error>({
        queryKey:['danish-co2'], //Cache Key
        queryFn: fetchCo2Data, //function which get the key
        refetchInterval: 1000*60*5, //auto refresh all 5 minutes
        staleTime: 1000*60*5, //data stay fresh for 5 minutes
    });
}