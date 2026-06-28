'use client';

import { useDanishCo2Data } from '../hooks/useDanishCo2Data';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export function Co2Chart() {
  const { data: co2Data, isLoading, error } = useDanishCo2Data();

  if (isLoading || error || !co2Data) return null;

  // split data by region (dk1, dk2)
  const dk1Records = co2Data.filter(r => r.region === 'DK1');
  const dk2Records = co2Data.filter(r => r.region === 'DK2');


  const chartData = dk1Records.map((dk1Record, index) => {
    const dk2Record = dk2Records[index];
    
    const time = new Date(dk1Record.timestamp).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return {
      time,
      'DK1 (West)': dk1Record.co2Emission,
      'DK2 (Ost)': dk2Record ? dk2Record.co2Emission : null
    };
  }).reverse(); 

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900">CO₂ Emission Trend</h3>
        <p className="text-xs text-slate-400">Verlauf der letzten Stunden (g/kWh)</p>
      </div>

      {/* CHART CONTAINER */}
      <div className="h-64 w-full text-xs font-medium">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>

              <linearGradient id="colorDk1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0.01}/>
              </linearGradient>
              <linearGradient id="colorDk2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} dx={-5} />
            
            {/* Custom Tooltip beim Hovern */}
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}
              labelClassName="font-bold text-slate-700 mb-1"
            />

            {/* DK1 Area (Green) */}
            <Area 
              type="monotone" 
              dataKey="DK1 (West)" 
              stroke="#059669" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorDk1)" 
            />
            {/* DK2 Area (Blue) */}
            <Area 
              type="monotone" 
              dataKey="DK2 (Ost)" 
              stroke="#2563eb" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorDk2)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}