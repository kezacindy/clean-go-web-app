"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  BadgeDollarSign,
  Bell,
  CheckCircle2,
  Clock4,
  MapPin,
  Truck,
  User,
  Filter,
  X,
} from "lucide-react"

type NotificationCategory = "operations" | "payment" | "incident" | "agent" | "system"
type NotificationSeverity = "info" | "warning" | "critical"

type Notification = {
  id: string
  title: string
  message: string
  time: string
  category: NotificationCategory
  severity: NotificationSeverity
  context?: string
  region?: string
  buildingRef?: string
  unread: boolean
}

const categoryLabel: Record<NotificationCategory, string> = {
  operations: "Operations",
  payment: "Payments & billing",
  incident: "Incidents & issues",
  agent: "Field agents",
  system: "System events",
}

const severityLabel: Record<NotificationSeverity, string> = {
  info: "Info",
  warning: "Warning",
  critical: "Critical",
}

const categoryIcon: Record<NotificationCategory, JSX.Element> = {
  operations: <Truck className="w-5 h-5 text-blue-300" />,
  payment: <BadgeDollarSign className="w-5 h-5 text-emerald-300" />,
  incident: <AlertTriangle className="w-5 h-5 text-amber-300" />,
  agent: <User className="w-5 h-5 text-indigo-300" />,
  system: <Bell className="w-5 h-5 text-slate-300" />,
}

const severityChip: Record<NotificationSeverity, string> = {
  info: "bg-slate-500/15 text-slate-200 border border-slate-500/30",
  warning: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  critical: "bg-red-500/15 text-red-300 border border-red-500/30",
}

