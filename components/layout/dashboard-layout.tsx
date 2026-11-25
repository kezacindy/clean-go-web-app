"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import AdminDashboard from "@/components/pages/admin-dashboard"
import AdminAnalyticsPage from "@/components/pages/admin-analytics"
import TruckDispatch from "@/components/pages/truck-dispatch"
import WorkerManagement from "@/components/pages/worker-management"
import ScheduleManagement from "@/components/pages/schedule-management"
import PaymentManagement from "@/components/pages/payment-management"
import BuildingManagement from "@/components/pages/building-management"
import CustomerManagement from "@/components/pages/customer-management"
import IssueManagement from "@/components/pages/issue-management"
import AlertManagement from "@/components/pages/alert-management"
import AgentDashboard from "@/components/pages/agent-dashboard"
import AgentBuildingsPaidUnpaid from "@/components/pages/agent-buildings-paid-unpaid"
import AgentMap from "@/components/pages/agent-map"
import AgentIssueReporting from "@/components/pages/agent-issue-reporting"
import AgentProfile from "@/components/pages/agent-profile"
import Settings from "@/components/pages/settings"
import AgentSettings from "@/components/pages/agent-settings"

type ActivePage =
  | "dashboard"
  | "analytics"
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

export default function DashboardLayout({ role }: { role: "super_admin" | "field_agent" }) {
  const [activePage, setActivePage] = useState<ActivePage>(role === "super_admin" ? "dashboard" : "agent")

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <AdminDashboard onNavigate={setActivePage} />
      case "analytics":
        return <AdminAnalyticsPage />
      case "dispatch":
        return <TruckDispatch />
      case "workers":
        return <WorkerManagement />
      case "schedule":
        return <ScheduleManagement />
      case "payments":
        return <PaymentManagement />
      case "buildings":
        return <BuildingManagement />
      case "customers":
        return <CustomerManagement />
      case "issues":
        return <IssueManagement />
      case "alerts":
        return <AlertManagement />
      case "agent":
        return <AgentDashboard />
      case "buildings-paid-unpaid":
        return <AgentBuildingsPaidUnpaid />
      case "agent-map":
        return <AgentMap />
      case "agent-issues":
        return <AgentIssueReporting />
      case "agent-profile":
        return <AgentProfile />
      case "settings":
        return role === "field_agent" ? <AgentSettings /> : <Settings />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Navigation role={role} activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-auto">{renderPage()}</main>
    </div>
  )
}
