// YouTube Data API v3 service
const YT_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE = 'https://www.googleapis.com/youtube/v3';

/**
 * Search for travel vlogs about a destination
 */
export async function searchTravelVlogs(destination, maxResults = 4) {
  const query = encodeURIComponent(`${destination} travel vlog budget India`);
  const url = `${BASE}/search?part=snippet&q=${query}&type=video&maxResults=${maxResults}&videoDuration=medium&relevanceLanguage=en&key=${YT_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube search failed: ${res.status}`);
  const data = await res.json();

  if (!data.items?.length) return [];

  // Get video stats (views, duration)
  const ids = data.items.map((item) => item.id.videoId).join(',');
  const statsUrl = `${BASE}/videos?part=statistics,contentDetails&id=${ids}&key=${YT_API_KEY}`;
  const statsRes = await fetch(statsUrl);
  const statsData = await statsRes.json();

  const statsMap = {};
  statsData.items?.forEach((v) => {
    statsMap[v.id] = {
      views: formatViews(v.statistics?.viewCount),
      duration: formatDuration(v.contentDetails?.duration),
    };
  });

  return data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    views: statsMap[item.id.videoId]?.views || 'N/A',
    duration: statsMap[item.id.videoId]?.duration || '--:--',
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  }));
}

function formatViews(count) {
  if (!count) return 'N/A';
  const n = parseInt(count);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function formatDuration(iso) {
  if (!iso) return '--:--';
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '--:--';
  const h = parseInt(match[1] || 0);
  const m = parseInt(match[2] || 0);
  const s = parseInt(match[3] || 0);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}
