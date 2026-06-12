import type { Session, SetEntry } from "../types/training";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

/**note to other github devs, what backend response should look like once the /sessions API is connected
 * GET /sessions — backend returns:
 * [
 *   {
 *     "session": { "id": "...", "startedAt": "2025-09-19T12:34:56Z", "notes": "..." },
 *     "sets": [
 *        {"id":"...","exerciseId":"...","reps":5,"weightKg":100.0,"rpe":7.5,"notes":null}
 *     ]
 *   },
 * ]
 * sould map to frontend session { id, date, notes, sets }
 */
export async function listSessions(): Promise<Session[]> {
  const res = await fetch(`${API_BASE}/sessions`);
  if (!res.ok) throw new Error(`Failed to load sessions: ${res.status}`);
  const data: Array<{
    session: { id: string; startedAt: string; notes?: string | null };
    sets: Array<{
      id: string;
      exerciseId: string;
      reps: number | null;
      weightKg: number | null;
      rpe: number | null;
      notes?: string | null;
    }>;
  }> = await res.json();

  return data.map(item => ({
    id: item.session.id,
    date: item.session.startedAt, //ui expects ISO string
    notes: item.session.notes ?? undefined,
    sets: item.sets.map(s => ({
      id: s.id,
      exerciseId: s.exerciseId,
      reps: s.reps ?? undefined,
      weightKg: s.weightKg ?? undefined,
      rpe: s.rpe ?? undefined,
      notes: s.notes ?? undefined,
    })),
  }));
}

/**POST /sessions*/
export async function createSession(dateISO: string, notes?: string): Promise<Session> {
  const res = await fetch(`${API_BASE}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ startedAt: dateISO, notes }),
  });
  if (!res.ok) throw new Error(`Failed to create session: ${res.status}`);
  const s: { id: string; startedAt: string; notes?: string | null } = await res.json();
  return { id: s.id, date: s.startedAt, notes: s.notes ?? undefined, sets: [] };
}

/**POST /sessions/{id}/sets*/
export async function addSet(
  sessionId: string,
  payload: Omit<SetEntry, "id">
): Promise<SetEntry> {
  const res = await fetch(`${API_BASE}/sessions/${sessionId}/sets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to add set: ${res.status}`);
  return res.json();
}
