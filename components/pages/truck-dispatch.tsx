"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Edit,
  MapPin,
  Truck,
  Users,
  Activity,
  Fuel,
  Wrench,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  Filter,
  Search,
  Calendar,
  Gauge,
} from "lucide-react"

type TruckStatus = "in-operation" | "available" | "maintenance" | "offline"

type Truck = {
  id: string
  plate: string
  status: TruckStatus
  region: string
  team: {
    driver: string
    collectors: string[]
    fieldAgent: string
  }
  color: string
  fuelEfficiency: number
  tripsThisMonth: number
  lastServiceDate: string
  nextServiceDate: string
  maintenanceStatus: "Good" | "Due Soon" | "Overdue"
  efficiency: number
  currentRoute?: string
  estimatedReturn?: string
}

const trucksSeed: Truck[] = [
  {
    id: "TRK-001",
    plate: "RAB-1234",
    status: "in-operation",
    region: "Kigali",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    team: {
      driver: "John Mukasa",
      collectors: ["Peter Ouma", "James Kibet"],
      fieldAgent: "Sarah Achieng",
    },
    fuelEfficiency: 8.7,
    tripsThisMonth: 142,
    lastServiceDate: "2025-01-05",
    nextServiceDate: "2025-02-05",
    maintenanceStatus: "Good",
    efficiency: 94.2,
    currentRoute: "Kigali – Nyarugenge",
    estimatedReturn: "14:30",
  },
  {
    id: "TRK-002",
    plate: "RAB-5678",
    status: "available",
    region: "Kigali",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    team: {
      driver: "Paul Niyonsenga",
      collectors: ["Jean Bosco", "Eric Nkurunziza"],
      fieldAgent: "David Musoke",
    },
    fuelEfficiency: 8.5,
    tripsThisMonth: 138,
    lastServiceDate: "2025-01-08",
    nextServiceDate: "2025-02-08",
    maintenanceStatus: "Good",
    efficiency: 92.8,
  },
  {
    id: "TRK-003",
    plate: "RAB-9012",
    status: "in-operation",
    region: "Rubavu",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    team: {
      driver: "Alice Tuyishime",
      collectors: ["Eric Habimana", "Yves Mugisha"],
      fieldAgent: "Grace Wanjiru",
    },
    fuelEfficiency: 8.3,
    tripsThisMonth: 131,
    lastServiceDate: "2025-01-03",
    nextServiceDate: "2025-02-03",
    maintenanceStatus: "Good",
    efficiency: 91.5,
    currentRoute: "Rubavu – Gisenyi",
    estimatedReturn: "15:45",
  },
  {
    id: "TRK-004",
    plate: "RAB-3456",
    status: "maintenance",
    region: "Huye",
    color: "bg-gradient-to-br from-amber-500 to-amber-600",
    team: {
      driver: "Joseph Karemera",
      collectors: ["Felix Mugenzi", "Patrick Nsengimana"],
      fieldAgent: "Patricia Nafula",
    },
    fuelEfficiency: 7.9,
    tripsThisMonth: 125,
    lastServiceDate: "2024-12-20",
    nextServiceDate: "2025-01-20",
    maintenanceStatus: "Overdue",
    efficiency: 88.7,
  },
  {
    id: "TRK-005",
    plate: "RAB-7890",
    status: "in-operation",
    region: "Musanze",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    team: {
      driver: "Marie Claire Uwimana",
      collectors: ["Alexis Nkurunziza", "Emmanuel Niyonshuti"],
      fieldAgent: "James Kariuki",
    },
    fuelEfficiency: 8.6,
    tripsThisMonth: 148,
    lastServiceDate: "2025-01-10",
    nextServiceDate: "2025-02-10",
    maintenanceStatus: "Good",
    efficiency: 95.1,
    currentRoute: "Musanze – City Center",
    estimatedReturn: "13:20",
  },
  {
    id: "TRK-006",
    plate: "RAB-2468",
    status: "available",
    region: "Kigali",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    team: {
      driver: "François Nkurunziza",
      collectors: ["Jean de Dieu", "Thierry Mutabazi"],
      fieldAgent: "Mary Njeri",
    },
    fuelEfficiency: 8.4,
    tripsThisMonth: 135,
    lastServiceDate: "2025-01-12",
    nextServiceDate: "2025-02-12",
    maintenanceStatus: "Good",
    efficiency: 90.3,
  },
  {
    id: "TRK-007",
    plate: "RAB-1357",
    status: "in-operation",
    region: "Nyagatare",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    team: {
      driver: "Innocent Nkurunziza",
      collectors: ["Pascal Nkurunziza", "Fabrice Nsengimana"],
      fieldAgent: "Grace Wanjiru",
    },
    fuelEfficiency: 8.2,
    tripsThisMonth: 119,
    lastServiceDate: "2025-01-01",
    nextServiceDate: "2025-02-01",
    maintenanceStatus: "Due Soon",
    efficiency: 87.4,
    currentRoute: "Nyagatare – Town",
    estimatedReturn: "16:00",
  },
  {
    id: "TRK-008",
    plate: "RAB-3691",
    status: "offline",
    region: "Karongi",
    color: "bg-gradient-to-br from-slate-500 to-slate-600",
    team: {
      driver: "Emmanuel Nkurunziza",
      collectors: ["Jean Claude", "André Nkurunziza"],
      fieldAgent: "Patricia Nafula",
    },
    fuelEfficiency: 7.6,
    tripsThisMonth: 98,
    lastServiceDate: "2024-12-15",
    nextServiceDate: "2025-01-15",
    maintenanceStatus: "Overdue",
    efficiency: 81.2,
  },
]

