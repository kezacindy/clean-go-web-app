"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Phone,
  Plus,
  Users,
  Search,
  Filter,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  CheckCircle2,
  Clock,
  Star,
  Activity,
  Truck,
  ArrowUpRight,
} from "lucide-react"

type Role = "driver" | "collector" | "agent"
type Status = "active" | "inactive" | "on-leave"

type Worker = {
  id: string
  name: string
  role: Role
  phone: string
  email?: string
  truck: string
  region: string
  status: Status
  performance: number
  experience: string
  rating: number
  totalPickups?: number
  onTimeRate?: number
  joinDate: string
}

const seedWorkers: Worker[] = [
  {
    id: "W001",
    name: "John Mukasa",
    role: "driver",
    phone: "+250788345001",
    email: "john.mukasa@cleango.rw",
    truck: "TRK-001",
    region: "Kigali",
    status: "active",
    performance: 96.8,
    experience: "5 years",
    rating: 4.9,
    totalPickups: 1247,
    onTimeRate: 98.2,
    joinDate: "2020-01-15",
  },
  {
    id: "W002",
    name: "Peter Ouma",
    role: "collector",
    phone: "+250788345002",
    email: "peter.ouma@cleango.rw",
    truck: "TRK-001",
    region: "Kigali",
    status: "active",
    performance: 94.3,
    experience: "4 years",
    rating: 4.8,
    totalPickups: 1156,
    onTimeRate: 96.5,
    joinDate: "2021-03-20",
  },
  {
    id: "W003",
    name: "James Kibet",
    role: "collector",
    phone: "+250788345003",
    email: "james.kibet@cleango.rw",
    truck: "TRK-001",
    region: "Kigali",
    status: "active",
    performance: 91.7,
    experience: "3 years",
    rating: 4.7,
    totalPickups: 892,
    onTimeRate: 93.2,
    joinDate: "2022-02-10",
  },
  {
    id: "W004",
    name: "Sarah Achieng",
    role: "agent",
    phone: "+250788345004",
    email: "sarah.achieng@cleango.rw",
    truck: "TRK-001",
    region: "Kigali",
    status: "active",
    performance: 98.2,
    experience: "6 years",
    rating: 5.0,
    totalPickups: 1856,
    onTimeRate: 99.1,
    joinDate: "2019-05-12",
  },
  {
    id: "W005",
    name: "David Musoke",
    role: "driver",
    phone: "+250788345005",
    email: "david.musoke@cleango.rw",
    truck: "TRK-002",
    region: "Musanze",
    status: "active",
    performance: 94.5,
    experience: "4 years",
    rating: 4.8,
    totalPickups: 1123,
    onTimeRate: 96.8,
    joinDate: "2021-07-08",
  },
  {
    id: "W006",
    name: "Grace Wanjiru",
    role: "collector",
    phone: "+250788345006",
    email: "grace.wanjiru@cleango.rw",
    truck: "TRK-002",
    region: "Musanze",
    status: "active",
    performance: 89.4,
    experience: "2 years",
    rating: 4.6,
    totalPickups: 567,
    onTimeRate: 91.8,
    joinDate: "2023-01-15",
  },
  {
    id: "W007",
    name: "Jean Bosco",
    role: "driver",
    phone: "+250788345007",
    email: "jean.bosco@cleango.rw",
    truck: "TRK-003",
    region: "Rubavu",
    status: "active",
    performance: 92.1,
    experience: "3 years",
    rating: 4.7,
    totalPickups: 987,
    onTimeRate: 94.5,
    joinDate: "2022-04-22",
  },
  {
    id: "W008",
    name: "Eric Habimana",
    role: "collector",
    phone: "+250788345008",
    email: "eric.habimana@cleango.rw",
    truck: "TRK-003",
    region: "Rubavu",
    status: "active",
    performance: 87.2,
    experience: "2 years",
    rating: 4.5,
    totalPickups: 432,
    onTimeRate: 89.5,
    joinDate: "2023-06-10",
  },
  {
    id: "W009",
    name: "Yves Mugisha",
    role: "collector",
    phone: "+250788345009",
    email: "yves.mugisha@cleango.rw",
    truck: "TRK-003",
    region: "Rubavu",
    status: "active",
    performance: 85.1,
    experience: "1 year",
    rating: 4.4,
    totalPickups: 298,
    onTimeRate: 87.3,
    joinDate: "2024-02-05",
  },
  {
    id: "W010",
    name: "Naomi Uwase",
    role: "agent",
    phone: "+250788345010",
    email: "naomi.uwase@cleango.rw",
    truck: "TRK-004",
    region: "Huye",
    status: "on-leave",
    performance: 91.3,
    experience: "3 years",
    rating: 4.7,
    totalPickups: 756,
    onTimeRate: 93.8,
    joinDate: "2022-08-18",
  },
  {
    id: "W011",
    name: "Patricia Nafula",
    role: "agent",
    phone: "+250788345011",
    email: "patricia.nafula@cleango.rw",
    truck: "TRK-004",
    region: "Huye",
    status: "active",
    performance: 89.7,
    experience: "2 years",
    rating: 4.6,
    totalPickups: 623,
    onTimeRate: 91.2,
    joinDate: "2023-03-14",
  },
  {
    id: "W012",
    name: "Joseph Karemera",
    role: "driver",
    phone: "+250788345012",
    email: "joseph.karemera@cleango.rw",
    truck: "TRK-004",
    region: "Huye",
    status: "active",
    performance: 88.7,
    experience: "3 years",
    rating: 4.6,
    totalPickups: 834,
    onTimeRate: 90.8,
    joinDate: "2022-09-25",
  },
  {
    id: "W013",
    name: "Felix Mugenzi",
    role: "collector",
    phone: "+250788345013",
    email: "felix.mugenzi@cleango.rw",
    truck: "TRK-004",
    region: "Huye",
    status: "active",
    performance: 86.3,
    experience: "2 years",
    rating: 4.5,
    totalPickups: 445,
    onTimeRate: 88.9,
    joinDate: "2023-05-30",
  },
  {
    id: "W014",
    name: "James Kariuki",
    role: "agent",
    phone: "+250788345014",
    email: "james.kariuki@cleango.rw",
    truck: "TRK-005",
    region: "Musanze",
    status: "active",
    performance: 87.2,
    experience: "2 years",
    rating: 4.5,
    totalPickups: 512,
    onTimeRate: 89.5,
    joinDate: "2023-07-12",
  },
  {
    id: "W015",
    name: "Mary Njeri",
    role: "agent",
    phone: "+250788345015",
    email: "mary.njeri@cleango.rw",
    truck: "TRK-006",
    region: "Nyagatare",
    status: "inactive",
    performance: 82.1,
    experience: "1 year",
    rating: 4.2,
    totalPickups: 389,
    onTimeRate: 85.3,
    joinDate: "2024-01-08",
  },
]

