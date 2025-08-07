const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

export async function scrapePBS(search_terms = ['interview', 'speech', 'testimony'], max_videos = 3) {
  const res = await fetch(`${API_BASE}/metadata/scrape/pbs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search_terms, max_videos }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function scrapeVoxCeleb(max_videos = 3) {
  const res = await fetch(`${API_BASE}/metadata/scrape/voxceleb`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ max_videos }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function scrapeYouTube(channel_url, search_terms = [], max_videos = 3) {
  const res = await fetch(`${API_BASE}/metadata/scrape/youtube`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ channel_url, search_terms, max_videos }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function scrapeFull(pbs_terms = ['interview', 'speech', 'testimony'], max_videos_per_source = 2) {
  const res = await fetch(`${API_BASE}/metadata/scrape/full`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pbs_terms, max_videos_per_source }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}