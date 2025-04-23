"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Car, Pause, Play, RefreshCw, Truck, ZoomIn, ZoomOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Fake data for the simulation
const simulationData = {
  vehicleCount: 78,
  congestionLevel: "Moderate",
  averageSpeed: 15,
  roadSegments: [
    { id: 1, name: "Main Entry", status: "green", vehicles: 12 },
    { id: 2, name: "Temple Road", status: "yellow", vehicles: 25 },
    { id: 3, name: "Parking Area", status: "green", vehicles: 18 },
    { id: 4, name: "Exit Route", status: "red", vehicles: 23 },
  ],
}

export default function MapSimulation() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [viewMode, setViewMode] = useState("satellite")
  const [vehicles, setVehicles] = useState<
    Array<{ id: number; x: number; y: number; type: string; direction: number }>
  >([])
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Initialize vehicles
  useEffect(() => {
    const initialVehicles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 800,
      y: Math.random() * 400,
      type: Math.random() > 0.8 ? "truck" : "car",
      direction: Math.random() * Math.PI * 2,
    }))
    setVehicles(initialVehicles)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return

    const animate = () => {
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => {
          // Move vehicle
          let x = vehicle.x + Math.cos(vehicle.direction) * speed
          let y = vehicle.y + Math.sin(vehicle.direction) * speed

          // Bounce off edges
          if (x < 0 || x > 800) {
            vehicle.direction = Math.PI - vehicle.direction
            x = vehicle.x + Math.cos(vehicle.direction) * speed
          }
          if (y < 0 || y > 400) {
            vehicle.direction = -vehicle.direction
            y = vehicle.y + Math.sin(vehicle.direction) * speed
          }

          // Randomly change direction occasionally
          if (Math.random() < 0.01) {
            vehicle.direction += (Math.random() - 0.5) * 0.5
          }

          return { ...vehicle, x, y }
        }),
      )

      // Update progress bar
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.1))

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, speed])

  // Draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw road (simplified)
    ctx.strokeStyle = "#555"
    ctx.lineWidth = 20
    ctx.beginPath()
    ctx.moveTo(0, 200)
    ctx.lineTo(800, 200)
    ctx.stroke()

    // Draw temple
    ctx.fillStyle = "#f59e0b"
    ctx.beginPath()
    ctx.moveTo(400, 150)
    ctx.lineTo(450, 150)
    ctx.lineTo(425, 120)
    ctx.closePath()
    ctx.fill()
    ctx.fillRect(410, 150, 30, 30)

    // Draw congestion zones
    ctx.globalAlpha = 0.3
    ctx.fillStyle = "#ef4444"
    ctx.fillRect(600, 180, 100, 40)
    ctx.fillStyle = "#f59e0b"
    ctx.fillRect(300, 180, 80, 40)
    ctx.globalAlpha = 1

    // Draw vehicles
    vehicles.forEach((vehicle) => {
      ctx.save()
      ctx.translate(vehicle.x, vehicle.y)
      ctx.rotate(vehicle.direction)

      if (vehicle.type === "car") {
        ctx.fillStyle = "#3b82f6"
        ctx.fillRect(-10, -5, 20, 10)
      } else {
        ctx.fillStyle = "#10b981"
        ctx.fillRect(-15, -6, 30, 12)
      }

      ctx.restore()
    })
  }, [vehicles])

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Map & Simulation</h1>
          <p className="text-muted-foreground">Visualize traffic flow on Kainchi Dham roads</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Map Controls */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Controls</CardTitle>
            <CardDescription>Adjust simulation parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="speed">Simulation Speed</Label>
                <span className="text-sm text-muted-foreground">{speed}x</span>
              </div>
              <Slider
                id="speed"
                min={0.5}
                max={3}
                step={0.5}
                value={[speed]}
                onValueChange={(value) => setSpeed(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label>View Mode</Label>
              <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="satellite">Satellite</TabsTrigger>
                  <TabsTrigger value="cartoon">Cartoon</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label>Vehicle Types</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="show-cars" defaultChecked />
                  <Label htmlFor="show-cars" className="flex items-center gap-2">
                    <Car className="h-4 w-4" /> Cars
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="show-trucks" defaultChecked />
                  <Label htmlFor="show-trucks" className="flex items-center gap-2">
                    <Truck className="h-4 w-4" /> Buses & Trucks
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Zoom</Label>
              <div className="flex items-center justify-between">
                <Button variant="outline" size="icon">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm">100%</span>
                <Button variant="outline" size="icon">
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Legend</Label>
              <div className="space-y-2 rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Smooth Traffic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Moderate Congestion</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Heavy Congestion</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Display */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Traffic Simulation</CardTitle>
            <CardDescription>Live view of vehicle movement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-md border bg-muted/40">
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="h-[400px] w-full rounded-md object-cover"
              ></canvas>
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-xs font-medium">Vehicles</div>
                      <div className="text-lg font-bold">{simulationData.vehicleCount}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium">Congestion</div>
                      <div className="text-lg font-bold">{simulationData.congestionLevel}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium">Avg. Speed</div>
                      <div className="text-lg font-bold">{simulationData.averageSpeed} km/h</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full rounded-full bg-muted">
                      <motion.div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${progress}%` }}
                      ></motion.div>
                    </div>
                    <span className="text-xs">{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Road Status */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {simulationData.roadSegments.map((segment) => (
                <div key={segment.id} className="rounded-md border p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{segment.name}</span>
                    <Badge
                      variant="outline"
                      className={
                        segment.status === "green"
                          ? "border-green-200 bg-green-50 text-green-700"
                          : segment.status === "yellow"
                            ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                            : "border-red-200 bg-red-50 text-red-700"
                      }
                    >
                      {segment.status === "green" ? "Clear" : segment.status === "yellow" ? "Moderate" : "Congested"}
                    </Badge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{segment.vehicles} vehicles</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
