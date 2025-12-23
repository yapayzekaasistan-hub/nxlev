
import React from 'react';

const KeywordResearch: React.FC = () => {
  const keywords = [
    { term: 'Passive Income Strategies', volume: '120K', diff: 'Hard', cpm: '$22.40' },
    { term: 'No-code automation 2024', volume: '45K', diff: 'Low', cpm: '$14.20' },
    { term: 'Affiliate Marketing for Beginners', volume: '890K', diff: 'Extreme', cpm: '$18.90' },
    { term: 'SaaS development guide', volume: '12K', diff: 'Medium', cpm: '$9.80' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-left-6 duration-700">
      <div className="bg-indigo-600 rounded-[2.5rem] p-12 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Keyword Magic Tool</h2>
            <p className="text-indigo-100 text-sm font-medium opacity-80 leading-relaxed">Instantly find the highest paying keywords for your niche using our YouTube Search Volume Index.</p>
          </div>
          <div className="w-full md:w-auto flex flex-col gap-4">
             <div className="bg-white/10 border border-white/20 rounded-2xl p-1 flex items-center backdrop-blur-md">
                <input type="text" placeholder="Enter root keyword..." className="bg-transparent border-none outline-none px-6 py-3 text-white placeholder:text-white/60 text-sm font-bold flex-1 md:w-64" />
                <button className="bg-white text-indigo-600 font-black px-8 py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">Research</button>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keywords.map((kw, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 hover:bg-slate-900/60 transition-all cursor-pointer group">
            <h4 className="font-bold text-white mb-6 group-hover:text-indigo-400 transition-colors">{kw.term}</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-slate-500">Vol: <span className="text-slate-300">{kw.volume}</span></span>
                <span className={`px-2 py-1 rounded ${
                  kw.diff === 'Low' ? 'bg-emerald-500/10 text-emerald-400' :
                  kw.diff === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-rose-500/10 text-rose-400'
                }`}>{kw.diff}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Est. CPM</span>
                <span className="text-lg font-black text-indigo-400">{kw.cpm}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordResearch;
