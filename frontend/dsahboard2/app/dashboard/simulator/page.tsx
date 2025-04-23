"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Car, Clock, Download, Play, Save, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function SimulatorPage() {
  const [activeScenario, setActiveScenario] = useState("festival")
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [simulationResults, setSimulationResults] = useState<null | {
    congestion: number
    waitTime: number
    parkingUtilization: number
    visitorCount: number
  }>(null)

  const handleStartSimulation = () => {
    setIsSimulating(true)
    setSimulationProgress(0)
    setSimulationResults(null)

    // Simulate progress
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSimulating(false)
          // Generate random results
          setSimulationResults({
            congestion: Math.floor(Math.random() * 40) + 60, // 60-100
            waitTime: Math.floor(Math.random() * 30) + 20, // 20-50
            parkingUtilization: Math.floor(Math.random() * 30) + 70, // 70-100
            visitorCount: Math.floor(Math.random() * 300) + 200, // 200-500
          })
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="container mx-auto p-4 md:p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Scenario Simulator</h1>
        <p className="text-muted-foreground">Test different traffic scenarios and plan for events</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Scenario Selection</CardTitle>
              <CardDescription>Choose a scenario to simulate</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeScenario} onValueChange={setActiveScenario} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger
                    value="normal"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    Normal
                  </TabsTrigger>
                  <TabsTrigger
                    value="festival"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    Festival
                  </TabsTrigger>
                  <TabsTrigger
                    value="emergency"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    Emergency
                  </TabsTrigger>
                  <TabsTrigger
                    value="custom"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    Custom
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="normal" className="mt-4 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Normal Day Scenario</h3>
                    <p className="text-sm text-muted-foreground">
                      Simulates regular traffic patterns on a typical day at Kainchi Dham.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Expected Visitors</p>
                        <p className="font-medium">150-200</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Peak Hours</p>
                        <p className="font-medium">10 AM - 12 PM</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="festival" className="mt-4 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Festival Day Scenario</h3>
                    <p className="text-sm text-muted-foreground">
                      Simulates high traffic during Neem Karoli Baba Jayanti or other major festivals.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Expected Visitors</p>
                        <p className="font-medium">400-500</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Peak Hours</p>
                        <p className="font-medium">All Day (6 AM - 7 PM)</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Festival Date</Label>
                      <Input type="date" defaultValue="2023-06-15" />
                    </div>
                    <div className="space-y-2">
                      <Label>Expected Duration</Label>
                      <Select defaultValue="full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="half">Half Day</SelectItem>
                          <SelectItem value="full">Full Day</SelectItem>
                          <SelectItem value="multi">Multiple Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="emergency" className="mt-4 space-y-4">
                  <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium text-red-700 dark:text-red-400">Emergency Evacuation Scenario</h3>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Simulates emergency evacuation procedures and traffic management during critical situations.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Emergency Type</Label>
                      <Select defaultValue="natural">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="natural">Natural Disaster</SelectItem>
                          <SelectItem value="fire">Fire</SelectItem>
                          <SelectItem value="security">Security Threat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Response Level</Label>
                      <Select defaultValue="high">
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Level 1 (Low)</SelectItem>
                          <SelectItem value="medium">Level 2 (Medium)</SelectItem>
                          <SelectItem value="high">Level 3 (High)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="mt-4 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Custom Scenario</h3>
                    <p className="text-sm text-muted-foreground">
                      Create a custom traffic scenario with specific parameters.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Visitor Count</Label>
                      <Input type="number" placeholder="Enter expected visitors" defaultValue="300" />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Traffic Density</Label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">Low</span>
                      <Slider defaultValue={[75]} max={100} step={5} className="flex-1" />
                      <span className="text-sm">High</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Weather Conditions</Label>
                    <Select defaultValue="clear">
                      <SelectTrigger>
                        <SelectValue placeholder="Select weather" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clear">Clear</SelectItem>
                        <SelectItem value="rain">Rainy</SelectItem>
                        <SelectItem value="fog">Foggy</SelectItem>
                        <SelectItem value="snow">Snow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className="gap-2 transition-all duration-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400"
              >
                <Save className="h-4 w-4" />
                Save Scenario
              </Button>
              <Button
                className="gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                onClick={handleStartSimulation}
                disabled={isSimulating}
              >
                <Play className="h-4 w-4" />
                Run Simulation
              </Button>
            </CardFooter>
          </Card>

          {/* Simulation Results */}
          {(isSimulating || simulationResults) && (
            <Card className="transition-all duration-300 hover:shadow-md animate-fade-in">
              <CardHeader>
                <CardTitle>Simulation Results</CardTitle>
                <CardDescription>
                  {isSimulating
                    ? "Processing simulation..."
                    : `Results for ${
                        activeScenario === "normal"
                          ? "Normal Day"
                          : activeScenario === "festival"
                            ? "Festival Day"
                            : activeScenario === "emergency"
                              ? "Emergency Evacuation"
                              : "Custom"
                      } scenario`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSimulating ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Simulation in progress...</span>
                      <span className="text-sm">{simulationProgress}%</span>
                    </div>
                    <Progress value={simulationProgress} className="h-2" />
                  </div>
                ) : (
                  simulationResults && (
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Congestion Level</h3>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full ${
                                simulationResults.congestion < 70
                                  ? "bg-green-500"
                                  : simulationResults.congestion < 85
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            ></div>
                            <span className="text-2xl font-bold">{simulationResults.congestion}%</span>
                          </div>
                          <Progress
                            value={simulationResults.congestion}
                            className="mt-2 h-2"
                            indicatorClassName={
                              simulationResults.congestion < 70
                                ? "bg-green-500"
                                : simulationResults.congestion < 85
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Expected Wait Time</h3>
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <span className="text-2xl font-bold">{simulationResults.waitTime} min</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Parking Utilization</h3>
                          <div className="flex items-center gap-2">
                            <Car className="h-5 w-5 text-muted-foreground" />
                            <span className="text-2xl font-bold">{simulationResults.parkingUtilization}%</span>
                          </div>
                          <Progress
                            value={simulationResults.parkingUtilization}
                            className="mt-2 h-2"
                            indicatorClassName={
                              simulationResults.parkingUtilization < 80
                                ? "bg-green-500"
                                : simulationResults.parkingUtilization < 95
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Expected Visitors</h3>
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <span className="text-2xl font-bold">{simulationResults.visitorCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </CardContent>
              {simulationResults && (
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full gap-2 transition-all duration-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400"
                  >
                    <Download className="h-4 w-4" />
                    Export Results
                  </Button>
                </CardFooter>
              )}
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Simulation Parameters</CardTitle>
              <CardDescription>Adjust advanced settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Time Period</Label>
                <Select defaultValue="day">
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                    <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                    <SelectItem value="day">Full Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Parking Capacity</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm">50%</span>
                  <Slider defaultValue={[100]} max={100} step={10} className="flex-1" />
                  <span className="text-sm">100%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Staff Availability</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm">Low</span>
                  <Slider defaultValue={[80]} max={100} step={10} className="flex-1" />
                  <span className="text-sm">High</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="alt-routes">Use Alternate Routes</Label>
                </div>
                <Switch id="alt-routes" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="time-slots">Enable Time Slots</Label>
                </div>
                <Switch id="time-slots" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Saved Scenarios</CardTitle>
              <CardDescription>Previously saved simulation scenarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Jayanti 2023</h3>
                  <Badge className="bg-green-600">Festival</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Created on May 10, 2023</p>
                <div className="mt-2 flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-3 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Monsoon Evacuation</h3>
                  <Badge className="bg-red-500">Emergency</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Created on April 15, 2023</p>
                <div className="mt-2 flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-3 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Weekend Traffic</h3>
                  <Badge className="bg-blue-500">Normal</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Created on March 22, 2023</p>
                <div className="mt-2 flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
