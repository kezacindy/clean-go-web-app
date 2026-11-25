"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Eye,
  Filter,
  Menu,
  Percent,
  Wallet,
  Search,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  CreditCard,
  Download,
  Mail,
  Phone,
  Calendar,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

type PaymentStatus = "paid" | "pending" | "overdue"

type Payment = {
  id: string
  invoice: string
  building: string
  customer: string
  customerPhone?: string
  customerEmail?: string
  amount: number
  dueDate: string
  paymentDate: string | null
  method: string
  status: PaymentStatus
  daysOverdue?: number
  invoiceDate: string
  period: string
  notes?: string
}

const seedPayments: Payment[] = [
  {
    id: "PAY-2025-001",
    invoice: "INV-2025-001",
    building: "Green Valley Apartments",
    customer: "Green Valley Management Ltd",
    customerPhone: "+250788123456",
    customerEmail: "admin@greenvalley.rw",
    amount: 25000,
    dueDate: "2025-01-12",
    paymentDate: "2025-01-12",
    method: "MTN Mobile Money",
    status: "paid",
    invoiceDate: "2025-01-01",
    period: "January 2025",
  },
  {
    id: "PAY-2025-002",
    invoice: "INV-2025-002",
    building: "Safari Hotel Complex",
    customer: "Safari Hotels Group",
    customerPhone: "+250788234567",
    customerEmail: "finance@safarihotels.rw",
    amount: 85000,
    dueDate: "2025-01-15",
    paymentDate: "2025-01-15",
    method: "Bank Transfer",
    status: "paid",
    invoiceDate: "2025-01-01",
    period: "January 2025",
  },
  {
    id: "PAY-2025-003",
    invoice: "INV-2025-003",
    building: "Mama Njeri Restaurant",
    customer: "Mama Njeri Enterprises",
    customerPhone: "+250788345678",
    customerEmail: "info@mamanjeri.rw",
    amount: 50000,
    dueDate: "2025-01-20",
    paymentDate: null,
    method: "Pending",
    status: "pending",
    invoiceDate: "2025-01-01",
    period: "January 2025",
    notes: "Payment reminder sent on Jan 18",
  },
  {
    id: "PAY-2025-004",
    invoice: "INV-2024-156",
    building: "Tech Solutions Ltd",
    customer: "Tech Solutions Rwanda",
    customerPhone: "+250788456789",
    customerEmail: "accounts@techsolutions.rw",
    amount: 15000,
    dueDate: "2024-12-10",
    paymentDate: null,
    method: "Pending",
    status: "overdue",
    daysOverdue: 37,
    invoiceDate: "2024-11-25",
    period: "December 2024",
    notes: "Multiple reminders sent. Contact customer directly.",
  },
  {
    id: "PAY-2025-005",
    invoice: "INV-2025-005",
    building: "Rwanda Business Center",
    customer: "RBC Management",
    customerPhone: "+250788567890",
    customerEmail: "finance@rbc.rw",
    amount: 120000,
    dueDate: "2025-01-16",
    paymentDate: "2025-01-16",
    method: "Bank Transfer",
    status: "paid",
    invoiceDate: "2025-01-01",
    period: "January 2025",
  },
  {
    id: "PAY-2025-006",
    invoice: "INV-2024-142",
    building: "Sunrise Villa",
    customer: "Sunrise Properties",
    customerPhone: "+250788678901",
    customerEmail: "admin@sunrise.rw",
    amount: 15000,
    dueDate: "2024-11-01",
    paymentDate: null,
    method: "Pending",
    status: "overdue",
    daysOverdue: 76,
    invoiceDate: "2024-10-15",
    period: "November 2024",
    notes: "Legal action may be required",
  },
  {
    id: "PAY-2025-007",
    invoice: "INV-2025-007",
    building: "Kigali Heights Mall",
    customer: "Kigali Heights Management",
    customerPhone: "+250788789012",
    customerEmail: "accounts@kigaliheights.rw",
    amount: 95000,
    dueDate: "2025-01-22",
    paymentDate: null,
    method: "Pending",
    status: "pending",
    invoiceDate: "2025-01-01",
    period: "January 2025",
  },
  {
    id: "PAY-2025-008",
    invoice: "INV-2025-008",
    building: "Mountain View Apartments",
    customer: "Mountain View Ltd",
    customerPhone: "+250788890123",
    customerEmail: "finance@mountainview.rw",
    amount: 45000,
    dueDate: "2025-01-18",
    paymentDate: "2025-01-17",
    method: "Airtel Money",
    status: "paid",
    invoiceDate: "2025-01-01",
    period: "January 2025",
  },
  {
    id: "PAY-2025-009",
    invoice: "INV-2025-009",
    building: "City Center Plaza",
    customer: "CCP Holdings",
    customerPhone: "+250788901234",
    customerEmail: "admin@ccp.rw",
    amount: 75000,
    dueDate: "2025-01-25",
    paymentDate: null,
    method: "Pending",
    status: "pending",
    invoiceDate: "2025-01-01",
    period: "January 2025",
  },
  {
    id: "PAY-2025-010",
    invoice: "INV-2024-138",
    building: "Riverside Complex",
    customer: "Riverside Properties",
    customerPhone: "+250788012345",
    customerEmail: "info@riverside.rw",
    amount: 60000,
    dueDate: "2024-10-20",
    paymentDate: null,
    method: "Pending",
    status: "overdue",
    daysOverdue: 88,
    invoiceDate: "2024-10-01",
    period: "October 2024",
    notes: "Account on hold. Requires review.",
  },
  {
    id: "PAY-2025-011",
    invoice: "INV-2025-011",
    building: "Garden Estate",
    customer: "Garden Estate Management",
    customerPhone: "+250788123450",
    customerEmail: "accounts@gardenestate.rw",
    amount: 35000,
    dueDate: "2025-01-19",
    paymentDate: "2025-01-19",
    method: "MTN Mobile Money",
    status: "paid",
    invoiceDate: "2025-01-01",
    period: "January 2025",
  },
  {
    id: "PAY-2025-012",
    invoice: "INV-2025-012",
    building: "Business Park Tower",
    customer: "BPT Management",
    customerPhone: "+250788234501",
    customerEmail: "finance@bpt.rw",
    amount: 110000,
    dueDate: "2025-01-28",
    paymentDate: null,
    method: "Pending",
    status: "pending",
    invoiceDate: "2025-01-01",
    period: "January 2025",
  },
]

