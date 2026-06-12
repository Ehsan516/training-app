import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import LogSessionPage from "./pages/LogSessionPage";
import HistoryPage from "./pages/HistoryPage";
import ProgressPage from "./pages/ProgressPage";
import LibraryPage from "./pages/LibraryPage";
import { useAuth } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import "./App.css";

export default function App() {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "rounded-lg px-3 py-2 text-sm font-medium transition",
      isActive
        ? "bg-slate-800 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white",
    ].join(" ");

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <nav className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 px-4 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            {!user && (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>

                <NavLink to="/signup" className={navLinkClass}>
                  Signup
                </NavLink>
              </>
            )}

            {user && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>

                <NavLink to="/log" className={navLinkClass}>
                  Log
                </NavLink>

                <NavLink to="/sessions" className={navLinkClass}>
                  History
                </NavLink>

                <NavLink to="/progress" className={navLinkClass}>
                  Progress
                </NavLink>

                <NavLink to="/library" className={navLinkClass}>
                  Library
                </NavLink>
              </>
            )}

            <div className="ml-auto flex shrink-0 items-center gap-3">
              {user ? (
                <>
                  <span className="hidden text-sm text-slate-300 sm:inline">
                    Hi, {user.email}
                  </span>

                  <button
                    onClick={logout}
                    className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <span className="text-sm text-slate-400">Not signed in</span>
              )}
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-6xl px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
                  <p className="text-sm font-medium text-slate-400">
                    Training logger
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
                    Welcome to EA&apos;s training logger
                  </h1>

                  <p className="mt-3 max-w-2xl text-slate-300">
                    Log strength, BJJ, wrestling, and conditioning sessions
                    without turning training into admin.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {user ? (
                      <NavLink
                        to="/log"
                        className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
                      >
                        Log training
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/login"
                        className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
                      >
                        Log in to start
                      </NavLink>
                    )}

                    {!user && (
                      <NavLink
                        to="/signup"
                        className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
                      >
                        Create account
                      </NavLink>
                    )}
                  </div>
                </section>
              }
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/log"
              element={
                <RequireAuth>
                  <LogSessionPage />
                </RequireAuth>
              }
            />

            <Route
              path="/sessions"
              element={
                <RequireAuth>
                  <HistoryPage />
                </RequireAuth>
              }
            />

            <Route
              path="/progress"
              element={
                <RequireAuth>
                  <ProgressPage />
                </RequireAuth>
              }
            />

            <Route
              path="/library"
              element={
                <RequireAuth>
                  <LibraryPage />
                </RequireAuth>
              }
            />

            <Route path="/analytics" element={<Navigate to="/progress" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}