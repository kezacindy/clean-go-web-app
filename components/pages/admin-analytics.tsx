"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  CalendarRange,
  Clock4,
  Download,
  FileText,
  Filter,
  Map,
  TrendingUp,
  TrendingDown,
  Truck,
  Users,
  Wallet,
  Activity,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

type RangeOption = "7d" | "30d" | "90d"

// More realistic and varied data series
const pickupSeries: Record<RangeOption, number[]> = {
  "7d": [87.2, 88.5, 89.1, 87.8, 90.3, 91.2, 89.7],
  "30d": [82.4, 83.7, 85.1, 84.3, 86.2, 87.5, 88.1, 86.9, 87.3, 88.7, 89.2, 87.8, 90.1, 91.4, 89.6, 88.9, 90.3, 91.7, 89.4, 88.2, 90.6, 91.3, 89.8, 88.5, 90.9, 92.1, 90.4, 89.2, 91.6, 92.3],
  "90d": [78.2, 79.5, 80.8, 79.3, 81.6, 82.9, 81.2, 80.5, 82.1, 83.4, 82.7, 81.9, 83.8, 84.5, 83.1, 82.4, 84.2, 85.3, 84.6, 83.8, 85.7, 86.2, 85.4, 84.7, 86.5, 87.1, 86.3, 85.6, 87.4, 88.2, 87.5, 86.8, 88.6, 89.1, 88.3, 87.6, 89.4, 90.2, 89.5, 88.8, 90.6, 91.3, 90.5, 89.8, 91.6, 92.1, 91.3, 90.6, 92.4, 93.1, 92.3, 91.6, 93.4, 94.2, 93.5, 92.8, 94.6, 95.1, 94.3, 93.6, 95.4, 96.2, 95.5, 94.8, 96.6, 97.1, 96.3, 95.6, 97.4, 98.2, 97.5, 96.8, 98.6, 99.1, 98.3, 97.6, 99.4, 100.0, 99.3, 98.6, 100.0, 99.2, 98.5, 99.8, 99.1, 98.4],
}

const paymentSeries: Record<RangeOption, number[]> = {
  "7d": [84.3, 85.7, 86.2, 84.9, 87.1, 88.4, 86.8],
  "30d": [79.2, 80.5, 81.8, 80.3, 82.6, 83.9, 82.2, 81.5, 83.1, 84.4, 83.7, 82.9, 84.8, 85.5, 84.1, 83.4, 85.2, 86.3, 85.6, 84.8, 86.7, 87.2, 86.4, 85.7, 87.5, 88.1, 87.3, 86.6, 88.4, 89.2],
  "90d": [75.2, 76.5, 77.8, 76.3, 78.6, 79.9, 78.2, 77.5, 79.1, 80.4, 79.7, 78.9, 80.8, 81.5, 80.1, 79.4, 81.2, 82.3, 81.6, 80.8, 82.7, 83.2, 82.4, 81.7, 83.5, 84.1, 83.3, 82.6, 84.4, 85.2, 84.5, 83.8, 85.6, 86.1, 85.3, 84.6, 86.4, 87.2, 86.5, 85.8, 87.6, 88.1, 87.3, 86.6, 88.4, 89.2, 88.5, 87.8, 89.6, 90.1, 89.3, 88.6, 90.4, 91.2, 90.5, 89.8, 91.6, 92.1, 91.3, 90.6, 92.4, 93.2, 92.5, 91.8, 93.6, 94.1, 93.3, 92.6, 94.4, 95.2, 94.5, 93.8, 95.6, 96.1, 95.3, 94.6, 96.4, 97.2, 96.5, 95.8, 97.6, 98.1, 97.3, 96.6, 98.4, 99.2],
}

const getLabels = (range: RangeOption): string[] => {
  if (range === "7d") return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  if (range === "30d") {
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    })
  }
  // 90d - show every 10 days
  return Array.from({ length: 9 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (80 - i * 10))
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  })
}

