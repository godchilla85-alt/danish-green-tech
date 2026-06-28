'use client';

import { useDanishCo2Data } from "../hooks/useDanishCo2Data";

export function Co2Section() {
  const { data: co2Data, isLoading, error } = useDanishCo2Data();

  const latestDK1 = co2Data?.find((r) => r.region === 'DK1');
  const latestDK2 = co2Data?.find((r) => r.region === 'DK2');

  const getIntensityColor = (emission: number) => {
    if (emission < 40) return { bg: 'bg-emerald-50/80 border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' };
    if (emission < 100) return { bg: 'bg-amber-50/80 border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' };
    return { bg: 'bg-rose-50/80 border-rose-200', text: 'text-rose-700', dot: 'bg-rose-500' };
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
        <div className="h-32 bg-white rounded-2xl border border-slate-100" />
        <div className="h-32 bg-white rounded-2xl border border-slate-100" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl">
        CO₂-Daten Fehler: {error.message}
      </div>
    );
  }

  return (
    <section className="space-y-4 h-full">
      
      <div className="flex flex-col gap-6 h-full">
        {[
          { label: 'DK1 (Jütland & Fünen)', data: latestDK1, type: 'Region West' },
          { label: 'DK2 (Seeland & Kopenhagen)', data: latestDK2, type: 'Region Ost' }
        ].map((card, i) => {
          if (!card.data) return null;
          const colors = getIntensityColor(card.data.co2Emission);
          return (
            <div key={i} className="p-4 h-2/4 rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{card.type}</span>
                  <h3 className="text-1xl font-bold text-slate-800 mt-0.5">{card.label}</h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${colors.bg} ${colors.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                  {card.data.co2Emission < 40 ? 'Clean' : card.data.co2Emission < 100 ? 'Moderate' : 'Dirty'}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-10">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900 xl:text-5xl">{card.data.co2Emission}</span>
                <span className="text-slate-400 font-medium text-sm">g/kWh</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}