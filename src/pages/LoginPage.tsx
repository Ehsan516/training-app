// src/pages/LoginPage.tsx
import { useState } from "react";
import type { FormEvent} from "react";//seperated it for no checkin error
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    try {
      setLoading(true);
      await login(email, password);
      nav("/sessions");
    } catch (err: unknown) {
      if(err instanceof Error){
      setError(err.message);
    } else {
      setError("Login failed");
    }
  }}

  return (
    <div style={{ maxWidth: 420, margin: "3rem auto", padding: "1rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Sign in</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.6rem", marginTop: 4 }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.6rem", marginTop: 4 }}
          />
        </label>

        {error && <div style={{ color: "crimson" }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ padding: "0.6rem 1rem" }}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p style={{ marginTop: 12, fontSize: 14, opacity: 0.8 }}>
        Ehsan: mocks is on sp any email works. <code>fail@test.com</code> to see error.
      </p>
    </div>
  );
}
