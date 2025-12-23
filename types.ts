
export interface CompetitorStats {
  name: string;
  id: string;
  thumbnail: string;
  subscriberCount: number;
  totalViews: number;
  videoCount: number;
  avgViewsPerVideo: number;
  uploadFrequencyScore: string; // Heuristic based on video count / age
}

export interface NicheData {
  name: string;
  category: string;
  avgCPM: number;
  cpmAnalysis: {
    predictedRange: string;
    factors: string[];
    topPayingRegion: string;
  };
  saturationScore: number; // 0-100
  opportunityScore: number; // 0-100
  growthPotential: number; // percentage
  topKeywords: string[];
  competitors: string[]; // Competitor names from AI
  audienceDemographics: {
    ageRange: string;
    topRegions: string[];
  };
  analysis: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  endpoints: string[];
  status: 'todo' | 'in-progress' | 'completed';
}

export interface ArchitectureItem {
  layer: string;
  technology: string;
  details: string;
}

export interface AlgorithmInput {
  viewsCurrent: number;
  views30DaysAgo: number;
  engagementRate: number; // percentage
  nicheCompetitors: number;
  avgCPM: number;
}

export interface AlgorithmOutput {
  competitionScore: number;
  growthPotential: number;
  estimatedRevenue: number;
  nicheSuccessIndex: number;
}
