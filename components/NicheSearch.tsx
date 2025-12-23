
import React, { useState } from 'react';
import { analyzeNiche, getStrategicReport, StrategicReport } from '../services/gemini';
import { searchYouTubeNiche, YouTubeNicheResult } from '../services/youtube';
import { NicheData } from '../types';

const NicheSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NicheData | null>(null);
  const [strategicReport, setStrategicReport] = useState<StrategicReport | null>(null);
  const [liveData, setLiveData] = useState<YouTubeNicheResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setStrategicReport(null);
    try {
      // 1. Fetch live metrics first
      const ytResult = await searchYouTubeNiche(query, 10);
      setLiveData(ytResult);

      // 2. Prepare data summary for AI
      const dataSummary = ytResult.map(v => 
        `- ${v.title}: ${v.views} views, ${v.subscribers} subs (Ratio: ${v.viewSubRatio}x)`
      ).join('\n');

      // 3. Parallel fetch AI analysis
      const [aiResult, reportResult] = await Promise.all([
        analyzeNiche(query),
        getStrategicReport(query, dataSummary)
      ]);

      setResult(aiResult);
      setStrategicReport(reportResult);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">Niche <span className="text-indigo-500">Intelligence</span> Lab</h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed font-medium">Scans real-time YouTube Data and runs deep AI strategy modeling to find your competitive edge.</p>
      </div>

      <form onSubmit={handleSearch} className="relative group max-w-3xl mx-auto">
        <div className="absolute inset-0 bg-indigo-600/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        <div className="relative flex items-center bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-2 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
          <div className="pl-6 pr-4 text-slate-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search niches, e.g., 'Automation SaaS'" 
            className="flex-1 bg-transparent border-none outline-none py-4 text-lg font-medium text-white placeholder:text-slate-600"
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-[2rem] transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-xl shadow-indigo-600/20"
          >
            {loading ? 'Running Analysis...' : 'Scout Niche'}
          </button>
        </div>
      </form>

      {result && (
        <div className="space-y-10">
          {/* Top Level Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-10 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">{result.name}</h3>
                  <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">{result.category}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-slate-950/40 border border-slate-800/60">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Estimated CPM</p>
                    <p className="text-3xl font-bold text-emerald-400">${result.avgCPM}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-slate-950/40 border border-slate-800/60">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Market Saturation</p>
                    <p className="text-3xl font-bold text-amber-400">{result.saturationScore}%</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Growth Velocity</p>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div style={{ width: `${result.growthPotential}%` }} className="h-full bg-indigo-600 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
                  </div>
                </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-10 flex flex-col">
                <h4 className="text-lg font-bold text-white mb-6">AI Market Sentiment</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">{result.analysis}</p>
                <div className="flex flex-wrap gap-2">
                  {result.topKeywords.slice(0, 4).map((kw, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-slate-800 text-[10px] font-bold text-slate-300 uppercase tracking-wider">{kw}</span>
                  ))}
                </div>
            </div>
          </div>

          {/* Strategic Analysis Report */}
          {strategicReport && (
            <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900/40 border border-indigo-500/30 rounded-[2.5rem] p-12 animate-in fade-in slide-in-from-top-4 duration-1000">
               <div className="flex items-center gap-4 mb-10">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-white">Strategic Growth Report</h4>
                    <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mt-1">Grounding: Live YouTube Data</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-slate-950/40 border border-slate-800/60 p-6 rounded-3xl">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Competition Level</p>
                    <p className="text-xl font-black text-white">{strategicReport.competitionLevel}</p>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-800/60 p-6 rounded-3xl">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Est. Time to 100k Subs</p>
                    <p className="text-xl font-black text-white">{strategicReport.timeTo100k}</p>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-800/60 p-6 rounded-3xl">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Analysis Confidence</p>
                    <p className="text-xl font-black text-indigo-400">94.2%</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h5 className="text-sm font-black text-white uppercase tracking-widest">Recommended Video Titles</h5>
                    <div className="space-y-4">
                      {strategicReport.suggestedTitles.map((title, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 hover:border-indigo-500/30 transition-all cursor-pointer group">
                          <span className="h-8 w-8 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-400 text-xs font-black">{i + 1}</span>
                          <p className="text-sm font-bold text-slate-200 group-hover:text-white">{title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-white uppercase tracking-widest mb-6">Executive Summary</h5>
                    <div className="p-8 rounded-3xl bg-slate-950/40 border border-slate-800/60 relative overflow-hidden">
                       <p className="text-sm leading-relaxed text-slate-400 relative z-10">{strategicReport.strategicSummary}</p>
                       <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full"></div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {/* Live Data Results */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-10 animate-in fade-in duration-1000">
            <h4 className="text-lg font-bold text-white mb-8 border-b border-slate-800 pb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Market Breakouts
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveData.map((video, i) => (
                <div key={i} className="bg-slate-950/40 border border-slate-800/60 rounded-3xl overflow-hidden group hover:border-indigo-500/30 transition-all">
                  <div className="relative h-40 overflow-hidden">
                    <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={video.title} />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-indigo-600 text-[9px] font-black rounded text-white uppercase tracking-widest shadow-lg">
                      {video.viewSubRatio}x Viral
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h5 className="text-sm font-bold text-white line-clamp-2 group-hover:text-indigo-400 transition-colors">{video.title}</h5>
                    <div className="flex justify-between items-center border-t border-slate-800/60 pt-4">
                      <p className="text-[10px] text-slate-500 font-bold uppercase truncate max-w-[100px]">{video.channelName}</p>
                      <p className="text-[10px] text-emerald-400 font-black">{(video.views / 1000).toFixed(1)}k Views</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NicheSearch;
