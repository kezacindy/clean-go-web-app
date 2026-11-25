"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  CheckSquare,
  Clock,
  Edit,
  MapPin,
  Plus,
  Truck,
  Users,
  AlertCircle,
  TrendingUp,
  Activity,
  Filter,
  Search,
  Bell,
  CheckCircle2,
} from "lucide-react"

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"

type ScheduleRow = {
  id: string
  district: string
  sector: string
  days: ("Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun")[]
  startTime: string
  truck: string
  agent?: string
  estimatedDuration?: string
  status?: "active" | "pending" | "completed"
  lastUpdated?: string
  pickupCount?: number
}

type WeeklySlot = {
  day: Day
  pickups: {
    truck: string
    sector: string
    time: string
    agent?: string
    status?: "scheduled" | "in-progress" | "completed"
    estimatedDuration?: string
  }[]
}

const weeklyData: WeeklySlot[] = [
  {
    day: "Monday",
    pickups: [
      { truck: "TRK-001", sector: "Nyarugenge", time: "06:00", agent: "Sarah Achieng", status: "completed", estimatedDuration: "2h 15m" },
      { truck: "TRK-001", sector: "Kicukiro", time: "09:00", agent: "Sarah Achieng", status: "completed", estimatedDuration: "2h 30m" },
      { truck: "TRK-005", sector: "Musanze", time: "08:15", agent: "James Kariuki", status: "in-progress", estimatedDuration: "2h 20m" },
    ],
  },
  {
    day: "Tuesday",
    pickups: [
      { truck: "TRK-003", sector: "Gisenyi", time: "06:00", agent: "Grace Wanjiru", status: "completed", estimatedDuration: "2h 45m" },
      { truck: "TRK-004", sector: "Tumba", time: "06:30", agent: "Patricia Nafula", status: "completed", estimatedDuration: "2h 10m" },
      { truck: "TRK-007", sector: "Nyagatare", time: "11:00", agent: "Grace Wanjiru", status: "scheduled", estimatedDuration: "2h 30m" },
    ],
  },
  {
    day: "Wednesday",
    pickups: [
      { truck: "TRK-001", sector: "Kicukiro", time: "09:00", agent: "Sarah Achieng", status: "scheduled", estimatedDuration: "2h 30m" },
      { truck: "TRK-002", sector: "Muhoza", time: "07:00", agent: "David Musoke", status: "scheduled", estimatedDuration: "2h 15m" },
      { truck: "TRK-003", sector: "Rubavu", time: "08:00", agent: "Grace Wanjiru", status: "scheduled", estimatedDuration: "2h 20m" },
    ],
  },
  {
    day: "Thursday",
    pickups: [
      { truck: "TRK-001", sector: "Nyarugenge", time: "06:00", agent: "Sarah Achieng", status: "scheduled", estimatedDuration: "2h 15m" },
      { truck: "TRK-005", sector: "Musanze", time: "08:15", agent: "James Kariuki", status: "scheduled", estimatedDuration: "2h 20m" },
    ],
  },
  {
    day: "Friday",
    pickups: [
      { truck: "TRK-001", sector: "Kicukiro", time: "09:00", agent: "Sarah Achieng", status: "scheduled", estimatedDuration: "2h 30m" },
      { truck: "TRK-003", sector: "Gisenyi", time: "06:00", agent: "Grace Wanjiru", status: "scheduled", estimatedDuration: "2h 45m" },
      { truck: "TRK-004", sector: "Tumba", time: "06:30", agent: "Patricia Nafula", status: "scheduled", estimatedDuration: "2h 10m" },
      { truck: "TRK-006", sector: "Karongi", time: "10:00", agent: "Mary Njeri", status: "scheduled", estimatedDuration: "2h 25m" },
    ],
  },
  {
    day: "Saturday",
    pickups: [
      { truck: "TRK-002", sector: "Muhoza", time: "07:00", agent: "David Musoke", status: "scheduled", estimatedDuration: "2h 15m" },
      { truck: "TRK-007", sector: "Nyagatare", time: "11:00", agent: "Grace Wanjiru", status: "scheduled", estimatedDuration: "2h 30m" },
    ],
  },
  {
    day: "Sunday",
    pickups: [],
  },
]

