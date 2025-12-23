
import React from 'react';
import { RoadmapStep } from '../types';

const steps: RoadmapStep[] = [
  {
    title: 'Niche Discovery Phase',
    description: 'Find relevant channels and videos based on a search query to identify niche boundaries.',
    endpoints: [
      'GET /youtube/v3/search (type: channel, video)',
      'GET /youtube/v3/videoCategories (list: regionCode)',
    ],
    status: 'completed'
  },
  {
    title: 'Competition Analysis',
    description: 'Fetch detailed channel statistics to calculate growth rates and average views per video.',
    endpoints: [
      'GET /youtube/v3/channels (part: statistics, snippet, topicDetails)',
      'GET /youtube/v3/subscriptions (list: channelId)',
    ],
    status: 'in-progress'
  },
  {
    title: 'Engagement & SEO Audit',
    description: 'Analyze video performance, comments, and tags to understand what audience responds to.',
    endpoints: [
      'GET /youtube/v3/videos (part: statistics, snippet, contentDetails)',
      'GET /youtube/v3/commentThreads (list: videoId)',
    ],
    status: 'todo'
  },
  {
    title: 'CPM Modeling',
    description: 'Map channel topics to industry CPM standards using TopicDetails and AI estimation.',
    endpoints: [
      'GET /youtube/v3/topicCategories (via Freebase IDs)',
      'Custom Integration: AdSense Revenue Estimator API',
    ],
    status: 'todo'
  }
];

const Roadmap: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-right-8 duration-700">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Development Roadmap</h2>
        <p className="text-slate-400">Step-by-step integration guide for building the full YouTube Niche Finder engine.</p>
      </div>

      <div className="relative border-l-2 border-slate-800 ml-4 space-y-12">
        {steps.map((step, i) => (
          <div key={i} className="relative pl-12">
            <div className={`absolute -left-3.5 top-0 h-7 w-7 rounded-full flex items-center justify-center border-4 border-slate-950 ${
              step.status === 'completed' ? 'bg-emerald-500' :
              step.status === 'in-progress' ? 'bg-indigo-500 animate-pulse' : 'bg-slate-700'
            }`}>
              {step.status === 'completed' && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              )}
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  step.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                  step.status === 'in-progress' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  {step.status}
                </span>
              </div>
              <p className="text-slate-400 mb-6">{step.description}</p>
              
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Required Endpoints</p>
                <div className="grid grid-cols-1 gap-2">
                  {step.endpoints.map((ep, j) => (
                    <code key={j} className="bg-slate-950 border border-slate-800 text-indigo-400 px-4 py-2 rounded-lg text-xs font-mono">
                      {ep}
                    </code>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
