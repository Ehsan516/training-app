import { useEffect, useState } from "react";
import { fetchPrs, fetchWeeklyVolume, fetchRecentSessions} from "../api/analytics";
import type { PrItem, WeeklyVolumeItem, RecentSessionItem } from "../api/analytics";

export default function AnalyticsPage() {
  const [prs, setPrs] = useState<PrItem[]>([]);
  const [volume, setVolume] = useState<WeeklyVolumeItem[]>([]);
  const [recent, setRecent] = useState<RecentSessionItem[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [p, v, r] = await Promise.all([
          fetchPrs(),
          fetchWeeklyVolume(12),
          fetchRecentSessions(5),
        ]);
        setPrs(p);
        setVolume(v);
        setRecent(r);
      } catch (e: unknown) {
        if(e instanceof Error){
            setErr(e.message);
        }else{
        setErr("Failed to load analytics");
      }
    }
    })();
  }, []);

  return (
    <div style={{padding: 16, display: "grid", gap: 24}}>
      <h1>Analytics</h1>
      {err && <div style={{color:"crimson"}}>{err}</div>}

      <section>
        <h2>PRs per Exercise</h2>
        <table>
          <thead><tr><th>Exercise</th><th>Top Single (kg)</th><th>Best est. 1RM (kg)</th></tr></thead>
          <tbody>
            {prs.map(x => (
              <tr key={x.exerciseId}>
                <td>{x.exerciseName}</td>
                <td>{x.topSingleKg ?? "—"}</td>
                <td>{x.bestEst1rmKg ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Weekly Volume (last 12 weeks)</h2>
        <ul>
          {volume.map(v => (
            <li key={v.weekStart}>
              {v.weekStart}: {v.totalVolumeKg} kg
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Recent Sessions</h2>
        <ul>
          {recent.map(s => (
            <li key={s.sessionId}>
              {new Date(s.startedAt).toLocaleString()} — Sets: {s.setsCount}, Reps: {s.repsCount}, Volume: {s.volumeKg} kg
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