const initialSchedules: ScheduleRow[] = [
  {
    id: "SCH-2025-001",
    district: "Kigali",
    sector: "Nyarugenge",
    days: ["Mon", "Thu"],
    startTime: "06:00",
    truck: "TRK-001",
    agent: "Sarah Achieng",
    estimatedDuration: "2h 15m",
    status: "active",
    lastUpdated: "2025-01-15",
    pickupCount: 1247,
  },
  {
    id: "SCH-2025-002",
    district: "Kigali",
    sector: "Kicukiro",
    days: ["Mon", "Wed", "Fri"],
    startTime: "09:00",
    truck: "TRK-001",
    agent: "Sarah Achieng",
    estimatedDuration: "2h 30m",
    status: "active",
    lastUpdated: "2025-01-14",
    pickupCount: 1156,
  },
  {
    id: "SCH-2025-003",
    district: "Rubavu",
    sector: "Gisenyi",
    days: ["Tue", "Fri"],
    startTime: "06:00",
    truck: "TRK-003",
    agent: "Grace Wanjiru",
    estimatedDuration: "2h 45m",
    status: "active",
    lastUpdated: "2025-01-13",
    pickupCount: 892,
  },
  {
    id: "SCH-2025-004",
    district: "Huye",
    sector: "Tumba",
    days: ["Tue", "Fri"],
    startTime: "06:30",
    truck: "TRK-004",
    agent: "Patricia Nafula",
    estimatedDuration: "2h 10m",
    status: "active",
    lastUpdated: "2025-01-12",
    pickupCount: 567,
  },
  {
    id: "SCH-2025-005",
    district: "Musanze",
    sector: "City Center",
    days: ["Mon", "Thu"],
    startTime: "08:15",
    truck: "TRK-005",
    agent: "James Kariuki",
    estimatedDuration: "2h 20m",
    status: "active",
    lastUpdated: "2025-01-11",
    pickupCount: 743,
  },
  {
    id: "SCH-2025-006",
    district: "Kigali",
    sector: "Muhoza",
    days: ["Wed", "Sat"],
    startTime: "07:00",
    truck: "TRK-002",
    agent: "David Musoke",
    estimatedDuration: "2h 15m",
    status: "active",
    lastUpdated: "2025-01-10",
    pickupCount: 623,
  },
  {
    id: "SCH-2025-007",
    district: "Nyagatare",
    sector: "Town",
    days: ["Tue", "Sat"],
    startTime: "11:00",
    truck: "TRK-007",
    agent: "Grace Wanjiru",
    estimatedDuration: "2h 30m",
    status: "active",
    lastUpdated: "2025-01-09",
    pickupCount: 432,
  },
  {
    id: "SCH-2025-008",
    district: "Karongi",
    sector: "Center",
    days: ["Fri"],
    startTime: "10:00",
    truck: "TRK-006",
    agent: "Mary Njeri",
    estimatedDuration: "2h 25m",
    status: "pending",
    lastUpdated: "2025-01-16",
    pickupCount: 298,
  },
]

const dayOrder: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const dayLabelToShort: Record<Day, ScheduleRow["days"][number]> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
}
const shortDayLabels: ScheduleRow["days"][number][] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const statusStyles: Record<string, { bg: string; text: string; border: string; icon: typeof CheckCircle2 }> = {
  scheduled: {
    bg: "bg-blue-500/15",
    text: "text-blue-300",
    border: "border-blue-500/30",
    icon: Clock,
  },
  "in-progress": {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
    icon: Activity,
  },
  completed: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
    icon: CheckCircle2,
  },
  active: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
    icon: CheckCircle2,
  },
  pending: {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
    icon: AlertCircle,
  },
}

