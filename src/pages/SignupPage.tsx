
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const { login } = useAuth(); 
  //for now it's fake signupm, later backend will have /auth/signup hopefully
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      //simulate signup by just logging in
      await login(email, password);
      nav("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "3rem auto", padding: "1rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Sign up</h1>
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
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.6rem", marginTop: 4 }}
          />
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={confirm}
            autoComplete="new-password"
            onChange={(e) => setConfirm(e.target.value)}
            required
            style={{ width: "100%", padding: "0.6rem", marginTop: 4 }}
          />
        </label>

        {error && <div style={{ color: "crimson" }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ padding: "0.6rem 1rem" }}>
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>

      <p style={{ marginTop: 12, fontSize: 14, opacity: 0.8 }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
