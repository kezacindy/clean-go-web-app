"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Lock, Mail, ShieldCheck, Trash2 } from "lucide-react"

export default function LoginPage({ onLogin }: { onLogin: (email: string, password: string) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    onLogin(email, password)
    if (!error) {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-background/95 px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 border border-primary/30 flex items-center justify-center shadow-xl shadow-primary/20 mb-2">
            <Trash2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">CleanGo Admin</h1>
            <p className="text-sm text-muted-foreground mt-2 font-medium">Waste Management System</p>
          </div>
        </div>

        <Card className="w-full p-6 bg-gradient-to-br from-card/50 to-card/30 border-border/40 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-white">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cleango.com"
                  className="w-full pl-11 pr-4 py-3 bg-background/40 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition-all hover:border-primary/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-white">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-background/40 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition-all hover:border-primary/40"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 p-3.5 bg-destructive/10 border border-destructive/30 rounded-xl backdrop-blur-sm">
                <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                <span className="text-sm text-destructive font-medium">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-background shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40"
            >
              Sign In to Dashboard
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/40">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm font-semibold text-white">Demo Credentials</p>
            </div>
            <div className="space-y-2.5">
              <div className="rounded-xl border border-border/40 bg-gradient-to-br from-background/40 to-background/20 px-4 py-3 hover:border-primary/40 transition-colors">
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">Super Admin</p>
                <p className="text-sm font-semibold text-white">admin@cleango.com / admin123</p>
              </div>
              <div className="rounded-xl border border-border/40 bg-gradient-to-br from-background/40 to-background/20 px-4 py-3 hover:border-primary/40 transition-colors">
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">Field Agent</p>
                <p className="text-sm font-semibold text-white">agent@cleango.com / agent123</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
