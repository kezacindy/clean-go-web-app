"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bell, Clock, MapPin } from "lucide-react"

type Priority = "low" | "medium" | "high"

type AlertItem = {
  id: string
  title: string
  description: string
  area: string
  sent: string
  priority: Priority
}

const priorityStyles: Record<Priority, string> = {
  low: "bg-blue-900/30 text-blue-200",
  medium: "bg-amber-900/30 text-amber-200",
  high: "bg-red-900/30 text-red-200",
}

export default function AlertManagement() {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: "AL-001",
      title: "Holiday Schedule Change",
      description: "Pickup schedules adjusted for Christmas holiday",
      area: "All Districts",
      sent: "08/12/2025, 12:00:00",
      priority: "medium",
    },
    {
      id: "AL-002",
      title: "Weather Alert",
      description: "Heavy rains expected. Possible delays in Central District",
      area: "Central District",
      sent: "09/12/2025, 09:30:00",
      priority: "high",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    area: "All Districts",
    priority: "medium" as Priority,
  })

  const totalAlerts = alerts.length

  const publishAlert = () => {
    if (!form.title.trim() || !form.description.trim()) return
    const newAlert: AlertItem = {
      id: `AL-${(alerts.length + 1).toString().padStart(3, "0")}`,
      title: form.title,
      description: form.description,
      area: form.area,
      sent: new Date().toLocaleString("en-GB"),
      priority: form.priority,
    }
    setAlerts([newAlert, ...alerts])
    setForm({ title: "", description: "", area: "All Districts", priority: "medium" })
    setShowModal(false)
  }

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-3xl bg-secondary/80 border-border/30 rounded-2xl p-6 space-y-4">
        <div className="space-y-1">
          <p className="text-lg font-semibold text-white">Create New Alert</p>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Alert Title</p>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter alert title"
              className="w-full px-3 py-2 rounded-lg bg-background/40 border border-border/30 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Description</p>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter alert description"
              className="w-full h-28 px-3 py-2 rounded-lg bg-background/40 border border-border/30 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Target Area</p>
            <select
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
              <option className="bg-secondary" value="All Districts">
                All Districts
              </option>
              <option className="bg-secondary" value="Central District">
                Central District
              </option>
              <option className="bg-secondary" value="East District">
                East District
              </option>
              <option className="bg-secondary" value="West District">
                West District
              </option>
            </select>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Urgency Level</p>
            <div className="grid grid-cols-3 gap-2">
              {(["low", "medium", "high"] as Priority[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setForm({ ...form, priority: level })}
                  className={`px-3 py-3 rounded-lg border text-sm font-medium ${
                    form.priority === level
                      ? "bg-primary text-background border-primary"
                      : "bg-background/40 border-border/30 text-white hover:bg-background/60"
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs text-blue-200 bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2">
            This alert will be pushed to all citizen mobile apps in the selected area
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => setShowModal(false)}
            className="flex-1 h-10 rounded-xl bg-background/40 border-border/30 text-white"
          >
            Cancel
          </Button>
          <Button onClick={publishAlert} className="flex-1 h-10 rounded-xl bg-primary hover:bg-accent text-background">
            Publish Alert
          </Button>
        </div>
      </Card>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-white">Global Alert System</h1>
          <p className="text-sm text-muted-foreground">Send notifications to citizens in the mobile app</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="gap-2 bg-primary hover:bg-accent text-background px-4 h-11 rounded-xl"
        >
          <Bell className="w-4 h-4" />
          Create Alert
        </Button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="p-5 bg-secondary/40 border-border/30 rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  alert.priority === "high" ? "bg-red-900/30" : alert.priority === "medium" ? "bg-amber-900/30" : "bg-blue-900/30"
                }`}
              >
                <AlertTriangle
                  className={`w-6 h-6 ${
                    alert.priority === "high" ? "text-red-300" : alert.priority === "medium" ? "text-amber-300" : "text-blue-300"
                  }`}
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-start gap-2">
                  <p className="text-base font-semibold text-white">{alert.title}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityStyles[alert.priority]}`}>
                    {alert.priority} priority
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Area: {alert.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Sent: {alert.sent}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showModal && modal}
    </div>
  )
}
