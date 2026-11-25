"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Building2,
  MapPin,
  Phone,
  Filter,
  BadgeDollarSign,
  Truck,
  Users,
  X,
} from "lucide-react"

type BuildingType = "house" | "hotel" | "restaurant" | "business"
type PaymentStatus = "paid" | "pending" | "overdue"
type Subscription = "normal" | "premier" | "business"

type Building = {
  id: string
  name: string
  type: BuildingType
  address: string
  phone: string
  district: string
  sector: string
  pickupDay: string
  paymentStatus: PaymentStatus
  subscription: Subscription
  assignedTruck: string
  lastPayment: string
  statusDot: "green" | "orange" | "red"
  coordinates: string
}

const seedBuildings: Building[] = [
  {
    id: "B-2025-001",
    name: "Green Valley Apartments",
    type: "house",
    address: "KG 5 Ave 12, Nyarugenge, Kigali",
    phone: "+250 788 123 001",
    district: "Kigali",
    sector: "Nyarugenge",
    pickupDay: "Mon & Thu – 06:00–08:00",
    paymentStatus: "paid",
    subscription: "premier",
    assignedTruck: "TRK-001 – Kigali Central",
    lastPayment: "2025-01-12",
    statusDot: "green",
    coordinates: "1.9444° S, 30.0606° E",
  },
  {
    id: "B-2025-002",
    name: "Safari Hotel Complex",
    type: "hotel",
    address: "KN 3 Rd 45, City Center, Kigali",
    phone: "+250 788 123 002",
    district: "Kigali",
    sector: "Gasabo",
    pickupDay: "Daily – 05:30–07:00",
    paymentStatus: "paid",
    subscription: "premier",
    assignedTruck: "TRK-003 – Hospitality Route",
    lastPayment: "2025-01-15",
    statusDot: "green",
    coordinates: "1.9500° S, 30.0600° E",
  },
  {
    id: "B-2025-003",
    name: "Mama Njeri Restaurant",
    type: "restaurant",
    address: "KG 7 Ave 78, Sonatubes, Kigali",
    phone: "+250 788 123 003",
    district: "Kigali",
    sector: "Kicukiro",
    pickupDay: "Mon, Wed, Fri – 07:00–08:30",
    paymentStatus: "pending",
    subscription: "normal",
    assignedTruck: "TRK-005 – SMEs Route",
    lastPayment: "2025-01-05",
    statusDot: "orange",
    coordinates: "1.9550° S, 30.0800° E",
  },
  {
    id: "B-2025-004",
    name: "Tech Solutions Ltd",
    type: "business",
    address: "KG 11 Ave 23, ICT Park, Kigali",
    phone: "+250 788 123 004",
    district: "Kigali",
    sector: "Kacyiru",
    pickupDay: "Tue & Fri – 06:30–08:00",
    paymentStatus: "overdue",
    subscription: "business",
    assignedTruck: "TRK-004 – Corporate Route",
    lastPayment: "2024-12-20",
    statusDot: "red",
    coordinates: "1.9300° S, 30.0700° E",
  },
  {
    id: "B-2025-005",
    name: "Riverside Residences",
    type: "house",
    address: "NR 15 St 56, Lakefront, Rubavu",
    phone: "+250 788 123 005",
    district: "Rubavu",
    sector: "Gisenyi",
    pickupDay: "Daily – 06:00–07:30",
    paymentStatus: "paid",
    subscription: "normal",
    assignedTruck: "TRK-008 – Rubavu Coast",
    lastPayment: "2025-01-10",
    statusDot: "green",
    coordinates: "1.7000° S, 29.2500° E",
  },
  {
    id: "B-2025-006",
    name: "Sunrise Villa Estate",
    type: "house",
    address: "RN 1 Rd 89, Kinigi, Musanze",
    phone: "+250 788 123 006",
    district: "Musanze",
    sector: "Kinigi",
    pickupDay: "Tue & Sat – 07:00–09:00",
    paymentStatus: "overdue",
    subscription: "normal",
    assignedTruck: "TRK-009 – Northern Highlands",
    lastPayment: "2024-11-30",
    statusDot: "red",
    coordinates: "1.4800° S, 29.6200° E",
  },
  {
    id: "B-2025-007",
    name: "Kigali Heights Offices",
    type: "business",
    address: "KG 7 Ave, Kimihurura, Kigali",
    phone: "+250 788 123 007",
    district: "Kigali",
    sector: "Gasabo",
    pickupDay: "Mon–Fri – 05:30–07:00",
    paymentStatus: "paid",
    subscription: "business",
    assignedTruck: "TRK-002 – CBD Loop",
    lastPayment: "2025-01-18",
    statusDot: "green",
    coordinates: "1.9533° S, 30.0920° E",
  },
  {
    id: "B-2025-008",
    name: "Huye Market Block",
    type: "business",
    address: "Main Market Rd, Huye Town",
    phone: "+250 788 123 008",
    district: "Huye",
    sector: "Tumba",
    pickupDay: "Daily – 06:00–08:30",
    paymentStatus: "pending",
    subscription: "business",
    assignedTruck: "TRK-010 – Southern Corridor",
    lastPayment: "2025-01-03",
    statusDot: "orange",
    coordinates: "2.6090° S, 29.7313° E",
  },
]

