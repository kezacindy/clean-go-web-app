"use client"

import { useState } from "react"
import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  AlertCircle,
  Send,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Camera,
  FileText,
  Navigation,
} from "lucide-react"

interface Issue {
  id: string
  title: string
  description: string
  category: string
  location: string
  district: string
  sector: string
  timestamp: string
  status: "submitted" | "in-progress" | "resolved"
  priority?: "low" | "medium" | "high"
}

export default function AgentIssueReporting() {
  const { toast } = useToast()

  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "ISS-AG-001",
      title: "Road blocked by construction - KG 7 Ave",
      description: "Main route to Sonatubes area is blocked due to ongoing road construction. Estimated delay of 25-30 minutes for Route TRK-005.",
      category: "blocked_road",
      location: "KG 7 Ave, Sonatubes",
      district: "Kigali",
      sector: "Kicukiro",
      timestamp: "2025-01-20 07:15",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: "ISS-AG-002",
      title: "Overfilled bins at Safari Hotel",
      description: "Main service bay container at Safari Hotel is at 110% capacity. Weekend occupancy spike caused overflow.",
      category: "overfilled_bins",
      location: "KN 3 Rd 45, City Center",
      district: "Kigali",
      sector: "Gasabo",
      timestamp: "2025-01-19 14:30",
      status: "resolved",
      priority: "high",
    },
    {
      id: "ISS-AG-003",
      title: "Truck engine warning - TRK-004",
      description: "Engine temperature warning light activated. Diverted to Huye depot for immediate inspection.",
      category: "truck_breakdown",
      location: "Huye Depot, Huye",
      district: "Huye",
      sector: "Tumba",
      timestamp: "2025-01-18 06:48",
      status: "resolved",
      priority: "high",
    },
  ])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "blocked_road",
    location: "",
    district: "Kigali",
    sector: "",
  })

  const [showForm, setShowForm] = useState(false)

  const categories = [
    { id: "blocked_road", label: "Blocked Road", icon: Navigation, color: "text-amber-400" },
    { id: "truck_breakdown", label: "Truck Breakdown", icon: AlertTriangle, color: "text-red-400" },
    { id: "overfilled_bins", label: "Overfilled Bins", icon: XCircle, color: "text-orange-400" },
    { id: "unlisted_building", label: "Unlisted Building", icon: MapPin, color: "text-blue-400" },
    { id: "other", label: "Other Issue", icon: AlertCircle, color: "text-muted-foreground" },
  ]

  const statusConfig = {
    submitted: { color: "bg-blue-500/15 text-blue-300 border-blue-500/30", label: "Submitted" },
    "in-progress": { color: "bg-amber-500/15 text-amber-300 border-amber-500/30", label: "In Progress" },
    resolved: { color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", label: "Resolved" },
  }

  const priorityConfig = {
    low: { color: "bg-slate-500/15 text-slate-300 border-slate-500/30", label: "Low" },
    medium: { color: "bg-amber-500/15 text-amber-300 border-amber-500/30", label: "Medium" },
    high: { color: "bg-red-500/15 text-red-300 border-red-500/30", label: "High" },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newIssue: Issue = {
      id: `ISS-AG-${String(issues.length + 1).padStart(3, "0")}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      district: formData.district,
      sector: formData.sector,
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "submitted",
      priority: formData.category === "truck_breakdown" ? "high" : formData.category === "overfilled_bins" ? "high" : "medium",
    }

    setIssues([newIssue, ...issues])
    setFormData({
      title: "",
      description: "",
      category: "blocked_road",
      location: "",
      district: "Kigali",
      sector: "",
    })
    setShowForm(false)

    toast({
      title: "Issue reported",
      description: "Your issue has been submitted and will be reviewed by operations.",
    })
  }

  const selectedCategory = categories.find((cat) => cat.id === formData.category)

  return (
    <div className="p-4 space-y-4 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/25 flex items-center justify-center shadow-lg shadow-primary/20">
              <AlertCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Report Issue</h1>
              <p className="text-xs text-muted-foreground">Log incidents and issues encountered during collections</p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-background text-xs font-semibold"
        >
          {showForm ? (
            <>
              <XCircle className="w-3.5 h-3.5 mr-1.5" />
              Cancel
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
              New Report
            </>
          )}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Total Reports</p>
              <p className="mt-1.5 text-2xl font-bold text-white">{issues.length}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">In Progress</p>
              <p className="mt-1.5 text-2xl font-bold text-amber-300">
                {issues.filter((i) => i.status === "in-progress").length}
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-300" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Resolved</p>
              <p className="mt-1.5 text-2xl font-bold text-emerald-300">
                {issues.filter((i) => i.status === "resolved").length}
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            </div>
          </div>
        </Card>
      </div>

      {/* Report Form */}
      {showForm && (
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-white">New Issue Report</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
          <div>
              <label className="block text-[10px] text-muted-foreground font-medium mb-1.5">Issue Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief description of the issue"
                className="w-full px-3 py-2 bg-background/40 border border-border/40 rounded-xl text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
              <label className="block text-[10px] text-muted-foreground font-medium mb-1.5">Category</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-colors ${
                        formData.category === cat.id
                          ? "bg-primary/20 border-primary/40"
                          : "bg-background/40 border-border/40 hover:border-primary/40"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${formData.category === cat.id ? "text-primary" : cat.color}`} />
                      <span
                        className={`text-[9px] font-medium text-center ${
                          formData.category === cat.id ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                  {cat.label}
                      </span>
                    </button>
                  )
                })}
              </div>
          </div>

          <div>
              <label className="block text-[10px] text-muted-foreground font-medium mb-1.5">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed information about the issue..."
              rows={4}
                className="w-full px-3 py-2 bg-background/40 border border-border/40 rounded-xl text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

            <div className="grid gap-3 md:grid-cols-3">
          <div>
                <label className="block text-[10px] text-muted-foreground font-medium mb-1.5">Location</label>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Street address"
                    className="flex-1 px-3 py-2 bg-background/40 border border-border/40 rounded-xl text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-muted-foreground font-medium mb-1.5">District</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 bg-background/40 border border-border/40 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="Kigali">Kigali</option>
                  <option value="Rubavu">Rubavu</option>
                  <option value="Huye">Huye</option>
                  <option value="Musanze">Musanze</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-muted-foreground font-medium mb-1.5">Sector</label>
                <input
                  type="text"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  placeholder="Sector name"
                  className="w-full px-3 py-2 bg-background/40 border border-border/40 rounded-xl text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  setFormData({
                    title: "",
                    description: "",
                    category: "blocked_road",
                    location: "",
                    district: "Kigali",
                    sector: "",
                  })
                }}
                className="flex-1 h-9 rounded-xl bg-background/40 border-border/40 text-white hover:bg-background/60 text-xs font-medium"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 h-9 rounded-xl bg-primary hover:bg-primary/90 text-background text-xs font-semibold">
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Submit Report
          </Button>
            </div>
        </form>
      </Card>
      )}

      {/* My Reports */}
      <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-white">My Issue Reports</h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-background/40 text-muted-foreground">
            {issues.length} total
          </span>
        </div>
        <div className="space-y-2">
          {issues.map((issue) => {
            const category = categories.find((cat) => cat.id === issue.category)
            const CategoryIcon = category?.icon || AlertCircle
            const status = statusConfig[issue.status]
            return (
              <div
              key={issue.id}
                className="p-3 rounded-xl bg-background/40 border border-border/40 hover:border-primary/40 transition-colors"
            >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-2.5 flex-1">
                    <div className={`w-8 h-8 rounded-lg bg-background/40 border border-border/40 flex items-center justify-center ${category?.color || "text-muted-foreground"}`}>
                      <CategoryIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-white truncate">{issue.title}</h3>
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-semibold border shrink-0 ${status.color}`}>
                          {status.label}
                        </span>
                        {issue.priority && (
                          <span className={`px-2 py-0.5 rounded-lg text-[9px] font-semibold border shrink-0 ${priorityConfig[issue.priority].color}`}>
                            {priorityConfig[issue.priority].label}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{issue.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground ml-10.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {issue.location}
                </span>
                  <span className="text-muted-foreground">•</span>
                  <span>{issue.district} • {issue.sector}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                  {issue.timestamp}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
