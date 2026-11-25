"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, RefreshCw, AlertCircle } from "lucide-react"

interface RoutePoint {
  id: string
  name: string
  lat: number
  lng: number
  status: "completed" | "in-progress" | "pending"
  time: string
}

export default function AgentMap() {
  const [routePoints] = useState<RoutePoint[]>([
    { id: "1", name: "Downtown Mall", lat: 40.7128, lng: -74.006, status: "completed", time: "9:30 AM" },
    { id: "2", name: "City Hospital", lat: 40.7282, lng: -74.0076, status: "in-progress", time: "10:30 AM" },
    { id: "3", name: "Business Park A", lat: 40.758, lng: -73.9855, status: "pending", time: "12:00 PM" },
    { id: "4", name: "Shopping Center", lat: 40.7505, lng: -73.9972, status: "pending", time: "1:00 PM" },
  ])

  const [lastUpdate, setLastUpdate] = useState(new Date())

  const refreshLocation = () => {
    setLastUpdate(new Date())
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Live Map Tracker</h1>
        <p className="text-white">Your real-time location and route tracking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-secondary/50">
          <p className="text-sm text-white mb-1">Current Status</p>
          <p className="text-lg font-bold text-accent">On Route</p>
        </Card>
        <Card className="p-6 border-secondary/50">
          <p className="text-sm text-white mb-1">Next Stop</p>
          <p className="text-lg font-bold text-white">City Hospital</p>
        </Card>
        <Card className="p-6 border-secondary/50">
          <p className="text-sm text-white mb-1">ETA to Next</p>
          <p className="text-lg font-bold text-white">8 mins</p>
        </Card>
        <Card className="p-6 border-secondary/50">
          <p className="text-sm text-white mb-1">Last Updated</p>
          <p className="text-lg font-bold text-white">{lastUpdate.toLocaleTimeString()}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-secondary/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Live Route Map</h2>
            <Button onClick={refreshLocation} className="gap-2 bg-accent hover:bg-primary text-background">
              <RefreshCw className="w-4 h-4" />
              Refresh Location
            </Button>
          </div>
          <div className="bg-secondary/30 rounded-lg h-96 flex items-center justify-center border border-secondary/50">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4 opacity-60" />
              <p className="text-white font-semibold mb-2">Interactive Map View</p>
              <p className="text-white text-sm">Real-time truck position tracking</p>
              <p className="text-white text-xs mt-4">4 Collection Points on Route</p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-white">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Completed</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Pending</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span>Your Location</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6 border-secondary/50">
            <h2 className="text-lg font-semibold text-white mb-4">Route Directions</h2>
            <div className="space-y-3">
              {routePoints.map((point, idx) => (
                <div
                  key={point.id}
                  className={`p-3 rounded-lg border transition-all ${
                    point.status === "completed"
                      ? "border-green-500/30 bg-green-500/10"
                      : point.status === "in-progress"
                        ? "border-yellow-500/30 bg-yellow-500/10"
                        : "border-secondary/50 bg-secondary/20"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        point.status === "completed"
                          ? "bg-green-500 text-background"
                          : point.status === "in-progress"
                            ? "bg-yellow-500 text-background"
                            : "bg-blue-500 text-background"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm">{point.name}</p>
                      <p className="text-xs text-white">{point.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6 border-secondary/50 bg-secondary/30">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-white mb-2">Route Information</h3>
            <ul className="space-y-2 text-sm text-white">
              <li>• Total distance today: 24.3 km</li>
              <li>• Average speed: 35 km/h</li>
              <li>• Estimated completion: 3:30 PM</li>
              <li>• Traffic conditions: Clear</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
