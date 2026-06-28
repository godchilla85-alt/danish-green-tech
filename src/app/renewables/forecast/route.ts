import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // get update for solar and wind by hour (limit 50)
    const response = await fetch(
      'https://api.energidataservice.dk/dataset/Forecasts_Hour?limit=50&sort=HourDK%20desc',
      { next: { revalidate: 900 } }
    );

    if (!response.ok) throw new Error('Dänische Erzeugungsprognose-API antwortet nicht');
    const data = await response.json();

    const mappedData = data.records.map((record: any) => ({
      timestamp: record.HourDK,
      region: record.PriceArea,
      type: record.ForecastType, 
      value: record.ForecastValue 
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Laden der Erzeugungsprognose' }, { status: 500 });
  }
}