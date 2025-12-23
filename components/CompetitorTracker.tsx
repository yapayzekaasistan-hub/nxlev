
import React from 'react';

const CompetitorTracker: React.FC = () => {
  const competitors = [
    { name: 'TechGiant', subs: '1.2M', views: '45M', status: 'Dominant', trend: 'up' },
    { name: 'AI Explorer', subs: '450K', views: '12M', status: 'Rising', trend: 'up' },
    { name: 'Future Pulse', subs: '89K', views: '1.5M', status: 'Niche', trend: 'stable' },
    { name: 'Daily Bytes', subs: '210K', views: '5.2M', status: 'Average', trend: 'down' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-right-6 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Market Dominance</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">Tracking top 10 authority channels in your niche</p>
        </div>
        <button className="px-6 py-3 rounded-2xl bg-indigo-600 text-xs font-bold text-white uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all">
          Add Channel
        </button>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50 border-b border-slate-800/60">
            <tr>
              <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Channel Name</th>
              <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subscribers</th>
              <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Views</th>
              <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Positioning</th>
              <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Momentum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {competitors.map((comp, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors cursor-pointer group">
                <td className="px-10 py-6 font-bold text-white group-hover:text-indigo-400 transition-colors">{comp.name}</td>
                <td className="px-10 py-6 text-slate-400 font-medium">{comp.subs}</td>
                <td className="px-10 py-6 text-slate-400 font-medium">{comp.views}</td>
                <td className="px-10 py-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    comp.status === 'Dominant' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                    comp.status === 'Rising' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    'bg-slate-800 text-slate-500'
                  }`}>
                    {comp.status}
                  </span>
                </td>
                <td className="px-10 py-6 text-right">
                  <span className={comp.trend === 'up' ? 'text-emerald-400' : comp.trend === 'down' ? 'text-rose-400' : 'text-slate-500'}>
                    {comp.trend === 'up' ? '↗' : comp.trend === 'down' ? '↘' : '→'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompetitorTracker;
