'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  // Define navi points
  const navItems = [
    { href: '/', label: 'Overview', icon: '📊' },
    { href: '/co2', label: 'Co2 Emission', icon: '🌱' },
    { href: '/renewables', label: 'Renewables', icon: '⚡' },
    { href: '/consumption', label: 'Consumption', icon: '🔥' },
  ];

  return (
    <aside className="w-64 bg-[#09090b] flex flex-col justify-between p-6 shrink-0 h-screen sticky top-0 text-zinc-400">
      <div>
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            DK
          </div>
          <span className="font-bold text-lg tracking-tight text-white">GreenEnergy</span>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-3">
          {navItems.map((item) => {
            
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-full font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                <span>{item.icon}</span> {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* USER PROFILE */}
      <div className="flex items-center gap-3 pt-6 border-t border-zinc-800">
        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-300 border border-zinc-700">
          JD
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-200">John Doe</p>
          <p className="text-xs text-zinc-500">Developer</p>
        </div>
      </div>
    </aside>
  );
}