// Realistic agent performance data
const agentPerformanceData = [
  {
    name: "Sarah Achieng",
    pickups: 247,
    rate: 96.8,
    avgTime: 38,
    onTime: 98.2,
    revenue: 1850000,
    trend: "up" as const,
    change: 4.2,
  },
  {
    name: "David Musoke",
    pickups: 223,
    rate: 94.3,
    avgTime: 41,
    onTime: 96.5,
    revenue: 1675000,
    trend: "up" as const,
    change: 2.8,
  },
  {
    name: "Grace Wanjiru",
    pickups: 198,
    rate: 91.7,
    avgTime: 44,
    onTime: 93.2,
    revenue: 1485000,
    trend: "up" as const,
    change: 1.5,
  },
  {
    name: "Patricia Nafula",
    pickups: 187,
    rate: 89.4,
    avgTime: 47,
    onTime: 91.8,
    revenue: 1402500,
    trend: "down" as const,
    change: -0.8,
  },
  {
    name: "James Kariuki",
    pickups: 176,
    rate: 87.2,
    avgTime: 49,
    onTime: 89.5,
    revenue: 1320000,
    trend: "up" as const,
    change: 0.6,
  },
  {
    name: "Mary Njeri",
    pickups: 165,
    rate: 85.1,
    avgTime: 52,
    onTime: 87.3,
    revenue: 1237500,
    trend: "down" as const,
    change: -1.2,
  },
]

// Realistic truck data
const truckData = [
  { id: "TRK-001", trips: 142, efficiency: 94.2, fuelEfficiency: 8.7, maintenance: "Good", status: "active" },
  { id: "TRK-002", trips: 138, efficiency: 92.8, fuelEfficiency: 8.5, maintenance: "Good", status: "active" },
  { id: "TRK-003", trips: 131, efficiency: 91.5, fuelEfficiency: 8.3, maintenance: "Good", status: "active" },
  { id: "TRK-004", trips: 125, efficiency: 88.7, fuelEfficiency: 7.9, maintenance: "Due Soon", status: "active" },
  { id: "TRK-005", trips: 119, efficiency: 86.3, fuelEfficiency: 7.6, maintenance: "Due Soon", status: "active" },
  { id: "TRK-006", trips: 98, efficiency: 81.2, fuelEfficiency: 7.1, maintenance: "Overdue", status: "maintenance" },
]

// Realistic area performance data
const areaPerformanceData = {
  best: [
    { area: "Kigali – Nyarugenge", rate: 96.8, pickups: 1247, revenue: 9352500, trend: 2.4 },
    { area: "Kigali – Kicukiro", rate: 95.2, pickups: 1156, revenue: 8670000, trend: 1.8 },
    { area: "Rubavu – Gisenyi", rate: 93.7, pickups: 892, revenue: 6690000, trend: 1.2 },
    { area: "Musanze – City Center", rate: 92.1, pickups: 743, revenue: 5572500, trend: 0.9 },
  ],
  needsAttention: [
    { area: "Huye – Tumba", rate: 84.3, pickups: 567, revenue: 4252500, trend: -1.2 },
    { area: "Nyagatare – Town", rate: 81.7, pickups: 432, revenue: 3240000, trend: -2.1 },
    { area: "Karongi – Center", rate: 79.5, pickups: 389, revenue: 2917500, trend: -1.8 },
    { area: "Rusizi – Border", rate: 77.2, pickups: 298, revenue: 2235000, trend: -2.5 },
  ],
}

