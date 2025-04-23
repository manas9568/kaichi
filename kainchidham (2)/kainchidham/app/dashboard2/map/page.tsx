"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Clock, MapPin, Play, Pause, RotateCcw, Layers, AlertTriangle } from "lucide-react"
import MapView from "@/components/ui/MapView" // ✅ Map component import

export default function MapPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [simulationSpeed, setSimulationSpeed] = useState(1)
  const [showLayers, setShowLayers] = useState({
    traffic: true,
    parking: true,
    incidents: true,
    heatmap: false,
  })

  return (
    <div className="container mx-auto p-4 md:p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Map & Simulation</h1>
        <p className="text-muted-foreground">Interactive traffic map and real-time simulation</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card className="overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-b">
              <CardTitle>Traffic Map</CardTitle>
              <CardDescription>Real-time traffic visualization</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive Map Visualization</p>
                </div>

               {/* ✅ Map with animation controls */}
  <div className="mb-8 rounded-xl overflow-hidden border bg-white shadow-md">
    <div className="p-4 border-b bg-gray-50">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <MapPin className="h-5 w-5 text-green-600" />
        Live Traffic Map
      </h2>
    </div>

    {/* 🗺️ Your MapView and Controls */}
    <div className="relative">
      <MapView />

      {/* Map Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white/90 p-2 shadow-md backdrop-blur-sm dark:bg-gray-900/90">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white dark:bg-gray-800"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-white dark:bg-gray-800">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">Speed:</span>
            <Slider
              value={[simulationSpeed]}
              min={0.5}
              max={3}
              step={0.5}
              onValueChange={(value) => setSimulationSpeed(value[0])}
              className="w-24"
            />
            <span className="text-xs">{simulationSpeed}x</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1 bg-white dark:bg-gray-800">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs">10:30 AM</span>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-white dark:bg-gray-800">
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>


          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Traffic Density</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Low</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">High</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Parking Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Main Parking</span>
                    <Badge className="bg-red-500">Full</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bhimtal Road</span>
                    <Badge className="bg-green-500">Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span>Road work at Kainchi Bridge</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Map Layers</CardTitle>
              <CardDescription>Toggle map information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="traffic-layer">Traffic Flow</Label>
                </div>
                <Switch
                  id="traffic-layer"
                  checked={showLayers.traffic}
                  onCheckedChange={(checked) => setShowLayers({ ...showLayers, traffic: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="parking-layer">Parking Areas</Label>
                </div>
                <Switch
                  id="parking-layer"
                  checked={showLayers.parking}
                  onCheckedChange={(checked) => setShowLayers({ ...showLayers, parking: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="incidents-layer">Incidents</Label>
                </div>
                <Switch
                  id="incidents-layer"
                  checked={showLayers.incidents}
                  onCheckedChange={(checked) => setShowLayers({ ...showLayers, incidents: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="heatmap-layer">Congestion Heatmap</Label>
                </div>
                <Switch
                  id="heatmap-layer"
                  checked={showLayers.heatmap}
                  onCheckedChange={(checked) => setShowLayers({ ...showLayers, heatmap: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Simulation Controls</CardTitle>
              <CardDescription>Adjust simulation parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="time-select">Simulation Time</Label>
                <Select defaultValue="current">
                  <SelectTrigger id="time-select">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Time</SelectItem>
                    <SelectItem value="morning">Morning Peak (8-10 AM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12-2 PM)</SelectItem>
                    <SelectItem value="evening">Evening Peak (4-6 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scenario-select">Traffic Scenario</Label>
                <Select defaultValue="normal">
                  <SelectTrigger id="scenario-select">
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal Day</SelectItem>
                    <SelectItem value="festival">Festival Day</SelectItem>
                    <SelectItem value="weekend">Weekend</SelectItem>
                    <SelectItem value="emergency">Emergency Evacuation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Vehicle Density</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm">Low</span>
                  <Slider defaultValue={[70]} max={100} step={10} className="flex-1" />
                  <span className="text-sm">High</span>
                </div>
              </div>

              <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                <Play className="h-4 w-4" />
                Run Simulation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
