"use client"

import { useState } from "react"
import { AlertTriangle, ArrowRight, Bus, Car, Clock, Plus, RefreshCw, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ScenarioSimulator() {
  const [activeScenario, setActiveScenario] = useState("custom")
  const [vehicleCount, setVehicleCount] = useState(50)
  const [congestionLevel, setCongestionLevel] = useState(45)
  const [waitTime, setWaitTime] = useState(15)
  const [recommendation, setRecommendation] = useState("Current traffic flow is manageable.")

  const runScenario = (scenario: string) => {
    setActiveScenario(scenario)

    // Simulate different scenarios
    if (scenario === "add50") {
      setVehicleCount(100)
      setCongestionLevel(75)
      setWaitTime(30)
      setRecommendation("Delay new entries by 20 minutes to prevent gridlock.")
    } else if (scenario === "festival") {
      setVehicleCount(200)
      setCongestionLevel(90)
      setWaitTime(45)
      setRecommendation("Activate one-way flow control. Allow entry for 30 minutes, then exit for 30 minutes.")
    } else if (scenario === "emergency") {
      setVehicleCount(80)
      setCongestionLevel(85)
      setWaitTime(35)
      setRecommendation("Clear main road immediately. Direct all vehicles to temporary parking areas.")
    } else {
      // Custom scenario - keep current values
    }
  }

  const handleAddVehicles = () => {
    setVehicleCount((prev) => prev + 50)
    setCongestionLevel((prev) => Math.min(prev + 20, 100))
    setWaitTime((prev) => prev + 10)

    if (congestionLevel + 20 > 80) {
      setRecommendation("Traffic approaching critical levels. Consider implementing time slot restrictions.")
    }
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Scenario Simulator</h1>
          <p className="text-muted-foreground">Test different traffic scenarios and plan responses</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            Reset
          </Button>
          <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
            <Plus className="h-3.5 w-3.5" />
            Save Scenario
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Scenario Controls */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Scenario Controls</CardTitle>
            <CardDescription>Test different traffic conditions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="preset" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preset">Preset Scenarios</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>

              <TabsContent value="preset" className="space-y-4 pt-4">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={() => runScenario("add50")}>
                  <Car className="h-4 w-4" />
                  Add 50 Vehicles
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => runScenario("festival")}
                >
                  <Users className="h-4 w-4" />
                  Simulate Festival Crowd
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => runScenario("emergency")}
                >
                  <Bus className="h-4 w-4" />
                  Emergency Bus Arrival
                </Button>
              </TabsContent>

              <TabsContent value="custom" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-count">Vehicle Count</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="vehicle-count"
                      type="number"
                      value={vehicleCount}
                      onChange={(e) => setVehicleCount(Number.parseInt(e.target.value) || 0)}
                      className="w-20"
                    />
                    <Button variant="outline" size="icon" onClick={handleAddVehicles}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="congestion-level">Congestion Level (%)</Label>
                  <Slider
                    id="congestion-level"
                    min={0}
                    max={100}
                    step={5}
                    value={[congestionLevel]}
                    onValueChange={(value) => setCongestionLevel(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wait-time">Average Wait Time (min)</Label>
                  <Slider
                    id="wait-time"
                    min={0}
                    max={60}
                    step={5}
                    value={[waitTime]}
                    onValueChange={(value) => setWaitTime(value[0])}
                  />
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => runScenario("custom")}>
                  Run Simulation
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Simulation Results */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Simulation Results</CardTitle>
            <CardDescription>
              {activeScenario === "add50"
                ? "Adding 50 vehicles to current traffic"
                : activeScenario === "festival"
                  ? "Festival crowd simulation"
                  : activeScenario === "emergency"
                    ? "Emergency bus arrival"
                    : "Custom scenario simulation"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Vehicle Count</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{vehicleCount}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Congestion Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{congestionLevel}%</div>
                  <Progress value={congestionLevel} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Wait Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{waitTime} min</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert
              className={
                congestionLevel < 50
                  ? "border-green-200 bg-green-50 text-green-800"
                  : congestionLevel < 80
                    ? "border-yellow-200 bg-yellow-50 text-yellow-800"
                    : "border-red-200 bg-red-50 text-red-800"
              }
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>AI Recommendation</AlertTitle>
              <AlertDescription>{recommendation}</AlertDescription>
            </Alert>

            <div className="rounded-md border p-4">
              <h3 className="mb-2 text-sm font-medium">Traffic Impact Analysis</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Main Entry Point</span>
                    <Badge
                      variant="outline"
                      className={
                        congestionLevel < 50
                          ? "border-green-200 bg-green-50 text-green-700"
                          : congestionLevel < 80
                            ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                            : "border-red-200 bg-red-50 text-red-700"
                      }
                    >
                      {congestionLevel < 50 ? "Clear" : congestionLevel < 80 ? "Moderate" : "Congested"}
                    </Badge>
                  </div>
                  <Progress
                    value={congestionLevel}
                    className={
                      congestionLevel < 50 ? "bg-green-100" : congestionLevel < 80 ? "bg-yellow-100" : "bg-red-100"
                    }
                  />
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Temple Road</span>
                    <Badge
                      variant="outline"
                      className={
                        congestionLevel - 10 < 50
                          ? "border-green-200 bg-green-50 text-green-700"
                          : congestionLevel - 10 < 80
                            ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                            : "border-red-200 bg-red-50 text-red-700"
                      }
                    >
                      {congestionLevel - 10 < 50 ? "Clear" : congestionLevel - 10 < 80 ? "Moderate" : "Congested"}
                    </Badge>
                  </div>
                  <Progress
                    value={congestionLevel - 10}
                    className={
                      congestionLevel - 10 < 50
                        ? "bg-green-100"
                        : congestionLevel - 10 < 80
                          ? "bg-yellow-100"
                          : "bg-red-100"
                    }
                  />
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Exit Route</span>
                    <Badge
                      variant="outline"
                      className={
                        congestionLevel + 10 < 50
                          ? "border-green-200 bg-green-50 text-green-700"
                          : congestionLevel + 10 < 80
                            ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                            : "border-red-200 bg-red-50 text-red-700"
                      }
                    >
                      {congestionLevel + 10 < 50 ? "Clear" : congestionLevel + 10 < 80 ? "Moderate" : "Congested"}
                    </Badge>
                  </div>
                  <Progress
                    value={congestionLevel + 10}
                    className={
                      congestionLevel + 10 < 50
                        ? "bg-green-100"
                        : congestionLevel + 10 < 80
                          ? "bg-yellow-100"
                          : "bg-red-100"
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="ml-auto gap-1">
              <ArrowRight className="h-4 w-4" />
              View Detailed Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
