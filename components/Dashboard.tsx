
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { searchYouTubeNiche, YouTubeNicheResult } from '../services/youtube';

const data = [
  { name: 'Mon', views: 4000, potential: 2400 },
  { name: 'Tue', views: 3000, potential: 1398 },
  { name: 'Wed', views: 2000, potential: 9800 },
  { name: 'Thu', views: 2780, potential: 3908 },
  { name: 'Fri', views: 1890, potential: 4800 },
  { name: 'Sat', views: 2390, potential: 3800 },
  { name: 'Sun', views: 3490, potential: 4300 },
];

const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend?: string }) => (
  <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-[2rem] hover:bg-slate-900/60 transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      {trend && (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
    <h3 className="text-2xl font-black text-white mt-1">{value}</h3>
  </div>
);

const Dashboard: React.FC = () => {
  const [scoutQuery, setScoutQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<YouTubeNicheResult[]>([]);

  const handleScout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scoutQuery.trim()) return;
    setLoading(true);
    try {
      const data = await searchYouTubeNiche(scoutQuery);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const displayData = results.length > 0 ? results : [
    { title: "AI SaaS Ideas 2024", views: 150000, viewSubRatio: 12.5, channelName: "Mock Author", videoId: '1' },
    { title: "Faceless YouTube Tips", views: 85000, viewSubRatio: 5.2, channelName: "Mock Author", videoId: '2' },
    { title: "Green Finance News", views: 210000, viewSubRatio: 18.1, channelName: "Mock Author", videoId: '3' },
    { title: "Micro-SaaS Builds", views: 12000, viewSubRatio: 1.2, channelName: "Mock Author", videoId: '4' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Market <span className="text-indigo-500">Breakout</span> Radar</h2>
        <form onSubmit={handleScout} className="relative group">
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center bg-slate-900/50 border border-slate-800/60 rounded-[2rem] p-2 focus-within:border-indigo-500/50 transition-all">
            <div className="pl-6 pr-4 text-slate-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              value={scoutQuery}
              onChange={(e) => setScoutQuery(e.target.value)}
              placeholder="Enter a keyword to scout for viral potential..." 
              className="flex-1 bg-transparent border-none outline-none py-3 text-sm font-medium text-white placeholder:text-slate-600"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-[1.5rem] transition-all text-xs uppercase tracking-widest active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Scouting...' : 'Scout'}
            </button>
          </div>
        </form>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          title="Potential Score" 
          value={results.length > 0 ? `${Math.min(100, Math.floor(results.reduce((a,b) => a + b.viewSubRatio, 0) * 2))}/100` : "88/100"} 
          trend={results.length > 0 ? "LIVE" : "+5.2%"}
          icon={<svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} 
        />
        <StatCard 
          title="Avg Market CPM" 
          value="$12.50" 
          trend="+1.4%"
          icon={<svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} 
        />
        <StatCard 
          title="Competition Level" 
          value={results.length > 10 ? "High" : "Low"} 
          icon={<svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} 
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              Viral Opportunity Index
            </h3>
            {results.length > 0 && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-400/20">Live API Results</span>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-slate-800">
                <tr>
                  <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Niche / Video Title</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Virality (V/S)</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Engagement</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Momentum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {displayData.map((item, i) => (
                  <tr key={i} className="group hover:bg-slate-800/20 transition-all cursor-pointer">
                    <td className="py-5 font-bold text-slate-200 group-hover:text-indigo-400 transition-colors max-w-xs">
                      <div className="truncate" title={item.title}>{item.title}</div>
                      <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">{item.channelName}</p>
                    </td>
                    <td className="py-5 text-center">
                      <span className={`text-sm font-black ${item.viewSubRatio > 5 ? 'text-emerald-400' : 'text-indigo-400'}`}>
                        {item.viewSubRatio}x
                      </span>
                    </td>
                    <td className="py-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        item.viewSubRatio > 10 ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                        item.viewSubRatio > 3 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-slate-800 text-slate-500'
                      }`}>
                        {item.viewSubRatio > 10 ? 'Viral' : item.viewSubRatio > 3 ? 'Growth' : 'Niche'}
                      </span>
                    </td>
                    <td className="py-5 text-right font-black text-white">
                      {Math.floor(item.viewSubRatio * 8)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-10">
          <h3 className="text-lg font-bold text-white mb-8">Niche Velocity</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '1rem' }}
                />
                <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 p-6 bg-slate-950/50 rounded-2xl border border-slate-800/60">
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
              "Markets with high V/S ratios are currently underserved. Focus content production here for maximum organic reach."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
