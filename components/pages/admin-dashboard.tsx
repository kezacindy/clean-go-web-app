"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Activity,
  AlertTriangle,
  BadgeDollarSign,
  BarChart3,
  Clock4,
  Map,
  MapPin,
  Route,
  Truck,
  TruckIcon,
  Users,
  UserCheck,
  XCircle,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Zap,
} from "lucide-react"

type AdminActivePage =
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
  | "settings"

export default function AdminDashboard({ onNavigate }: { onNavigate?: (page: AdminActivePage) => void }) {
  // More realistic and professional summary stats
  const summaryStats = [
    {
      label: "Scheduled Pickups (Today)",
      value: "328",
      subtitle: "Across 12 routes",
      icon: Route,
      badge: "bg-gradient-to-br from-blue-500/20 to-blue-500/10 border-blue-500/30",
      iconColor: "text-blue-400",
      trend: "+4.2%",
      trendColor: "text-blue-400",
    },
    {
      label: "Completed Pickups",
      value: "287",
      subtitle: "87.5% completion rate",
      icon: Activity,
      badge: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border-emerald-500/30",
      iconColor: "text-emerald-400",
      trend: "+2.8%",
      trendColor: "text-emerald-400",
    },
    {
      label: "Missed / Delayed",
      value: "12",
      subtitle: "3.7% of scheduled",
      icon: XCircle,
      badge: "bg-gradient-to-br from-red-500/20 to-red-500/10 border-red-500/30",
      iconColor: "text-red-400",
      trend: "-1.2%",
      trendColor: "text-emerald-400",
    },
    {
      label: "Completion Rate",
      value: "87.5%",
      subtitle: "Above 85% target",
      icon: CheckCircle2,
      badge: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border-emerald-500/30",
      iconColor: "text-emerald-400",
      trend: "+1.3%",
      trendColor: "text-emerald-400",
    },
    {
      label: "Active Field Agents",
      value: "46",
      subtitle: "42 on duty, 4 standby",
      icon: UserCheck,
      badge: "bg-gradient-to-br from-indigo-500/20 to-indigo-500/10 border-indigo-500/30",
      iconColor: "text-indigo-400",
      trend: "+3",
      trendColor: "text-indigo-400",
    },
    {
      label: "Active Trucks",
      value: "19 / 24",
      subtitle: "79% fleet utilization",
      icon: Truck,
      badge: "bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 border-cyan-500/30",
      iconColor: "text-cyan-400",
      trend: "+2",
      trendColor: "text-cyan-400",
    },
    {
      label: "Pending Payments",
      value: "Rwf 127,500",
      subtitle: "18 accounts pending",
      icon: BadgeDollarSign,
      badge: "bg-gradient-to-br from-amber-500/20 to-amber-500/10 border-amber-500/30",
      iconColor: "text-amber-400",
      trend: "-8.3%",
      trendColor: "text-emerald-400",
    },
    {
      label: "Payment Rate",
      value: "86.2%",
      subtitle: "Current month",
      icon: Activity,
      badge: "bg-gradient-to-br from-green-500/20 to-green-500/10 border-green-500/30",
      iconColor: "text-green-400",
      trend: "+2.1%",
      trendColor: "text-green-400",
    },
  ]

  // More realistic schedule data with additional details
  const todaysSchedule = [
    {
      area: "Kigali – Nyarugenge",
      time: "06:00",
      truck: "TRK-001",
      agent: "Sarah Achieng",
      status: "in-progress",
      progress: 68,
      estimatedCompletion: "08:15",
      stops: 24,
      completed: 16,
    },
    {
      area: "Kigali – Kicukiro",
      time: "07:30",
      truck: "TRK-002",
      agent: "David Musoke",
      status: "scheduled",
      progress: 0,
      estimatedCompletion: "10:45",
      stops: 28,
      completed: 0,
    },
    {
      area: "Rubavu – Gisenyi",
      time: "09:00",
      truck: "TRK-003",
      agent: "Grace Wanjiru",
      status: "delayed",
      progress: 45,
      estimatedCompletion: "11:30",
      stops: 22,
      completed: 10,
      delay: 15,
    },
    {
      area: "Huye – Tumba",
      time: "10:30",
      truck: "TRK-004",
      agent: "Patricia Nafula",
      status: "completed",
      progress: 100,
      estimatedCompletion: "12:45",
      stops: 19,
      completed: 19,
    },
    {
      area: "Musanze – City Center",
      time: "08:15",
      truck: "TRK-005",
      agent: "James Kariuki",
      status: "in-progress",
      progress: 52,
      estimatedCompletion: "10:20",
      stops: 21,
      completed: 11,
    },
    {
      area: "Nyagatare – Town",
      time: "11:00",
      truck: "TRK-006",
      agent: "Mary Njeri",
      status: "scheduled",
      progress: 0,
      estimatedCompletion: "13:30",
      stops: 16,
      completed: 0,
    },
  ]

  // More realistic payment data
  const payments = [
    {
      id: "PAY-2025-001",
      building: "Green Valley Apartments",
      amount: 25000,
      status: "paid",
      date: "2025-01-12",
      method: "Mobile Money",
      invoice: "INV-2025-001",
    },
    {
      id: "PAY-2025-002",
      building: "Safari Hotel Complex",
      amount: 85000,
      status: "paid",
      date: "2025-01-15",
      method: "Bank Transfer",
      invoice: "INV-2025-002",
    },
    {
      id: "PAY-2025-003",
      building: "Mama Njeri Restaurant",
      amount: 50000,
      status: "pending",
      date: null,
      method: "Pending",
      invoice: "INV-2025-003",
      dueDate: "2025-01-20",
    },
    {
      id: "PAY-2025-004",
      building: "Tech Solutions Ltd",
      amount: 15000,
      status: "overdue",
      date: null,
      method: "Pending",
      invoice: "INV-2025-004",
      dueDate: "2025-01-10",
      daysOverdue: 5,
    },
    {
      id: "PAY-2025-005",
      building: "Rwanda Business Center",
      amount: 120000,
      status: "paid",
      date: "2025-01-16",
      method: "Bank Transfer",
      invoice: "INV-2025-005",
    },
    {
      id: "PAY-2025-006",
      building: "Kigali Heights Mall",
      amount: 95000,
      status: "pending",
      date: null,
      method: "Pending",
      invoice: "INV-2025-006",
      dueDate: "2025-01-22",
    },
  ]

  // More realistic alerts with priority levels
  const alerts = [
    {
      type: "Missed Pickup",
      detail: "Green Valley Apartments – TRK-007 did not arrive at scheduled time",
      tone: "text-red-300",
      priority: "high",
      time: "2 hours ago",
      icon: XCircle,
    },
    {
      type: "Route Delay",
      detail: "TRK-003 running 18 minutes late in Gisenyi – traffic congestion",
      tone: "text-amber-300",
      priority: "medium",
      time: "45 min ago",
      icon: Clock4,
    },
    {
      type: "Payment Overdue",
      detail: "12 accounts overdue in Central District – total Rwf 127,500",
      tone: "text-red-300",
      priority: "high",
      time: "1 hour ago",
      icon: BadgeDollarSign,
    },
    {
      type: "Agent Status",
      detail: "Agent Mary Njeri – Eastern Region – last seen 2 hours ago",
      tone: "text-amber-300",
      priority: "medium",
      time: "30 min ago",
      icon: UserCheck,
    },
    {
      type: "Truck Maintenance",
      detail: "TRK-006 in workshop – requires route reassignment",
      tone: "text-red-300",
      priority: "high",
      time: "3 hours ago",
      icon: Truck,
    },
    {
      type: "High Volume Alert",
      detail: "Kigali – Nyarugenge experiencing 15% above average pickup volume",
      tone: "text-blue-300",
      priority: "low",
      time: "1 hour ago",
      icon: Activity,
    },
  ]

  // More realistic chart data with decimals
  const completionChartData = [
    { label: "Mon", pickup: 87.2, payment: 85.4 },
    { label: "Tue", pickup: 89.1, payment: 86.7 },
    { label: "Wed", pickup: 91.3, payment: 88.2 },
    { label: "Thu", pickup: 88.7, payment: 85.9 },
    { label: "Fri", pickup: 92.1, payment: 89.5 },
    { label: "Sat", pickup: 85.4, payment: 83.2 },
    { label: "Sun", pickup: 79.8, payment: 78.6 },
  ]

  const maxCompletion = Math.max(
    ...completionChartData.flatMap((d) => [d.pickup, d.payment]),
  )

  const pickupPolyline = completionChartData
    .map((day, index) => {
      const x = (index / Math.max(1, completionChartData.length - 1)) * 100
      const y = 35 - (day.pickup / maxCompletion) * 25
      return `${x},${y}`
    })
    .join(" ")
  const pickupAreaPoints = `${pickupPolyline} 100,40 0,40`

  const paymentPolyline = completionChartData
    .map((day, index) => {
      const x = (index / Math.max(1, completionChartData.length - 1)) * 100
      const y = 35 - (day.payment / maxCompletion) * 25
      return `${x},${y}`
    })
    .join(" ")

  const avgPickupCompletion = (
    completionChartData.reduce((sum, d) => sum + d.pickup, 0) / completionChartData.length
  ).toFixed(1)
  const avgPaymentCompletion = (
    completionChartData.reduce((sum, d) => sum + d.payment, 0) / completionChartData.length
  ).toFixed(1)

  // Calculate payment statistics
  const paidCount = payments.filter((p) => p.status === "paid").length
  const unpaidCount = payments.filter((p) => p.status === "pending").length
  const overdueCount = payments.filter((p) => p.status === "overdue").length
  const totalRevenue = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = payments
    .filter((p) => p.status !== "paid")
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="p-4 space-y-4 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header Section */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center">
            <Route className="w-4 h-4 text-primary" />
            </div>
            <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Dashboard Overview</h1>
            <p className="text-[10px] text-muted-foreground">
              Real-time operations monitoring
              </p>
            </div>
          </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-300">Live</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 rounded-lg border-border/40 bg-secondary/40 text-white text-[10px] hover:bg-secondary/60"
            onClick={() => onNavigate?.("analytics")}
          >
            <BarChart3 className="w-3 h-3 mr-1.5" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {summaryStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all backdrop-blur-sm group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${stat.badge} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-lg bg-background/40">
                  {stat.trend.startsWith("+") ? (
                    <ArrowUpRight className="w-2.5 h-2.5 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="w-2.5 h-2.5 text-red-400" />
                  )}
                  <span className={stat.trendColor}>{stat.trend}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-white leading-tight mb-0.5">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.subtitle}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Today's Schedule */}
      <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock4 className="w-4 h-4 text-blue-400" />
              <h2 className="text-base font-bold text-white">Today&apos;s Schedule</h2>
              <span className="text-xs text-muted-foreground">({todaysSchedule.length} routes)</span>
              </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-medium text-emerald-300">19 Active</span>
            </div>
            <Button
              variant="outline"
              size="sm"
                className="h-7 rounded-lg border-border/40 bg-background/40 text-[10px] text-white hover:bg-background/60"
              onClick={() => onNavigate?.("schedule")}
            >
              View All
            </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="text-muted-foreground bg-background/40 border-b border-border/30">
                  <th className="px-3 py-2 text-left font-semibold">Area</th>
                  <th className="px-3 py-2 text-left font-semibold">Time</th>
                  <th className="px-3 py-2 text-left font-semibold">Truck</th>
                  <th className="px-3 py-2 text-left font-semibold">Agent</th>
                  <th className="px-3 py-2 text-left font-semibold">Progress</th>
                  <th className="px-3 py-2 text-left font-semibold">Status</th>
                  <th className="px-3 py-2 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todaysSchedule.map((row) => (
                  <tr
                    key={row.area}
                    className="border-b border-border/20 bg-background/20 hover:bg-background/30 transition-colors"
                  >
                    <td className="px-3 py-2">
                      <p className="text-xs font-semibold text-white">{row.area}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {row.completed}/{row.stops} stops
                      </p>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs font-medium text-white">{row.time}</p>
                      {row.status !== "scheduled" && (
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Est: {row.estimatedCompletion}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-xs font-medium text-white">{row.truck}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-xs text-white">{row.agent}</span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 rounded-full bg-background/50 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              row.status === "completed"
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                                : row.status === "delayed"
                                  ? "bg-gradient-to-r from-amber-500 to-amber-400"
                                  : "bg-gradient-to-r from-blue-500 to-blue-400"
                            }`}
                            style={{ width: `${row.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-medium text-muted-foreground w-7">
                          {row.progress}%
                        </span>
                      </div>
                      {row.delay && (
                        <p className="text-[9px] text-amber-400 mt-0.5">+{row.delay}m</p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded-lg text-[10px] font-semibold ${
                          row.status === "completed"
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : row.status === "delayed"
                              ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                              : row.status === "in-progress"
                                ? "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                                : "bg-slate-500/15 text-slate-200 border border-slate-500/30"
                        }`}
                      >
                        {row.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <Button
                          className="h-6 px-2 rounded-lg bg-background/40 border border-border/30 text-[9px] hover:bg-background/60 text-white"
                          onClick={() => onNavigate?.("schedule")}
                        >
                          Edit
                        </Button>
                        <Button
                          className="h-6 px-2 rounded-lg bg-primary/20 border border-primary/30 text-[9px] hover:bg-primary/30 text-primary"
                          onClick={() => onNavigate?.("dispatch")}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      {/* Operational Analytics, Payments & Alerts */}
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-bold text-white">Performance Trends</h2>
            </div>
          <div className="h-40 rounded-xl border border-border/40 bg-gradient-to-br from-background/40 to-background/20 px-3 pt-2 pb-3 shadow-inner mb-3">
            <svg viewBox="0 0 100 40" className="w-full h-full">
              <defs>
                <linearGradient id="pickupGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(52, 211, 153, 0.3)" />
                  <stop offset="100%" stopColor="rgba(52, 211, 153, 0.05)" />
                </linearGradient>
                <linearGradient id="paymentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(96, 165, 250, 0.3)" />
                  <stop offset="100%" stopColor="rgba(96, 165, 250, 0.05)" />
                </linearGradient>
              </defs>
              <polygon points={pickupAreaPoints} fill="url(#pickupGradient)" opacity={0.6} />
              <polyline
                points={pickupPolyline}
                fill="none"
                stroke="rgba(52, 211, 153, 1)"
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points={paymentPolyline}
                fill="none"
                stroke="rgba(96, 165, 250, 1)"
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {completionChartData.map((day, index) => {
                const x = (index / Math.max(1, completionChartData.length - 1)) * 100
                const y = 35 - (day.pickup / maxCompletion) * 25
                return (
                  <g key={`${day.label}-pickup`}>
                    <circle cx={x} cy={y} r={1.6} fill="rgba(52, 211, 153, 1)" className="drop-shadow-lg" />
                    <circle cx={x} cy={y} r={2.3} fill="rgba(52, 211, 153, 0.2)" />
                  </g>
                )
              })}
              {completionChartData.map((day, index) => {
                const x = (index / Math.max(1, completionChartData.length - 1)) * 100
                const y = 35 - (day.payment / maxCompletion) * 25
                return (
                  <g key={`${day.label}-payment`}>
                    <circle cx={x} cy={y} r={1.4} fill="rgba(96, 165, 250, 1)" className="drop-shadow-lg" />
                    <circle cx={x} cy={y} r={2.1} fill="rgba(96, 165, 250, 0.2)" />
                  </g>
                )
              })}
              {completionChartData.map((day, index) => {
                const x = (index / Math.max(1, completionChartData.length - 1)) * 100
                return (
                  <text
                    key={`${day.label}-label`}
                    x={x}
                    y={38}
                    textAnchor="middle"
                    fontSize="2.8"
                    fill="rgba(148, 163, 184, 0.8)"
                    fontWeight="500"
                  >
                    {day.label}
                  </text>
                )
              })}
            </svg>
          </div>
          <div className="space-y-2.5">
            <div>
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-muted-foreground font-medium">Pickup</span>
                <span className="text-emerald-300 font-bold">{avgPickupCompletion}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-background/50 overflow-hidden">
                <div className="h-full w-[87.2%] rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-muted-foreground font-medium">Payment</span>
                <span className="text-blue-300 font-bold">{avgPaymentCompletion}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-background/50 overflow-hidden">
                <div className="h-full w-[84.5%] rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <BadgeDollarSign className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white">Payments & Revenue</h2>
              </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="p-3 rounded-lg bg-background/40 border border-border/30 backdrop-blur-sm">
              <p className="text-muted-foreground text-[10px] mb-1 font-medium">Paid</p>
              <p className="text-lg font-bold text-emerald-300">{paidCount}</p>
              <div className="mt-1.5 h-1 rounded-full bg-background/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  style={{ width: `${(paidCount / payments.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="p-3 rounded-lg bg-background/40 border border-border/30 backdrop-blur-sm">
              <p className="text-muted-foreground text-[10px] mb-1 font-medium">Pending</p>
              <p className="text-lg font-bold text-amber-300">{unpaidCount}</p>
              <div className="mt-1.5 h-1 rounded-full bg-background/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                  style={{ width: `${(unpaidCount / payments.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="p-3 rounded-lg bg-background/40 border border-border/30 backdrop-blur-sm">
              <p className="text-muted-foreground text-[10px] mb-1 font-medium">Overdue</p>
              <p className="text-lg font-bold text-red-300">{overdueCount}</p>
              <div className="mt-1.5 h-1 rounded-full bg-background/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400"
                  style={{ width: `${(overdueCount / payments.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="p-3 rounded-lg bg-background/40 border border-border/30 backdrop-blur-sm">
              <p className="text-muted-foreground text-[10px] mb-1 font-medium">Revenue</p>
              <p className="text-lg font-bold text-white">
                Rwf {(totalRevenue / 1000).toFixed(0)}K
              </p>
              <p className="text-[9px] text-muted-foreground mt-0.5">This month</p>
            </div>
          </div>
          <div className="space-y-2 mb-3">
            <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Recent</p>
            {payments.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-background/40 border border-border/30 backdrop-blur-sm hover:bg-background/50 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{p.building}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Rwf {p.amount.toLocaleString()} • {p.method}
                  </p>
                  </div>
                  <span
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-semibold ml-2 ${
                      p.status === "paid"
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                        : p.status === "pending"
                          ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          : "bg-red-500/15 text-red-300 border border-red-500/30"
                    }`}
                  >
                    {p.status}
                  </span>
              </div>
            ))}
          </div>
          <Button
            className="w-full h-8 rounded-lg bg-primary hover:bg-primary/90 text-background text-xs font-semibold"
            onClick={() => onNavigate?.("payments")}
          >
            <BadgeDollarSign className="w-3 h-3 mr-1.5" />
            Manage Payments
          </Button>
        </Card>

        <div className="space-y-3 lg:col-span-1">
          <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-4 h-4 text-red-400" />
              <h2 className="text-sm font-bold text-white">Alerts</h2>
              <span className="text-[10px] text-muted-foreground">({alerts.length})</span>
                </div>
            <div className="space-y-2">
              {alerts.slice(0, 4).map((alert) => {
                const Icon = alert.icon
                return (
                  <div
                    key={alert.type + alert.detail}
                    className="px-2.5 py-2 rounded-lg bg-background/40 border border-border/30 backdrop-blur-sm hover:bg-background/50 transition-all"
                  >
                    <div className="flex items-start gap-2">
                      <Icon className={`w-3.5 h-3.5 mt-0.5 ${alert.tone} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <p className="text-xs font-semibold text-white">{alert.type}</p>
                          <span
                            className={`text-[8px] px-1 py-0.5 rounded ${
                              alert.priority === "high"
                                ? "bg-red-500/20 text-red-300"
                                : alert.priority === "medium"
                                  ? "bg-amber-500/20 text-amber-300"
                                  : "bg-blue-500/20 text-blue-300"
                            }`}
                          >
                            {alert.priority}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">{alert.detail}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <Button
              variant="outline"
              className="mt-3 w-full h-8 rounded-lg border-border/40 bg-background/40 text-white text-[10px] hover:bg-background/60"
              onClick={() => onNavigate?.("alerts")}
            >
              View All
            </Button>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-white">Quick Actions</h2>
              </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                className="h-8 rounded-lg bg-primary hover:bg-primary/90 text-background text-[10px] font-semibold"
                onClick={() => onNavigate?.("dispatch")}
              >
                <Truck className="w-3 h-3 mr-1" />
                Dispatch
              </Button>
              <Button
                className="h-8 rounded-lg bg-background/40 border border-border/40 text-white text-[10px] font-medium hover:bg-background/60"
                onClick={() => onNavigate?.("workers")}
              >
                <Users className="w-3 h-3 mr-1" />
                Agents
              </Button>
              <Button
                className="h-8 rounded-lg bg-background/40 border border-border/40 text-white text-[10px] font-medium hover:bg-background/60"
                onClick={() => onNavigate?.("schedule")}
              >
                <Clock4 className="w-3 h-3 mr-1" />
                Schedule
              </Button>
              <Button
                className="h-8 rounded-lg bg-background/40 border border-border/40 text-white text-[10px] font-medium hover:bg-background/60"
                onClick={() => onNavigate?.("payments")}
              >
                <BadgeDollarSign className="w-3 h-3 mr-1" />
                Reports
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
