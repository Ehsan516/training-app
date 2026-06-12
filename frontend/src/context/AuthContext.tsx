import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { loginApi, meApi, signupApi } from "../api/auth";
import type { LoginResponse } from "../types/auth";
import {
  clearAuthStorage,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
} from "../lib/tokenStore";

type AuthState = {
  user: LoginResponse["user"] | null;
  accessToken: string | null;
  loadingAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState["user"]>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  async function login(email: string, password: string) {
    const res = await loginApi({ email, password });

    setUser(res.user);
    setAccessToken(res.accessToken);

    setToken(res.accessToken);
    setStoredUser(res.user);
  }

  async function signup(email: string, password: string) {
    const res = await signupApi({ email, password });

    setUser(res.user);
    setAccessToken(res.accessToken);

    setToken(res.accessToken);
    setStoredUser(res.user);
  }

  function logout() {
    setUser(null);
    setAccessToken(null);
    clearAuthStorage();
  }

  useEffect(() => {
    async function loadAuth() {
      const savedToken = getToken();
      const savedUser = getStoredUser<LoginResponse["user"]>();

      if (!savedToken || !savedUser) {
        setLoadingAuth(false);
        return;
      }

      setAccessToken(savedToken);
      setUser(savedUser);

      try {
        const currentUser = await meApi();
        setUser(currentUser);
        setStoredUser(currentUser);
      } catch {
        logout();
      } finally {
        setLoadingAuth(false);
      }
    }

    loadAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loadingAuth, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
}