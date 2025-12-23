
import React from 'react';
import { View } from '../App';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Overview', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
    )},
    { id: View.SEARCH, label: 'Niche Search', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    )},
    { id: View.COMPETITORS, label: 'Competitor Tracking', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    )},
    { id: View.KEYWORDS, label: 'Keyword Research', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
    )},
    { id: View.API_LAB, label: 'API Development', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    )},
  ];

  return (
    <aside className="w-72 border-r border-slate-800/60 bg-[#080b14] flex flex-col z-30">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-xl shadow-indigo-600/20">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">NexLev <span className="text-indigo-400">AI</span></span>
        </div>
      </div>
      
      <div className="px-4 mb-4">
        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Market Discovery</p>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                currentView === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1"></div>

      <div className="p-6">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600/10 to-transparent p-5 border border-indigo-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-600/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </div>
            <p className="text-xs font-bold text-indigo-100 uppercase tracking-wider">Premium Plan</p>
          </div>
          <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">Unlock deep niche metrics and unlimited AI analysis.</p>
          <button className="w-full rounded-xl bg-white py-2.5 text-[11px] font-bold text-slate-950 hover:bg-slate-200 transition-all active:scale-95">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