const statusChips: Record<
  PaymentStatus,
  { bg: string; text: string; border: string; icon: typeof CheckCircle2 }
> = {
  paid: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
    icon: CheckCircle2,
  },
  pending: {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
    icon: Clock,
  },
  overdue: {
    bg: "bg-red-500/15",
    text: "text-red-300",
    border: "border-red-500/30",
    icon: AlertCircle,
  },
}

export default function PaymentManagement() {
  const [payments] = useState<Payment[]>(seedPayments)
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">("all")
  const [search, setSearch] = useState("")
  const [detail, setDetail] = useState<Payment | null>(null)

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.status === statusFilter
      const term = search.toLowerCase()
      const matchesSearch =
        !term ||
        p.building.toLowerCase().includes(term) ||
        p.customer.toLowerCase().includes(term) ||
        p.id.toLowerCase().includes(term) ||
        p.invoice.toLowerCase().includes(term) ||
        (p.customerPhone && p.customerPhone.toLowerCase().includes(term))
      return matchesStatus && matchesSearch
    })
  }, [payments, statusFilter, search])

  const stats = useMemo(() => {
    const totalRevenue = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)
    const pendingAmount = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)
    const overdueAmount = payments.filter((p) => p.status === "overdue").reduce((sum, p) => sum + p.amount, 0)
    const successRate = Math.round((payments.filter((p) => p.status === "paid").length / payments.length) * 100)
    const paidCount = payments.filter((p) => p.status === "paid").length
    const pendingCount = payments.filter((p) => p.status === "pending").length
    const overdueCount = payments.filter((p) => p.status === "overdue").length
    const avgPaymentTime = 3.2 // days

    return {
      totalRevenue,
      pendingAmount,
      overdueAmount,
      successRate,
      paidCount,
      pendingCount,
      overdueCount,
      avgPaymentTime,
    }
  }, [payments])

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Payment & Billing Management</h1>
              <p className="text-sm text-muted-foreground">
                Track, manage, and process all customer payments and invoices
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2 h-11 rounded-xl border-border/40 bg-secondary/40 text-white hover:bg-secondary/60"
          >
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-background px-5 h-11 rounded-xl font-semibold shadow-lg shadow-primary/20"
          >
            <Mail className="w-4 h-4" />
            Send Reminders
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
              <ArrowUpRight className="w-3 h-3 inline mr-1" />
              +12.5%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Total Revenue (Month)</p>
          <p className="text-2xl font-bold text-white">Rwf {(stats.totalRevenue / 1000).toFixed(0)}K</p>
          <p className="text-[10px] text-muted-foreground mt-1">{stats.paidCount} paid invoices</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg">
              {stats.pendingCount}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Pending Payments</p>
          <p className="text-2xl font-bold text-amber-300">Rwf {(stats.pendingAmount / 1000).toFixed(0)}K</p>
          <p className="text-[10px] text-muted-foreground mt-1">Awaiting payment</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-1 rounded-lg">
              {stats.overdueCount}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Overdue Accounts</p>
          <p className="text-2xl font-bold text-red-300">Rwf {(stats.overdueAmount / 1000).toFixed(0)}K</p>
          <p className="text-[10px] text-muted-foreground mt-1">Requires attention</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Percent className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">
              <ArrowUpRight className="w-3 h-3 inline mr-1" />
              +2.1%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Payment Success Rate</p>
          <p className="text-2xl font-bold text-white">{stats.successRate}%</p>
          <p className="text-[10px] text-muted-foreground mt-1">Avg payment time: {stats.avgPaymentTime} days</p>
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
              placeholder="Search by building, customer, invoice ID, or phone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background/40 border border-border/30 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | "all")}
              className="px-4 py-2.5 rounded-xl bg-background/40 border border-border/30 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 backdrop-blur-sm"
            >
              <option value="all" className="bg-background">
                All Status
              </option>
              <option value="paid" className="bg-background">
                Paid
              </option>
              <option value="pending" className="bg-background">
                Pending
              </option>
              <option value="overdue" className="bg-background">
                Overdue
              </option>
            </select>
          </div>
        </div>
      </Card>

      {/* Payments Table */}
      <Card className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="px-6 py-5 border-b border-border/30 bg-background/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Payment Records</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {filtered.length} payment{filtered.length !== 1 ? "s" : ""} shown
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-muted-foreground bg-background/40 border-b border-border/30">
                <th className="px-6 py-4 text-left font-semibold">Invoice</th>
                <th className="px-6 py-4 text-left font-semibold">Customer</th>
                <th className="px-6 py-4 text-left font-semibold">Amount</th>
                <th className="px-6 py-4 text-left font-semibold">Due Date</th>
                <th className="px-6 py-4 text-left font-semibold">Payment</th>
                <th className="px-6 py-4 text-left font-semibold">Method</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment) => {
                const statusStyle = statusChips[payment.status]
                const StatusIcon = statusStyle.icon
                return (
                  <tr
                    key={payment.id}
                    className="border-b border-border/20 bg-background/20 hover:bg-background/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-white">{payment.invoice}</p>
                        <p className="text-[10px] text-muted-foreground">{payment.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-sm font-semibold text-white">{payment.building}</p>
                        <p className="text-xs text-muted-foreground">{payment.customer}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-white">Rwf {payment.amount.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">{payment.period}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-sm text-white">
                          {new Date(payment.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        {payment.daysOverdue && (
                          <p className="text-[10px] text-red-400 font-medium">{payment.daysOverdue} days overdue</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {payment.paymentDate ? (
                        <div className="space-y-0.5">
                          <p className="text-sm text-white">
                            {new Date(payment.paymentDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {Math.ceil(
                              (new Date(payment.paymentDate).getTime() - new Date(payment.dueDate).getTime()) /
                                (1000 * 60 * 60 * 24),
                            )}{" "}
                            days
                          </p>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-white">{payment.method}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-4 h-4 ${statusStyle.text}`} />
                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setDetail(payment)}
                        className="w-10 h-10 rounded-xl bg-background/40 border border-border/30 flex items-center justify-center hover:bg-background/60 transition-all shadow-lg"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Details Modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-4">
          <Card className="w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-secondary/90 to-secondary/70 border-border/40 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col">
            <div className="flex items-center justify-between p-6 pb-4 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Payment Details</h3>
                  <p className="text-xs text-muted-foreground">{detail.invoice}</p>
                </div>
              </div>
              <button
                onClick={() => setDetail(null)}
                className="w-8 h-8 rounded-lg bg-background/40 border border-border/30 flex items-center justify-center hover:bg-background/60 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase">Building</p>
                  <p className="text-sm font-bold text-white">{detail.building}</p>
                </div>
                <div className="p-3 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase">Status</p>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const DetailStatusIcon = statusChips[detail.status].icon
                      return <DetailStatusIcon className={`w-4 h-4 ${statusChips[detail.status].text}`} />
                    })()}
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${statusChips[detail.status].bg} ${statusChips[detail.status].text} ${statusChips[detail.status].border}`}
                    >
                      {detail.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase">Amount</p>
                  <p className="text-base font-bold text-white">Rwf {detail.amount.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{detail.period}</p>
                </div>
                <div className="p-3 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase">Due Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-sm font-medium text-white">
                      {new Date(detail.dueDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  {detail.daysOverdue && (
                    <p className="text-[10px] text-red-400 font-medium mt-1">
                      {detail.daysOverdue} days overdue
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase">Payment Date</p>
                  {detail.paymentDate ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-sm font-medium text-white">
                        {new Date(detail.paymentDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Not paid</p>
                  )}
                </div>
                <div className="p-3 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-sm font-medium text-white">{detail.method}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-background/40 border border-border/30 backdrop-blur-sm">
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Customer Information</p>
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-white">{detail.customer}</p>
                  {detail.customerPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{detail.customerPhone}</p>
                    </div>
                  )}
                  {detail.customerEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{detail.customerEmail}</p>
                    </div>
                  )}
                </div>
              </div>

              {detail.notes && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-amber-300 mb-1">Notes</p>
                      <p className="text-sm text-amber-200">{detail.notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 p-6 pt-4 border-t border-border/30">
              <Button
                onClick={() => setDetail(null)}
                className="flex-1 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/20 border-0"
              >
                Close
              </Button>
              {detail.status !== "paid" && (
                <Button
                  onClick={() => {
                    window.alert(
                      `Payment reminder sent successfully to ${detail.customer}!\n\nInvoice: ${detail.invoice}\nAmount: Rwf ${detail.amount.toLocaleString()}\nDue Date: ${new Date(detail.dueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}\n\nReminder sent via email and SMS.`,
                    )
                  }}
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold shadow-lg shadow-amber-500/20 border-0"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Reminder
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
