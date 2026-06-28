import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // get co2 forecast
    const response = await fetch(
      'https://api.energidataservice.dk/dataset/CO2EmisProg?limit=24&sort=Minutes5DK%20desc',
      { next: { revalidate: 900 } } 
    );

    if (!response.ok) throw new Error('Dänische Prognose-API antwortet nicht');
    const data = await response.json();

    const mappedData = data.records.map((record: any) => ({
      timestamp: record.Minutes5DK,
      region: record.PriceArea,
      co2EmissionForecast: record.CO2Emission 
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Laden der Prognose' }, { status: 500 });
  }
}