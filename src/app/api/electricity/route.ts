import { NextResponse } from 'next/server';

interface EnergyResponse {
  records: Array<{
    Month: string;
    GridCompany: string;
    GridCompanyName: string;
    NumberofChangesforSmallConsumers: number;
    NumberofChangesforLargeConsumers: number;
  }>;
}

export async function GET() {
  try {
    const response = await fetch(
      'https://api.energidataservice.dk/dataset/PowerSupplierChangePerGridarea?limit=20&sort=Month%20desc',
      { next: { revalidate: 300 } } 
    );

    if (!response.ok) throw new Error('Dänische API antwortet nicht');

    const data: EnergyResponse = await response.json();

    const mappedData = data.records.map((record) => ({
      timestamp: record.Month,
      GridCompany: record.GridCompany,     
      GridCompanyName: record.GridCompanyName,
      NumberofChangesforSmallConsumers: record.NumberofChangesforSmallConsumers,
      NumberofChangesforLargeConsumers: record.NumberofChangesforLargeConsumers
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Kunne ikke hente data fra Energi Data Service' },
      { status: 500 }
    );
  }
}