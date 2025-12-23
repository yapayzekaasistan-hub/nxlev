
import React, { useState } from 'react';
import { analyzeNiche, getStrategicReport, StrategicReport } from '../services/gemini';
import { fetchCompetitorDetails, searchYouTubeNiche, YouTubeNicheResult } from '../services/youtube';
import { NicheData, CompetitorStats } from '../types';

const NicheAnalyzer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NicheData | null>(null);
  const [strategicReport, setStrategicReport] = useState<StrategicReport | null>(null);
  const [competitors, setCompetitors] = useState<CompetitorStats[]>([]);
  const [liveBreakouts, setLiveBreakouts] = useState<YouTubeNicheResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setStrategicReport(null);
    
    try {
      // 1. Fetch live metrics & breakouts from YouTube API
      const [breakoutResults, competitorResults] = await Promise.all([
        searchYouTubeNiche(query, 6),
        fetchCompetitorDetails(query)
      ]);
      
      setLiveBreakouts(breakoutResults);
      setCompetitors(competitorResults);

      // 2. Prepare data summary for AI-grounded strategic reporting
      const dataSummary = breakoutResults.map(v => 
        `- ${v.title}: ${v.views} views, ${v.subscribers} subs (Ratio: ${v.viewSubRatio}x)`
      ).join('\n');

      // 3. Parallel fetch AI Analysis (CPM/Saturation/etc) and Strategic Report
      const [nicheData, reportData] = await Promise.all([
        analyzeNiche(query),
        getStrategicReport(query, dataSummary)
      ]);
      
      setResult(nicheData);
      setStrategicReport(reportData);
    } catch (err: any) {
      setError(err.message || 'Something went wrong during analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="bg-slate-900/60 border border-slate-800/60 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-md">
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Intelligence <span className="text-indigo-500">Analyzer</span></h2>
        <p className="text-slate-400 mb-8 font-medium">Deep market intelligence powered by YouTube Real-time API & Gemini Pro Reasoning.</p>
        
        <form onSubmit={handleAnalyze} className="relative group">
          <div className="absolute inset-0 bg-indigo-600/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a niche, e.g. 'SaaS Automation' or 'Luxury Travel AI'"
            className="w-full bg-slate-950/50 border-2 border-slate-800 rounded-3xl px-8 py-5 focus:outline-none focus:border-indigo-500 transition-all text-lg placeholder:text-slate-700 text-white font-medium"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2.5 top-2.5 bottom-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-10 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              <>
                Scout Niche
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-6 py-4 rounded-2xl text-center font-bold text-sm uppercase tracking-wider">
          {error}
        </div>
      )}

      {result && !loading && (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500 pb-20">
          
          {/* Revenue & Market Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-950/40 to-slate-900/40 border border-indigo-500/20 rounded-[2.5rem] p-10 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">AI Revenue Predictor</p>
                            <h3 className="text-2xl font-black text-white">Estimated CPM Range</h3>
                        </div>
                        <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 text-xs font-black uppercase tracking-widest">
                            {result.category}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-end gap-10">
                        <div className="flex-1">
                            <p className="text-6xl font-black text-white tracking-tighter mb-4">{result.cpmAnalysis.predictedRange}</p>
                            <div className="flex flex-wrap gap-2">
                                {result.cpmAnalysis.factors.slice(0, 3).map((factor, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-slate-950/50 rounded-lg text-[10px] font-bold text-slate-400 border border-slate-800/60">
                                        {factor}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-48 p-6 bg-slate-950/40 border border-slate-800/60 rounded-3xl text-center">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Top Paying Region</p>
                            <p className="text-lg font-black text-emerald-400">{result.cpmAnalysis.topPayingRegion}</p>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Opportunity & Saturation Visual Indicators */}
            <div className="space-y-6">
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2rem] p-8 group hover:border-emerald-500/30 transition-all">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Opportunity Score</p>
                    <div className="flex items-center gap-6">
                        <div className="text-4xl font-black text-emerald-400">{result.opportunityScore}%</div>
                        <div className="flex-1">
                          <div className="h-3 bg-slate-800 rounded-full overflow-hidden relative">
                              <div 
                                style={{ width: `${result.opportunityScore}%` }} 
                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-1000 ease-out"
                              ></div>
                          </div>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-2">Niche Viability</p>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2rem] p-8 group hover:border-amber-500/30 transition-all">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Saturation Level</p>
                    <div className="flex items-center gap-6">
                        <div className="text-4xl font-black text-amber-400">{result.saturationScore}%</div>
                        <div className="flex-1">
                          <div className="h-3 bg-slate-800 rounded-full overflow-hidden relative">
                              <div 
                                style={{ width: `${result.saturationScore}%` }} 
                                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-1000 ease-out"
                              ></div>
                          </div>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-2">Market Density</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Strategic Analysis Report from Gemini */}
          {strategicReport && (
            <div className="bg-gradient-to-br from-slate-900/80 to-indigo-950/20 border border-indigo-500/30 rounded-[3rem] p-12 shadow-2xl animate-in fade-in slide-in-from-top-6 duration-1000 relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                   <div className="flex items-center gap-6">
                      <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 rotate-3">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <div>
                        <h4 className="text-3xl font-black text-white">Strategic Roadmap</h4>
                        <p className="text-xs text-indigo-400 font-bold uppercase tracking-[0.3em] mt-1">Growth Intelligence</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="px-6 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-center">
                        <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Competition</p>
                        <p className="text-sm font-black text-white uppercase">{strategicReport.competitionLevel}</p>
                      </div>
                      <div className="px-6 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-center">
                        <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Time to 100k</p>
                        <p className="text-sm font-black text-emerald-400 uppercase">{strategicReport.timeTo100k}</p>
                      </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">High-Potential Video Hooks</h5>
                      <div className="space-y-3">
                        {strategicReport.suggestedTitles.map((title, i) => (
                          <div key={i} className="group p-5 rounded-2xl bg-slate-950/40 border border-slate-800/60 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all cursor-pointer">
                            <div className="flex items-start gap-4">
                              <span className="text-xs font-black text-indigo-500 pt-1">0{i+1}</span>
                              <p className="text-sm font-bold text-slate-200 leading-relaxed group-hover:text-white">{title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-6">Executive Niche Summary</h5>
                      <div className="p-8 rounded-[2rem] bg-slate-950/60 border border-slate-800/60 relative group overflow-hidden">
                        <p className="text-sm leading-relaxed text-slate-400 relative z-10 italic">"{strategicReport.strategicSummary}"</p>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-[60px] group-hover:bg-indigo-600/20 transition-all"></div>
                      </div>
                    </div>
                 </div>
               </div>
               <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/5 to-transparent pointer-events-none"></div>
            </div>
          )}

          {/* Competitor Authority Section */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Competitor Authority Index
              </h3>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Connected to v3 Scraper</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {competitors.map((comp, i) => (
                <div key={i} className="bg-slate-950/40 border border-slate-800/60 rounded-3xl p-6 hover:border-indigo-500/40 transition-all group hover:bg-slate-900/40">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      <img src={comp.thumbnail} alt={comp.name} className="w-16 h-16 rounded-full border-2 border-slate-800 group-hover:border-indigo-500/50 transition-all" />
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-indigo-600 border-2 border-slate-900 rounded-full flex items-center justify-center text-[8px] font-black text-white">
                        {i+1}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white truncate max-w-[140px]" title={comp.name}>{comp.name}</h4>
                      <p className="text-[10px] font-bold text-indigo-400 mt-1">{formatNumber(comp.subscriberCount)} Subs</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-slate-800/60 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-slate-500 uppercase">Avg Views</span>
                      <span className="text-[11px] font-bold text-slate-200">{formatNumber(comp.avgViewsPerVideo)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-slate-500 uppercase">Frequency</span>
                      <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-tighter ${
                        comp.uploadFrequencyScore === 'High' ? 'bg-emerald-500/10 text-emerald-400' :
                        comp.uploadFrequencyScore === 'Medium' ? 'bg-indigo-500/10 text-indigo-400' :
                        'bg-slate-800 text-slate-500'
                      }`}>
                        {comp.uploadFrequencyScore}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geographical & Keyword Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Audience Demographics
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">{result.analysis}</p>
              
              <div className="space-y-6">
                 <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Top Markets</p>
                   <div className="flex flex-wrap gap-2">
                      {result.audienceDemographics.topRegions.map((region, i) => (
                          <span key={i} className="px-4 py-2 rounded-xl bg-slate-800/80 text-xs font-bold text-slate-300 border border-slate-700/50">{region}</span>
                      ))}
                   </div>
                 </div>
                 <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                   <p className="text-[10px] font-bold text-indigo-400 uppercase mb-1">Recommended Age Bracket</p>
                   <p className="text-sm font-black text-white">{result.audienceDemographics.ageRange}</p>
                 </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-10">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                Golden Keyword Tags
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {result.topKeywords.map((kw, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-950/40 border border-slate-800/60 rounded-2xl group hover:border-indigo-500/40 transition-all">
                    <span className="text-sm font-bold text-slate-200 group-hover:text-white">{kw}</span>
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">Premium Keyword</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Breakout Videos */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-10">
            <h4 className="text-lg font-black text-white mb-8 border-b border-slate-800 pb-4 flex items-center gap-3 uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Breakout Feed
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveBreakouts.map((video, i) => (
                <div key={i} className="bg-slate-950/40 border border-slate-800/60 rounded-3xl overflow-hidden group hover:border-indigo-500/30 transition-all">
                  <div className="relative h-44 overflow-hidden">
                    <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={video.title} />
                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] font-black rounded-lg text-white border border-white/10 uppercase">
                      {video.viewSubRatio}x Potential
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h5 className="text-sm font-bold text-white line-clamp-2 group-hover:text-indigo-400 transition-colors leading-relaxed">{video.title}</h5>
                    <div className="flex justify-between items-center border-t border-slate-800/60 pt-4">
                      <p className="text-[10px] text-slate-500 font-bold uppercase truncate max-w-[120px]">{video.channelName}</p>
                      <p className="text-[10px] text-emerald-400 font-black">{formatNumber(video.views)} Views</p>
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

export default NicheAnalyzer;
