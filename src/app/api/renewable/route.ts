import { NextResponse } from 'next/server';

interface EnergyResponse {
  records: Array<{
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
  }>;
}

export async function GET() {
  try {
    const response = await fetch(
      'https://api.energidataservice.dk/dataset/CapacityPerMunicipality?limit=20&sort=Month%20desc',
      { next: { revalidate: 300 } } 
    );

    if (!response.ok) throw new Error('Dänische API antwortet nicht');

    const data: EnergyResponse = await response.json();

    const mappedData = data.records.map((record) => ({
      timestamp: record.Month,
      MunicipalityNo: record.MunicipalityNo,       
      CapacityGe100MW: record.CapacityGe100MW,
      CapacityLt100MW: record.CapacityLt100MW,
      OffshoreWindCapacity: record.OffshoreWindCapacity,
      OnshoreWindCapacity: record.OnshoreWindCapacity,
      SolarPowerCapacity: record.SolarPowerCapacity,
      NumberOffshoreWindGenerators: record.NumberOffshoreWindGenerators,
      NumberOnshoreWindGenerators: record.NumberOnshoreWindGenerators,
      NumberSolarPanels: record.NumberSolarPanels
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Kunne ikke hente data fra Energi Data Service' },
      { status: 500 }
    );
  }
}