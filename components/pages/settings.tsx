"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  SettingsIcon,
  Calendar,
  Clock,
  Truck,
  MapPin,
  Shield,
  Users,
  Wrench,
  Ban,
  Bell,
  AlertTriangle,
  Save,
} from "lucide-react"

export default function Settings() {
  const { toast } = useToast()

  const [systemConfig, setSystemConfig] = useState({
    defaultPickupDays: ["Monday", "Thursday"],
    defaultPickupTimeStart: "06:00",
    defaultPickupTimeEnd: "08:00",
    maxBuildingsPerTruck: 25,
    enableServiceZones: true,
    defaultPickupFrequency: "twice-weekly",
  })

  const [roles, setRoles] = useState({
    superAdmin: {
      viewDashboard: true,
      manageUsers: true,
      manageSettings: true,
      viewReports: true,
      manageFleet: true,
      manageBuildings: true,
    },
    admin: {
      viewDashboard: true,
      manageUsers: false,
      manageSettings: false,
      viewReports: true,
      manageFleet: true,
      manageBuildings: true,
    },
    agent: {
      viewDashboard: true,
      manageUsers: false,
      manageSettings: false,
      viewReports: false,
      manageFleet: false,
      manageBuildings: false,
    },
  })

  const [fleetRules, setFleetRules] = useState({
    capacityLimit: 5000,
    maintenanceAutoDisable: true,
  })

  const [serviceEligibility, setServiceEligibility] = useState({
    blockCollectionIfUnpaid: true,
    gracePeriodDays: 7,
  })

  const [notifications, setNotifications] = useState({
    missedPickupAlerts: true,
    unassignedZoneAlerts: true,
  })

  const ToggleSwitch = ({
    checked,
    onChange,
    label,
    description,
    disabled,
  }: {
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
    description: string
    disabled?: boolean
  }) => (
    <div
      className={`flex items-center justify-between py-2 px-3 rounded-lg border transition-colors ${
        disabled
          ? "bg-background/20 border-border/20 opacity-50 cursor-not-allowed"
          : "bg-background/40 border-border/40 hover:border-primary/40"
      }`}
    >
      <div className="flex-1 pr-4">
        <p className={`text-sm font-medium ${disabled ? "text-muted-foreground" : "text-white"}`}>
          {label}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-background shrink-0 ${
          checked ? "bg-primary" : "bg-background/60"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )

  const PermissionToggle = ({
    role,
    permission,
    checked,
    onChange,
    disabled,
  }: {
    role: "superAdmin" | "admin" | "agent"
    permission: string
    checked: boolean
    onChange: (checked: boolean) => void
    disabled?: boolean
  }) => (
    <div
      className={`flex items-center justify-between p-2 rounded-lg border ${
        disabled
          ? "bg-background/20 border-border/20 opacity-50"
          : "bg-background/30 border-border/30"
      }`}
    >
      <span className={`text-xs ${disabled ? "text-muted-foreground" : "text-white"}`}>
        {permission}
      </span>
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-background/60"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  )

  const handleSave = () => {
    // In a real app this would persist to backend
    toast({
      title: "Settings saved",
      description: "All configuration changes have been saved successfully.",
    })
  }

  return (
    <div className="p-4 space-y-3 bg-background">
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <SettingsIcon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">System Settings</h1>
            <p className="text-[10px] text-muted-foreground">
              System configuration only — not daily operations
            </p>
          </div>
        </div>
          </div>

      {/* Settings Sections */}
      <div className="grid gap-3 lg:grid-cols-3">
        {/* System Configuration */}
        <Card className="bg-card/50 border-border/50 rounded-xl p-3 shadow-lg lg:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <SettingsIcon className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-white">System Configuration</p>
          </div>

          <div className="space-y-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-0.5 block">
                Default Pickup Days
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                  (day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        const days = systemConfig.defaultPickupDays
                        if (days.includes(day)) {
                          setSystemConfig({
                            ...systemConfig,
                            defaultPickupDays: days.filter((d) => d !== day),
                          })
                        } else {
                          setSystemConfig({
                            ...systemConfig,
                            defaultPickupDays: [...days, day],
                          })
                        }
                      }}
                      className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                        systemConfig.defaultPickupDays.includes(day)
                          ? "bg-primary text-background border border-primary"
                          : "bg-background/40 text-white border border-border/40 hover:border-primary/40"
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
            <div>
                <label className="text-xs font-medium text-muted-foreground mb-0.5 block">
                  Start Time
                </label>
                <input
                  type="time"
                  value={systemConfig.defaultPickupTimeStart}
                  onChange={(e) =>
                    setSystemConfig({ ...systemConfig, defaultPickupTimeStart: e.target.value })
                  }
                  className="w-full px-2 py-1 rounded-lg bg-background/40 border border-border/40 text-xs text-white outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
            </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-0.5 block">
                  End Time
                </label>
                <input
                  type="time"
                  value={systemConfig.defaultPickupTimeEnd}
                  onChange={(e) =>
                    setSystemConfig({ ...systemConfig, defaultPickupTimeEnd: e.target.value })
                  }
                  className="w-full px-2 py-1 rounded-lg bg-background/40 border border-border/40 text-xs text-white outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-0.5 block">
                  Max/Truck
                </label>
                <input
                  type="number"
                  value={systemConfig.maxBuildingsPerTruck}
                  onChange={(e) =>
                    setSystemConfig({
                      ...systemConfig,
                      maxBuildingsPerTruck: Number(e.target.value) || 0,
                    })
                  }
                  className="w-full px-2 py-1 rounded-lg bg-background/40 border border-border/40 text-xs text-white outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-0.5 block">
                  Frequency
                </label>
                <select
                  value={systemConfig.defaultPickupFrequency}
                  onChange={(e) =>
                    setSystemConfig({ ...systemConfig, defaultPickupFrequency: e.target.value })
                  }
                  className="w-full px-2 py-1 rounded-lg bg-background/40 border border-border/40 text-xs text-white outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                >
                  <option value="daily" className="bg-card">Daily</option>
                  <option value="twice-weekly" className="bg-card">Twice Weekly</option>
                  <option value="weekly" className="bg-card">Weekly</option>
                  <option value="bi-weekly" className="bg-card">Bi-Weekly</option>
                </select>
              </div>
            </div>

            <ToggleSwitch
              checked={systemConfig.enableServiceZones}
              onChange={(checked) =>
                setSystemConfig({ ...systemConfig, enableServiceZones: checked })
              }
              label="Enable Service Zones"
              description="Allow zone-based service area management"
            />
        </div>
      </Card>

        {/* Fleet & Service Rules - Combined */}
        <Card className="bg-card/50 border-border/50 rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-white">Fleet & Service</p>
          </div>

            <div className="space-y-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-0.5 block">
                Capacity Limit (kg)
              </label>
                <input
                type="number"
                value={fleetRules.capacityLimit}
                onChange={(e) =>
                  setFleetRules({ ...fleetRules, capacityLimit: Number(e.target.value) || 0 })
                }
                className="w-full px-2 py-1 rounded-lg bg-background/40 border border-border/40 text-xs text-white outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                min="1000"
                max="20000"
              />
            </div>

            <ToggleSwitch
              checked={fleetRules.maintenanceAutoDisable}
              onChange={(checked) =>
                setFleetRules({ ...fleetRules, maintenanceAutoDisable: checked })
              }
              label="Maintenance Auto-Disable"
              description="Auto-disable trucks during maintenance"
            />

            <ToggleSwitch
              checked={serviceEligibility.blockCollectionIfUnpaid}
              onChange={(checked) =>
                setServiceEligibility({ ...serviceEligibility, blockCollectionIfUnpaid: checked })
              }
              label="Block Unpaid Collection"
              description="Prevent collection for unpaid accounts"
            />

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-0.5 block">
                Grace Period (days)
              </label>
                <input
                type="number"
                value={serviceEligibility.gracePeriodDays}
                onChange={(e) =>
                  setServiceEligibility({
                    ...serviceEligibility,
                    gracePeriodDays: Number(e.target.value) || 0,
                  })
                }
                className="w-full px-2 py-1 rounded-lg bg-background/40 border border-border/40 text-xs text-white outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                min="0"
                max="30"
                disabled={!serviceEligibility.blockCollectionIfUnpaid}
              />
            </div>
          </div>
        </Card>

        {/* Roles & Permissions */}
        <Card className="bg-card/50 border-border/50 rounded-xl p-3 shadow-lg lg:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-white">Roles & Permissions</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "superAdmin" as const, label: "Super Admin", icon: Users },
              { key: "admin" as const, label: "Admin", icon: Users },
              { key: "agent" as const, label: "Agent", icon: Users },
            ].map((role) => (
              <div key={role.key} className="space-y-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <role.icon className="w-3.5 h-3.5 text-primary" />
                  <p className="text-xs font-semibold text-white">{role.label}</p>
                </div>
                <div className="space-y-1">
                  {Object.entries(roles[role.key]).map(([permission, checked]) => (
                    <PermissionToggle
                      key={permission}
                      role={role.key}
                      permission={permission
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())
                        .trim()}
                      checked={checked}
                      onChange={(newChecked) => {
                        setRoles({
                          ...roles,
                          [role.key]: {
                            ...roles[role.key],
                            [permission]: newChecked,
                          },
                        })
                      }}
                      disabled={role.key === "superAdmin" && permission === "manageSettings"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications & Alerts */}
        <Card className="bg-card/50 border-border/50 rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-white">Notifications</p>
          </div>

          <div className="space-y-2">
            <ToggleSwitch
              checked={notifications.missedPickupAlerts}
              onChange={(checked) =>
                setNotifications({ ...notifications, missedPickupAlerts: checked })
              }
              label="Missed Pickup Alerts"
              description="Notify when pickups are missed"
            />
            <ToggleSwitch
              checked={notifications.unassignedZoneAlerts}
              onChange={(checked) =>
                setNotifications({ ...notifications, unassignedZoneAlerts: checked })
              }
              label="Unassigned Zone Alerts"
              description="Alert when zones have no trucks"
            />
        </div>
      </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-1">
        <Button
          onClick={handleSave}
          className="h-8 px-4 rounded-lg bg-primary hover:bg-primary/90 text-background text-xs font-semibold"
        >
          <Save className="w-3 h-3 mr-1.5" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
