'use client';

import { Sidebar } from '@/src/components/Sidebar';
import { useCo2Forecast } from '@/src/hooks/useCo2Forecast';
import { useEnergyMix } from '@/src/hooks/useEnergyMix';
import { Co2Section } from "@/src/components/Co2Section";
import { Co2Chart } from '@/src/components/Co2Chart';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from 'recharts';

export default function Co2SubPage() {
  const { data: forecastData, isLoading: forecastLoading } = useCo2Forecast();
  const { data: mixData, isLoading: mixLoading } = useEnergyMix();

  // prepare data for forecast chart
  const formatForecastData = () => {
    if (!forecastData) return [];
    const dk1 = forecastData.filter(r => r.region === 'DK1');
    const dk2 = forecastData.filter(r => r.region === 'DK2');

    return dk1.map((d, i) => {
      const time = new Date(d.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
      return {
        time,
        'DK1 Prognose': d.co2EmissionForecast,
        'DK2 Prognose': dk2[i]?.co2EmissionForecast || null
      };
    }).reverse();
  };


  const COLORS = ['#059669', '#10B981', '#3B82F6', '#EF4444', '#F59E0B', '#6B7280'];
  const dummyMix = [
    { name: 'Windkraft', value: 58 },
    { name: 'Solar', value: 14 },
    { name: 'Biomasse', value: 12 },
    { name: 'Kohle', value: 8 },
    { name: 'Abfall', value: 5 },
    { name: 'Importe', value: 3 },
  ];

  return (
    <div className="flex min-h-screen bg-[#090909] text-slate-800 antialiased">
      <Sidebar />

      <main className="flex-1 p-10 m-10 max-w-full overflow-y-auto bg-[#EAEAEA] rounded-4xl">
        <header className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Deep Dive</span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-2">CO₂ Emission Analysis</h1>
          <p className="text-slate-500 mt-1">Smarte Vorhersagen und die reale Zusammensetzung der dänischen Stromerzeugung.</p>
        </header>

        <div className="flex flex-col gap-8">

          <div className="flex gap-5">
                      <div className="w-4/6">
                        <Co2Chart />
                      </div>
                      <div className="w-2/6">
                        <Co2Section />
                      </div>
                    </div>
          
          {/* FORECAST CHART */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">24h CO₂ Intensity Forecast</h3>
              <p className="text-xs text-slate-400">Prognostizierte Emissionstrends zur optimalen Lastensteuerung</p>
            </div>

            <div className="h-80 w-full text-xs font-medium">
              {forecastLoading ? (
                <div className="h-full w-full bg-slate-50 animate-pulse rounded-xl" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formatForecastData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9' }} />
                    <Line type="monotone" dataKey="DK1 Prognose" stroke="#059669" strokeWidth={3} dot={false} strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="DK2 Prognose" stroke="#2563eb" strokeWidth={3} dot={false} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* REAL PRODUCTION MIX  */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Current Production Mix</h3>
              <p className="text-xs text-slate-400">Reale prozentuale Zusammensetzung der Erzeugung</p>
            </div>

            <div className="h-64 w-full mt-4 text-xs font-medium">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dummyMix} layout="vertical" margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#64748b" tickLine={false} axisLine={false} width={80} />
                  <Tooltip />
                  <Bar dataKey="value" barSize={12} radius={[0, 4, 4, 0]}>
                    {dummyMix.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}