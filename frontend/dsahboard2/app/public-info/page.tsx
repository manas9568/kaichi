"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Car,
  Clock,
  CloudSun,
  MapPin,
  RefreshCw,
  ChurchIcon as Temple,
  ArrowRight,
  Bell,
  Info,
  Calendar,
  Users,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PublicInfoPage() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  const [congestionLevel, setCongestionLevel] = useState(65)
  const [waitTime, setWaitTime] = useState(25)
  const [recommendedEntry] = useState("11:30 AM")
  const [estimatedDelay] = useState(20)
  const [alternateParking] = useState("Bhimtal Road Parking")
  const [visitorCount] = useState(245)
  const [isLoading, setIsLoading] = useState(false)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Simulate refresh data
  const handleRefresh = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Update with random values to simulate real-time changes
      setCongestionLevel(Math.floor(Math.random() * 30) + 50) // Between 50-80
      setWaitTime(Math.floor(Math.random() * 15) + 15) // Between 15-30
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 animate-fade-in">
      {/* Hero Section with Parallax Effect */}
      <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden dark:from-green-900 dark:to-green-700">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover opacity-20"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Temple className="h-8 w-8" />
              <h1 className="text-2xl md:text-3xl font-bold">Kainchi Dham</h1>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="gap-1 bg-white/20 hover:bg-white/30 text-white border-white/40 transition-all duration-300"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg transition-transform duration-300 hover:scale-105">
              <Clock className="h-6 w-6" />
              <div>
                <p className="text-sm opacity-80">Current Wait</p>
                <p className="text-xl font-bold">{waitTime} min</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg transition-transform duration-300 hover:scale-105">
              <Users className="h-6 w-6" />
              <div>
                <p className="text-sm opacity-80">Visitors Today</p>
                <p className="text-xl font-bold">{visitorCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg transition-transform duration-300 hover:scale-105">
              <CloudSun className="h-6 w-6" />
              <div>
                <p className="text-sm opacity-80">Weather</p>
                <p className="text-xl font-bold">24°C</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Traffic Information</h2>
              <p className="opacity-80">Live updates and recommendations</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm">{currentTime}</p>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 bg-white/20 hover:bg-white/30 text-white border-white/40 transition-all duration-300"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
                {isLoading ? "Updating..." : "Refresh"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Map with animation controls */}
        <div className="mb-8 rounded-xl overflow-hidden border bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
              Live Traffic Map
            </h2>
          </div>
          <div className="aspect-video bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <p className="text-muted-foreground">Interactive Map View</p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Alert Banner */}
          {congestionLevel > 60 && (
            <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-400 animate-fade-in">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>High Traffic Alert</AlertTitle>
              <AlertDescription>
                Traffic congestion is currently high. Consider using alternate parking or visiting during recommended
                times.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Main Info Card */}
            <Card className="md:col-span-2 overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b dark:from-green-900/20 dark:to-blue-900/20 dark:border-green-900/10">
                <CardTitle className="text-green-800 dark:text-green-400">Current Traffic Status</CardTitle>
                <CardDescription>Live traffic conditions at Kainchi Dham</CardDescription>
              </div>
              <CardContent className="grid gap-6 md:grid-cols-3 p-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Current Congestion</h3>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        congestionLevel < 50 ? "bg-green-500" : congestionLevel < 80 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-2xl font-bold">
                      {congestionLevel < 50 ? "Low" : congestionLevel < 80 ? "Moderate" : "High"}
                    </span>
                  </div>
                  <Progress
                    value={congestionLevel}
                    className={
                      congestionLevel < 50 ? "bg-green-100" : congestionLevel < 80 ? "bg-yellow-100" : "bg-red-100"
                    }
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Wait Time</h3>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{waitTime} min</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Average wait at entry point</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Weather</h3>
                  <div className="flex items-center gap-2">
                    <CloudSun className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">24°C</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Partly cloudy</p>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-none shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b dark:from-green-900/20 dark:to-blue-900/20 dark:border-green-900/10">
                <CardTitle className="text-green-800 dark:text-green-400">Recommended Entry</CardTitle>
                <CardDescription>Best time to visit based on current traffic</CardDescription>
              </div>
              <CardContent className="space-y-6 p-6">
                <div className="rounded-md bg-gradient-to-r from-green-50 to-green-100 p-4 text-center dark:from-green-900/30 dark:to-green-800/30">
                  <h3 className="mb-2 text-sm font-medium text-green-800 dark:text-green-400">Next Safe Entry</h3>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-400">{recommendedEntry}</p>
                  <p className="mt-2 text-sm text-green-700 dark:text-green-400">
                    Arrive after this time for minimal waiting
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-md border p-3 text-center hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
                    <h3 className="mb-1 text-sm font-medium">Estimated Delay</h3>
                    <p className="text-xl font-bold">{estimatedDelay} min</p>
                  </div>
                  <div className="rounded-md border p-3 text-center hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
                    <h3 className="mb-1 text-sm font-medium">Current Queue</h3>
                    <p className="text-xl font-bold">45 vehicles</p>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400">
                  <Clock className="h-4 w-4" />
                  <AlertTitle>Time-Sensitive Advice</AlertTitle>
                  <AlertDescription>
                    Traffic is expected to decrease after 12:00 PM. Consider delaying your visit if possible.
                  </AlertDescription>
                </Alert>

                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition-all duration-300">
                  <Bell className="h-4 w-4" />
                  Get Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Alternate Routes */}
            <Card className="border-none shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b dark:from-green-900/20 dark:to-blue-900/20 dark:border-green-900/10">
                <CardTitle className="text-green-800 dark:text-green-400">Alternate Parking</CardTitle>
                <CardDescription>Suggested parking locations</CardDescription>
              </div>
              <CardContent className="space-y-4 p-6">
                <div className="rounded-md border p-4 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
                  <div className="mb-2 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium">{alternateParking}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Car className="h-4 w-4" />
                    <span>25 spots available</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>10 min walk to temple</span>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4 w-full gap-1 transition-all duration-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Get Directions
                  </Button>
                </div>

                <div className="rounded-md border p-4 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
                  <div className="mb-2 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium">Kainchi Bridge Parking</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Car className="h-4 w-4" />
                    <span>15 spots available</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>5 min walk to temple</span>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4 w-full gap-1 transition-all duration-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button className="w-full gap-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition-all duration-300">
                  View All Parking Options
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Time Slot Information */}
          <Card className="mt-6 border-none shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b dark:from-green-900/20 dark:to-blue-900/20 dark:border-green-900/10">
              <CardTitle className="text-green-800 dark:text-green-400">Available Time Slots</CardTitle>
              <CardDescription>Current and upcoming entry slots</CardDescription>
            </div>
            <CardContent className="p-6">
              <Tabs defaultValue="today" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
                  <TabsTrigger
                    value="today"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Today
                  </TabsTrigger>
                  <TabsTrigger
                    value="tomorrow"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Tomorrow
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="today">
                  <div className="space-y-4">
                    {[
                      { time: "10:00 AM - 10:30 AM", status: "Full", progress: 100 },
                      { time: "10:30 AM - 11:00 AM", status: "Almost Full", progress: 90 },
                      { time: "11:00 AM - 11:30 AM", status: "Available", progress: 60 },
                      { time: "11:30 AM - 12:00 PM", status: "Available", progress: 30 },
                      { time: "12:00 PM - 12:30 PM", status: "Available", progress: 20 },
                    ].map((slot, index) => (
                      <div
                        key={index}
                        className="rounded-md border p-3 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium">{slot.time}</span>
                          <Badge
                            variant="outline"
                            className={
                              slot.status === "Full"
                                ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400"
                                : slot.status === "Almost Full"
                                  ? "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-400"
                                  : "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400"
                            }
                          >
                            {slot.status}
                          </Badge>
                        </div>
                        <Progress
                          value={slot.progress}
                          className="h-2"
                          indicatorClassName={
                            slot.progress > 80 ? "bg-red-500" : slot.progress > 50 ? "bg-yellow-500" : "bg-green-500"
                          }
                        />
                        <div className="mt-2 text-xs text-muted-foreground">{slot.progress}% full</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tomorrow">
                  <div className="space-y-4">
                    {[
                      { time: "9:00 AM - 9:30 AM", status: "Available", progress: 10 },
                      { time: "9:30 AM - 10:00 AM", status: "Available", progress: 15 },
                      { time: "10:00 AM - 10:30 AM", status: "Available", progress: 20 },
                      { time: "10:30 AM - 11:00 AM", status: "Available", progress: 25 },
                      { time: "11:00 AM - 11:30 AM", status: "Available", progress: 30 },
                    ].map((slot, index) => (
                      <div
                        key={index}
                        className="rounded-md border p-3 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium">{slot.time}</span>
                          <Badge
                            variant="outline"
                            className="border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400"
                          >
                            {slot.status}
                          </Badge>
                        </div>
                        <Progress value={slot.progress} className="h-2" />
                        <div className="mt-2 text-xs text-muted-foreground">{slot.progress}% full</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="mt-6 border-none shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b dark:from-green-900/20 dark:to-blue-900/20 dark:border-green-900/10">
              <CardTitle className="text-green-800 dark:text-green-400">Temple Information</CardTitle>
              <CardDescription>Important details for visitors</CardDescription>
            </div>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-green-600 mt-0.5 dark:text-green-400" />
                    <div>
                      <h3 className="font-medium">Opening Hours</h3>
                      <p className="text-sm text-muted-foreground">6:00 AM - 7:00 PM daily</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-green-600 mt-0.5 dark:text-green-400" />
                    <div>
                      <h3 className="font-medium">Special Ceremonies</h3>
                      <p className="text-sm text-muted-foreground">Aarti at 7:00 AM and 6:30 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-green-600 mt-0.5 dark:text-green-400" />
                    <div>
                      <h3 className="font-medium">Photography</h3>
                      <p className="text-sm text-muted-foreground">Not allowed inside the main temple</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-green-600 mt-0.5 dark:text-green-400" />
                    <div>
                      <h3 className="font-medium">Dress Code</h3>
                      <p className="text-sm text-muted-foreground">Modest clothing recommended</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-green-600 mt-0.5 dark:text-green-400" />
                    <div>
                      <h3 className="font-medium">Footwear</h3>
                      <p className="text-sm text-muted-foreground">Must be removed before entering temple</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-green-600 mt-0.5 dark:text-green-400" />
                    <div>
                      <h3 className="font-medium">Contact</h3>
                      <p className="text-sm text-muted-foreground">+91 1234567890</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition-all duration-300">
                <Info className="h-4 w-4" />
                View Complete Temple Guide
              </Button>
            </CardFooter>
          </Card>

          {/* Footer */}
          <footer className="mt-12 text-center text-sm text-muted-foreground">
            <p>© 2023 Kainchi Dham Traffic Management System</p>
            <p className="mt-2">For emergencies, please contact: +91 9876543210</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
