"use client";

import { Sidebar } from "../components/Sidebar";
import { Co2Section } from "../components/Co2Section";
import { Co2Chart } from "../components/Co2Chart";
import { RenewableSection } from "../components/RenewableSection";
import { ElectricitySection } from "../components/ElectricitySection";
import { ElectricitySectionB } from "../components/ElectricitySectionB";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#090909] text-slate-800 antialiased">
      <Sidebar />

      <main className="flex-1 p-10 m-10 max-w-full overflow-y-auto bg-[#EAEAEA] rounded-4xl">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Energy Overview
            </h1>
            <p className="text-slate-500 mt-1">
              Live-Daten aus dem dänischen Stromnetz.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 text-sm font-medium text-slate-600">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Live Netz-Status
          </div>
        </header>

        <div className="space-y-6">
          <div className="flex gap-5">
            <div className="w-4/6">
              <ElectricitySectionB />
            </div>
            <div className="w-2/6">
              <Co2Section />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-4/6">
              <Co2Chart />
            </div>
            <div className="w-2/6">
              <RenewableSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
