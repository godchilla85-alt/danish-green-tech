"use client";
import overview_bg from "../app/images/overview_bg.jpg";

import { useDanishElectricityData } from "../hooks/useDanishElectricityData";

export function ElectricitySectionB() {
  const {
    data: electricityData,
    isLoading,
    error,
  } = useDanishElectricityData();

  const latestData = electricityData?.[0];
  console.log(latestData)

  if (isLoading) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Grid Consumption & Production
        </h2>
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
    <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative h-96 overflow-hidden">
      <div
        className="flex absolute inset-0 bg-cover bg-center z-10 w-full h-min-full justify-center items-center"
        style={{ backgroundImage: `url(${overview_bg.src})` }}
      >
        <div className="flex flex-col py-2 pl-5 w-2/4 h-2/5 rounded-2xl backdrop-blur-sm bg-white/60">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-xl font-bold text-slate-900">Grid Demand</h2>
            </div>
            <p className="text-xs text-slate-400">
              Aktueller Live-Verbrauch im dänischen Stromnetz
            </p>
          </div>
          <div className="my-4 xl:my-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block mb-1">Total Consumption</span>
        <div className="flex items-baseline gap-2">
          {/* Consumption or value */}
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 xl:text-4xl">
            {(latestData as any)?.Consumption?.toLocaleString('de-DE') || '4.250'}
          </span>
          <span className="text-slate-400 font-medium text-sm">MWh/h</span>
        </div>
      </div>
        </div>
      </div>
    </section>
  );
}
