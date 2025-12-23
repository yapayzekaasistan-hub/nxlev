
const YOUTUBE_API_KEY = 'AIzaSyAw6IV0klDx9hZRXP1MSMGFtwuYoDY54JQ';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

import { CompetitorStats } from '../types';

export interface YouTubeNicheResult {
  title: string;
  views: number;
  subscribers: number;
  viewSubRatio: number;
  channelName: string;
  thumbnail: string;
  publishedAt: string;
  videoId: string;
}

export const searchYouTubeNiche = async (query: string, maxResults: number = 10): Promise<YouTubeNicheResult[]> => {
  try {
    const searchRes = await fetch(`${BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(query)}&type=video&relevanceLanguage=en&key=${YOUTUBE_API_KEY}`);
    const searchData = await searchRes.json();

    if (searchData.error) throw new Error(searchData.error.message);

    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    const channelIds = Array.from(new Set(searchData.items.map((item: any) => item.snippet.channelId))).join(',');

    const videoStatsRes = await fetch(`${BASE_URL}/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`);
    const videoStatsData = await videoStatsRes.json();

    const channelStatsRes = await fetch(`${BASE_URL}/channels?part=statistics&id=${channelIds}&key=${YOUTUBE_API_KEY}`);
    const channelStatsData = await channelStatsRes.json();

    const channelMap = new Map();
    channelStatsData.items.forEach((item: any) => {
      channelMap.set(item.id, parseInt(item.statistics.subscriberCount || '1'));
    });

    const videoStatMap = new Map();
    videoStatsData.items.forEach((item: any) => {
      videoStatMap.set(item.id, parseInt(item.statistics.viewCount || '0'));
    });

    return searchData.items.map((item: any) => {
      const videoId = item.id.videoId;
      const channelId = item.snippet.channelId;
      const views = videoStatMap.get(videoId) || 0;
      const subs = channelMap.get(channelId) || 1;
      
      return {
        title: item.snippet.title,
        views,
        subscribers: subs,
        viewSubRatio: parseFloat((views / subs).toFixed(2)),
        channelName: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        videoId
      };
    });
  } catch (error) {
    console.error("YouTube API Error:", error);
    throw error;
  }
};

export const fetchCompetitorDetails = async (niche: string): Promise<CompetitorStats[]> => {
  try {
    // 1. Find top channels for this niche
    const searchRes = await fetch(`${BASE_URL}/search?part=snippet&maxResults=5&q=${encodeURIComponent(niche)}&type=channel&key=${YOUTUBE_API_KEY}`);
    const searchData = await searchRes.json();
    
    if (searchData.error) throw new Error(searchData.error.message);
    
    const channelIds = searchData.items.map((item: any) => item.id.channelId).join(',');
    
    // 2. Fetch statistics for these channels
    const statsRes = await fetch(`${BASE_URL}/channels?part=statistics,snippet&id=${channelIds}&key=${YOUTUBE_API_KEY}`);
    const statsData = await statsRes.json();
    
    return statsData.items.map((item: any) => {
      const subs = parseInt(item.statistics.subscriberCount || '0');
      const views = parseInt(item.statistics.viewCount || '0');
      const videos = parseInt(item.statistics.videoCount || '0');
      
      return {
        name: item.snippet.title,
        id: item.id,
        thumbnail: item.snippet.thumbnails.default.url,
        subscriberCount: subs,
        totalViews: views,
        videoCount: videos,
        avgViewsPerVideo: videos > 0 ? Math.floor(views / videos) : 0,
        uploadFrequencyScore: videos > 100 ? 'High' : videos > 50 ? 'Medium' : 'Low'
      };
    });
  } catch (error) {
    console.error("Competitor API Error:", error);
    return [];
  }
};
