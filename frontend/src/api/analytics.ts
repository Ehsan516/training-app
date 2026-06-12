const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export type PrItem = {
  exerciseId: string;
  exerciseName: string;
  topSingleKg: number | null;
  bestEst1rmKg: number | null;
};

export type WeeklyVolumeItem = {
  weekStart: string;//"YYYY-MM-DD"
  totalVolumeKg: number;
};

export type RecentSessionItem = {
  sessionId: string;
  startedAt: string;//ISO string
  setsCount: number;
  repsCount: number;
  volumeKg: number;
};

export async function fetchPrs(): Promise<PrItem[]> {
  const r = await fetch(`${API_BASE}/analytics/prs`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function fetchWeeklyVolume(weeks = 12): Promise<WeeklyVolumeItem[]> {
  const r = await fetch(`${API_BASE}/analytics/volume/weekly?weeks=${weeks}`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function fetchRecentSessions(limit = 5): Promise<RecentSessionItem[]> {
  const r = await fetch(`${API_BASE}/analytics/recent-sessions?limit=${limit}`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
