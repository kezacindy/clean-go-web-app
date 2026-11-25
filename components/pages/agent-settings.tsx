"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Settings,
  Bell,
  MapPin,
  Moon,
  Sun,
  Smartphone,
  Shield,
  Eye,
  EyeOff,
  Save,
  User,
  Mail,
  Phone,
  Lock,
  Navigation,
  Volume2,
  Vibrate,
} from "lucide-react"

export default function AgentSettings() {
  const { toast } = useToast()

  const [notifications, setNotifications] = useState({
    collectionReminders: true,
    routeUpdates: true,
    paymentAlerts: true,
    issueNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
  })

  const [appPreferences, setAppPreferences] = useState({
    theme: "dark" as "light" | "dark" | "auto",
    language: "en",
    mapStyle: "standard" as "standard" | "satellite" | "terrain",
    autoNavigation: false,
    offlineMode: false,
  })

  const [privacy, setPrivacy] = useState({
    shareLocation: true,
    showProfile: true,
    allowTracking: true,
  })

  const [profile, setProfile] = useState({
    name: "Jean Paul Nkurunziza",
    email: "jean.nkurunziza@cleango.rw",
    phone: "+250 788 456 789",
    emergencyContact: "+250 788 123 456",
    emergencyName: "Marie Uwimana",
  })

  const [showPassword, setShowPassword] = useState(false)

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
      className={`flex items-center justify-between py-2.5 px-3 rounded-xl border transition-colors ${
        disabled
          ? "bg-background/20 border-border/20 opacity-50 cursor-not-allowed"
          : "bg-background/40 border-border/40 hover:border-primary/40"
      }`}
    >
      <div className="flex-1 pr-3">
        <p className={`text-xs font-semibold ${disabled ? "text-muted-foreground" : "text-white"}`}>{label}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          checked ? "bg-primary" : "bg-secondary/60"
        } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  )

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="p-4 space-y-4 bg-gradient-to-b from-background via-background to-background/95">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/25 flex items-center justify-center shadow-lg shadow-primary/20">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
              <p className="text-xs text-muted-foreground">Manage your preferences and account settings</p>
            </div>
          </div>
        </div>
        <Button
          onClick={handleSave}
          className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-background text-xs font-semibold"
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Profile Information */}
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-white">Profile Information</h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground">Full Name</p>
              <div className="flex items-center gap-1.5">
                <User className="w-3 h-3 text-muted-foreground" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground">Email</p>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-muted-foreground" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground">Phone Number</p>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-muted-foreground" />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground">Emergency Contact</p>
              <div className="space-y-2">
                <input
                  type="text"
                  value={profile.emergencyName}
                  onChange={(e) => setProfile({ ...profile, emergencyName: e.target.value })}
                  placeholder="Contact name"
                  className="w-full bg-transparent text-sm text-white placeholder:text-muted-foreground focus:outline-none"
                />
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-muted-foreground" />
                  <input
                    type="tel"
                    value={profile.emergencyContact}
                    onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground">Password</p>
              <div className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-white">Notifications</h2>
          </div>
          <div className="space-y-2">
            <ToggleSwitch
              checked={notifications.collectionReminders}
              onChange={(checked) => setNotifications({ ...notifications, collectionReminders: checked })}
              label="Collection Reminders"
              description="Get notified before scheduled collections"
            />
            <ToggleSwitch
              checked={notifications.routeUpdates}
              onChange={(checked) => setNotifications({ ...notifications, routeUpdates: checked })}
              label="Route Updates"
              description="Real-time route changes and optimizations"
            />
            <ToggleSwitch
              checked={notifications.paymentAlerts}
              onChange={(checked) => setNotifications({ ...notifications, paymentAlerts: checked })}
              label="Payment Alerts"
              description="Building payment status updates"
            />
            <ToggleSwitch
              checked={notifications.issueNotifications}
              onChange={(checked) => setNotifications({ ...notifications, issueNotifications: checked })}
              label="Issue Notifications"
              description="Updates on reported issues"
            />
            <div className="pt-2 border-t border-border/40 space-y-2">
              <ToggleSwitch
                checked={notifications.soundEnabled}
                onChange={(checked) => setNotifications({ ...notifications, soundEnabled: checked })}
                label="Sound"
                description="Play notification sounds"
              />
              <ToggleSwitch
                checked={notifications.vibrationEnabled}
                onChange={(checked) => setNotifications({ ...notifications, vibrationEnabled: checked })}
                label="Vibration"
                description="Vibrate on notifications"
              />
            </div>
          </div>
        </Card>

        {/* App Preferences */}
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-white">App Preferences</h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground mb-2">Theme</p>
              <div className="flex gap-2">
                {[
                  { value: "light", icon: Sun, label: "Light" },
                  { value: "dark", icon: Moon, label: "Dark" },
                  { value: "auto", icon: Settings, label: "Auto" },
                ].map((theme) => (
                  <button
                    key={theme.value}
                    type="button"
                    onClick={() => setAppPreferences({ ...appPreferences, theme: theme.value as any })}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border transition-colors ${
                      appPreferences.theme === theme.value
                        ? "bg-primary/20 border-primary/40 text-primary"
                        : "bg-background/40 border-border/40 text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <theme.icon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-medium">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-background/40 border border-border/40 space-y-1">
              <p className="text-[10px] text-muted-foreground mb-2">Map Style</p>
              <div className="flex gap-2">
                {["standard", "satellite", "terrain"].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setAppPreferences({ ...appPreferences, mapStyle: style as any })}
                    className={`flex-1 py-2 rounded-lg border transition-colors text-[10px] font-medium ${
                      appPreferences.mapStyle === style
                        ? "bg-primary/20 border-primary/40 text-primary"
                        : "bg-background/40 border-border/40 text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <ToggleSwitch
              checked={appPreferences.autoNavigation}
              onChange={(checked) => setAppPreferences({ ...appPreferences, autoNavigation: checked })}
              label="Auto Navigation"
              description="Automatically start navigation to next stop"
            />
            <ToggleSwitch
              checked={appPreferences.offlineMode}
              onChange={(checked) => setAppPreferences({ ...appPreferences, offlineMode: checked })}
              label="Offline Mode"
              description="Enable offline data sync"
            />
          </div>
        </Card>

        {/* Privacy & Location */}
        <Card className="p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 border-border/40 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-white">Privacy & Location</h2>
          </div>
          <div className="space-y-2">
            <ToggleSwitch
              checked={privacy.shareLocation}
              onChange={(checked) => setPrivacy({ ...privacy, shareLocation: checked })}
              label="Share Location"
              description="Allow real-time location tracking"
            />
            <ToggleSwitch
              checked={privacy.showProfile}
              onChange={(checked) => setPrivacy({ ...privacy, showProfile: checked })}
              label="Show Profile"
              description="Make profile visible to other agents"
            />
            <ToggleSwitch
              checked={privacy.allowTracking}
              onChange={(checked) => setPrivacy({ ...privacy, allowTracking: checked })}
              label="Allow Tracking"
              description="Enable GPS tracking during work hours"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

