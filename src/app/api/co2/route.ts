import { NextResponse } from 'next/server';

interface EnergyResponse {
  records: Array<{
    Minutes5DK: string;
    PriceArea: 'DK1' | 'DK2';
    CO2Emission: number;
  }>;
}

export async function GET() {
  try {
    // get real denmark data
    const response = await fetch(
      'https://api.energidataservice.dk/dataset/CO2Emis?limit=20&sort=Minutes5DK%20desc',
      { next: { revalidate: 300 } } 
    );

    if (!response.ok) throw new Error('Dänische API antwortet nicht');

    const data: EnergyResponse = await response.json();

    const mappedData = data.records.map((record) => ({
      timestamp: record.Minutes5DK,
      region: record.PriceArea,       // DK1 = Jütland/Fünen, DK2 = Kopenhagen
      co2Emission: record.CO2Emission, 
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Kunne ikke hente data fra Energi Data Service' },
      { status: 500 }
    );
  }
}