const seedNotifications: Notification[] = [
  {
    id: "NT-2025-001",
    title: "Route delay – Kigali / Nyarugenge",
    message: "TRK-001 is running 18 minutes late due to congestion near CBD. Customers have been auto-notified.",
    time: "2025-01-18 08:42",
    category: "operations",
    severity: "warning",
    context: "Route TRK-001 – Kigali Central",
    region: "Kigali – Nyarugenge",
    buildingRef: undefined,
    unread: true,
  },
  {
    id: "NT-2025-002",
    title: "Payment confirmed – Safari Hotel Complex",
    message: "Rwf 85,000 received via bank transfer for invoice INV-2025-002 (January service).",
    time: "2025-01-18 08:15",
    category: "payment",
    severity: "info",
    context: "Invoice INV-2025-002",
    region: "Kigali – Gasabo",
    buildingRef: "B-2025-002",
    unread: true,
  },
  {
    id: "NT-2025-003",
    title: "Missed pickup reported – Green Valley Apartments",
    message: "Customer portal ticket raised for missed morning collection at Block B entrance.",
    time: "2025-01-18 08:10",
    category: "incident",
    severity: "critical",
    context: "Issue ISS-2025-001",
    region: "Kigali – Nyarugenge",
    buildingRef: "B-2025-001",
    unread: true,
  },
  {
    id: "NT-2025-004",
    title: "Issue resolved – Safari Hotel overflow",
    message: "Additional pickup completed at 06:35. Container reset to 20% capacity and photo evidence uploaded.",
    time: "2025-01-18 06:45",
    category: "incident",
    severity: "info",
    context: "Issue ISS-2025-004",
    region: "Kigali – Gasabo",
    buildingRef: "B-2025-002",
    unread: false,
  },
  {
    id: "NT-2025-005",
    title: "Agent check-in – Eastern Region depot",
    message: "Agent Mary Njeri checked in at Nyagatare depot (shift start 06:30).",
    time: "2025-01-18 06:28",
    category: "agent",
    severity: "info",
    context: "Shift E-2025-018",
    region: "Nyagatare – Town",
    buildingRef: undefined,
    unread: false,
  },
  {
    id: "NT-2025-006",
    title: "System reconciliation – Bin tagging mismatch",
    message: "Asset audit detected 2 bins assigned to wrong unit IDs at Riverside Residences.",
    time: "2025-01-18 05:05",
    category: "system",
    severity: "warning",
    context: "Data quality check",
    region: "Rubavu – Gisenyi",
    buildingRef: "B-2025-005",
    unread: false,
  },
]

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState<Notification[]>(seedNotifications)
  const [categoryFilter, setCategoryFilter] = useState<NotificationCategory | "all">("all")
  const [severityFilter, setSeverityFilter] = useState<NotificationSeverity | "all">("all")
  const [search, setSearch] = useState("")

  const unreadCount = useMemo(() => notifications.filter((n) => n.unread).length, [notifications])

  const filtered = useMemo(() => {
    const term = search.toLowerCase()
    return notifications.filter((n) => {
      const matchCategory = categoryFilter === "all" || n.category === categoryFilter
      const matchSeverity = severityFilter === "all" || n.severity === severityFilter
      const matchSearch =
        !term ||
        n.title.toLowerCase().includes(term) ||
        n.message.toLowerCase().includes(term) ||
        (n.buildingRef && n.buildingRef.toLowerCase().includes(term)) ||
        (n.region && n.region.toLowerCase().includes(term))

      return matchCategory && matchSeverity && matchSearch
    })
  }, [notifications, categoryFilter, severityFilter, search])

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/25 flex items-center justify-center shadow-lg shadow-primary/20">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Notification Center</h1>
              <p className="text-sm text-muted-foreground">
                Real-time alerts from operations, payments, agents and system automation
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs border border-emerald-500/30">
              {unreadCount} unread notifications
            </span>
          )}
          <Button
            onClick={markAllRead}
            className="bg-background/40 border border-border/40 text-white hover:bg-background/60 h-10 px-4 rounded-xl text-xs font-medium"
          >
            Mark all as read
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background/40 border border-border/40 text-sm text-white">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, building ID, region or message content..."
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground text-sm text-white"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Use keywords like &quot;Nyarugenge&quot;, &quot;TRK-001&quot; or &quot;B-2025-002&quot; to quickly filter.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {(["all", "operations", "payment", "incident", "agent", "system"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat as NotificationCategory | "all")}
                className={`text-[11px] px-3 py-1.5 rounded-full border ${
                  categoryFilter === cat
                    ? "bg-primary text-background border-primary"
                    : "bg-background/40 text-muted-foreground border-border/40 hover:bg-background/60 hover:text-white"
                }`}
              >
                {cat === "all" ? "All categories" : categoryLabel[cat as NotificationCategory]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "info", "warning", "critical"] as const).map((sev) => (
            <button
              key={sev}
              type="button"
              onClick={() => setSeverityFilter(sev as NotificationSeverity | "all")}
              className={`text-[11px] px-3 py-1.5 rounded-full border ${
                severityFilter === sev
                  ? "bg-background text-white border-primary"
                  : "bg-background/40 text-muted-foreground border-border/40 hover:bg-background/60 hover:text-white"
              }`}
            >
              {sev === "all" ? "All severities" : severityLabel[sev as NotificationSeverity]}
            </button>
          ))}
        </div>
      </Card>

      {/* Notifications list */}
      <div className="space-y-3">
        {filtered.map((note) => (
          <Card
            key={note.id}
            className={`p-4 bg-gradient-to-br from-secondary/40 to-secondary/25 border-border/40 rounded-2xl flex items-start gap-3 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl transition-all ${
              note.unread ? "border-primary/40" : ""
            }`}
          >
            <div className="w-11 h-11 rounded-xl bg-background/40 border border-border/40 flex items-center justify-center flex-shrink-0">
              {categoryIcon[note.category]}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-white">{note.title}</p>
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className={`px-2 py-0.5 rounded-full ${severityChip[note.severity]}`}>
                      {severityLabel[note.severity]}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{categoryLabel[note.category]}</span>
                    {note.region && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {note.region}
                        </span>
                      </>
                    )}
                    {note.buildingRef && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">Building {note.buildingRef}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {note.unread && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                  {note.unread && (
                    <button
                      type="button"
                      onClick={() => markRead(note.id)}
                      className="text-[11px] px-2 py-1 rounded-full bg-background/40 border border-border/40 text-muted-foreground hover:text-white hover:bg-background/60"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{note.message}</p>
              <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-1">
                <Clock4 className="w-3.5 h-3.5" />
                <span>{note.time}</span>
                {note.context && (
                  <>
                    <span>•</span>
                    <span>{note.context}</span>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 rounded-2xl border border-dashed border-border/40 bg-background/40">
            <p className="text-sm font-medium text-white">No notifications match the current filters</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Clear one or more filters or search terms to view more notifications.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

