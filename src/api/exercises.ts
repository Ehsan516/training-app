import type { Exercise } from "../types/training";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export async function listExercises(): Promise<Exercise[]> {
  const res = await fetch(`${API_BASE}/exercises`);
  if (!res.ok) throw new Error(`Failed to load exercises: ${res.status}`);
  //backend returns id, name, category, tags, iscustom
  return res.json();
}

export async function createExercise(
  name: string,
  tags: string[],
  category = "strength"
): Promise<Exercise> {
  const res = await fetch(`${API_BASE}/exercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, tags, category }),
  });
  if (!res.ok) throw new Error(`Failed to create exercise: ${res.status}`);
  return res.json();
}