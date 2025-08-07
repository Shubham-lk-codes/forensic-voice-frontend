const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

export async function fetchRecordings(params = {}) {
  const url = new URL(`${API_BASE}/audio/recordings`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchRecordingStats() {
  const res = await fetch(`${API_BASE}/audio/recordings/stats`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function uploadRecording(formData) {
  const res = await fetch(`${API_BASE}/audio/recordings`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function compareRecordings(recording1_id, recording2_id) {
  const res = await fetch(`${API_BASE}/audio/recordings/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recording1_id, recording2_id }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchTimeGapAnalysis(speaker_id) {
  const url = new URL(`${API_BASE}/audio/recordings/analysis`);
  if (speaker_id) url.searchParams.append('speaker_id', speaker_id);
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}