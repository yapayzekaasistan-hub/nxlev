
import React from 'react';
import { ArchitectureItem } from '../types';

const items: ArchitectureItem[] = [
  { layer: 'Frontend', technology: 'React 18 + TypeScript', details: 'A fast, component-based UI using Tailwind CSS for professional SaaS aesthetics and real-time state management.' },
  { layer: 'Visualization', technology: 'Recharts / D3.js', details: 'Interactive charts for CPM trends, niche growth, and market saturation heatmaps.' },
  { layer: 'AI Engine', technology: 'Google Gemini 2.5 Pro', details: 'Analyzes raw YouTube data to predict CPM, evaluate sentiment, and identify "blue ocean" keyword opportunities.' },
  { layer: 'Backend', technology: 'Node.js / Express (Serverless)', details: 'Handles authentication, YouTube API rate limiting, and caching of niche reports.' },
  { layer: 'Database', technology: 'PostgreSQL + Redis', details: 'Postgres for user data and saved reports; Redis for caching high-frequency API responses and search results.' },
  { layer: 'External API', technology: 'YouTube Data API v3', details: 'Primary source for channel statistics, video metadata, and audience engagement metrics.' },
];

const Architecture: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i} className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10">
            <div className="mb-4 inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
              {item.layer}
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{item.technology}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{item.details}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-10 overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6">System Data Flow</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center p-6 bg-slate-950/50 rounded-2xl border border-slate-700">
              <div className="font-bold text-indigo-400 mb-2">User Query</div>
              <p className="text-xs text-slate-500">Search keywords or niche title via Dashboard UI</p>
            </div>
            <div className="text-slate-700 hidden md:block">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
            <div className="flex-1 text-center p-6 bg-slate-950/50 rounded-2xl border border-slate-700">
              <div className="font-bold text-emerald-400 mb-2">API Scraper</div>
              <p className="text-xs text-slate-500">Collects YouTube v3 metadata and channel stats</p>
            </div>
            <div className="text-slate-700 hidden md:block">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
            <div className="flex-1 text-center p-6 bg-indigo-600 rounded-2xl border border-indigo-500">
              <div className="font-bold text-white mb-2">Gemini AI Model</div>
              <p className="text-xs text-indigo-100">Evaluates CPM, Saturation, and Opportunity Index</p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Architecture;
