"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Plus, Edit, Trash2 } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  contractStatus: "active" | "expired" | "pending"
  serviceType: string
  monthlyBill: number
  paymentStatus: "paid" | "pending" | "overdue"
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Downtown Mall Management",
      email: "manager@downtownmall.com",
      phone: "+1 (555) 111-1111",
      address: "123 Main St, Downtown",
      contractStatus: "active",
      serviceType: "Weekly Commercial",
      monthlyBill: 5000,
      paymentStatus: "paid",
    },
    {
      id: "2",
      name: "City Hospital Group",
      email: "admin@cityhospital.com",
      phone: "+1 (555) 222-2222",
      address: "456 Health Ave, Medical District",
      contractStatus: "active",
      serviceType: "Bi-weekly Medical Waste",
      monthlyBill: 7200,
      paymentStatus: "paid",
    },
    {
      id: "3",
      name: "Green Office Complex",
      email: "facilities@greenoffice.com",
      phone: "+1 (555) 333-3333",
      address: "789 Business Park, North",
      contractStatus: "active",
      serviceType: "Weekly Commercial",
      monthlyBill: 3500,
      paymentStatus: "overdue",
    },
    {
      id: "4",
      name: "Happy Foods Restaurant",
      email: "owner@happyfoods.com",
      phone: "+1 (555) 444-4444",
      address: "321 Food St, Downtown",
      contractStatus: "pending",
      serviceType: "Bi-weekly Commercial",
      monthlyBill: 2800,
      paymentStatus: "pending",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    monthlyBill: "",
  })

  const addCustomer = () => {
    if (newCustomer.name && newCustomer.email) {
      setCustomers([
        ...customers,
        {
          id: String(customers.length + 1),
          name: newCustomer.name,
          email: newCustomer.email,
          phone: newCustomer.phone,
          address: newCustomer.address,
          contractStatus: "pending",
          serviceType: newCustomer.serviceType,
          monthlyBill: Number.parseInt(newCustomer.monthlyBill) || 0,
          paymentStatus: "pending",
        },
      ])
      setNewCustomer({ name: "", email: "", phone: "", address: "", serviceType: "", monthlyBill: "" })
      setShowForm(false)
    }
  }

  const getContractColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "expired":
        return "bg-red-500/20 text-red-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "overdue":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const activeCustomers = customers.filter((c) => c.contractStatus === "active").length
  const totalMonthlyRevenue = customers.reduce((sum, c) => sum + c.monthlyBill, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Customer Management</h1>
          <p className="text-muted">View and manage all customer accounts</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 bg-primary hover:bg-accent text-background">
          <Plus className="w-4 h-4" />
          Add Customer
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 border-secondary/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Add New Customer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Customer Name"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              className="px-4 py-2 bg-secondary/50 border border-secondary rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              className="px-4 py-2 bg-secondary/50 border border-secondary rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              className="px-4 py-2 bg-secondary/50 border border-secondary rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Address"
              value={newCustomer.address}
              onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
              className="px-4 py-2 bg-secondary/50 border border-secondary rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Service Type"
              value={newCustomer.serviceType}
              onChange={(e) => setNewCustomer({ ...newCustomer, serviceType: e.target.value })}
              className="px-4 py-2 bg-secondary/50 border border-secondary rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Monthly Bill"
              value={newCustomer.monthlyBill}
              onChange={(e) => setNewCustomer({ ...newCustomer, monthlyBill: e.target.value })}
              className="px-4 py-2 bg-secondary/50 border border-secondary rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={addCustomer} className="md:col-span-2 bg-primary hover:bg-accent text-background">
              Save Customer
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-secondary/50">
          <p className="text-sm text-muted mb-1">Total Customers</p>
          <p className="text-3xl font-bold text-foreground">{customers.length}</p>
        </Card>
        <Card className="p-6 border-secondary/50">
          <p className="text-sm text-muted mb-1">Active Contracts</p>
          <p className="text-3xl font-bold text-green-400">{activeCustomers}</p>
        </Card>
        <Card className="p-6 border-secondary/50">
          <p className="text-sm text-muted mb-1">Monthly Revenue</p>
          <p className="text-3xl font-bold text-accent">${totalMonthlyRevenue.toLocaleString()}</p>
        </Card>
      </div>

      <div className="space-y-4">
        {customers.map((customer) => (
          <Card key={customer.id} className="p-6 border-secondary/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">{customer.name}</h3>
                <p className="text-sm text-muted mt-1">{customer.serviceType}</p>
              </div>
              <div className="flex gap-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${getContractColor(customer.contractStatus)}`}
                >
                  {customer.contractStatus.toUpperCase()}
                </span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${getPaymentColor(customer.paymentStatus)}`}
                >
                  {customer.paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Mail className="w-4 h-4 text-primary" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Phone className="w-4 h-4 text-primary" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{customer.address}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg mb-4">
              <span className="text-sm font-medium text-foreground">Monthly Bill</span>
              <span className="text-lg font-bold text-accent">${customer.monthlyBill.toLocaleString()}</span>
            </div>

            <div className="flex gap-2 pt-4 border-t border-secondary/30">
              <Button
                variant="outline"
                className="flex-1 text-xs bg-transparent border-secondary hover:bg-secondary/50"
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                className="flex-1 text-xs bg-transparent border-secondary hover:bg-destructive/10 text-destructive"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
