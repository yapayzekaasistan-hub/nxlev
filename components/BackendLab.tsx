
import React from 'react';

const BackendLab: React.FC = () => {
  const pythonCode = `import pandas as pd
from googleapiclient.discovery import build
from fastapi import FastAPI, HTTPException
import openai
import os

app = FastAPI()

# Configuration
API_KEY = os.getenv('YOUTUBE_API_KEY')
OPENAI_KEY = os.getenv('OPENAI_API_KEY')
youtube = build('youtube', 'v3', developerKey=API_KEY)

@app.get("/ai-strategic-report/{query}")
def get_strategic_insight(query: str):
    """
    1. Scrapes YouTube data for a niche
    2. Processes metrics into a summary
    3. Uses AI to generate a strategic growth roadmap
    """
    try:
        # Step 1: YouTube Scraper
        search_response = youtube.search().list(
            q=query, part='snippet', maxResults=15, type='video'
        ).execute()

        video_ids = [i['id']['videoId'] for i in search_response['items']]
        stats = youtube.videos().list(id=",".join(video_ids), part='statistics').execute()
        
        # Step 2: Data Summary for AI
        data_summary = []
        for v in stats['items']:
            views = int(v['statistics'].get('viewCount', 0))
            data_summary.append({"title": v['id'], "views": views})
            
        df = pd.DataFrame(data_summary)
        summary_text = df.describe().to_string()

        # Step 3: AI Analysis (Stratejist Rolü)
        client = openai.OpenAI(api_key=OPENAI_KEY)
        prompt = f"""
        Sen bir YouTube stratejistisin. '{query}' nişi için şu verilere bak:
        {summary_text}

        Şu 3 soruyu cevapla:
        1. Bu nişin rekabet düzeyi nedir?
        2. 100 bin aboneye ulaşmak ne kadar sürer?
        3. En ideal 3 video başlığı önerisi nedir?
        """

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}]
        )

        return {
            "niche": query,
            "ai_report": response.choices[0].message.content,
            "raw_stats": data_summary
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run with: uvicorn main:app --reload`;

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">Strategic AI <span className="text-indigo-500">Integration</span></h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            The final layer of the NexLev stack: Feeding processed YouTube DataFrames into LLMs (Gemini/OpenAI) to extract actionable growth roadmaps.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl px-8 py-5 flex items-center gap-4 shadow-xl">
          <div className="h-3 w-3 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-sm font-bold text-slate-200 uppercase tracking-widest">Logic: AI Stratejist</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
          <div className="px-8 py-6 border-b border-slate-800/60 bg-slate-900/50 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-4 text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold">ai_strategist.py</span>
             </div>
             <button 
              onClick={() => navigator.clipboard.writeText(pythonCode)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-indigo-400 transition-all flex items-center gap-2 uppercase tracking-widest border border-slate-700"
             >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                Copy Script
             </button>
          </div>
          <div className="p-8 bg-[#0a0d16] overflow-auto font-mono text-xs md:text-sm leading-relaxed text-indigo-100/70 max-h-[650px] scrollbar-thin selection:bg-indigo-500/30">
            <pre className="whitespace-pre">{pythonCode}</pre>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-10">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8 border-b border-slate-800 pb-4">Prompt Engineering</h4>
            <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800/60 font-mono text-[11px] text-indigo-300 leading-relaxed italic">
              "Sen bir YouTube stratejistisin. {`{query}`} nişi için verilere dayanarak rekabeti ve büyüme süresini analiz et."
            </div>
            <p className="mt-6 text-xs text-slate-500 leading-relaxed">
              By grounding the AI in actual metrics (views, subscriber ratios), we eliminate hallucinations and provide mathematically sound business advice.
            </p>
          </div>
          
          <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-[2.5rem] p-10 text-emerald-100 shadow-2xl">
             <h4 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-80 text-emerald-400">Pro Feature: CPM Prediction</h4>
             <p className="text-sm leading-relaxed font-medium">
               "Cross-reference TopicCategories from YouTube with AI sector knowledge to predict the exact ad revenue potential before you even record your first video."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendLab;