const statusChip: Record<PaymentStatus, string> = {
  paid: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  overdue: "bg-red-500/15 text-red-300 border border-red-500/30",
}

const dotColor: Record<Building["statusDot"], string> = {
  green: "bg-emerald-400",
  orange: "bg-amber-400",
  red: "bg-red-400",
}

const typeOptions: { value: BuildingType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "house", label: "Residential" },
  { value: "hotel", label: "Hotels & Lodges" },
  { value: "restaurant", label: "Restaurants" },
  { value: "business", label: "Offices & Markets" },
]

const statusOptions: { value: PaymentStatus | "all"; label: string }[] = [
  { value: "all", label: "All Payment Status" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
]

const subscriptionLabel: Record<Subscription, string> = {
  normal: "Standard Plan",
  premier: "Premier Plan",
  business: "Business Plan",
}

export default function BuildingManagement() {
  const [buildings] = useState<Building[]>(seedBuildings)
  const [typeFilter, setTypeFilter] = useState<BuildingType | "all">("all")
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">("all")
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Building | null>(null)

  const totals = useMemo(() => {
    const total = buildings.length
    return {
      total,
      houses: buildings.filter((b) => b.type === "house").length,
      hotels: buildings.filter((b) => b.type === "hotel").length,
      restaurants: buildings.filter((b) => b.type === "restaurant").length,
      businesses: buildings.filter((b) => b.type === "business").length,
    }
  }, [buildings])

  const paymentTotals = useMemo(() => {
    const paid = buildings.filter((b) => b.paymentStatus === "paid").length
    const pending = buildings.filter((b) => b.paymentStatus === "pending").length
    const overdue = buildings.filter((b) => b.paymentStatus === "overdue").length
    return { paid, pending, overdue }
  }, [buildings])

  const filtered = useMemo(() => {
    return buildings.filter((b) => {
      const matchType = typeFilter === "all" || b.type === typeFilter
      const matchStatus = statusFilter === "all" || b.paymentStatus === statusFilter
      const term = search.toLowerCase()
      const termMatch =
        !term ||
        b.name.toLowerCase().includes(term) ||
        b.address.toLowerCase().includes(term) ||
        b.district.toLowerCase().includes(term) ||
        b.sector.toLowerCase().includes(term)

      return matchType && matchStatus && termMatch
    })
  }, [buildings, typeFilter, statusFilter, search])

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/25 flex items-center justify-center shadow-lg shadow-primary/20">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Building & Customer Portfolio</h1>
              <p className="text-sm text-muted-foreground">
                Centralised view of residential, hospitality and business customers across Rwanda
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-300">Portfolio Healthy</span>
          </div>
          <Button className="h-10 rounded-xl bg-primary/90 hover:bg-primary text-background text-xs font-semibold px-4">
            <Users className="w-4 h-4 mr-2" />
            Register New Building
          </Button>
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Active Buildings</p>
              <p className="mt-2 text-3xl font-bold text-white">{totals.total}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {totals.houses} residential • {totals.businesses} commercial
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Payment Status</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-emerald-300">{paymentTotals.paid}</p>
                <p className="text-xs text-muted-foreground">paid</p>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {paymentTotals.pending} pending • {paymentTotals.overdue} overdue
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <BadgeDollarSign className="w-4 h-4 text-emerald-300" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Premium & Business</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {buildings.filter((b) => b.subscription !== "normal").length}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">High-value contracted customers</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Truck className="w-4 h-4 text-blue-300" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Regions Covered</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {new Set(buildings.map((b) => b.district)).size}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">districts with active contracts</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-amber-300" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background/40 border border-border/40 text-sm text-white">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by building name, district or address..."
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground text-sm text-white"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Type at least 2 characters to quickly filter the building portfolio.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto md:flex-row">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as BuildingType | "all")}
              className="px-3 py-2 rounded-xl bg-background/40 border border-border/40 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
              {typeOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-secondary">
                  {o.label}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | "all")}
              className="px-3 py-2 rounded-xl bg-background/40 border border-border/40 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-secondary">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {Array.from(new Set(buildings.map((b) => b.district))).map((district) => (
            <button
              key={district}
              type="button"
              onClick={() => setSearch(district)}
              className="px-3 py-1.5 rounded-full text-[11px] bg-background/40 border border-border/40 text-muted-foreground hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-colors"
            >
              {district}
            </button>
          ))}
        </div>
      </Card>

      {/* Building cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((b) => (
          <Card
            key={b.id}
            className="p-5 bg-gradient-to-br from-secondary/40 to-secondary/25 border-border/40 rounded-2xl cursor-pointer hover:border-primary/40 hover:shadow-xl transition-all group backdrop-blur-sm"
            onClick={() => setSelected(b)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white truncate">{b.name}</p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-background/40 text-muted-foreground capitalize">
                      {b.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-background/40 text-muted-foreground">
                      {subscriptionLabel[b.subscription]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`w-2 h-2 rounded-full ${dotColor[b.statusDot]}`} />
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusChip[b.paymentStatus]}`}>
                  {b.paymentStatus}
                </span>
              </div>
            </div>

            <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-white">{b.address}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {b.district} • {b.sector}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-white">{b.phone}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
              <div className="space-y-0.5">
                <p className="text-muted-foreground">Pickup window</p>
                <p className="text-white">{b.pickupDay}</p>
              </div>
              <div className="space-y-0.5 text-right">
                <p className="text-muted-foreground">Assigned route</p>
                <p className="text-white truncate max-w-[160px]">{b.assignedTruck}</p>
              </div>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-10 rounded-2xl border border-dashed border-border/40 bg-background/40">
            <p className="text-sm font-medium text-white">No buildings match the current filters</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try clearing the search or adjusting the filters to see more results.
            </p>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <Card className="w-full max-w-4xl bg-gradient-to-br from-secondary/90 to-secondary/70 border-border/40 rounded-2xl p-6 space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{selected.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {subscriptionLabel[selected.subscription]} •{" "}
                    <span className="capitalize">{selected.type}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${statusChip[selected.paymentStatus]}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${dotColor[selected.statusDot]}`} />
                  {selected.paymentStatus.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-background/50 hover:border-primary/40 transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-background/40 border border-border/40 space-y-1.5">
                  <p className="text-[11px] text-muted-foreground">Building ID</p>
                  <p className="text-sm text-white font-medium">{selected.id}</p>
                </div>
                <div className="p-4 rounded-xl bg-background/40 border border-border/40 space-y-1.5">
                  <p className="text-[11px] text-muted-foreground">Contact</p>
                  <p className="text-sm text-white">{selected.phone}</p>
                </div>
                <div className="p-4 rounded-xl bg-background/40 border border-border/40 space-y-1.5">
                  <p className="text-[11px] text-muted-foreground">Subscription Tier</p>
                  <p className="text-sm text-white">{subscriptionLabel[selected.subscription]}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-background/40 border border-border/40 space-y-1.5">
                  <p className="text-[11px] text-muted-foreground">Address</p>
                  <p className="text-sm text-white">{selected.address}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {selected.district} District • {selected.sector} Sector
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-background/40 border border-border/40 space-y-1.5">
                  <p className="text-[11px] text-muted-foreground">Assigned Route & Truck</p>
                  <p className="text-sm text-white">{selected.assignedTruck}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-background/40 border border-border/40 space-y-1.5">
                    <p className="text-[11px] text-muted-foreground">Pickup Window</p>
                    <p className="text-sm text-white">{selected.pickupDay}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background/40 border border-border/40 space-y-1.5">
                    <p className="text-[11px] text-muted-foreground">Last Payment</p>
                    <p className="text-sm text-white">{selected.lastPayment}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-xl bg-background/40 border border-border/40 space-y-1.5">
                <p className="text-[11px] text-muted-foreground">Location Coordinates</p>
                <p className="text-sm text-white">{selected.coordinates}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Use coordinates to verify mapping accuracy for the assigned route.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/40 border border-border/40 space-y-2">
                <p className="text-[11px] text-muted-foreground">Quick Actions</p>
                <div className="flex flex-wrap gap-2">
                  <Button className="h-9 px-3 rounded-lg bg-primary/90 hover:bg-primary text-background text-xs font-medium">
                    <BadgeDollarSign className="w-3.5 h-3.5 mr-1.5" />
                    View Billing Profile
                  </Button>
                  <Button className="h-9 px-3 rounded-lg bg-background/40 border border-border/40 text-white text-xs font-medium hover:bg-background/60">
                    <Truck className="w-3.5 h-3.5 mr-1.5" />
                    Adjust Pickup Route
                  </Button>
                  <Button className="h-9 px-3 rounded-lg bg-background/40 border border-border/40 text-white text-xs font-medium hover:bg-background/60">
                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                    Contact Customer
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setSelected(null)}
              className="w-full bg-background/60 hover:bg-background text-white rounded-xl h-11 border border-border/60 text-sm font-medium mt-2"
            >
              Close details
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
