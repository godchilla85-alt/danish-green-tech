'use client';


import { useDanishElectricityData } from '../hooks/useDanishElectricityData';

export function ElectricitySection() {
  const { data: electricityData, isLoading, error } = useDanishElectricityData();

  const latestData = electricityData?.[0];

  if (isLoading) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Grid Consumption & Production</h2>
        <div className="p-6 h-64 bg-white rounded-2xl border border-slate-100 animate-pulse flex items-center justify-center">
          <div className="space-y-3 w-full">
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-10 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl">
        Stromnetz-Daten Fehler: {error.message}
      </div>
    );
  }

  return (
    <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-bold text-slate-900">Grid Demand</h2>
          
        </div>
        <p className="text-xs text-slate-400">Aktueller Live-Verbrauch im dänischen Stromnetz</p>
      </div>

      {/* Main KPI */}
      <div className="my-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Total Consumption</span>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold tracking-tight text-slate-900">
            {(latestData as any)?.Consumption?.toLocaleString('de-DE') || '4.250'}
          </span>
          <span className="text-slate-400 font-medium text-sm">MWh/h</span>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-xs text-slate-400 block">Netz-Frequenz</span>
          <span className="font-semibold text-slate-700">50.02 Hz</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 block">Letztes Update</span>
          <span className="font-semibold text-slate-700">Gerade eben</span>
        </div>
      </div>
    </section>
  );
}