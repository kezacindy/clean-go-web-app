"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  Check,
  MapPin,
  User,
  UserPlus,
  BadgeAlert,
  Clock4,
  CheckCircle2,
  XCircle,
  Filter,
  X,
} from "lucide-react"

type IssueStatus = "pending" | "in-progress" | "resolved"
type IssuePriority = "low" | "medium" | "high" | "critical"
type IssueSource = "customer" | "agent" | "system"

type Issue = {
  id: string
  title: string
  description: string
  location: string
  district: string
  sector: string
  buildingRef?: string
  reporter: string
  source: IssueSource
  status: IssueStatus
  priority: IssuePriority
  reportedAt: string
  slaTarget: string
  assignedTo?: string
  resolution?: string
}

const seedIssues: Issue[] = [
  {
    id: "ISS-2025-001",
    title: "Missed pickup – Green Valley Apartments",
    description: "Scheduled morning pickup window (06:00–08:00) was missed for Block B entrance.",
    location: "KG 5 Ave 12, Nyarugenge, Kigali",
    district: "Kigali",
    sector: "Nyarugenge",
    buildingRef: "B-2025-001",
    reporter: "Customer portal – B-2025-001",
    source: "customer",
    status: "pending",
    priority: "high",
    reportedAt: "2025-01-18 08:32",
    slaTarget: "2025-01-18 12:30",
    assignedTo: "Sarah Achieng",
  },
  {
    id: "ISS-2025-002",
    title: "Road access blocked – Kicukiro route",
    description: "Temporary construction works on KG 7 Ave causing 25–30 min delay for Route TRK-005.",
    location: "KG 7 Ave, Sonatubes, Kigali",
    district: "Kigali",
    sector: "Kicukiro",
    buildingRef: undefined,
    reporter: "Field Agent – David Musoke",
    source: "agent",
    status: "in-progress",
    priority: "medium",
    reportedAt: "2025-01-18 07:15",
    slaTarget: "2025-01-18 11:00",
    assignedTo: "Operations Desk",
  },
  {
    id: "ISS-2025-003",
    title: "Vehicle breakdown – TRK-004",
    description: "Engine temperature warning triggered; truck diverted to Huye depot for inspection.",
    location: "Huye Depot, Huye",
    district: "Huye",
    sector: "Tumba",
    buildingRef: undefined,
    reporter: "Driver – Michael Kamau",
    source: "agent",
    status: "in-progress",
    priority: "critical",
    reportedAt: "2025-01-18 06:48",
    slaTarget: "2025-01-18 10:00",
    assignedTo: "Fleet Maintenance Team",
  },
  {
    id: "ISS-2025-004",
    title: "Overflowing commercial bin – Safari Hotel",
    description: "Weekend occupancy spike; 110% capacity recorded on main service bay container.",
    location: "KN 3 Rd 45, City Center, Kigali",
    district: "Kigali",
    sector: "Gasabo",
    buildingRef: "B-2025-002",
    reporter: "On-site Manager – Safari Hotel",
    source: "customer",
    status: "resolved",
    priority: "high",
    reportedAt: "2025-01-17 21:10",
    slaTarget: "2025-01-18 08:00",
    assignedTo: "Night Shift Team",
    resolution: "Extra pickup scheduled at 06:00 and completed at 06:35; container reset to 20% capacity.",
  },
  {
    id: "ISS-2025-005",
    title: "Bin tagging mismatch – Riverside Residences",
    description: "Two bins registered under incorrect unit IDs after tenant move-in.",
    location: "NR 15 St 56, Lakefront, Rubavu",
    district: "Rubavu",
    sector: "Gisenyi",
    buildingRef: "B-2025-005",
    reporter: "System – asset reconciliation",
    source: "system",
    status: "pending",
    priority: "low",
    reportedAt: "2025-01-18 05:05",
    slaTarget: "2025-01-20 17:00",
    assignedTo: "Data Quality Team",
  },
  {
    id: "ISS-2025-006",
    title: "Irregular waste sorting – Huye Market Block",
    description: "Organic and plastic waste repeatedly mixed; non-compliance with contract terms.",
    location: "Main Market Rd, Huye Town",
    district: "Huye",
    sector: "Tumba",
    buildingRef: "B-2025-008",
    reporter: "Field Agent – Grace Wanjiru",
    source: "agent",
    status: "resolved",
    priority: "medium",
    reportedAt: "2025-01-15 10:22",
    slaTarget: "2025-01-15 18:00",
    assignedTo: "Customer Success",
    resolution: "On-site training held with facility management; signage and new sorting stickers deployed.",
  },
]

const statusChips: Record<IssueStatus, string> = {
  pending: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  "in-progress": "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  resolved: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
}

const priorityChips: Record<IssuePriority, string> = {
  low: "bg-slate-500/15 text-slate-200 border border-slate-500/30",
  medium: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  high: "bg-orange-500/15 text-orange-300 border border-orange-500/30",
  critical: "bg-red-500/15 text-red-300 border border-red-500/30",
}