// Revenue data for different periods
const revenueData: Record<RangeOption, number[]> = {
  "7d": [3.2, 3.4, 3.5, 3.3, 3.6, 3.8, 3.7],
  "30d": [2.8, 2.9, 3.0, 2.95, 3.1, 3.2, 3.15, 3.05, 3.1, 3.25, 3.3, 3.2, 3.4, 3.5, 3.35, 3.3, 3.45, 3.6, 3.5, 3.4, 3.55, 3.7, 3.6, 3.5, 3.65, 3.8, 3.7, 3.6, 3.75, 3.9],
  "90d": [2.2, 2.3, 2.4, 2.35, 2.5, 2.6, 2.55, 2.5, 2.6, 2.7, 2.65, 2.6, 2.75, 2.8, 2.7, 2.65, 2.8, 2.9, 2.85, 2.8, 2.95, 3.0, 2.9, 2.85, 3.0, 3.1, 3.05, 3.0, 3.15, 3.2, 3.1, 3.05, 3.2, 3.3, 3.25, 3.2, 3.35, 3.4, 3.3, 3.25, 3.4, 3.5, 3.45, 3.4, 3.55, 3.6, 3.5, 3.45, 3.6, 3.7, 3.65, 3.6, 3.75, 3.8, 3.7, 3.65, 3.8, 3.9, 3.85, 3.8, 3.95, 4.0, 3.9, 3.85, 4.0, 4.1, 4.05, 4.0, 4.15, 4.2, 4.1, 4.05, 4.2, 4.3, 4.25, 4.2, 4.35, 4.4],
}

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState<RangeOption>("7d")
  const [area, setArea] = useState("All areas")
  const [agent, setAgent] = useState("All agents")
  const [lastAppliedFilters, setLastAppliedFilters] = useState({
    range: "7d" as RangeOption,
    area: "All areas",
    agent: "All agents",
  })

  const scaleForArea = (value: number) => {
    switch (area) {
      case "Kigali":
        return value * 1.05
      case "Rubavu":
        return value * 0.98
      case "Huye":
        return value * 0.92
      default:
        return value
    }
  }

  const scaleForAgent = (value: number) => {
    switch (agent) {
      case "Top performers":
        return value * 1.06
      case "Needs attention":
        return value * 0.88
      default:
        return value
    }
  }

  const applyScales = (values: number[]) =>
    values.map((v) => Math.min(100, Math.max(0, Math.round(scaleForAgent(scaleForArea(v)) * 10) / 10)))

  const handleApplyFilters = () => {
    setLastAppliedFilters({
      range,
      area,
      agent,
    })
  }

  const pickupValues = applyScales(pickupSeries[range])
  const paymentValues = applyScales(paymentSeries[range])
  const revenueValues = revenueData[range]
  const labels = getLabels(range)
  const maxValue = Math.max(...pickupValues, ...paymentValues)
  const maxRevenue = Math.max(...revenueValues)

  const buildPolyline = (values: number[]) => {
    return values
      .map((value, index) => {
        const x = (index / Math.max(1, values.length - 1)) * 100
        const y = 35 - (value / maxValue) * 25
        return `${x},${y}`
      })
      .join(" ")
  }

  const pickupPolyline = buildPolyline(pickupValues)
  const paymentPolyline = buildPolyline(paymentValues)

  // Calculate key metrics
  const avgPickupCompletion = useMemo(
    () => Math.round((pickupValues.reduce((a, v) => a + v, 0) / pickupValues.length) * 10) / 10,
    [pickupValues],
  )
  const avgPaymentSuccess = useMemo(
    () => Math.round((paymentValues.reduce((a, v) => a + v, 0) / paymentValues.length) * 10) / 10,
    [paymentValues],
  )
  const totalRevenue = useMemo(
    () => revenueValues.reduce((a, v) => a + v, 0).toFixed(1),
    [revenueValues],
  )
  const avgRevenue = useMemo(() => (revenueValues.reduce((a, v) => a + v, 0) / revenueValues.length).toFixed(2), [revenueValues])

  // Filter agents based on selection
  const filteredAgents = useMemo(() => {
    if (agent === "Top performers") {
      return agentPerformanceData.filter((a) => a.rate >= 92)
    }
    if (agent === "Needs attention") {
      return agentPerformanceData.filter((a) => a.rate < 90)
    }
    return agentPerformanceData
  }, [agent])

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Analytics & Insights</h1>
              <p className="text-sm text-muted-foreground">
                Comprehensive performance analytics and operational intelligence
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border/50 px-4 py-2.5 shadow-lg shadow-black/10">
            <CalendarRange className="w-4 h-4 text-primary" />
            <select
              value={range}
              onChange={(e) => setRange(e.target.value as RangeOption)}
              className="bg-transparent text-sm text-white font-medium outline-none border-none focus:ring-0 cursor-pointer"
            >
              <option className="bg-background" value="7d">
                Last 7 days
              </option>
              <option className="bg-background" value="30d">
                Last 30 days
              </option>
              <option className="bg-background" value="90d">
                Last 90 days
              </option>
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border/50 px-4 py-2.5 shadow-lg shadow-black/10">
            <Map className="w-4 h-4 text-primary" />
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="bg-transparent text-sm text-white font-medium outline-none border-none focus:ring-0 cursor-pointer"
            >
              <option className="bg-background" value="All areas">
                All areas
              </option>
              <option className="bg-background" value="Kigali">
                Kigali
              </option>
              <option className="bg-background" value="Rubavu">
                Rubavu
              </option>
              <option className="bg-background" value="Huye">
                Huye
              </option>
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border/50 px-4 py-2.5 shadow-lg shadow-black/10">
            <Users className="w-4 h-4 text-primary" />
            <select
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
              className="bg-transparent text-sm text-white font-medium outline-none border-none focus:ring-0 cursor-pointer"
            >
              <option className="bg-background" value="All agents">
                All agents
              </option>
              <option className="bg-background" value="Top performers">
                Top performers
              </option>
              <option className="bg-background" value="Needs attention">
                Needs attention
              </option>
            </select>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-xl border-primary/30 bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 hover:border-primary/50 shadow-lg shadow-primary/10 transition-all"
            onClick={handleApplyFilters}
          >
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 rounded-2xl shadow-xl shadow-emerald-500/5 hover:shadow-emerald-500/10 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
              +2.4%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Pickup Completion Rate</p>
          <p className="text-2xl font-bold text-white">{avgPickupCompletion}%</p>
          <p className="text-[10px] text-muted-foreground mt-1">
            {lastAppliedFilters.range === "7d" ? "Last 7 days" : lastAppliedFilters.range === "30d" ? "Last 30 days" : "Last 90 days"}
          </p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 rounded-2xl shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">
              +1.8%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Payment Success Rate</p>
          <p className="text-2xl font-bold text-white">{avgPaymentSuccess}%</p>
          <p className="text-[10px] text-muted-foreground mt-1">
            {lastAppliedFilters.range === "7d" ? "Last 7 days" : lastAppliedFilters.range === "30d" ? "Last 30 days" : "Last 90 days"}
          </p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 rounded-2xl shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-2 py-1 rounded-lg">
              +3.2%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-white">Rwf {totalRevenue}M</p>
          <p className="text-[10px] text-muted-foreground mt-1">Avg: Rwf {avgRevenue}M/day</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20 rounded-2xl shadow-xl shadow-amber-500/5 hover:shadow-amber-500/10 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Clock4 className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg">
              -5.2%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Avg Pickup Time</p>
          <p className="text-2xl font-bold text-white">42 min</p>
          <p className="text-[10px] text-muted-foreground mt-1">Target: 40 min</p>
        </Card>
      </div>

      {/* Main Analytics Chart */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-2xl lg:col-span-2 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Performance Trends</h2>
                <p className="text-xs text-muted-foreground">
                  {lastAppliedFilters.range === "7d"
                    ? "Daily"
                    : lastAppliedFilters.range === "30d"
                      ? "Weekly"
                      : "Monthly"}{" "}
                  completion trends • {lastAppliedFilters.area} • {lastAppliedFilters.agent}
                </p>
              </div>
            </div>
          </div>
          <div className="h-64 rounded-2xl border border-border/40 bg-background/30 backdrop-blur-sm px-6 pt-4 pb-6 shadow-inner">
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
                <pattern id="pickupPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                  <path d="M-1 1 L1 -1 M0 4 L4 0 M3 5 L5 3" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="0.3" />
                </pattern>
              </defs>
              <polygon
                points={`${pickupPolyline} 100,40 0,40`}
                fill="url(#pickupGradient)"
                opacity={0.6}
              />
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
              {pickupValues.map((value, index) => {
                const x = (index / Math.max(1, pickupValues.length - 1)) * 100
                const y = 35 - (value / maxValue) * 25
                return (
                  <g key={`p-${index}`}>
                    <circle cx={x} cy={y} r={1.8} fill="rgba(52, 211, 153, 1)" className="drop-shadow-lg" />
                    <circle cx={x} cy={y} r={2.5} fill="rgba(52, 211, 153, 0.2)" />
                  </g>
                )
              })}
              {paymentValues.map((value, index) => {
                const x = (index / Math.max(1, paymentValues.length - 1)) * 100
                const y = 35 - (value / maxValue) * 25
                return (
                  <g key={`pay-${index}`}>
                    <circle cx={x} cy={y} r={1.6} fill="rgba(96, 165, 250, 1)" className="drop-shadow-lg" />
                    <circle cx={x} cy={y} r={2.3} fill="rgba(96, 165, 250, 0.2)" />
                  </g>
                )
              })}
              {labels.map((label, index) => {
                if (index >= pickupValues.length) return null
                const x = (index / Math.max(1, pickupValues.length - 1)) * 100
                return (
                  <text
                    key={label}
                    x={x}
                    y={38}
                    textAnchor="middle"
                    fontSize={2.8}
                    fill="rgba(148, 163, 184, 0.8)"
                    fontWeight="500"
                  >
                    {label.length > 6 ? label.substring(0, 5) : label}
                  </text>
                )
              })}
            </svg>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                <span className="text-xs font-medium text-muted-foreground">Pickup Completion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
                <span className="text-xs font-medium text-muted-foreground">Payment Success</span>
              </div>
            </div>
            <div className="flex gap-6 text-xs">
              <div>
                <p className="text-muted-foreground text-[10px] mb-0.5">Avg Completion</p>
                <p className="text-emerald-300 font-bold text-sm">{avgPickupCompletion}%</p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px] mb-0.5">Avg Payment</p>
                <p className="text-blue-300 font-bold text-sm">{avgPaymentSuccess}%</p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px] mb-0.5">Avg Time</p>
                <p className="text-white font-bold text-sm">42 min</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Analytics Card */}
        <Card className="p-6 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-2xl backdrop-blur-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Revenue Analytics</h2>
              <p className="text-xs text-muted-foreground">Monthly trends</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Revenue</span>
              <span className="text-emerald-300 font-bold text-lg">Rwf {totalRevenue}M</span>
            </div>
            <div className="h-24 rounded-xl border border-border/40 bg-background/30 flex items-end gap-1.5 px-3 pb-3 shadow-inner">
              {revenueValues.map((value, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/30 transition-all hover:opacity-80"
                  style={{ height: `${(value / maxRevenue) * 100}%` }}
                  title={`Rwf ${value.toFixed(1)}M`}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
              <p className="text-muted-foreground text-[10px] mb-1.5">Paid Customers</p>
              <p className="text-lg font-bold text-emerald-300">87.3%</p>
              <div className="mt-1.5 h-1.5 rounded-full bg-background/50 overflow-hidden">
                <div className="h-full w-[87.3%] rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
              <p className="text-muted-foreground text-[10px] mb-1.5">Unpaid</p>
              <p className="text-lg font-bold text-amber-300">12.7%</p>
              <div className="mt-1.5 h-1.5 rounded-full bg-background/50 overflow-hidden">
                <div className="h-full w-[12.7%] rounded-full bg-gradient-to-r from-amber-500 to-amber-400" />
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
              <p className="text-muted-foreground text-[10px] mb-1.5">Late Payments</p>
              <p className="text-lg font-bold text-red-300">7.2%</p>
              <div className="mt-1.5 h-1.5 rounded-full bg-background/50 overflow-hidden">
                <div className="h-full w-[7.2%] rounded-full bg-gradient-to-r from-red-500 to-red-400" />
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
              <p className="text-muted-foreground text-[10px] mb-1.5">Invoice Age</p>
              <p className="text-lg font-bold text-white">11 days</p>
              <div className="mt-1.5 h-1.5 rounded-full bg-background/50 overflow-hidden">
                <div className="h-full w-[73%] rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Agent Performance Section */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-2xl lg:col-span-2 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Agent Performance</h2>
                <p className="text-xs text-muted-foreground">{filteredAgents.length} agents shown</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              {filteredAgents.slice(0, 4).map((agentRow) => (
                <div
                  key={agentRow.name}
                  className="flex items-center justify-between rounded-xl bg-background/40 border border-border/30 px-4 py-3 backdrop-blur-sm hover:bg-background/50 transition-all shadow-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-white">{agentRow.name}</p>
                      {agentRow.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-red-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {agentRow.pickups} pickups • {agentRow.avgTime} min avg
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Rwf {(agentRow.revenue / 1000000).toFixed(2)}M revenue
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-base font-bold ${agentRow.rate >= 92 ? "text-emerald-300" : agentRow.rate >= 87 ? "text-amber-300" : "text-red-300"}`}>
                      {agentRow.rate}%
                    </span>
                    <p className={`text-[10px] ${agentRow.change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {agentRow.change > 0 ? "+" : ""}{agentRow.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg Pickups/Agent</p>
                  <span className="text-sm font-bold text-white">156</span>
                </div>
                <div className="h-2.5 rounded-full bg-background/50 overflow-hidden">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/30" />
                </div>
                <p className="mt-1.5 text-[10px] text-muted-foreground">78% of target this month</p>
              </div>
              <div className="p-4 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">On-Time Completion</p>
                  <span className="text-sm font-bold text-white">93.2%</span>
                </div>
                <div className="h-2.5 rounded-full bg-background/50 overflow-hidden">
                  <div className="h-full w-[93%] rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/30" />
                </div>
                <p className="mt-1.5 text-[10px] text-muted-foreground">93% within SLA</p>
              </div>
              <div className="p-4 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock4 className="w-4 h-4" />
                  <span>Avg handle time: 42 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>6 agents exceeding targets</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Truck Analytics */}
        <Card className="p-6 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-2xl backdrop-blur-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Truck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Fleet Analytics</h2>
              <p className="text-xs text-muted-foreground">{truckData.length} active trucks</p>
            </div>
          </div>
          <div className="space-y-3">
            {truckData.slice(0, 4).map((truckRow) => (
              <div
                key={truckRow.id}
                className="flex items-center justify-between rounded-xl bg-background/40 border border-border/30 px-4 py-3 backdrop-blur-sm hover:bg-background/50 transition-all shadow-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white">{truckRow.id}</p>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        truckRow.status === "active"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {truckRow.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {truckRow.trips} trips • {truckRow.fuelEfficiency} km/L
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Maintenance: {truckRow.maintenance}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-base font-bold ${
                      truckRow.efficiency >= 90
                        ? "text-emerald-300"
                        : truckRow.efficiency >= 85
                          ? "text-amber-300"
                          : "text-red-300"
                    }`}
                  >
                    {truckRow.efficiency}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Route Efficiency</p>
              <span className="text-sm font-bold text-white">87.4%</span>
            </div>
            <div className="h-2.5 rounded-full bg-background/50 overflow-hidden">
              <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/30" />
            </div>
            <p className="mt-1.5 text-[10px] text-muted-foreground">Weighted by distance, stops, delays</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>4.2% improvement vs last month</span>
          </div>
        </Card>
      </div>

      {/* Area Performance & Reporting */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-2xl lg:col-span-2 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Map className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Regional Performance</h2>
              <p className="text-xs text-muted-foreground">Area-wise analytics</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <p className="text-xs font-semibold text-muted-foreground">Top Performers</p>
              </div>
              {areaPerformanceData.best.map((row) => (
                <div
                  key={row.area}
                  className="rounded-xl bg-background/40 border border-border/30 px-3.5 py-2.5 flex items-center justify-between backdrop-blur-sm hover:bg-background/50 transition-all shadow-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{row.area}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {row.pickups} pickups • Rwf {(row.revenue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="text-right ml-2">
                    <span className="text-sm font-bold text-emerald-300">{row.rate}%</span>
                    <p className={`text-[9px] ${row.trend > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {row.trend > 0 ? "+" : ""}{row.trend}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <p className="text-xs font-semibold text-muted-foreground">Needs Attention</p>
              </div>
              {areaPerformanceData.needsAttention.map((row) => (
                <div
                  key={row.area}
                  className="rounded-xl bg-background/40 border border-border/30 px-3.5 py-2.5 flex items-center justify-between backdrop-blur-sm hover:bg-background/50 transition-all shadow-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{row.area}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {row.pickups} pickups • Rwf {(row.revenue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="text-right ml-2">
                    <span className="text-sm font-bold text-amber-300">{row.rate}%</span>
                    <p className={`text-[9px] ${row.trend > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {row.trend > 0 ? "+" : ""}{row.trend}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Pickup Density Map</p>
              <div className="h-40 rounded-xl border border-border/40 bg-background/30 p-3 grid grid-cols-6 grid-rows-5 gap-1.5 shadow-inner">
                {Array.from({ length: 30 }).map((_, index) => (
                  <div
                    key={index}
                    className={`rounded transition-all ${
                      index % 8 === 0
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/30"
                        : index % 5 === 0
                          ? "bg-gradient-to-br from-emerald-500/60 to-emerald-400/60"
                          : index % 3 === 0
                            ? "bg-gradient-to-br from-blue-500/40 to-blue-400/40"
                            : "bg-slate-800/50"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-emerald-500 to-emerald-400 shadow-lg" />
                  <span>High</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-blue-500/60 to-blue-400/60" />
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-slate-700/50" />
                  <span>Low</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Reporting Card */}
        <Card className="p-6 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-2xl backdrop-blur-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Reports & Exports</h2>
              <p className="text-xs text-muted-foreground">Generate insights</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Export filtered analytics data or generate comprehensive monthly summary reports for stakeholders and management.
          </p>
          <div className="space-y-2.5">
            <Button
              className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-background text-sm font-semibold shadow-lg shadow-primary/20 transition-all"
              onClick={() => {
                const headers = ["Metric", "Value"]
                const rows = [
                  ["Date Range", lastAppliedFilters.range],
                  ["Area Filter", lastAppliedFilters.area],
                  ["Agent Filter", lastAppliedFilters.agent],
                  ["Avg Pickup Completion", `${avgPickupCompletion}%`],
                  ["Avg Payment Success", `${avgPaymentSuccess}%`],
                  ["Total Revenue", `Rwf ${totalRevenue}M`],
                  ["Avg Revenue/Day", `Rwf ${avgRevenue}M`],
                ]
                const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
                const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
                const url = URL.createObjectURL(blob)
                const link = document.createElement("a")
                link.href = url
                link.setAttribute("download", `cleango-analytics-${new Date().toISOString().split("T")[0]}.csv`)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                URL.revokeObjectURL(url)
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              className="w-full h-11 rounded-xl bg-background/40 border border-border/40 text-white text-sm font-semibold hover:bg-background/60 transition-all shadow-lg"
              onClick={() => {
                const summary = `CleanGo Analytics Report\nGenerated: ${new Date().toLocaleString()}\n\n=== FILTERS ===\nDate Range: ${lastAppliedFilters.range}\nArea: ${lastAppliedFilters.area}\nAgent Filter: ${lastAppliedFilters.agent}\n\n=== METRICS ===\nAverage Pickup Completion: ${avgPickupCompletion}%\nAverage Payment Success: ${avgPaymentSuccess}%\nTotal Revenue: Rwf ${totalRevenue}M\nAverage Revenue/Day: Rwf ${avgRevenue}M\n\n=== SUMMARY ===\nThis report contains comprehensive analytics data for the selected filters.`
                const blob = new Blob([summary], { type: "text/plain" })
                const url = URL.createObjectURL(blob)
                const link = document.createElement("a")
                link.href = url
                link.setAttribute("download", `cleango-analytics-${new Date().toISOString().split("T")[0]}.txt`)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                URL.revokeObjectURL(url)
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button
              className="w-full h-11 rounded-xl bg-background/40 border border-border/40 text-white text-sm font-semibold hover:bg-background/60 transition-all shadow-lg"
              onClick={() => {
                window.alert(
                  `Monthly summary report generated successfully for ${lastAppliedFilters.area} – ${lastAppliedFilters.agent.toLowerCase()}.\n\nThe report includes:\n• Performance metrics\n• Revenue analytics\n• Agent statistics\n• Regional breakdown\n\nReport will be available in your dashboard.`,
                )
              }}
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Summary
            </Button>
          </div>
          <div className="pt-4 border-t border-border/30 space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last Export</span>
              <span className="text-white font-medium">
                {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Scheduled Reports</span>
              <span className="text-emerald-300 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Enabled
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Next Auto-Export</span>
              <span className="text-white font-medium">Tomorrow, 08:00</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
