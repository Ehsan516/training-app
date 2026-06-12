import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { loginApi } from "../api/auth";
import type { LoginResponse } from "../types/auth";

type AuthState = {
  user: LoginResponse["user"] | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) { //gonna pass app
  const [user, setUser] = useState<AuthState["user"]>(null);//setting user and token
  const [accessToken, setToken] = useState<string | null>(null);
  //^holds user and jwt string, null otherwise

  async function login(email: string, password: string) {//parse user data when logged in
    const res = await loginApi({ email, password });//makres request
    setUser(res.user);
    setToken(res.accessToken);
    //(temp) persist so refresh survives page reloads(react states and local storage)
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("user", JSON.stringify(res.user));
  }

  function logout() {//clears user and token state to null after logout
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedTok = localStorage.getItem("accessToken")
      //chekcs local storage for user and jwt for refresh
      if (savedUser && savedTok) {
        setUser(JSON.parse(savedUser));
        setToken(savedTok);
      }
    } catch {
      //ignore parse errors
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() { //had to disable line for the linter, otherwise wouldn't use hook
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