const sourceLabel: Record<IssueSource, string> = {
  customer: "Customer reported",
  agent: "Field agent reported",
  system: "System detected",
}

const agentOptions = [
  { name: "Sarah Achieng", location: "Kigali – Central" },
  { name: "David Musoke", location: "Kigali – Kicukiro" },
  { name: "Grace Wanjiru", location: "Rubavu – Gisenyi" },
  { name: "Patricia Nafula", location: "Huye – Tumba" },
]

export default function IssueManagement() {
  const [issues, setIssues] = useState<Issue[]>(seedIssues)
  const [statusFilter, setStatusFilter] = useState<IssueStatus | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<IssuePriority | "all">("all")
  const [search, setSearch] = useState("")
  const [assignModal, setAssignModal] = useState<Issue | null>(null)
  const [resolveModal, setResolveModal] = useState<Issue | null>(null)
  const [resolutionMessage, setResolutionMessage] = useState("")

  const totals = useMemo(() => {
    const total = issues.length
    const pending = issues.filter((i) => i.status === "pending").length
    const inProgress = issues.filter((i) => i.status === "in-progress").length
    const resolved = issues.filter((i) => i.status === "resolved").length
    const critical = issues.filter((i) => i.priority === "critical").length
    return { total, pending, inProgress, resolved, critical }
  }, [issues])

  const filteredIssues = useMemo(() => {
    const term = search.toLowerCase()
    return issues.filter((i) => {
      const matchStatus = statusFilter === "all" || i.status === statusFilter
      const matchPriority = priorityFilter === "all" || i.priority === priorityFilter
      const matchSearch =
        !term ||
        i.title.toLowerCase().includes(term) ||
        i.description.toLowerCase().includes(term) ||
        i.district.toLowerCase().includes(term) ||
        (i.buildingRef && i.buildingRef.toLowerCase().includes(term))

      return matchStatus && matchPriority && matchSearch
    })
  }, [issues, statusFilter, priorityFilter, search])

  const assignAgent = (issueId: string, agentName: string) => {
    setIssues((prev) =>
      prev.map((i) =>
        i.id === issueId ? { ...i, assignedTo: agentName, status: i.status === "pending" ? "in-progress" : i.status } : i,
      ),
    )
    setAssignModal(null)
  }

  const markResolved = () => {
    if (!resolveModal) return
    const message = resolutionMessage.trim() || "Issue has been successfully resolved and documented."
    setIssues((prev) =>
      prev.map((i) => (i.id === resolveModal.id ? { ...i, status: "resolved", resolution: message } : i)),
    )
    setResolutionMessage("")
    setResolveModal(null)
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-amber-500/10 border border-red-500/30 flex items-center justify-center shadow-lg shadow-red-500/20">
              <BadgeAlert className="w-6 h-6 text-red-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Issue & Incident Management</h1>
              <p className="text-sm text-muted-foreground">
                Centralised queue for customer, agent and system-reported issues across all regions
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <Clock4 className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-medium text-amber-200">
              {totals.pending + totals.inProgress} open within SLA
            </span>
          </div>
          <Button className="h-10 rounded-xl bg-primary/90 hover:bg-primary text-background text-xs font-semibold px-4">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Log New Issue
          </Button>
        </div>
      </div>

      {/* Overview metrics */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Issues (Last 7 days)</p>
              <p className="mt-2 text-3xl font-bold text-white">{totals.total}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {totals.pending} pending • {totals.inProgress} in progress
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-background/40 border border-border/40 flex items-center justify-center">
              <BadgeAlert className="w-4 h-4 text-red-300" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Critical Incidents</p>
              <p className="mt-2 text-3xl font-bold text-red-300">{totals.critical}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Vehicle breakdowns and route blockers</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <XCircle className="w-4 h-4 text-red-300" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Resolution Rate</p>
              <p className="mt-2 text-3xl font-bold text-emerald-300">
                {totals.total ? Math.round((totals.resolved / totals.total) * 100) : 0}%
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">Issues closed within SLA window</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Regions Affected</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {new Set(issues.map((i) => i.district)).size}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">districts with open incidents</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-300" />
            </div>
          </div>
        </Card>
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
                placeholder="Search by title, district, building ID or description..."
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground text-sm text-white"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Type a keyword or click on a status/priority chip to refine the incident queue.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {(["all", "pending", "in-progress", "resolved"] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status as IssueStatus | "all")}
                className={`text-[11px] px-3 py-1.5 rounded-full border ${
                  statusFilter === status
                    ? "bg-primary text-background border-primary"
                    : "bg-background/40 text-muted-foreground border-border/40 hover:bg-background/60 hover:text-white"
                }`}
              >
                {status === "all" ? "All statuses" : status.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "low", "medium", "high", "critical"] as const).map((priority) => (
            <button
              key={priority}
              type="button"
              onClick={() => setPriorityFilter(priority as IssuePriority | "all")}
              className={`text-[11px] px-3 py-1.5 rounded-full border ${
                priorityFilter === priority
                  ? "bg-background text-white border-primary"
                  : "bg-background/40 text-muted-foreground border-border/40 hover:bg-background/60 hover:text-white"
              }`}
            >
              {priority === "all" ? "All priorities" : `${priority.charAt(0).toUpperCase()}${priority.slice(1)} priority`}
            </button>
          ))}
        </div>
      </Card>

      {/* Issue list */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredIssues.map((issue) => {
          const showResolvedMsg = !!issue.resolution
          return (
            <Card
              key={issue.id}
              className="p-5 bg-gradient-to-br from-secondary/40 to-secondary/25 border-border/40 rounded-2xl space-y-4 hover:border-primary/40 hover:shadow-xl transition-all backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`w-5 h-5 mt-1 ${
                      issue.priority === "critical"
                        ? "text-red-300"
                        : issue.priority === "high"
                          ? "text-orange-300"
                          : issue.priority === "medium"
                            ? "text-amber-300"
                            : "text-blue-300"
                    }`}
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">{issue.title}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {issue.id} • {sourceLabel[issue.source]}
                    </p>
                    <p className="text-xs text-muted-foreground">{issue.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${statusChips[issue.status]}`}>
                    {issue.status.replace("-", " ")}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${priorityChips[issue.priority]}`}>
                    {issue.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-white">{issue.location}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {issue.district} District • {issue.sector} Sector
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-white truncate">Reported by: {issue.reporter}</span>
                </div>
                {issue.assignedTo && (
                  <div className="flex items-center gap-2 text-emerald-300">
                    <UserPlus className="w-4 h-4" />
                    <span>Assigned to: {issue.assignedTo}</span>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="text-muted-foreground">
                    Reported at <span className="text-white">{issue.reportedAt}</span>
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    SLA target <span className="text-white">{issue.slaTarget}</span>
                  </span>
                  {issue.buildingRef && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">
                        Building ref <span className="text-white">{issue.buildingRef}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                {issue.status === "pending" && (
                  <Button
                    onClick={() => setAssignModal(issue)}
                    className="w-full bg-primary text-background hover:bg-primary/90 h-10 rounded-xl text-sm font-medium"
                  >
                    Assign to field team
                  </Button>
                )}

                {issue.status === "in-progress" && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setResolveModal(issue)}
                      className="flex-1 bg-primary text-background hover:bg-primary/90 h-10 rounded-xl text-sm font-medium"
                    >
                      Mark as resolved
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setAssignModal(issue)}
                      className="flex-1 h-10 rounded-xl bg-background/40 border-border/40 text-white text-sm hover:bg-background/60"
                    >
                      Reassign
                    </Button>
                  </div>
                )}

                {issue.status === "resolved" && showResolvedMsg && (
                  <div className="mt-1 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100 flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5" />
                    <div>
                      <p className="font-medium">Resolution summary</p>
                      <p className="mt-0.5">{issue.resolution}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )
        })}

        {filteredIssues.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-10 rounded-2xl border border-dashed border-border/40 bg-background/40">
            <p className="text-sm font-medium text-white">No issues match the current filters</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Clear one or more filters to see more incidents in the queue.
            </p>
          </div>
        )}
      </div>

      {/* Assign modal */}
      {assignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <Card className="w-full max-w-lg bg-gradient-to-br from-secondary/90 to-secondary/70 border-border/40 rounded-2xl p-6 space-y-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">Assign field agent</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{assignModal.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setAssignModal(null)}
                className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-background/50 hover:border-primary/40 transition-colors"
                aria-label="Close assign modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {agentOptions.map((agent) => (
                <button
                  key={agent.name}
                  onClick={() => assignAgent(assignModal.id, agent.name)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-background/40 border border-border/40 text-sm text-white hover:bg-background/60 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.location}</p>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Assign
                  </span>
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setAssignModal(null)}
              className="w-full h-10 rounded-xl bg-background/40 border-border/40 text-white text-sm hover:bg-background/60"
            >
              Cancel
            </Button>
          </Card>
        </div>
      )}

      {/* Resolve modal */}
      {resolveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <Card className="w-full max-w-2xl bg-gradient-to-br from-secondary/90 to-secondary/70 border-border/40 rounded-2xl p-6 space-y-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">Mark issue as resolved</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{resolveModal.title}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setResolutionMessage("")
                  setResolveModal(null)
                }}
                className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-background/50 hover:border-primary/40 transition-colors"
                aria-label="Close resolve modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={resolutionMessage}
              onChange={(e) => setResolutionMessage(e.target.value)}
              placeholder="Document how the issue was resolved, including time of completion, teams involved and any follow-up actions..."
              className="w-full h-32 px-3 py-2 rounded-lg bg-background/40 border border-border/40 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
            />
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setResolutionMessage("")
                  setResolveModal(null)
                }}
                className="flex-1 h-10 rounded-xl bg-background/40 border-border/40 text-white text-sm hover:bg-background/60"
              >
                Cancel
              </Button>
              <Button
                onClick={markResolved}
                className="flex-1 h-10 rounded-xl bg-primary hover:bg-primary/90 text-background text-sm font-semibold"
              >
                Confirm resolution
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
