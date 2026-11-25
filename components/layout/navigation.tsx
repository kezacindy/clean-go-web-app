"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Building2,
  Calendar,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Settings,
  Trash2,
  Truck,
  Users,
  X,
} from "lucide-react"
import { useState } from "react"

type ActivePage =
  | "dashboard"
  | "dispatch"
  | "workers"
  | "schedule"
  | "payments"
  | "buildings"
  | "customers"
  | "issues"
  | "alerts"
  | "agent"
  | "buildings-paid-unpaid"
  | "agent-issues"
  | "agent-map"
  | "agent-profile"
  | "settings"

interface NavigationProps {
  role: "super_admin" | "field_agent"
  activePage: ActivePage
  onNavigate: (page: ActivePage) => void
}

export default function Navigation({ role, activePage, onNavigate }: NavigationProps) {
  const { user, onLogout } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "dispatch", label: "Trucks & Dispatch", icon: Truck },
    { id: "workers", label: "Workers", icon: Users },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "buildings", label: "Buildings", icon: Building2 },
    { id: "issues", label: "Issues", icon: AlertTriangle },
    { id: "alerts", label: "Alerts", icon: Megaphone },
    { id: "agent-issues", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const agentMenuItems = [
    { id: "agent", label: "Dashboard", icon: LayoutDashboard },
    { id: "buildings-paid-unpaid", label: "My Buildings", icon: Building2 },
    // { id: "agent-map", label: "Live Map", icon: MapPin }, // Removed due to missing import or undefined icon
    { id: "agent-issues", label: "Report Issue", icon: AlertCircle },
    { id: "agent-profile", label: "My Profile", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const menuItems = role === "super_admin" ? adminMenuItems : agentMenuItems

  return (
    <>
      <nav className="hidden md:flex flex-col w-72 bg-background border-r border-border/40 px-5 py-6 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Trash2 className="w-6 h-6 text-background" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white leading-tight">CleanGo</h2>
            <p className="text-xs text-muted-foreground">
              {role === "super_admin" ? "Admin Panel" : "Agent Portal"}
            </p>
          </div>
        </div>

        <div className="border-b border-border/40 -mx-5 px-5" />

        <div className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ActivePage)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm transition-colors ${
                  activePage === item.id
                    ? "bg-primary text-background shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:bg-secondary/40"
                }`}
              >
                <Icon className={`w-5 h-5 ${activePage === item.id ? "text-background" : "text-muted-foreground"}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>

        <div className="pt-4 border-t border-border/40 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="leading-tight">
              <p className="text-base font-semibold text-white">{user?.name || "Super Admin"}</p>
              <p className="text-sm text-muted-foreground">{user?.role === "field_agent" ? "Agent" : "admin"}</p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full justify-center gap-2 rounded-2xl bg-secondary/40 border-border/40 text-white hover:bg-secondary/60"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </nav>

      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-secondary rounded-lg text-white"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileOpen(false)}>
          <nav className="absolute left-0 top-0 h-full w-48 bg-secondary p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id as ActivePage)
                    setIsMobileOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    activePage === item.id ? "bg-primary text-background" : "text-white hover:bg-secondary/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
