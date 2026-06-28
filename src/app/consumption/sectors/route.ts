import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // get updates by hour per category
    const response = await fetch(
      'https://api.energidataservice.dk/dataset/ConsumptionConsumerCategoryHour?limit=10&sort=HourDK%20desc',
      { next: { revalidate: 1800 } }
    );

    if (!response.ok) throw new Error('Dänische Sektoren-API hakt');
    const data = await response.json();
    return NextResponse.json(data.records);
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Laden des Sektoren-Verbrauchs' }, { status: 500 });
  }
}