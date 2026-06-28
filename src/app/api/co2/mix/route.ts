import { NextResponse } from 'next/server';

export async function GET() {
  try {
    
    const response = await fetch(
      'https://api.energidataservice.dk/dataset/DeclarationProductionVersion?limit=10&sort=Version%20desc',
      { next: { revalidate: 1800 } }
    );

    if (!response.ok) throw new Error('Dänische Mix-API antwortet nicht');
    const data = await response.json();
    return NextResponse.json(data.records);
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Laden des Energiemixes' }, { status: 500 });
  }
}