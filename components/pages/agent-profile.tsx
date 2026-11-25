"use client"

import { Card } from "@/components/ui/card"
import { MapPin, Truck, Calendar, Award, User, Mail, Phone, Star, TrendingUp, Clock, CheckCircle2, AlertCircle, XCircle } from "lucide-react"

interface AttendanceLog {
  date: string
  checkIn: string
  checkOut: string
  status: "present" | "absent" | "late"
  hours: string
}

export default function AgentProfile() {
  const agentData = {
    name: "Jean Paul Nkurunziza",
    agentId: "AG-2024-045",
    email: "jean.nkurunziza@cleango.rw",
    phone: "+250 788 456 789",
    assignedRegion: "Kigali City - Central Zone",
    assignedTruck: "TRUCK-KGL-12",
    workSchedule: "Monday - Saturday, 05:00 AM - 02:00 PM",
    rating: 4.8,
    totalCollections: 1247,
    joiningDate: "2023-06-15",
    district: "Kigali",
    sector: "Nyarugenge",
    performance: {
      thisMonth: 156,
      lastMonth: 142,
      efficiency: 94,
      onTimeRate: 96,
    },
  }

  const attendanceLogs: AttendanceLog[] = [
    { date: "2025-01-20", checkIn: "05:02", checkOut: "14:15", status: "present", hours: "9h 13m" },
    { date: "2025-01-19", checkIn: "05:00", checkOut: "14:00", status: "present", hours: "9h 0m" },
    { date: "2025-01-18", checkIn: "05:15", checkOut: "14:00", status: "late", hours: "8h 45m" },
    { date: "2025-01-17", checkIn: "05:00", checkOut: "14:00", status: "present", hours: "9h 0m" },
    { date: "2025-01-16", checkIn: "05:00", checkOut: "14:00", status: "present", hours: "9h 0m" },
    { date: "2025-01-15", checkIn: "05:00", checkOut: "14:00", status: "present", hours: "9h 0m" },
  ]

  const statusConfig = {
    present: { color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", icon: CheckCircle2 },
    late: { color: "bg-amber-500/15 text-amber-300 border-amber-500/30", icon: AlertCircle },
    absent: { color: "bg-red-500/15 text-red-300 border-red-500/30", icon: XCircle },
  }

  return (
    <div className="p-4 space-y-4 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/25 flex items-center justify-center shadow-lg shadow-primary/20">
              <User className="w-5 h-5 text-primary" />
            </div>
      <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">My Profile</h1>
              <p className="text-xs text-muted-foreground">Agent information and performance metrics</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <Award className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-[10px] font-medium text-emerald-300">Active Agent</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Total Collections</p>
              <p className="mt-1.5 text-2xl font-bold text-white">{agentData.totalCollections.toLocaleString()}</p>
              <p className="text-[9px] text-muted-foreground mt-1">All time</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
              <div>
              <p className="text-[10px] text-muted-foreground font-medium">This Month</p>
              <p className="mt-1.5 text-2xl font-bold text-emerald-300">{agentData.performance.thisMonth}</p>
              <p className="text-[9px] text-emerald-400/70 mt-1">+{agentData.performance.thisMonth - agentData.performance.lastMonth} from last month</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            </div>
              </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
              <div>
              <p className="text-[10px] text-muted-foreground font-medium">Efficiency</p>
              <p className="mt-1.5 text-2xl font-bold text-blue-300">{agentData.performance.efficiency}%</p>
              <p className="text-[9px] text-muted-foreground mt-1">On-time rate: {agentData.performance.onTimeRate}%</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Star className="w-4 h-4 text-blue-300" />
            </div>
              </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
              <div>
              <p className="text-[10px] text-muted-foreground font-medium">Rating</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <p className="text-2xl font-bold text-white">{agentData.rating}</p>
                <span className="text-xs text-muted-foreground">/ 5.0</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Award className="w-4 h-4 text-amber-300" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Agent Information */}
        <Card className="lg:col-span-2 p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-white">Agent Information</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground">Full Name</p>
              <p className="text-sm font-semibold text-white">{agentData.name}</p>
            </div>
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground">Agent ID</p>
              <p className="text-sm font-semibold text-primary">{agentData.agentId}</p>
            </div>
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground">Email</p>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-muted-foreground" />
                <p className="text-sm text-white">{agentData.email}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground">Phone</p>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-muted-foreground" />
                <a href={`tel:${agentData.phone}`} className="text-sm text-primary hover:text-primary/80">
                  {agentData.phone}
                </a>
              </div>
                </div>
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground">Joining Date</p>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <p className="text-sm text-white">{agentData.joiningDate}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground">Location</p>
              <p className="text-sm text-white">{agentData.district} • {agentData.sector}</p>
            </div>
          </div>
        </Card>

        {/* Performance Card */}
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-white">Performance</h2>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground font-medium">Efficiency</span>
                <span className="text-primary font-bold">{agentData.performance.efficiency}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-background/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80"
                  style={{ width: `${agentData.performance.efficiency}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground font-medium">On-Time Rate</span>
                <span className="text-emerald-300 font-bold">{agentData.performance.onTimeRate}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-background/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  style={{ width: `${agentData.performance.onTimeRate}%` }}
                />
              </div>
                  </div>
            <div className="pt-2 border-t border-border/40">
              <p className="text-[10px] text-muted-foreground font-medium mb-1">Monthly Collections</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold text-white">{agentData.performance.thisMonth}</p>
                <span className="text-[9px] text-emerald-400">+{agentData.performance.thisMonth - agentData.performance.lastMonth}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Assignment Details */}
      <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Truck className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-white">Assignment Details</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="p-3 rounded-xl bg-background/40 border border-border/40">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <p className="text-[10px] text-muted-foreground font-medium">Assigned Region</p>
            </div>
            <p className="text-sm font-semibold text-white">{agentData.assignedRegion}</p>
          </div>
          <div className="p-3 rounded-xl bg-background/40 border border-border/40">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-4 h-4 text-primary" />
              <p className="text-[10px] text-muted-foreground font-medium">Assigned Truck</p>
            </div>
            <p className="text-sm font-semibold text-white">{agentData.assignedTruck}</p>
          </div>
          <div className="p-3 rounded-xl bg-background/40 border border-border/40">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <p className="text-[10px] text-muted-foreground font-medium">Work Schedule</p>
            </div>
            <p className="text-sm font-semibold text-white">{agentData.workSchedule}</p>
          </div>
        </div>
      </Card>

      {/* Attendance Log */}
      <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-white">Attendance Log</h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-background/40 text-muted-foreground">
            Last 6 days
          </span>
        </div>
        <div className="space-y-2">
          {attendanceLogs.map((log) => {
            const StatusIcon = statusConfig[log.status].icon
            return (
              <div
                key={log.date}
                className="p-3 rounded-xl bg-background/40 border border-border/40 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-8 h-8 rounded-lg bg-background/40 border border-border/40 flex items-center justify-center ${statusConfig[log.status].color.split(' ')[1]}`}>
                      <StatusIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-white">{log.date}</p>
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-semibold border ${statusConfig[log.status].color}`}>
                      {log.status.toUpperCase()}
                    </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          In: {log.checkIn}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Out: {log.checkOut}
                        </span>
                        <span className="text-primary font-medium">{log.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
