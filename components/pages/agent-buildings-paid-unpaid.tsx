"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Calendar, CheckCircle2, XCircle, AlertCircle, Building2, BadgeDollarSign, X } from "lucide-react"

interface Building {
  id: string
  name: string
  address: string
  district: string
  sector: string
  contact: string
  phone: string
  lastPaymentDate: string
  paymentStatus: "paid" | "unpaid"
  collectionStatus: "pending" | "completed" | "not-collected"
  buildingType: string
  subscription: string
}

export default function AgentBuildingsPaidUnpaid() {
  const [buildings, setBuildings] = useState<Building[]>([
    {
      id: "B-001",
      name: "Green Valley Apartments",
      address: "KG 5 Ave 12, Nyarugenge",
      district: "Kigali",
      sector: "Nyarugenge",
      contact: "Jean Baptiste Uwimana",
      phone: "+250 788 123 001",
      lastPaymentDate: "2025-01-12",
      paymentStatus: "paid",
      collectionStatus: "pending",
      buildingType: "Residential",
      subscription: "Premier Plan",
    },
    {
      id: "B-002",
      name: "Safari Hotel Complex",
      address: "KN 3 Rd 45, City Center",
      district: "Kigali",
      sector: "Gasabo",
      contact: "Marie Claire Mukamana",
      phone: "+250 788 123 002",
      lastPaymentDate: "2025-01-15",
      paymentStatus: "paid",
      collectionStatus: "completed",
      buildingType: "Hotel",
      subscription: "Business Plan",
    },
    {
      id: "B-003",
      name: "Mama Njeri Restaurant",
      address: "KG 7 Ave 78, Sonatubes",
      district: "Kigali",
      sector: "Kicukiro",
      contact: "Paul Nkurunziza",
      phone: "+250 788 123 003",
      lastPaymentDate: "2024-12-20",
      paymentStatus: "unpaid",
      collectionStatus: "pending",
      buildingType: "Restaurant",
      subscription: "Standard Plan",
    },
    {
      id: "B-004",
      name: "Tech Solutions Ltd",
      address: "KG 11 Ave 23, ICT Park",
      district: "Kigali",
      sector: "Kacyiru",
      contact: "Grace Wanjiru",
      phone: "+250 788 123 004",
      lastPaymentDate: "2025-01-10",
      paymentStatus: "paid",
      collectionStatus: "pending",
      buildingType: "Office",
      subscription: "Business Plan",
    },
    {
      id: "B-005",
      name: "Riverside Residences",
      address: "NR 15 St 56, Lakefront",
      district: "Rubavu",
      sector: "Gisenyi",
      contact: "David Musoke",
      phone: "+250 788 123 005",
      lastPaymentDate: "2024-11-30",
      paymentStatus: "unpaid",
      collectionStatus: "pending",
      buildingType: "Residential",
      subscription: "Standard Plan",
    },
    {
      id: "B-006",
      name: "Kigali Heights Offices",
      address: "KG 7 Ave, Kimihurura",
      district: "Kigali",
      sector: "Gasabo",
      contact: "Patricia Nafula",
      phone: "+250 788 123 006",
      lastPaymentDate: "2025-01-18",
      paymentStatus: "paid",
      collectionStatus: "pending",
      buildingType: "Office",
      subscription: "Premier Plan",
    },
  ])

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null)

  const paidBuildings = buildings.filter((b) => b.paymentStatus === "paid")
  const unpaidBuildings = buildings.filter((b) => b.paymentStatus === "unpaid")
  const collectedToday = buildings.filter((b) => b.collectionStatus === "completed").length

  const markCollected = (id: string) => {
    setBuildings(buildings.map((b) => (b.id === id ? { ...b, collectionStatus: "completed" as const } : b)))
    setSelectedBuilding(null)
  }

  const markNotCollected = (id: string) => {
    setBuildings(buildings.map((b) => (b.id === id ? { ...b, collectionStatus: "not-collected" as const } : b)))
    setSelectedBuilding(null)
  }

  return (
    <div className="p-4 space-y-4 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/25 flex items-center justify-center shadow-lg shadow-primary/20">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
      <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">My Buildings</h1>
              <p className="text-xs text-muted-foreground">
                Manage collections for paid and unpaid buildings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Total Buildings</p>
              <p className="mt-1.5 text-2xl font-bold text-white">{buildings.length}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Paid (Collectible)</p>
              <p className="mt-1.5 text-2xl font-bold text-emerald-300">{paidBuildings.length}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Unpaid (Not Collectible)</p>
              <p className="mt-1.5 text-2xl font-bold text-red-300">{unpaidBuildings.length}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <XCircle className="w-4 h-4 text-red-300" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Collected Today</p>
              <p className="mt-1.5 text-2xl font-bold text-white">{collectedToday}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <BadgeDollarSign className="w-4 h-4 text-blue-300" />
            </div>
          </div>
        </Card>
      </div>

      {/* Buildings Lists */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Paid Buildings */}
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <h2 className="text-sm font-semibold text-white">Paid Buildings</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Collectible
            </span>
          </div>
          <div className="space-y-2">
            {paidBuildings.map((building) => (
              <div
                key={building.id}
                onClick={() => setSelectedBuilding(building)}
                className="p-3 rounded-xl bg-background/40 border border-border/40 hover:border-primary/40 hover:bg-background/50 cursor-pointer transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">{building.name}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{building.buildingType}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[9px] font-semibold shrink-0 ${
                      building.collectionStatus === "completed"
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                        : building.collectionStatus === "not-collected"
                          ? "bg-red-500/15 text-red-300 border border-red-500/30"
                          : "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    {building.collectionStatus.replace("-", " ")}
                  </span>
                </div>
                <div className="space-y-1 text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{building.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3" />
                    <span>{building.contact}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>Paid: {building.lastPaymentDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Unpaid Buildings */}
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4 text-red-300" />
            <h2 className="text-sm font-semibold text-white">Unpaid Buildings</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-500/15 text-red-300 border border-red-500/30">
              Not Collectible
            </span>
        </div>
          <div className="space-y-2">
            {unpaidBuildings.map((building) => (
              <div
                key={building.id}
                onClick={() => setSelectedBuilding(building)}
                className="p-3 rounded-xl bg-background/40 border border-border/40 hover:border-red-400/40 hover:bg-background/50 cursor-pointer transition-all opacity-75"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">{building.name}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{building.buildingType}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-lg text-[9px] font-semibold bg-red-500/15 text-red-300 border border-red-500/30 shrink-0">
                    Unpaid
                  </span>
                </div>
                <div className="space-y-1 text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{building.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3" />
                    <span>{building.contact}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3 text-red-400" />
                    <span className="text-red-400">Payment pending</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Building Details Modal */}
      {selectedBuilding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <Card className="w-full max-w-3xl bg-gradient-to-br from-secondary/90 to-secondary/70 border-border/40 rounded-2xl p-5 space-y-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
            <div>
                  <p className="text-lg font-semibold text-white">{selectedBuilding.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedBuilding.buildingType} • {selectedBuilding.subscription}
                  </p>
                </div>
            </div>
              <button
                type="button"
              onClick={() => setSelectedBuilding(null)}
                className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-background/50 hover:border-primary/40 transition-colors"
                aria-label="Close details"
            >
                <X className="w-4 h-4" />
              </button>
          </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
                <p className="text-[10px] text-muted-foreground">Payment Status</p>
              <div
                  className={`p-2.5 rounded-lg ${
                    selectedBuilding.paymentStatus === "paid"
                      ? "bg-emerald-500/15 border border-emerald-500/30"
                      : "bg-red-500/15 border border-red-500/30"
                  }`}
              >
                <p
                    className={`text-xs font-semibold ${
                      selectedBuilding.paymentStatus === "paid" ? "text-emerald-300" : "text-red-300"
                    }`}
                >
                    {selectedBuilding.paymentStatus === "paid" ? "✓ PAID - Can collect" : "✗ UNPAID - Do NOT collect"}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
                <p className="text-[10px] text-muted-foreground">Collection Status</p>
                <span
                  className={`inline-block px-2.5 py-1.5 rounded-lg text-[10px] font-semibold ${
                    selectedBuilding.collectionStatus === "completed"
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                      : selectedBuilding.collectionStatus === "not-collected"
                        ? "bg-red-500/15 text-red-300 border border-red-500/30"
                        : "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                  }`}
                >
                  {selectedBuilding.collectionStatus.replace("-", " ").toUpperCase()}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
                <p className="text-[10px] text-muted-foreground">Address</p>
                <p className="text-sm text-white font-medium">{selectedBuilding.address}</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {selectedBuilding.district} District • {selectedBuilding.sector} Sector
                </p>
              </div>

              <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
                <p className="text-[10px] text-muted-foreground">Last Payment Date</p>
                <p className="text-sm text-white font-medium">{selectedBuilding.lastPaymentDate}</p>
              </div>

              <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
                <p className="text-[10px] text-muted-foreground">Contact Person</p>
                <p className="text-sm text-white font-medium">{selectedBuilding.contact}</p>
            </div>

              <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
                <p className="text-[10px] text-muted-foreground">Phone Number</p>
                <a
                  href={`tel:${selectedBuilding.phone}`}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  {selectedBuilding.phone}
                </a>
            </div>
          </div>

          {selectedBuilding.paymentStatus === "paid" && selectedBuilding.collectionStatus !== "completed" && (
              <div className="flex gap-2 pt-2">
              <Button
                onClick={() => markCollected(selectedBuilding.id)}
                  className="flex-1 h-9 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-background text-xs font-semibold"
              >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                Mark Trash Collected
              </Button>
              <Button
                onClick={() => markNotCollected(selectedBuilding.id)}
                variant="outline"
                  className="flex-1 h-9 rounded-xl bg-background/40 border-red-500/40 text-red-300 hover:bg-red-500/10 text-xs font-medium"
              >
                  <XCircle className="w-3.5 h-3.5 mr-1.5" />
                Collection Issue
              </Button>
            </div>
          )}

          {selectedBuilding.paymentStatus === "unpaid" && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                <p className="text-xs text-red-300 font-medium">
                  ⚠️ This building is unpaid. Collection is not authorized until payment is received.
                </p>
              </div>
          )}

          {selectedBuilding.collectionStatus === "completed" && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <p className="text-xs text-emerald-300 font-medium">✓ Collection completed and logged</p>
            </div>
          )}
        </Card>
        </div>
      )}
    </div>
  )
}
