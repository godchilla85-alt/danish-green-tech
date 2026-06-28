'use client';

import { useDanishRenewableData } from '../hooks/useDanishRenewableData';

export function RenewableSection() {
  const { data: renewableData, isLoading, error } = useDanishRenewableData();

  const totals = renewableData?.reduce(
    (acc, record) => {
      acc.solarMW += record.SolarPowerCapacity || 0;
      acc.onshoreMW += record.OnshoreWindCapacity || 0;
      acc.offshoreMW += record.OffshoreWindCapacity || 0;
      acc.solarCount += record.NumberSolarPanels || 0;
      acc.onshoreCount += record.NumberOnshoreWindGenerators || 0;
      acc.offshoreCount += record.NumberOffshoreWindGenerators || 0;
      return acc;
    },
    { solarMW: 0, onshoreMW: 0, offshoreMW: 0, solarCount: 0, onshoreCount: 0, offshoreCount: 0 }
  );

  if (isLoading) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Renewable Energy Capacities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-pulse">
          <div className="h-28 bg-white rounded-2xl border border-slate-100" />
          <div className="h-28 bg-white rounded-2xl border border-slate-100" />
          <div className="h-28 bg-white rounded-2xl border border-slate-100" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl">
        Erneuerbare-Daten Fehler: {error.message}
      </div>
    );
  }


  const totalGreenPower = (totals?.solarMW || 0) + (totals?.onshoreMW || 0) + (totals?.offshoreMW || 0);

  return (
    <section className="space-y-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm h-full">
      <div className="flex justify-between items-center m-0">
        <div>
          <p className="text-1xl font-bold text-slate-900">Renewable Infrastructure</p>
          
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
          Total: {totalGreenPower.toLocaleString('de-DE', { maximumFractionDigits: 1 })} MW
        </span>
      </div>
      <div className='mb-0 xl:mb-2'>
        <p className="text-xs text-slate-400 mt-0.5">Installierte grüne Gesamtleistung in Dänemark</p>
      </div>

      <div className="flex flex-col gap-2 xl:gap-4">
        {/* OFFSHORE WIND */}
        <div className="p-2 bg-slate-50/60 border border-slate-100 rounded-xl transition-all hover:bg-slate-50">
          <div className="flex flex-col xl:items-center xl:flex-row xl:mb-2">
            <span className="text-sm font-semibold text-slate-500">Offshore Wind</span>
            <span className='text-xs text-slate-400 ml-1'>|  {totals?.offshoreCount.toLocaleString('de-DE')} Turbinen auf See</span>
            
          </div>
          <p className="text-xl font-black text-slate-800 xl:text-2xl">
            {totals?.offshoreMW.toLocaleString('de-DE', { maximumFractionDigits: 1 })} <span className="text-xs font-medium text-slate-400">MW</span>
          </p>
         
        </div>

        {/* ONSHORE WIND */}
        <div className="p-2 bg-slate-50/60 border border-slate-100 rounded-xl transition-all hover:bg-slate-50">
          <div className="flex flex-col xl:items-center xl:flex-row xl:mb-2">
            <span className="text-sm font-semibold text-slate-500">Onshore Wind</span>
            <span className='text-xs text-slate-400 ml-1'>
              |  {totals?.onshoreCount.toLocaleString('de-DE')} Windräder an Land
              </span>
          </div>
          <p className="text-xl font-black text-slate-800 xl:text-2xl">
            {totals?.onshoreMW.toLocaleString('de-DE', { maximumFractionDigits: 1 })} <span className="text-xs font-medium text-slate-400">MW</span>
          </p>
        </div>

        {/* SOLAR POWER */}
        <div className="p-2 bg-slate-50/60 border border-slate-100 rounded-xl transition-all hover:bg-slate-50">
          <div className="flex flex-col xl:items-center xl:flex-row xl:mb-2">
            <span className="text-sm font-semibold text-slate-500">Solar Power</span>
            <span className='text-xs text-slate-400 ml-1'>| {totals?.solarCount.toLocaleString('de-DE')} Solaranlagen/Panels</span>
            
          </div>
          <p className="text-xl font-black text-slate-800 xl:text-2xl">
            {totals?.solarMW.toLocaleString('de-DE', { maximumFractionDigits: 1 })} <span className="text-xs font-medium text-slate-400">MW</span>
            
          </p>
        </div>
      </div>
    </section>
  );
}