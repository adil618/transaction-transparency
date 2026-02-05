"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { setAccessToken } from "@/lib/auth";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "NGO" | "DONOR";
  status?: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: Record<string, any>) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    const data = await apiFetch<{ user: User }>("/api/auth/me");
    setUser(data.user);
  };

  const refresh = async () => {
    const data = await apiFetch<{ accessToken: string }>("/api/auth/refresh", {
      method: "POST",
    });
    setAccessToken(data.accessToken);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await fetchMe();
      } catch (err) {
        try {
          await refresh();
          await fetchMe();
        } catch (err2) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiFetch<{ accessToken: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setAccessToken(data.accessToken);
    await fetchMe();
  };

  const register = async (payload: Record<string, any>) => {
    const data = await apiFetch<{ accessToken: string }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setAccessToken(data.accessToken);
    await fetchMe();
  };

  const logout = async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    setAccessToken(undefined);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refresh }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