const statusStyles: Record<TruckStatus, { bg: string; text: string; border: string; icon: typeof CheckCircle2 }> = {
  "in-operation": {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
    icon: Activity,
  },
  available: {
    bg: "bg-blue-500/15",
    text: "text-blue-300",
    border: "border-blue-500/30",
    icon: CheckCircle2,
  },
  maintenance: {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
    icon: Wrench,
  },
  offline: {
    bg: "bg-slate-500/15",
    text: "text-slate-300",
    border: "border-slate-500/30",
    icon: AlertCircle,
  },
}

const maintenanceStyles: Record<string, { bg: string; text: string }> = {
  Good: { bg: "bg-emerald-500/15", text: "text-emerald-300" },
  "Due Soon": { bg: "bg-amber-500/15", text: "text-amber-300" },
  Overdue: { bg: "bg-red-500/15", text: "text-red-300" },
}

export default function TruckDispatch() {
  const [trucks, setTrucks] = useState<Truck[]>(trucksSeed)
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null)
  const [showDispatchModal, setShowDispatchModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [dispatchRegion, setDispatchRegion] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<TruckStatus | "all">("all")

  const regions = useMemo(
    () => ["Kigali", "Rubavu", "Huye", "Musanze", "Nyagatare", "Karongi", "Rusizi"],
    [],
  )

  const filteredTrucks = useMemo(() => {
    return trucks.filter((truck) => {
      const matchesSearch =
        truck.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.region.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || truck.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [trucks, searchQuery, statusFilter])

  const stats = useMemo(() => {
    const inOperation = trucks.filter((t) => t.status === "in-operation").length
    const available = trucks.filter((t) => t.status === "available").length
    const maintenance = trucks.filter((t) => t.status === "maintenance").length
    const totalTrips = trucks.reduce((sum, t) => sum + t.tripsThisMonth, 0)
    const avgEfficiency = trucks.reduce((sum, t) => sum + t.efficiency, 0) / trucks.length

    return {
      inOperation,
      available,
      maintenance,
      totalTrips,
      avgEfficiency: avgEfficiency.toFixed(1),
    }
  }, [trucks])

  const openDispatch = (truck: Truck) => {
    setSelectedTruck(truck)
    setDispatchRegion(truck.region)
    setShowDispatchModal(true)
  }

  const openTeam = (truck: Truck) => {
    setSelectedTruck(truck)
    setShowTeamModal(true)
  }

  const handleDispatch = () => {
    if (selectedTruck) {
      setTrucks((prev) =>
        prev.map((t) =>
          t.id === selectedTruck.id
            ? { ...t, region: dispatchRegion || t.region, status: "in-operation" as TruckStatus }
            : t,
        ),
      )
    }
    setShowDispatchModal(false)
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Truck & Dispatch Management</h1>
              <p className="text-sm text-muted-foreground">
                Manage fleet operations, dispatch routes, and monitor truck performance
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => openDispatch(trucks.find((t) => t.status === "available") || trucks[0])}
          className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-background px-5 h-11 rounded-xl font-semibold shadow-lg shadow-primary/20"
        >
          <MapPin className="w-4 h-4" />
          Dispatch Truck
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="p-5 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
              Active
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">In Operation</p>
          <p className="text-2xl font-bold text-white">{stats.inOperation}</p>
          <p className="text-[10px] text-muted-foreground mt-1">of {trucks.length} trucks</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">
              Ready
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Available</p>
          <p className="text-2xl font-bold text-white">{stats.available}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Ready for dispatch</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
              <Wrench className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg">
              Service
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Maintenance</p>
          <p className="text-2xl font-bold text-white">{stats.maintenance}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Requires attention</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Gauge className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-2 py-1 rounded-lg">
              {stats.avgEfficiency}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Avg Efficiency</p>
          <p className="text-2xl font-bold text-white">{stats.totalTrips}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Total trips this month</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-xs font-medium text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-lg">
              +4.2%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Fleet Utilization</p>
          <p className="text-2xl font-bold text-white">79%</p>
          <p className="text-[10px] text-muted-foreground mt-1">vs last month</p>
        </Card>
      </div>

      {/* Truck Distribution Map */}
      <Card className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Fleet Distribution Map</h2>
              <p className="text-xs text-muted-foreground">Real-time truck locations</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-300">Live Tracking</span>
          </div>
        </div>
        <div className="h-[400px] rounded-2xl border border-border/40 bg-gradient-to-br from-background/40 to-background/20 relative overflow-hidden shadow-inner">
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-5">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-border/20" />
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 flex items-center justify-center shadow-2xl shadow-primary/20">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center px-4">
              <p className="text-base font-bold text-white mb-1">
                {stats.inOperation} Trucks Active Across {regions.length} Regions
              </p>
              <p className="text-xs text-muted-foreground">
                Interactive map showing real-time truck locations and route assignments
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
              {trucks
                .filter((t) => t.status === "in-operation")
                .slice(0, 4)
                .map((truck) => (
                  <div
                    key={truck.id}
                    className="px-4 py-2.5 rounded-xl bg-background/60 border border-border/30 backdrop-blur-sm shadow-lg flex items-center gap-2.5"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                    <div>
                      <p className="text-sm font-semibold text-white">{truck.id}</p>
                      <p className="text-[10px] text-muted-foreground">{truck.region}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by ID, plate, or region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background/40 border border-border/30 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TruckStatus | "all")}
            className="px-4 py-2.5 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60"
          >
            <option value="all" className="bg-background">All Status</option>
            <option value="in-operation" className="bg-background">In Operation</option>
            <option value="available" className="bg-background">Available</option>
            <option value="maintenance" className="bg-background">Maintenance</option>
            <option value="offline" className="bg-background">Offline</option>
          </select>
        </div>
      </div>

      {/* Trucks Table */}
      <Card className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="px-6 py-5 border-b border-border/30 bg-background/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Fleet Overview</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {filteredTrucks.length} truck{filteredTrucks.length !== 1 ? "s" : ""} shown
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-muted-foreground bg-background/40 border-b border-border/30">
                <th className="px-6 py-4 text-left font-semibold">Truck</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Region</th>
                <th className="px-6 py-4 text-left font-semibold">Performance</th>
                <th className="px-6 py-4 text-left font-semibold">Maintenance</th>
                <th className="px-6 py-4 text-left font-semibold">Team</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrucks.map((truck) => {
                const statusStyle = statusStyles[truck.status]
                const StatusIcon = statusStyle.icon
                const maintenanceStyle = maintenanceStyles[truck.maintenanceStatus]

                return (
                  <tr
                    key={truck.id}
                    className="border-b border-border/20 bg-background/20 hover:bg-background/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 shadow-lg ${truck.color}`}
                        >
                          <Truck className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-white">{truck.id}</p>
                          <p className="text-xs text-muted-foreground">{truck.plate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-4 h-4 ${statusStyle.text}`} />
                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                        >
                          {truck.status.replace("-", " ")}
                        </span>
                      </div>
                      {truck.currentRoute && (
                        <p className="text-[10px] text-muted-foreground mt-1">{truck.currentRoute}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-white">{truck.region}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Efficiency</span>
                          <span className="text-white font-semibold">{truck.efficiency}%</span>
                        </div>
                        <div className="w-20 h-1.5 rounded-full bg-background/50 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              truck.efficiency >= 90
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                                : truck.efficiency >= 85
                                  ? "bg-gradient-to-r from-amber-500 to-amber-400"
                                  : "bg-gradient-to-r from-red-500 to-red-400"
                            }`}
                            style={{ width: `${truck.efficiency}%` }}
                          />
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Fuel className="w-3 h-3" />
                            {truck.fuelEfficiency} km/L
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="w-3 h-3" />
                            {truck.tripsThisMonth} trips
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold ${maintenanceStyle.bg} ${maintenanceStyle.text}`}
                        >
                          {truck.maintenanceStatus}
                        </span>
                        <p className="text-[10px] text-muted-foreground">
                          Next: {new Date(truck.nextServiceDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openTeam(truck)}
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        <Users className="w-4 h-4" />
                        View Team
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDispatch(truck)}
                          className="w-10 h-10 rounded-xl bg-background/40 border border-border/30 flex items-center justify-center hover:bg-background/60 transition-all shadow-lg"
                          title="Dispatch/Reassign"
                        >
                          <Edit className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Team Modal */}
      {showTeamModal && selectedTruck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <Card className="w-full max-w-2xl bg-gradient-to-br from-secondary/90 to-secondary/70 border-border/40 rounded-2xl p-6 space-y-5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedTruck.color}`}>
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Team Details - {selectedTruck.id}</h3>
                  <p className="text-xs text-muted-foreground">{selectedTruck.plate}</p>
                </div>
              </div>
              <button
                onClick={() => setShowTeamModal(false)}
                className="w-8 h-8 rounded-lg bg-background/40 border border-border/30 flex items-center justify-center hover:bg-background/60 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Driver</p>
                </div>
                <p className="text-sm font-bold text-white">{selectedTruck.team.driver}</p>
              </div>
              <div className="p-4 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Collectors</p>
                </div>
                <div className="space-y-1">
                  {selectedTruck.team.collectors.map((c) => (
                    <p key={c} className="text-sm font-medium text-white">
                      {c}
                    </p>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Field Agent</p>
                </div>
                <p className="text-sm font-bold text-white">{selectedTruck.team.fieldAgent}</p>
              </div>
            </div>
            <Button
              onClick={() => setShowTeamModal(false)}
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-background rounded-xl h-11 font-semibold shadow-lg shadow-primary/20"
            >
              Close
            </Button>
          </Card>
        </div>
      )}

      {/* Dispatch Modal */}
      {showDispatchModal && selectedTruck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <Card className="w-full max-w-xl bg-gradient-to-br from-secondary/90 to-secondary/70 border-border/40 rounded-2xl p-6 space-y-5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedTruck.color}`}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Dispatch/Reassign Truck</h3>
                  <p className="text-xs text-muted-foreground">{selectedTruck.id} • {selectedTruck.plate}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDispatchModal(false)}
                className="w-8 h-8 rounded-lg bg-background/40 border border-border/30 flex items-center justify-center hover:bg-background/60 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Current Status</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusStyles[selectedTruck.status].bg} ${statusStyles[selectedTruck.status].text} ${statusStyles[selectedTruck.status].border}`}
                  >
                    {selectedTruck.status.replace("-", " ")}
                  </span>
                  <span className="text-sm text-white">•</span>
                  <span className="text-sm text-white">{selectedTruck.region}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">
                  Assign to Region
                </label>
                <select
                  value={dispatchRegion}
                  onChange={(e) => setDispatchRegion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
                >
                  {regions.map((r) => (
                    <option key={r} value={r} className="bg-background">
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {selectedTruck.currentRoute && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <p className="text-xs text-amber-300">
                      Truck is currently on route: {selectedTruck.currentRoute}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowDispatchModal(false)}
                className="flex-1 h-11 rounded-xl bg-background/40 border-border/30 text-white hover:bg-background/60"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDispatch}
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-background font-semibold shadow-lg shadow-primary/20"
              >
                Confirm Dispatch
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
