import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import { useAuth } from "./context/AuthContext";//import hook
import RequireAuth from "./components/RequireAuth";
import "./App.css";

export default function App() {
  const { user, logout } = useAuth();//grab auth state + logout

  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        <Link to="/">Home</Link>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/analytics">Analytics</Link>

        <div style={{ marginLeft: "auto" }}>
          {user ? (
            <>
              <span style={{ marginRight: "1rem" }}>
                Hi, {user.email} :333
              </span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <span style={{ fontSize: "0.9rem", opacity: 0.7 }}>
              Not signed in
            </span>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to EA&apos;s training logger</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route
        path="/dashboard"
        element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/analytics" element={<RequireAuth><Analytics /></RequireAuth>} />
      </Routes>
    </Router>
  );
}
