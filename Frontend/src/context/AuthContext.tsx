import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import api from "../lib/axios";

interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  googleId?: string;
  githubId?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current session user
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user || null);
    } catch (err) {
      console.error("❌ Error fetching user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

// Run once on mount
useEffect(() => {
  fetchUser();
}, []);

// Local signup
const signup = async (username: string, email: string, password: string) => {
  try {
    await api.post("/auth/signup", { username, email, password });
    await fetchUser();
  } catch (err: any) {
    console.error("❌ Signup error:", err);
    throw err;
  }
};

// Local login
const login = async (email: string, password: string) => {
  try {
    await api.post("/auth/login", { email, password });
    await fetchUser();
  } catch (err: any) {
    console.error("❌ Login error:", err);
    throw err;
  }
};

// Logout
const logout = async () => {
  try {
    await api.post("/auth/logout");
    setUser(null);
  } catch (err) {
    console.error("❌ Logout error:", err);
  }
};

return (
  <AuthContext.Provider value={{ user, loading, signup, login, logout, fetchUser }}>
    {children}
  </AuthContext.Provider>
);
}

// Custom hook
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}