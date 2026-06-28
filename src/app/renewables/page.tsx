'use client';

import { Sidebar } from '@/src/components/Sidebar';
import { RenewableSection } from '@/src/components/RenewableSection';
import { useSpotPrices } from '@/src/hooks/useSpotPrices';
import { useProductionForecast } from '@/src/hooks/useProductionForecast';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend, Cell } from 'recharts';

export default function RenewablesPage() {
  const { data: priceData, isLoading: pricesLoading } = useSpotPrices();
  const { data: forecastData, isLoading: forecastLoading } = useProductionForecast();

  const formatPriceData = () => {
    if (!priceData || !Array.isArray(priceData) || priceData.length === 0) {
      // Fallback-Data if api has problems
      return [
        { time: '08:00', 'Preis (EUR/MWh)': 45.2 },
        { time: '10:00', 'Preis (EUR/MWh)': 12.5 },
        { time: '12:00', 'Preis (EUR/MWh)': -5.0 }, 
        { time: '14:00', 'Preis (EUR/MWh)': 8.1 },
        { time: '16:00', 'Preis (EUR/MWh)': 52.0 },
      ];
    }

    // filter for DK1
    let filtered = priceData.filter(
      r => r.region && r.region.toString().toUpperCase().includes('DK1')
    );
    
    if (filtered.length === 0) filtered = priceData; // Fallback if DK1 doesnt match

    return filtered.slice(0, 12).map(p => {
      const time = p.timestamp 
        ? new Date(p.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
        : 'Unbekannt';
      return {
        time,
        'Preis (EUR/MWh)': p.price ?? 0
      };
    }).reverse();
  };

  const formatForecastData = () => {
    if (!forecastData || !Array.isArray(forecastData) || forecastData.length === 0) {

      return [
        { time: '08:00', 'Solar Prognose (MW)': 120, 'Wind Prognose (MW)': 850 },
        { time: '10:00', 'Solar Prognose (MW)': 340, 'Wind Prognose (MW)': 900 },
        { time: '12:00', 'Solar Prognose (MW)': 510, 'Wind Prognose (MW)': 950 },
        { time: '14:00', 'Solar Prognose (MW)': 480, 'Wind Prognose (MW)': 890 },
        { time: '16:00', 'Solar Prognose (MW)': 210, 'Wind Prognose (MW)': 920 },
      ];
    }

    // group by timestamp
    const uniqueTimestamps = Array.from(new Set(forecastData.map(r => r.timestamp))).slice(0, 12);

    return uniqueTimestamps.map(ts => {
      const time = ts 
        ? new Date(ts).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
        : 'Unbekannt';
        
      const recordsAtTime = forecastData.filter(r => r.timestamp === ts);
      

      const solar = recordsAtTime
        .filter(r => r.type && r.type.toString().toLowerCase().includes('sol'))
        .reduce((sum, r) => sum + (r.value || 0), 0);
        
      const wind = recordsAtTime
        .filter(r => r.type && r.type.toString().toLowerCase().includes('wind'))
        .reduce((sum, r) => sum + (r.value || 0), 0);

      return {
        time,
        'Solar Prognose (MW)': solar,
        'Wind Prognose (MW)': wind
      };
    }).reverse();
  };

  console.log("Preise formatiert:", formatPriceData());
console.log("Forecast formatiert:", formatForecastData());

  return (
    <div className="flex min-h-screen bg-[#090909] text-slate-800 antialiased">
      <Sidebar />

      <main className="flex-1 p-10 m-10 max-w-full overflow-y-auto bg-[#EAEAEA] rounded-4xl">
        <header className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Grid Generation</span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-2">Renewables & Market Prices</h1>
          <p className="text-slate-500 mt-1">Die Wechselwirkung zwischen grünem Stromangebot und den stündlichen Börsenpreisen.</p>
        </header>

        <div className="space-y-10">
          <RenewableSection />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* CHART 1*/}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
  <div>
    <h3 className="text-lg font-bold text-slate-900">Börsenstrompreise (DK1)</h3>
    <p className="text-xs text-slate-400">Stündliche Day-Ahead Spotpreise in EUR / MWh</p>
  </div>

              <div className="h-72 w-full text-xs font-medium relative min-h-72">
                {pricesLoading ? (
                  <div className="h-full w-full bg-slate-50 animate-pulse rounded-xl" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={formatPriceData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9' }}
                        formatter={(value: any) => [`${value.toFixed(2)} €/MWh`, 'Spotpreis']}
                      />
                      {/* Balken färben sich dynamisch: Grün bei niedrigen/negativen Preisen, Blau bei normalen */}
                      <Bar dataKey="Preis (EUR/MWh)" radius={[4, 4, 0, 0]}>
                        {formatPriceData().map((entry: any, index: number) => {
                          const val = entry['Preis (EUR/MWh)'];
                          const color = val < 20 ? '#10B981' : '#3B82F6'; // Grün unter 20€/MWh (viel Wind)
                          return <Cell key={`cell-${index}`} fill={color} />;
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* CHART 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Green Power Generation Forecast</h3>
                <p className="text-xs text-slate-400">Prognostizierte Einspeisung von Wind und Solar (MW)</p>
              </div>

              <div className="h-72 w-full text-xs font-medium relative min-h-72">
                {forecastLoading ? (
                  <div className="h-full w-full bg-slate-50 animate-pulse rounded-xl" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formatForecastData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9' }} />
                      <Legend verticalAlign="top" height={36} iconType="circle" />
                      <Line type="monotone" dataKey="Wind Prognose (MW)" stroke="#059669" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="Solar Prognose (MW)" stroke="#F59E0B" strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}