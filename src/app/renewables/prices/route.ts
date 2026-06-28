import { NextResponse } from 'next/server';

export async function GET() {
  try {
    //get update for Day-Ahead-Prices 
    const response = await fetch(
      'https://api.energidataservice.dk/dataset/DayAheadPrices?limit=48&sort=HourDK%20desc',
      { next: { revalidate: 900 } } 
    );

    if (!response.ok) throw new Error('Dänische Preis-API antwortet nicht');
    const data = await response.json();

    const mappedData = data.records.map((record: any) => ({
      timestamp: record.HourDK,
      region: record.PriceArea,
      price: record.SpotPriceEUR 
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Laden der Spotpreise' }, { status: 500 });
  }
}