
import React, { useState, useEffect } from 'react';
import { AlgorithmInput, AlgorithmOutput } from '../types';

const SuccessCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<AlgorithmInput>({
    viewsCurrent: 500000,
    views30DaysAgo: 420000,
    engagementRate: 5.2,
    nicheCompetitors: 12,
    avgCPM: 12.50
  });

  const [output, setOutput] = useState<AlgorithmOutput | null>(null);

  const pythonCode = `import json

def calculate_niche_success(video_data):
    """
    Calculates YouTube success metrics based on channel stats.
    
    Input schema:
    - views_current: Total views to date
    - views_30d_ago: Total views 30 days ago
    - engagement_rate: Average like/comment ratio (%)
    - competitors: Number of established channels in niche
    - avg_cpm: Industry standard CPM for the category
    """
    
    # 1. Rekabet Skoru (Competition Score)
    # Higher number of established channels and high base authority increases competition
    comp_score = min(100, (video_data['competitors'] * 5) + (video_data['views_current'] / 1000000))
    
    # 2. Büyüme Potansiyeli (Growth Potential)
    # Velocity based on last 30 days view momentum
    view_velocity = (video_data['views_current'] - video_data['views_30d_ago']) / max(1, video_data['views_30d_ago'])
    growth_potential = min(100, view_velocity * 100 * (1 + (video_data['engagement_rate'] / 100)))
    
    # 3. Tahmini Gelir (Estimated Revenue)
    # Based on standard AdSense calculations
    est_revenue = (video_data['views_current'] / 1000) * video_data['avg_cpm']
    
    # Niche Success Index (Aggregated)
    success_index = (growth_potential * 0.5) + (video_data['engagement_rate'] * 3) - (comp_score * 0.2)
    
    result = {
        "competition_score": round(comp_score, 2),
        "growth_potential": round(growth_potential, 2),
        "estimated_revenue": round(est_revenue, 2),
        "niche_success_index": round(max(0, min(100, success_index)), 2)
    }
    
    return json.dumps(result, indent=4)

# Usage Example:
# data = {"views_current": 500000, "views_30d_ago": 420000, "engagement_rate": 5.2, "competitors": 12, "avg_cpm": 12.50}
# print(calculate_niche_success(data))`;

  const calculate = () => {
    // Porting the logic from Python to TS for the UI demonstration
    const comp_score = Math.min(100, (inputs.nicheCompetitors * 5) + (inputs.viewsCurrent / 1000000));
    const view_velocity = (inputs.viewsCurrent - inputs.views30DaysAgo) / Math.max(1, inputs.views30DaysAgo);
    const growth_potential = Math.min(100, view_velocity * 100 * (1 + (inputs.engagementRate / 100)));
    const est_revenue = (inputs.viewsCurrent / 1000) * inputs.avgCPM;
    const success_index = (growth_potential * 0.5) + (inputs.engagementRate * 3) - (comp_score * 0.2);

    setOutput({
      competitionScore: Number(comp_score.toFixed(2)),
      growthPotential: Number(growth_potential.toFixed(2)),
      estimatedRevenue: Number(est_revenue.toFixed(2)),
      nicheSuccessIndex: Number(Math.max(0, Math.min(100, success_index)).toFixed(2))
    });
  };

  useEffect(() => {
    calculate();
  }, [inputs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Left Column: Interactive Calculator */}
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4">Interactive Lab</h2>
          <p className="text-slate-400 mb-8 text-sm">Fine-tune the algorithm parameters to see how they impact your niche viability.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Current Views</label>
              <input 
                type="number" 
                value={inputs.viewsCurrent}
                onChange={(e) => setInputs({...inputs, viewsCurrent: Number(e.target.value)})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Views 30 Days Ago</label>
              <input 
                type="number" 
                value={inputs.views30DaysAgo}
                onChange={(e) => setInputs({...inputs, views30DaysAgo: Number(e.target.value)})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Engagement (%)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={inputs.engagementRate}
                  onChange={(e) => setInputs({...inputs, engagementRate: Number(e.target.value)})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Competitors</label>
                <input 
                  type="number" 
                  value={inputs.nicheCompetitors}
                  onChange={(e) => setInputs({...inputs, nicheCompetitors: Number(e.target.value)})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {output && (
          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">JSON Output</h3>
              <span className="text-[10px] font-mono bg-indigo-500 text-white px-2 py-0.5 rounded">Live Simulation</span>
            </div>
            <pre className="bg-slate-950/50 p-6 rounded-2xl text-xs font-mono text-indigo-300 border border-indigo-500/10 overflow-x-auto">
              {JSON.stringify({
                competition_score: output.competitionScore,
                growth_potential: output.growthPotential,
                estimated_revenue: output.estimatedRevenue,
                niche_success_index: output.nicheSuccessIndex
              }, null, 4)}
            </pre>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Niche Strength</p>
                <p className="text-2xl font-bold text-emerald-400">{output.nicheSuccessIndex}%</p>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Ad Revenue</p>
                <p className="text-2xl font-bold text-indigo-400">${output.estimatedRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Code Snippet */}
      <div className="flex flex-col">
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-rose-500"></div>
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <span className="ml-2 text-xs font-mono text-slate-500 uppercase tracking-widest">success_engine.py</span>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(pythonCode)}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
              Copy Code
            </button>
          </div>
          <div className="flex-1 p-6 bg-slate-950 overflow-auto font-mono text-sm leading-relaxed text-slate-300">
            <pre className="whitespace-pre">{pythonCode}</pre>
          </div>
          <div className="p-6 bg-slate-900 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white mb-2">Algorithm Breakdown:</h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><b>Competition:</b> Calculated by weighting established channel counts against baseline view authority.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><b>Growth:</b> Measures velocity (delta views) boosted by engagement rate multipliers.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><b>Revenue:</b> Direct AdSense projection using standard CPM interpolation.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCalculator;
