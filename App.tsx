
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NicheAnalyzer from './components/NicheAnalyzer';
import CompetitorTracker from './components/CompetitorTracker';
import KeywordResearch from './components/KeywordResearch';
import BackendLab from './components/BackendLab';

export enum View {
  DASHBOARD = 'DASHBOARD',
  SEARCH = 'SEARCH',
  COMPETITORS = 'COMPETITORS',
  KEYWORDS = 'KEYWORDS',
  API_LAB = 'API_LAB'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard />;
      case View.SEARCH:
        return <NicheAnalyzer />;
      case View.COMPETITORS:
        return <CompetitorTracker />;
      case View.KEYWORDS:
        return <KeywordResearch />;
      case View.API_LAB:
        return <BackendLab />;
      default:
        return <Dashboard />;
    }
  };

  const getHeaderTitle = () => {
    switch (currentView) {
      case View.DASHBOARD: return 'Market Intelligence';
      case View.SEARCH: return 'Niche Intelligence Analyzer';
      case View.COMPETITORS: return 'Competitor Analysis';
      case View.KEYWORDS: return 'Keyword Discovery';
      case View.API_LAB: return 'Backend API Architecture';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#080b14] text-slate-100 selection:bg-indigo-500/30">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-800/60 bg-[#080b14]/80 px-10 backdrop-blur-xl">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">{getHeaderTitle()}</h1>
            <p className="text-xs text-slate-500 font-medium">Real-time YouTube market data</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">System Live</span>
            </div>
            <button className="h-10 w-10 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center hover:bg-slate-800 transition-colors">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
          </div>
        </header>
        <div className="p-10 flex-1">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
