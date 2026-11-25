"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Navigation,
  Phone,
  MapPin,
  Truck,
  TrendingUp,
  Activity,
  X,
  Building2,
} from "lucide-react"

interface Task {
  id: string
  building: string
  address: string
  district: string
  sector: string
  status: "pending" | "in_progress" | "completed"
  collectionTime: string
  location: [number, number]
  contactPerson: string
  phone: string
  buildingType: string
  notes?: string
}

export default function AgentDashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "T-001",
      building: "Green Valley Apartments",
      address: "KG 5 Ave 12, Nyarugenge",
      district: "Kigali",
      sector: "Nyarugenge",
      status: "in_progress",
      collectionTime: "06:00 - 08:00",
      location: [-1.9444, 30.0606],
      contactPerson: "Jean Baptiste Uwimana",
      phone: "+250 788 123 001",
      buildingType: "Residential",
      notes: "Main entrance, ground floor",
    },
    {
      id: "T-002",
      building: "Safari Hotel Complex",
      address: "KN 3 Rd 45, City Center",
      district: "Kigali",
      sector: "Gasabo",
      status: "pending",
      collectionTime: "08:30 - 10:00",
      location: [-1.9500, 30.0600],
      contactPerson: "Marie Claire Mukamana",
      phone: "+250 788 123 002",
      buildingType: "Hotel",
      notes: "Service entrance, back parking",
    },
    {
      id: "T-003",
      building: "Mama Njeri Restaurant",
      address: "KG 7 Ave 78, Sonatubes",
      district: "Kigali",
      sector: "Kicukiro",
      status: "pending",
      collectionTime: "10:30 - 12:00",
      location: [-1.9550, 30.0800],
      contactPerson: "Paul Nkurunziza",
      phone: "+250 788 123 003",
      buildingType: "Restaurant",
      notes: "Kitchen area access",
    },
    {
      id: "T-004",
      building: "Tech Solutions Ltd",
      address: "KG 11 Ave 23, ICT Park",
      district: "Kigali",
      sector: "Kacyiru",
      status: "completed",
      collectionTime: "05:00 - 06:30",
      location: [-1.9300, 30.0700],
      contactPerson: "Grace Wanjiru",
      phone: "+250 788 123 004",
      buildingType: "Office",
    },
  ])

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [stats, setStats] = useState({
    todayCollections: 4,
    completed: 1,
    inProgress: 1,
    pending: 2,
    totalEarnings: 12500,
    efficiency: 87,
    distanceTraveled: 18.5,
  })

  const completeTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: "completed" as const } : t)))
    setStats({
      ...stats,
      completed: stats.completed + 1,
      inProgress: stats.inProgress - 1,
    })
  }

  const startTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: "in_progress" as const } : t)))
    setStats({
      ...stats,
      inProgress: stats.inProgress + 1,
      pending: stats.pending - 1,
    })
  }

  const statusChip: Record<Task["status"], string> = {
    completed: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    in_progress: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    pending: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  }

  const statusIcon: Record<Task["status"], typeof CheckCircle2> = {
    completed: CheckCircle2,
    in_progress: Clock,
    pending: AlertCircle,
  }

  const statusColor: Record<Task["status"], string> = {
    completed: "text-emerald-400",
    in_progress: "text-amber-400",
    pending: "text-blue-400",
  }

  return (
    <div className="p-4 space-y-4 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/25 flex items-center justify-center shadow-lg shadow-primary/20">
              <Truck className="w-5 h-5 text-primary" />
            </div>
      <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Agent Dashboard</h1>
              <p className="text-xs text-muted-foreground">
                Daily collection schedule and route tracking
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-medium text-emerald-300">On Duty</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Today's Collections</p>
              <p className="mt-1.5 text-2xl font-bold text-white">{stats.todayCollections}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Completed</p>
              <p className="mt-1.5 text-2xl font-bold text-emerald-300">{stats.completed}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">In Progress</p>
              <p className="mt-1.5 text-2xl font-bold text-amber-300">{stats.inProgress}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-300" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Pending</p>
              <p className="mt-1.5 text-2xl font-bold text-blue-300">{stats.pending}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-blue-300" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Daily Earnings</p>
              <p className="mt-1.5 text-2xl font-bold text-white">Rwf {stats.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-300" />
            </div>
          </div>
        </Card>
      </div>

      {/* Map and Metrics */}
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-white">Live Route Map</h2>
          </div>
          <div className="bg-gradient-to-br from-background/40 to-background/20 rounded-xl border border-border/40 h-64 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-5">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-border/20" />
              ))}
            </div>
            <div className="relative z-10 text-center px-4">
              <div className="flex gap-3 justify-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-emerald-300" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/30 to-amber-500/20 border border-amber-500/40 flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-amber-300" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-500/20 border border-blue-500/40 flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-blue-300" />
            </div>
            </div>
              <p className="text-sm font-semibold text-white mb-1">{tasks.length} Collection Points</p>
              <p className="text-xs text-muted-foreground">Real-time location tracking active</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { color: "bg-emerald-400", label: "Completed" },
              { color: "bg-amber-400", label: "In Progress" },
              { color: "bg-blue-400", label: "Pending" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-[10px] text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-white">Performance Metrics</h2>
          </div>
          <div className="space-y-3">
              <div>
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-muted-foreground font-medium">Efficiency</span>
                <span className="text-primary font-bold">{stats.efficiency}%</span>
                </div>
              <div className="w-full h-1.5 rounded-full bg-background/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80"
                  style={{ width: `${stats.efficiency}%` }}
                />
              </div>
              </div>
              <div>
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-muted-foreground font-medium">Progress</span>
                <span className="text-emerald-300 font-bold">
                  {stats.completed}/{stats.todayCollections}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-background/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  style={{ width: `${(stats.completed / stats.todayCollections) * 100}%` }}
                />
              </div>
            </div>
            <div className="pt-2 border-t border-border/40">
              <p className="text-[10px] text-muted-foreground font-medium mb-1">Distance Traveled</p>
              <p className="text-xl font-bold text-white">{stats.distanceTraveled} km</p>
              </div>
            </div>
          </Card>
      </div>

      {/* Collection Schedule */}
      <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-white">Today's Collection Schedule</h2>
        </div>
        <div className="space-y-2">
          {tasks.map((task) => {
            const StatusIcon = statusIcon[task.status]
            return (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task)}
                className="flex items-center gap-3 p-3 rounded-xl bg-background/40 border border-border/40 hover:border-primary/40 hover:bg-background/50 cursor-pointer transition-all group"
            >
                <div className={`w-8 h-8 rounded-lg bg-background/40 border border-border/40 flex items-center justify-center group-hover:scale-110 transition-transform ${statusColor[task.status]}`}>
                  <StatusIcon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white truncate">{task.building}</h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-background/40 text-muted-foreground capitalize">
                      {task.buildingType}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.collectionTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                      {task.sector}
                  </span>
                </div>
              </div>

                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold shrink-0 ${statusChip[task.status]}`}>
                  {task.status.replace("_", " ")}
              </span>

              {task.status === "pending" && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    startTask(task.id)
                  }}
                    className="h-7 px-3 rounded-lg bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 text-[10px] font-medium shrink-0"
                >
                  Start
                </Button>
              )}
              {task.status === "in_progress" && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    completeTask(task.id)
                  }}
                    className="h-7 px-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 text-[10px] font-medium shrink-0"
                >
                  Complete
                </Button>
              )}
            </div>
            )
          })}
        </div>
      </Card>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <Card className="w-full max-w-2xl bg-gradient-to-br from-secondary/90 to-secondary/70 border-border/40 rounded-2xl p-5 space-y-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl bg-background/40 border border-border/40 flex items-center justify-center ${statusColor[selectedTask.status]}`}>
                  {(() => {
                    const StatusIcon = statusIcon[selectedTask.status]
                    return <StatusIcon className="w-5 h-5" />
                  })()}
            </div>
            <div>
                  <p className="text-base font-semibold text-white">{selectedTask.building}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedTask.buildingType} • {selectedTask.district}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-background/50 hover:border-primary/40 transition-colors"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
                <p className="text-[10px] text-muted-foreground">Address</p>
                <p className="text-sm text-white font-medium">{selectedTask.address}</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {selectedTask.district} District • {selectedTask.sector} Sector
                </p>
              </div>
              <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
                <p className="text-[10px] text-muted-foreground">Collection Time</p>
                <p className="text-sm text-white font-medium">{selectedTask.collectionTime}</p>
              </div>
              <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
                <p className="text-[10px] text-muted-foreground">Contact Person</p>
                <p className="text-sm text-white font-medium">{selectedTask.contactPerson}</p>
            </div>
              <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
                <p className="text-[10px] text-muted-foreground">Phone Number</p>
                <a
                  href={`tel:${selectedTask.phone}`}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                {selectedTask.phone}
              </a>
            </div>
          </div>

            {selectedTask.notes && (
              <div className="p-3 rounded-xl bg-background/40 border border-border/40">
                <p className="text-[10px] text-muted-foreground mb-1">Notes</p>
                <p className="text-xs text-white">{selectedTask.notes}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                className="flex-1 h-9 rounded-xl bg-primary hover:bg-primary/90 text-background text-xs font-semibold"
                onClick={() => {
                  // Navigation action
                }}
              >
                <Navigation className="w-3.5 h-3.5 mr-1.5" />
              Start Navigation
            </Button>
              <Button
                variant="outline"
                className="flex-1 h-9 rounded-xl bg-background/40 border-border/40 text-white hover:bg-background/60 text-xs font-medium"
                onClick={() => {
                  window.location.href = `tel:${selectedTask.phone}`
                }}
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" />
              Call Contact
            </Button>
          </div>
        </Card>
        </div>
      )}
    </div>
  )
}
