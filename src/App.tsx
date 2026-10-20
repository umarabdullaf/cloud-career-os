import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { CurriculumView } from './components/CurriculumView';
import { JobTracker } from './components/JobTracker';
import { InternshipReturnHub } from './components/InternshipReturnHub';
import { CompetencyMatrix } from './components/CompetencyMatrix';
import { LinkedInPlanner } from './components/LinkedInPlanner';
import { DataBackupModal } from './components/DataBackupModal';

export const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenBackup={() => setIsBackupOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'dashboard' && <Dashboard onNavigate={(tab) => setCurrentTab(tab)} />}
        {currentTab === 'curriculum' && <CurriculumView />}
        {currentTab === 'jobs' && <JobTracker />}
        {currentTab === 'internship-hub' && <InternshipReturnHub />}
        {currentTab === 'competencies' && <CompetencyMatrix />}
        {currentTab === 'linkedin' && <LinkedInPlanner />}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-400">
        Cloud Career OS • Built for TKMCE CSE 2026–2030 • Strictly Verified Offline Tooling
      </footer>

      <DataBackupModal isOpen={isBackupOpen} onClose={() => setIsBackupOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
