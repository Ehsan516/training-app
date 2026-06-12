import { useEffect, useState } from "react";
import type { Session } from "../types/training";
import { listSessions, createSession, addSet } from "../api/sessions";
import ExercisePicker from "../components/ExercisePicker";
import { listExercises } from "../api/exercises";
import type { Exercise } from "../types/training";

export default function Dashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);//all sessions from memory

  const [date, setDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 16) // yyyy mm dd format
  );
  const [notes, setNotes] = useState("");

  // For adding a set to matching session ID
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [exerciseId, setExerciseId] = useState(""); //selected exerciseID
  const [reps, setReps] = useState<number | "">(""); //empty for optional
  const [weightKg, setWeightKg] = useState<number | "">("");
  const [rpe, setRpe] = useState<number | "">("");
  const[exerciseMap, setExerciseMap] = useState<Record<string, Exercise>>({});//lookup map


  useEffect(() => {
    listSessions().then(setSessions).catch(console.error);//pushes listed sessions so ui renders list
    listExercises().then(list=>{
      const map = Object.fromEntries(list.map(e=>[e.id, e]));
      setExerciseMap(map);
    });
  }, []);//empty array so runs once

  async function onCreateSession(e: React.FormEvent) {
    e.preventDefault();//browser doesn't reload page
    const s = await createSession(new Date(date).toISOString(), notes || undefined); //session created and coinverted to iso string
    setSessions(prev => [s, ...prev]);//add new sessiokln the list by latest
    setNotes("");
  }

  async function saveSet(sessionId: string) {
    if (!exerciseId) return alert("pick an exercise first"); //user needs to select one
    await addSet(sessionId, { //sets of exercise are optional

      exerciseId,
      reps: reps === "" ? undefined : reps,
      weightKg: weightKg === "" ? undefined : weightKg,
      rpe: rpe === "" ? undefined : rpe,

    });
    setSessions(await listSessions());//new set appears after refresh
    // reset form
    setAddingTo(null);
    setExerciseId("");
    setReps("");
    setWeightKg("");
    setRpe("");
  }

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
      <h1>Sessions (Strength)</h1>

      {/* Create new session */}
      <form
        onSubmit={onCreateSession}
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)} // datetime here
        />
        <input
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">Create session</button>
      </form>

      {/* List sessions */}
      {sessions.length === 0 && <p>No sessions yet.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {sessions.map((s) => (
          <li key={s.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>{/* white border padding*/}
            <strong>{new Date(s.date).toLocaleString()}</strong>
            {s.notes && <p>{s.notes}</p>}

            <button onClick={() => setAddingTo(s.id)}>+ Add Set</button>

            {/* Inline Add Set form */}
            {addingTo === s.id && (
              <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                <ExercisePicker value={exerciseId} onChange={setExerciseId} />
                <input
                  type="number"
                  placeholder="Reps"
                  value={reps}
                  onChange={(e) => setReps(e.target.value === "" ? "" : Number(e.target.value))}
                  style={{ width: 60 }}
                />
                <input
                  type="number"
                  placeholder="Kg"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value === "" ? "" : Number(e.target.value))}
                  style={{ width: 70 }}
                />
                <input
                  type="number"
                  placeholder="RPE"
                  value={rpe}
                  onChange={(e) => setRpe(e.target.value === "" ? "" : Number(e.target.value))}
                  style={{ width: 60 }}
                />
                {/* save and cancel buttons */}
                <button type="button" onClick={() => saveSet(s.id)}>Save</button>
                <button type="button" onClick={() => setAddingTo(null)}>Cancel</button>
              </div>
            )}

            {/*renders existing sets if any */}
            {s.sets.length > 0 && (
              <table style={{ marginTop: 8, width: "100%" }}>
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Kg</th>
                    <th>RPE</th>
                  </tr>
                </thead>
                <tbody>
                  {s.sets.map((set) => (
                    <tr key={set.id}>
                      <td>{exerciseMap[set.exerciseId]?.name ?? set.exerciseId}</td>
                      <td>{set.reps ?? "-"}</td>
                      <td>{set.weightKg ?? "-"}</td>
                      <td>{set.rpe ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
