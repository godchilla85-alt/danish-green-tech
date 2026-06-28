'use client';

import { Sidebar } from '@/src/components/Sidebar';
import { ElectricitySection } from '@/src/components/ElectricitySection';
import { useGridBalance } from '@/src/hooks/useGridBalance';
import { useSectorConsumption } from '@/src/hooks/useSectorConsumption';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell, Legend } from 'recharts';

export default function ConsumptionPage() {
  const { data: balanceData, isLoading: balanceLoading } = useGridBalance();
  const { data: sectorData, isLoading: sectorLoading } = useSectorConsumption();


  const formatBalanceData = () => {
    if (!balanceData || !Array.isArray(balanceData) || balanceData.length === 0) {
      return [
        { time: '08:00', 'Export (MW)': 1200, 'Import (MW)': 400 },
        { time: '10:00', 'Export (MW)': 950, 'Import (MW)': 600 },
        { time: '12:00', 'Export (MW)': 1500, 'Import (MW)': 200 },
        { time: '14:00', 'Export (MW)': 1800, 'Import (MW)': 100 },
        { time: '16:00', 'Export (MW)': 1100, 'Import (MW)': 700 },
      ];
    }

    return balanceData.slice(0, 10).map(r => {
      const time = r.HourDK ? new Date(r.HourDK).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : 'Unbekannt';
      // split import and export
      return {
        time,
        'Export (MW)': r.PhysicalExport || 0,
        'Import (MW)': r.PhysicalImport || 0
      };
    }).reverse();
  };

  // Prepare section data
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6B7280'];
  const dummySectors = [
    { name: 'Industrie & Gewerbe', value: 45 },
    { name: 'Private Haushalte', value: 33 },
    { name: 'Transport & E-Mobilität', value: 14 },
    { name: 'Öffentlicher Sektor', value: 8 },
  ];

  return (
    <div className="flex min-h-screen bg-[#090909] text-slate-800 antialiased">
      <Sidebar />

      <main className="flex-1 p-10 m-10 max-w-full overflow-y-auto bg-[#EAEAEA] rounded-4xl">
        <header className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Grid Load</span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-2">Consumption & Grid Balance</h1>
          <p className="text-slate-500 mt-1">Echtzeit-Verbrauchsmuster der Sektoren und der grenzüberschreitende Stromaustausch.</p>
        </header>

        <div className="space-y-10">
          
          <ElectricitySection />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* CHART 1*/}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Grenzüberschreitender Stromhandel</h3>
                <p className="text-xs text-slate-400">Physische Import- und Exportströme im dänischen Verbundnetz (MW)</p>
              </div>

              <div className="h-72 w-full text-xs font-medium min-h-72">
                {balanceLoading ? (
                  <div className="h-full w-full bg-slate-50 animate-pulse rounded-xl" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formatBalanceData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9' }} />
                      <Legend verticalAlign="top" height={36} iconType="circle" />
                      <Area type="monotone" dataKey="Export (MW)" stroke="#10B981" fillOpacity={0.05} fill="#10B981" strokeWidth={2} />
                      <Area type="monotone" dataKey="Import (MW)" stroke="#3B82F6" fillOpacity={0.05} fill="#3B82F6" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* CHART 2*/}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Verbrauch nach Sektoren</h3>
                <p className="text-xs text-slate-400">Prozentualer Anteil am aktuellen Gesamtverbrauch</p>
              </div>

              <div className="h-64 w-full mt-4 text-xs font-medium min-h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dummySectors} layout="vertical" margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="#64748b" tickLine={false} axisLine={false} width={110} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Anteil']} />
                    <Bar dataKey="value" barSize={12} radius={[0, 4, 4, 0]}>
                      {dummySectors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}