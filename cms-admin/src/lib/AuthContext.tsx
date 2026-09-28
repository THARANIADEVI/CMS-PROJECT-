import { createContext, useContext, useState, type ReactNode } from "react";
import { login as apiLogin, logout as apiLogout, isAuthenticated } from "./api";

interface AuthContextType {
  authed: boolean;
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(isAuthenticated());

  async function login(u: string, p: string) {
    await apiLogin(u, p);
    setAuthed(true);
  }

  function logout() {
    apiLogout();
    setAuthed(false);
  }

  return (
    <AuthContext.Provider value={{ authed, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
