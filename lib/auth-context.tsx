"use client"

import type React from "react"

import { createContext, useContext } from "react"

type User = {
  id: string
  name: string
  role: "super_admin" | "field_agent"
}

type AuthContextType = {
  user: User | null
  onLogout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  user,
  onLogout,
  children,
}: { user: User | null; onLogout: () => void; children: React.ReactNode }) {
  return <AuthContext.Provider value={{ user, onLogout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
