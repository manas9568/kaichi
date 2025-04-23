"use client"

import { useState } from "react"
import { ArrowRight, Car, Clock, CloudSun, MapPin, RefreshCw, Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PublicInfo() {
  const [currentTime] = useState(new Date().toLocaleTimeString())
  const [congestionLevel] = useState(65)
  const [waitTime] = useState(25)
  const [recommendedEntry] = useState("11:30 AM")
  const [estimatedDelay] = useState(20)
  const [alternateParking] = useState("Bhimtal Road Parking")

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Public Information</h1>
          <p className="text-muted-foreground">Traffic information for visitors</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-muted-foreground">{currentTime}</p>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
          <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
            <Share2 className="h-3.5 w-3.5" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Info Card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Kainchi Dham Traffic Status</CardTitle>
            <CardDescription>Current traffic conditions and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
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
        <Card>
          <CardHeader>
            <CardTitle>Recommended Entry</CardTitle>
            <CardDescription>Best time to visit based on current traffic</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-md bg-muted p-4 text-center">
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Next Safe Entry</h3>
              <p className="text-3xl font-bold text-green-600">{recommendedEntry}</p>
              <p className="mt-2 text-sm text-muted-foreground">Arrive after this time for minimal waiting</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border p-3 text-center">
                <h3 className="mb-1 text-sm font-medium">Estimated Delay</h3>
                <p className="text-xl font-bold">{estimatedDelay} min</p>
              </div>
              <div className="rounded-md border p-3 text-center">
                <h3 className="mb-1 text-sm font-medium">Current Queue</h3>
                <p className="text-xl font-bold">45 vehicles</p>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50 text-blue-800">
              <Clock className="h-4 w-4" />
              <AlertTitle>Time-Sensitive Advice</AlertTitle>
              <AlertDescription>
                Traffic is expected to decrease after 12:00 PM. Consider delaying your visit if possible.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Alternate Routes */}
        <Card>
          <CardHeader>
            <CardTitle>Alternate Parking</CardTitle>
            <CardDescription>Suggested parking locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4">
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
              <Button variant="outline" className="mt-4 w-full gap-1">
                <ArrowRight className="h-4 w-4" />
                Get Directions
              </Button>
            </div>

            <div className="rounded-md border p-4">
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
              <Button variant="outline" className="mt-4 w-full gap-1">
                <ArrowRight className="h-4 w-4" />
                Get Directions
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-1 bg-green-600 hover:bg-green-700">View All Parking Options</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Time Slot Information */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Available Time Slots</CardTitle>
          <CardDescription>Current and upcoming entry slots</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="mt-4">
              <div className="space-y-4">
                {[
                  { time: "10:00 AM - 10:30 AM", status: "Full", progress: 100 },
                  { time: "10:30 AM - 11:00 AM", status: "Almost Full", progress: 90 },
                  { time: "11:00 AM - 11:30 AM", status: "Available", progress: 60 },
                  { time: "11:30 AM - 12:00 PM", status: "Available", progress: 30 },
                  { time: "12:00 PM - 12:30 PM", status: "Available", progress: 20 },
                ].map((slot, index) => (
                  <div key={index} className="rounded-md border p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">{slot.time}</span>
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
                    <Progress value={slot.progress} className="h-2" />
                    <div className="mt-2 text-xs text-muted-foreground">{slot.progress}% full</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tomorrow" className="mt-4">
              <div className="space-y-4">
                {[
                  { time: "9:00 AM - 9:30 AM", status: "Available", progress: 10 },
                  { time: "9:30 AM - 10:00 AM", status: "Available", progress: 15 },
                  { time: "10:00 AM - 10:30 AM", status: "Available", progress: 20 },
                  { time: "10:30 AM - 11:00 AM", status: "Available", progress: 25 },
                  { time: "11:00 AM - 11:30 AM", status: "Available", progress: 30 },
                ].map((slot, index) => (
                  <div key={index} className="rounded-md border p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">{slot.time}</span>
                      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
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
    </div>
  )
}