export default function ScheduleManagement() {
  const [schedules, setSchedules] = useState<ScheduleRow[]>(initialSchedules)
  const [editing, setEditing] = useState<ScheduleRow | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const matchesSearch =
        !searchQuery ||
        schedule.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schedule.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schedule.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schedule.truck.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (schedule.agent && schedule.agent.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesStatus = statusFilter === "all" || schedule.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [schedules, searchQuery, statusFilter])

  const totals = useMemo(() => {
    const active = schedules.filter((s) => s.status === "active").length
    const pending = schedules.filter((s) => s.status === "pending").length
    const totalPickups = weeklyData.reduce((sum, day) => sum + day.pickups.length, 0)
    const completedToday = weeklyData
      .find((d) => d.day === new Date().toLocaleDateString("en-US", { weekday: "long" }))
      ?.pickups.filter((p) => p.status === "completed").length || 0

    return {
      total: schedules.length,
      active,
      pending,
      totalPickups,
      completedToday,
    }
  }, [schedules])

  const toggleDay = (day: ScheduleRow["days"][number]) => {
    if (!editing) return
    const exists = editing.days.includes(day)
    const next = exists ? editing.days.filter((d) => d !== day) : [...editing.days, day]
    setEditing({ ...editing, days: next })
  }

  const handleSaveEdit = () => {
    if (!editing) return
    setSchedules((prev) =>
      prev.map((s) => (s.id === editing.id ? { ...editing, lastUpdated: new Date().toISOString().split("T")[0] } : s)),
    )
    setShowModal(false)
    setEditing(null)
  }

  const districts = ["Kigali", "Rubavu", "Huye", "Musanze", "Nyagatare", "Karongi", "Rusizi"]
  const trucks = ["TRK-001", "TRK-002", "TRK-003", "TRK-004", "TRK-005", "TRK-006", "TRK-007", "TRK-008"]
  const agents = [
    "Sarah Achieng",
    "David Musoke",
    "Grace Wanjiru",
    "Patricia Nafula",
    "James Kariuki",
    "Mary Njeri",
  ]

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Schedule Management</h1>
              <p className="text-sm text-muted-foreground">
                Manage nationwide pickup schedules, routes, and assignments
              </p>
            </div>
          </div>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-background px-5 h-11 rounded-xl font-semibold shadow-lg shadow-primary/20"
        >
          <Bell className="w-4 h-4" />
          Save & Dispatch Updates
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <CheckSquare className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">
              Total
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">All Schedules</p>
          <p className="text-2xl font-bold text-white">{totals.total}</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
              Active
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Active Schedules</p>
          <p className="text-2xl font-bold text-emerald-300">{totals.active}</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
              <AlertCircle className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg">
              Pending
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Pending Updates</p>
          <p className="text-2xl font-bold text-amber-300">{totals.pending}</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Truck className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-2 py-1 rounded-lg">
              {totals.totalPickups}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Weekly Pickups</p>
          <p className="text-2xl font-bold text-white">{totals.totalPickups}</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-xs font-medium text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-lg">
              Today
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Completed Today</p>
          <p className="text-2xl font-bold text-cyan-300">{totals.completedToday}</p>
        </Card>
      </div>

      {/* Weekly Schedule Calendar */}
      <Card className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Weekly Pickup Schedule</h2>
              <p className="text-xs text-muted-foreground">Current week overview</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {dayOrder.map((day) => {
            const slot = weeklyData.find((d) => d.day === day)!
            const isToday = day === new Date().toLocaleDateString("en-US", { weekday: "long" })
            return (
              <div
                key={day}
                className={`rounded-2xl border p-4 space-y-3 min-h-[280px] backdrop-blur-sm ${
                  isToday
                    ? "bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30 shadow-lg shadow-primary/10"
                    : "bg-background/40 border-border/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-bold ${isToday ? "text-primary" : "text-white"}`}>
                    {day.substring(0, 3)}
                  </p>
                  {isToday && (
                    <span className="text-[10px] px-2 py-0.5 rounded-lg bg-primary/20 text-primary font-medium">
                      Today
                    </span>
                  )}
                </div>
                {slot.pickups.length === 0 ? (
                  <div className="flex items-center justify-center h-32 rounded-xl bg-background/20 border border-dashed border-border/30">
                    <p className="text-xs text-muted-foreground">No pickups scheduled</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {slot.pickups.map((p, idx) => {
                      const statusStyle = statusStyles[p.status || "scheduled"]
                      const StatusIcon = statusStyle.icon
                      return (
                        <div
                          key={`${p.truck}-${idx}`}
                          className="rounded-xl bg-background/60 border border-border/30 p-3 space-y-1.5 backdrop-blur-sm hover:bg-background/80 transition-all shadow-lg"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-emerald-300">{p.truck}</p>
                            <StatusIcon className={`w-3 h-3 ${statusStyle.text}`} />
                          </div>
                          <p className="text-xs font-semibold text-white">{p.sector}</p>
                          <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {p.time}
                            </div>
                            {p.estimatedDuration && (
                              <span className="text-muted-foreground">{p.estimatedDuration}</span>
                            )}
                          </div>
                          {p.agent && (
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <Users className="w-3 h-3" />
                              {p.agent}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Search and Filters */}
      <Card className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, district, sector, truck, or agent..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background/40 border border-border/30 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
            >
              <option value="all" className="bg-background">
                All Status
              </option>
              <option value="active" className="bg-background">
                Active
              </option>
              <option value="pending" className="bg-background">
                Pending
              </option>
            </select>
          </div>
        </div>
      </Card>

      {/* Schedules Table */}
      <Card className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="px-6 py-5 border-b border-border/30 bg-background/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">All Schedules</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {filteredSchedules.length} schedule{filteredSchedules.length !== 1 ? "s" : ""} shown
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-muted-foreground bg-background/40 border-b border-border/30">
                <th className="px-6 py-4 text-left font-semibold">Schedule ID</th>
                <th className="px-6 py-4 text-left font-semibold">Location</th>
                <th className="px-6 py-4 text-left font-semibold">Pickup Days</th>
                <th className="px-6 py-4 text-left font-semibold">Time & Duration</th>
                <th className="px-6 py-4 text-left font-semibold">Assignment</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map((row) => {
                const statusStyle = statusStyles[row.status || "active"]
                const StatusIcon = statusStyle.icon
                return (
                  <tr
                    key={row.id}
                    className="border-b border-border/20 bg-background/20 hover:bg-background/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-white">{row.id}</p>
                      {row.pickupCount && (
                        <p className="text-[10px] text-muted-foreground mt-0.5">{row.pickupCount} total pickups</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-sm font-semibold text-white">{row.district}</p>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">{row.sector}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {row.days.map((d) => (
                          <span
                            key={d}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/30"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-white">{row.startTime}</span>
                        </div>
                        {row.estimatedDuration && (
                          <p className="text-[10px] text-muted-foreground ml-6">{row.estimatedDuration}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-white">{row.truck}</span>
                        </div>
                        {row.agent && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{row.agent}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-4 h-4 ${statusStyle.text}`} />
                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                        >
                          {row.status || "active"}
                        </span>
                      </div>
                      {row.lastUpdated && (
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Updated: {new Date(row.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setEditing(row)
                          setShowModal(true)
                        }}
                        className="w-10 h-10 rounded-xl bg-background/40 border border-border/30 flex items-center justify-center hover:bg-background/60 transition-all shadow-lg"
                        title="Edit Schedule"
                      >
                        <Edit className="w-4 h-4 text-white" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Schedule Modal */}
      {showModal && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <Card className="w-full max-w-2xl bg-gradient-to-br from-secondary/90 to-secondary/70 border-border/40 rounded-2xl p-6 space-y-5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Edit className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Edit Schedule</h3>
                  <p className="text-xs text-muted-foreground">{editing.id}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditing(null)
                }}
                className="w-8 h-8 rounded-lg bg-background/40 border border-border/30 flex items-center justify-center hover:bg-background/60 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">District</label>
                <select
                  value={editing.district}
                  onChange={(e) => setEditing({ ...editing, district: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
                >
                  {districts.map((d) => (
                    <option key={d} value={d} className="bg-background">
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">Sector</label>
                <input
                  value={editing.sector}
                  onChange={(e) => setEditing({ ...editing, sector: e.target.value })}
                  placeholder="Enter sector name"
                  className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/30 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-3 uppercase">Pickup Days</label>
              <div className="grid grid-cols-4 gap-2">
                {shortDayLabels.map((day) => (
                  <label
                    key={day}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold cursor-pointer transition-all ${
                      editing.days.includes(day)
                        ? "bg-gradient-to-r from-primary/20 to-primary/10 border-primary/50 text-white shadow-lg shadow-primary/10"
                        : "bg-background/40 border-border/30 text-muted-foreground hover:bg-background/60"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={editing.days.includes(day)}
                      onChange={() => toggleDay(day)}
                      className="hidden"
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">Start Time</label>
                <input
                  type="time"
                  value={editing.startTime}
                  onChange={(e) => setEditing({ ...editing, startTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">
                  Assigned Truck
                </label>
                <select
                  value={editing.truck}
                  onChange={(e) => setEditing({ ...editing, truck: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
                >
                  {trucks.map((t) => (
                    <option key={t} value={t} className="bg-background">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">
                  Field Agent
                </label>
                <select
                  value={editing.agent || ""}
                  onChange={(e) => setEditing({ ...editing, agent: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
                >
                  <option value="" className="bg-background">
                    Select agent
                  </option>
                  {agents.map((a) => (
                    <option key={a} value={a} className="bg-background">
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-200 bg-amber-500/10 border border-amber-500/40 rounded-xl px-4 py-3 backdrop-blur-sm">
              <Bell className="w-4 h-4" />
              <span>Changing schedules will automatically notify affected citizens and team members</span>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowModal(false)
                  setEditing(null)
                }}
                className="flex-1 h-11 rounded-xl bg-background/40 border-border/30 text-white hover:bg-background/60"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-background font-semibold shadow-lg shadow-primary/20"
              >
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
