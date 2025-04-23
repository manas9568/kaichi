"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, ArrowRight, Car, Clock, MessageSquare, Plus, RefreshCw, Truck, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Fake data for the dashboard
const trafficData = {
  currentLoad: 65,
  predictedLoad: 85,
  vehicleCount: 120,
  waitTime: 25,
  congestionLevel: "Moderate",
  congestionColor: "bg-yellow-500",
  timeSlots: [
    { time: "10:00 AM - 10:30 AM", status: "Full", vehicles: 50, capacity: 50 },
    { time: "10:30 AM - 11:00 AM", status: "Almost Full", vehicles: 45, capacity: 50 },
    { time: "11:00 AM - 11:30 AM", status: "Available", vehicles: 30, capacity: 50 },
    { time: "11:30 AM - 12:00 PM", status: "Available", vehicles: 15, capacity: 50 },
  ],
  predictions: [
    { time: "+30 min", load: 75 },
    { time: "+1 hr", load: 85 },
    { time: "+2 hr", load: 60 },
  ],
}

export default function Dashboard() {
  const [eventType, setEventType] = useState("normal")
  const [trafficLoad, setTrafficLoad] = useState("medium")
  const [timeSlot, setTimeSlot] = useState("morning")
  const [currentTime, setCurrentTime] = useState("")
  const [isFestivalMode, setIsFestivalMode] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 100)

    return () => {
      clearInterval(timer)
      clearInterval(interval)
    }
  }, [])

  // Update festival mode when event type changes
  useEffect(() => {
    setIsFestivalMode(eventType === "festival")
  }, [eventType])

  return (
    <div className={`p-4 md:p-6 ${isFestivalMode ? "bg-amber-50" : ""}`}>
      {/* Festival mode overlay */}
      {isFestivalMode && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          <div className="absolute left-0 top-0 h-20 w-20 animate-pulse">
            <div className="h-4 w-4 rounded-full bg-yellow-300 opacity-70 shadow-lg shadow-yellow-200"></div>
          </div>
          <div className="absolute right-10 top-20 h-20 w-20 animate-pulse delay-300">
            <div className="h-3 w-3 rounded-full bg-orange-300 opacity-60 shadow-lg shadow-orange-200"></div>
          </div>
          <div className="absolute bottom-20 left-1/4 h-20 w-20 animate-pulse delay-700">
            <div className="h-5 w-5 rounded-full bg-amber-300 opacity-70 shadow-lg shadow-amber-200"></div>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage traffic flow at Kainchi Dham</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-muted-foreground">{currentTime}</p>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
          <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
            <Plus className="h-3.5 w-3.5" />
            New Event
          </Button>
        </div>
      </div>

      {/* Event Setup Section */}
      <Card className={`mb-6 border-green-100 ${isFestivalMode ? "border-amber-200 bg-amber-50" : ""}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Event Setup</CardTitle>
          <CardDescription>Configure traffic conditions for prediction</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="event-type" className="text-sm font-medium">
                Event Type
              </label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger id="event-type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal Day</SelectItem>
                  <SelectItem value="weekend">Weekend</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="traffic-load" className="text-sm font-medium">
                Traffic Load
              </label>
              <Select value={trafficLoad} onValueChange={setTrafficLoad}>
                <SelectTrigger id="traffic-load">
                  <SelectValue placeholder="Select traffic load" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="time-slot" className="text-sm font-medium">
                Time Slot
              </label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger id="time-slot">
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto bg-green-600 hover:bg-green-700">Apply Settings</Button>
        </CardFooter>
      </Card>

      {/* Traffic Overview */}
      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Traffic Load</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trafficData.currentLoad}%</div>
            <Progress value={trafficData.currentLoad} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              {trafficData.currentLoad < 50
                ? "Normal flow"
                : trafficData.currentLoad < 80
                  ? "Moderate congestion"
                  : "Heavy congestion"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Predicted Peak</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trafficData.predictedLoad}%</div>
            <Progress value={trafficData.predictedLoad} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">Expected in 45 minutes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vehicle Count</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trafficData.vehicleCount}</div>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <div className="flex gap-1">
                <span className="font-medium">Cars:</span> 98
              </div>
              <div className="flex gap-1">
                <span className="font-medium">Buses:</span> 12
              </div>
              <div className="flex gap-1">
                <span className="font-medium">Others:</span> 10
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Last updated 2 minutes ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trafficData.waitTime} min</div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <div className={`h-2 w-2 rounded-full ${trafficData.congestionColor}`}></div>
              <span>{trafficData.congestionLevel} congestion</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">+5 min from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Intelligent Predictive Alert */}
      <Alert className="mb-6 border-yellow-200 bg-yellow-50 text-yellow-800">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>AI Recommendation</AlertTitle>
        <AlertDescription>
          Expected gridlock in 25 minutes if 20 more vehicles enter. Consider activating time-slot distribution.
        </AlertDescription>
      </Alert>

      {/* Time Travel Slider */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Time Prediction Slider</CardTitle>
          <CardDescription>Drag to see future traffic conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider defaultValue={[0]} max={120} step={30} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Now</span>
              <span>+30min</span>
              <span>+1hr</span>
              <span>+1.5hr</span>
              <span>+2hr</span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {trafficData.predictions.map((prediction, index) => (
                <Card key={index} className="overflow-hidden">
                  <div
                    className={`h-2 ${
                      prediction.load < 60 ? "bg-green-500" : prediction.load < 80 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                  ></div>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium">{prediction.time}</div>
                    <div className="mt-1 text-2xl font-bold">{prediction.load}%</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {prediction.load < 60
                        ? "Smooth traffic expected"
                        : prediction.load < 80
                          ? "Moderate congestion expected"
                          : "Heavy congestion expected"}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Queue Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Queue Status</CardTitle>
            <CardDescription>Current time slot allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficData.timeSlots.map((slot, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{slot.time}</span>
                    <Badge
                      variant="outline"
                      className={
                        slot.status === "Full"
                          ? "border-red-200 bg-red-50 text-red-700"
                          : slot.status === "Almost Full"
                            ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                            : "border-green-200 bg-green-50 text-green-700"
                      }
                    >
                      {slot.status}
                    </Badge>
                  </div>
                  <Progress value={(slot.vehicles / slot.capacity) * 100} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {slot.vehicles} / {slot.capacity} vehicles
                    </span>
                    <span>{Math.round((slot.vehicles / slot.capacity) * 100)}% full</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-1">
              <ArrowRight className="h-4 w-4" />
              View Full Queue Manager
            </Button>
          </CardFooter>
        </Card>

        {/* Virtual Assistant */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Virtual Assistant</CardTitle>
            <CardDescription>AI-powered traffic suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    AI Recommendation
                  </Badge>
                </div>
                <p className="text-sm">
                  I suggest blocking entry from Bhimtal Side for 15 minutes to avoid overload. Current inflow rate is
                  exceeding road capacity.
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Traffic Pattern
                  </Badge>
                </div>
                <p className="text-sm">
                  Based on historical data, traffic will likely decrease after 4:00 PM. Consider extending current time
                  slots by 15 minutes each.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="w-full gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
                <Button className="w-full gap-1 bg-green-600 hover:bg-green-700">
                  <MessageSquare className="h-4 w-4" />
                  Ask Assistant
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
