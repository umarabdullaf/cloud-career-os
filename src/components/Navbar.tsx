import React from 'react';
import {
  Compass,
  BookOpen,
  Briefcase,
  Award,
  Share2,
  FileDown,
  Layers
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenBackup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onOpenBackup }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'curriculum', label: 'Curriculum & Orbit', icon: BookOpen },
    { id: 'jobs', label: 'Remote & Tier-1 Tracker', icon: Briefcase },
    { id: 'internship-hub', label: 'Internship Return Hub', icon: Layers },
    { id: 'competencies', label: 'Competencies', icon: Award },
    { id: 'linkedin', label: 'LinkedIn Planner', icon: Share2 }
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              OS
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                Cloud Career OS <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">2026–2030</span>
              </div>
              <p className="text-xs text-slate-400">TKM College of Engineering • B.Tech CSE</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenBackup}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded border border-slate-700 transition"
              title="Backup and Restore Data"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Data / Backup</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex overflow-x-auto px-2 py-2 border-t border-slate-800 gap-1 bg-slate-950">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs whitespace-nowrap ${
                isActive ? 'bg-slate-800 text-emerald-400' : 'text-slate-400'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
