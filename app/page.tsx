"use client"

import { useState } from "react"
import LoginPage from "@/components/pages/login-page"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { AuthProvider } from "@/lib/auth-context"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ id: string; name: string; role: "super_admin" | "field_agent" } | null>(null)

  const handleLogin = (email: string, password: string) => {
    // Mock authentication
    const normalizedEmail = email.trim().toLowerCase()
    const mockUsers: Record<
      string,
      { id: string; name: string; role: "super_admin" | "field_agent"; password: string }
    > = {
      "admin@cleango.com": { id: "1", name: "Admin User", role: "super_admin", password: "admin123" },
      "agent@cleango.com": { id: "2", name: "Field Agent", role: "field_agent", password: "agent123" },
    }

    const foundUser = mockUsers[normalizedEmail]
    if (foundUser && foundUser.password === password) {
      setUser(foundUser)
      setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <AuthProvider user={user} onLogout={handleLogout}>
      <DashboardLayout role={user?.role || "field_agent"} />
    </AuthProvider>
  )
}
