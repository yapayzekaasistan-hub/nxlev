
import { GoogleGenAI, Type } from "@google/genai";
import { NicheData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface StrategicReport {
  competitionLevel: string;
  timeTo100k: string;
  suggestedTitles: string[];
  strategicSummary: string;
}

export const analyzeNiche = async (nicheQuery: string): Promise<NicheData> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Analyze the following YouTube niche: "${nicheQuery}". 
    Provide a detailed breakdown including:
    1. Estimated average CPM (USD).
    2. A detailed CPM analysis considering the niche category (e.g., Finance, Gaming, Tech) and geographical potential (e.g., USA, UK, Tier 1 vs Tier 3 countries).
    3. Saturation index (0-100), opportunity score (0-100), and top keywords.
    4. Audience demographics and competition analysis.`,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 4000 },
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          category: { type: Type.STRING },
          avgCPM: { type: Type.NUMBER },
          cpmAnalysis: {
            type: Type.OBJECT,
            properties: {
              predictedRange: { type: Type.STRING, description: "e.g., '$25 - $40'" },
              factors: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Factors influencing this CPM (e.g., 'High advertiser demand for insurance keywords')"
              },
              topPayingRegion: { type: Type.STRING, description: "The region with the highest predicted CPM for this niche" }
            },
            required: ["predictedRange", "factors", "topPayingRegion"]
          },
          saturationScore: { type: Type.NUMBER },
          opportunityScore: { type: Type.NUMBER },
          growthPotential: { type: Type.NUMBER },
          topKeywords: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          competitors: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          audienceDemographics: {
            type: Type.OBJECT,
            properties: {
              ageRange: { type: Type.STRING },
              topRegions: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["ageRange", "topRegions"]
          },
          analysis: { type: Type.STRING }
        },
        required: [
          "name", "category", "avgCPM", "cpmAnalysis", "saturationScore", "opportunityScore", 
          "growthPotential", "topKeywords", "competitors", "audienceDemographics", "analysis"
        ]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Analysis failed. Please try again.");
  }
};

export const getStrategicReport = async (nicheName: string, liveDataSummary: string): Promise<StrategicReport> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `You are a professional YouTube strategist. Analyze the following real-time data for the niche "${nicheName}":
    
    DATA SUMMARY:
    ${liveDataSummary}
    
    Based on this, generate a strategic report including:
    1. Competition Level (Low, Mid, High, Extreme)
    2. Estimated time to reach 100,000 subscribers.
    3. 3 Ideal high-performing video title ideas.
    4. A concise strategic summary.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          competitionLevel: { type: Type.STRING },
          timeTo100k: { type: Type.STRING },
          suggestedTitles: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          strategicSummary: { type: Type.STRING }
        },
        required: ["competitionLevel", "timeTo100k", "suggestedTitles", "strategicSummary"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse Strategic Report", e);
    throw new Error("Strategic analysis failed.");
  }
};
