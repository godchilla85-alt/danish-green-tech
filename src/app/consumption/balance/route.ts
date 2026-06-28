import { NextResponse } from 'next/server';

export async function GET() {
  try {
   
    const response = await fetch(
      'https://api.energidataservice.dk/dataset/ElectricityBalanceNonv?limit=20&sort=HourDK%20desc',
      { next: { revalidate: 900 } }
    );

    if (!response.ok) throw new Error('Dänische Netzbilanz-API hakt');
    const data = await response.json();
    return NextResponse.json(data.records);
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Laden der Netzbilanz' }, { status: 500 });
  }
}