const roleLabels: Record<Role, string> = {
  driver: "Driver",
  collector: "Collector",
  agent: "Field Agent",
}

const statusStyles: Record<Status, { bg: string; text: string; border: string; icon: typeof CheckCircle2 }> = {
  active: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
    icon: CheckCircle2,
  },
  inactive: {
    bg: "bg-slate-500/15",
    text: "text-slate-300",
    border: "border-slate-500/30",
    icon: Clock,
  },
  "on-leave": {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
    icon: Calendar,
  },
}

const roleStyles: Record<Role, { bg: string; text: string; icon: typeof Truck }> = {
  driver: {
    bg: "bg-gradient-to-br from-blue-500/20 to-blue-500/10",
    text: "text-blue-300",
    icon: Truck,
  },
  collector: {
    bg: "bg-gradient-to-br from-purple-500/20 to-purple-500/10",
    text: "text-purple-300",
    icon: Users,
  },
  agent: {
    bg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/10",
    text: "text-emerald-300",
    icon: Award,
  },
}

export default function WorkerManagement() {
  const [workers, setWorkers] = useState<Worker[]>(seedWorkers)
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all")
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all")
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [newWorker, setNewWorker] = useState({
    name: "",
    role: "driver" as Role,
    phone: "",
    email: "",
    region: "",
    truck: "",
  })

  const filtered = useMemo(() => {
    return workers.filter((w) => {
      const matchRole = roleFilter === "all" || w.role === roleFilter
      const matchStatus = statusFilter === "all" || w.status === statusFilter
      const term = search.toLowerCase()
      const matchSearch =
        !term ||
        w.name.toLowerCase().includes(term) ||
        w.phone.toLowerCase().includes(term) ||
        w.id.toLowerCase().includes(term) ||
        (w.email && w.email.toLowerCase().includes(term))
      return matchRole && matchStatus && matchSearch
    })
  }, [workers, roleFilter, statusFilter, search])

  const totals = useMemo(() => {
    const active = workers.filter((w) => w.status === "active").length
    const inactive = workers.filter((w) => w.status === "inactive").length
    const onLeave = workers.filter((w) => w.status === "on-leave").length
    const agents = workers.filter((w) => w.role === "agent").length
    const drivers = workers.filter((w) => w.role === "driver").length
    const collectors = workers.filter((w) => w.role === "collector").length
    const avgPerformance =
      workers.reduce((sum, w) => sum + w.performance, 0) / workers.length

    return {
      total: workers.length,
      active,
      inactive,
      onLeave,
      agents,
      drivers,
      collectors,
      avgPerformance: avgPerformance.toFixed(1),
    }
  }, [workers])

  const addWorker = () => {
    if (!newWorker.name || !newWorker.phone || !newWorker.region || !newWorker.truck) return
    const id = `W${(workers.length + 1).toString().padStart(3, "0")}`
    setWorkers([
      ...workers,
      {
        id,
        name: newWorker.name,
        role: newWorker.role,
        phone: newWorker.phone,
        email: newWorker.email || undefined,
        truck: newWorker.truck,
        region: newWorker.region,
        status: "active",
        performance: 85.0,
        experience: "New",
        rating: 4.0,
        joinDate: new Date().toISOString().split("T")[0],
      },
    ])
    setNewWorker({ name: "", role: "driver", phone: "", email: "", region: "", truck: "" })
    setShowModal(false)
  }

  const regions = ["Kigali", "Rubavu", "Huye", "Musanze", "Nyagatare", "Karongi", "Rusizi"]
  const trucks = ["TRK-001", "TRK-002", "TRK-003", "TRK-004", "TRK-005", "TRK-006", "TRK-007", "TRK-008"]

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Worker Management</h1>
              <p className="text-sm text-muted-foreground">
                Manage drivers, collectors, and field agents across all regions
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-background px-5 h-11 rounded-xl font-semibold shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          Add Worker
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">
              Total
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">All Workers</p>
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
          <p className="text-xs text-muted-foreground mb-1">Active Workers</p>
          <p className="text-2xl font-bold text-emerald-300">{totals.active}</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg">
              Leave
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">On Leave</p>
          <p className="text-2xl font-bold text-amber-300">{totals.onLeave}</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
              {totals.agents}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Field Agents</p>
          <p className="text-2xl font-bold text-white">{totals.agents}</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Truck className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">
              {totals.drivers}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Drivers</p>
          <p className="text-2xl font-bold text-white">{totals.drivers}</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-2 py-1 rounded-lg">
              {totals.collectors}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Collectors</p>
          <p className="text-2xl font-bold text-white">{totals.collectors}</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-2 py-1 rounded-lg">
              {totals.avgPerformance}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Avg Performance</p>
          <p className="text-2xl font-bold text-white">{totals.avgPerformance}%</p>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID, phone, or email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background/40 border border-border/30 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as Role | "all")}
              className="px-4 py-2.5 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
            >
              <option value="all" className="bg-background">
                All Roles
              </option>
              <option value="driver" className="bg-background">
                Drivers
              </option>
              <option value="collector" className="bg-background">
                Collectors
              </option>
              <option value="agent" className="bg-background">
                Field Agents
              </option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
              className="px-4 py-2.5 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
            >
              <option value="all" className="bg-background">
                All Status
              </option>
              <option value="active" className="bg-background">
                Active
              </option>
              <option value="inactive" className="bg-background">
                Inactive
              </option>
              <option value="on-leave" className="bg-background">
                On Leave
              </option>
            </select>
          </div>
        </div>
      </Card>

      {/* Workers Table */}
      <Card className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="px-6 py-5 border-b border-border/30 bg-background/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Workforce Overview</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {filtered.length} worker{filtered.length !== 1 ? "s" : ""} shown
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-muted-foreground bg-background/40 border-b border-border/30">
                <th className="px-6 py-4 text-left font-semibold">Worker</th>
                <th className="px-6 py-4 text-left font-semibold">Role</th>
                <th className="px-6 py-4 text-left font-semibold">Contact</th>
                <th className="px-6 py-4 text-left font-semibold">Assignment</th>
                <th className="px-6 py-4 text-left font-semibold">Performance</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((worker) => {
                const statusStyle = statusStyles[worker.status]
                const StatusIcon = statusStyle.icon
                const roleStyle = roleStyles[worker.role]
                const RoleIcon = roleStyle.icon

                return (
                  <tr
                    key={worker.id}
                    className="border-b border-border/20 bg-background/20 hover:bg-background/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 shadow-lg ${roleStyle.bg} border-border/30`}
                        >
                          <RoleIcon className={`w-6 h-6 ${roleStyle.text}`} />
                        </div>
                        <div>
                          <p className="text-base font-bold text-white">{worker.name}</p>
                          <p className="text-xs text-muted-foreground">{worker.id}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-[10px] text-muted-foreground">{worker.rating}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${roleStyle.bg} ${roleStyle.text} border-border/30`}
                      >
                        {roleLabels[worker.role]}
                      </span>
                      <p className="text-[10px] text-muted-foreground mt-1">{worker.experience}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-sm text-white">{worker.phone}</span>
                        </div>
                        {worker.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                              {worker.email}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Truck className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium text-white">{worker.truck}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{worker.region}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Performance</span>
                          <span
                            className={`font-bold ${
                              worker.performance >= 90
                                ? "text-emerald-300"
                                : worker.performance >= 85
                                  ? "text-amber-300"
                                  : "text-red-300"
                            }`}
                          >
                            {worker.performance}%
                          </span>
                        </div>
                        <div className="w-24 h-2 rounded-full bg-background/50 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              worker.performance >= 90
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                                : worker.performance >= 85
                                  ? "bg-gradient-to-r from-amber-500 to-amber-400"
                                  : "bg-gradient-to-r from-red-500 to-red-400"
                            }`}
                            style={{ width: `${worker.performance}%` }}
                          />
                        </div>
                        {worker.totalPickups && (
                          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              {worker.totalPickups} pickups
                            </div>
                            {worker.onTimeRate && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {worker.onTimeRate}% on-time
                              </div>
                            )}
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
                          {worker.status.replace("-", " ")}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Worker Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <Card className="w-full max-w-2xl bg-gradient-to-br from-secondary/90 to-secondary/70 border-border/40 rounded-2xl p-6 space-y-5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Add New Worker</h3>
                  <p className="text-xs text-muted-foreground">Register a new team member</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-lg bg-background/40 border border-border/30 flex items-center justify-center hover:bg-background/60 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">
                  Full Name
                </label>
                <input
                  value={newWorker.name}
                  onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                  placeholder="Enter worker name"
                  className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/30 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">Role</label>
                <select
                  value={newWorker.role}
                  onChange={(e) => setNewWorker({ ...newWorker, role: e.target.value as Role })}
                  className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
                >
                  <option value="driver" className="bg-background">
                    Driver
                  </option>
                  <option value="collector" className="bg-background">
                    Collector
                  </option>
                  <option value="agent" className="bg-background">
                    Field Agent
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">
                  Phone Number
                </label>
                <input
                  value={newWorker.phone}
                  onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
                  placeholder="+250 XXX XXX XXX"
                  className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/30 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">
                  Email (Optional)
                </label>
                <input
                  value={newWorker.email}
                  onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
                  placeholder="worker@cleango.rw"
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/30 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">
                  Assigned Region
                </label>
                <select
                  value={newWorker.region}
                  onChange={(e) => setNewWorker({ ...newWorker, region: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
                >
                  <option value="" className="bg-background">
                    Select region
                  </option>
                  {regions.map((r) => (
                    <option key={r} value={r} className="bg-background">
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">
                  Assigned Truck
                </label>
                <select
                  value={newWorker.truck}
                  onChange={(e) => setNewWorker({ ...newWorker, truck: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
                >
                  <option value="" className="bg-background">
                    Select truck
                  </option>
                  {trucks.map((t) => (
                    <option key={t} value={t} className="bg-background">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
                className="flex-1 h-11 rounded-xl bg-background/40 border-border/30 text-white hover:bg-background/60"
              >
                Cancel
              </Button>
              <Button
                onClick={addWorker}
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-background font-semibold shadow-lg shadow-primary/20"
              >
                Add Worker
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
