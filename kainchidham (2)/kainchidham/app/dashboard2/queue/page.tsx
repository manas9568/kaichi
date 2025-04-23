"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, Plus, RefreshCw, Save, Send, Users } from "lucide-react"

export default function QueuePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, time: "10:00 AM - 10:30 AM", capacity: 50, booked: 50, status: "Full" },
    { id: 2, time: "10:30 AM - 11:00 AM", capacity: 50, booked: 45, status: "Almost Full" },
    { id: 3, time: "11:00 AM - 11:30 AM", capacity: 50, booked: 30, status: "Available" },
    { id: 4, time: "11:30 AM - 12:00 PM", capacity: 50, booked: 15, status: "Available" },
    { id: 5, time: "12:00 PM - 12:30 PM", capacity: 50, booked: 10, status: "Available" },
    { id: 6, time: "12:30 PM - 1:00 PM", capacity: 50, booked: 5, status: "Available" },
  ])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto p-4 md:p-6 animate-fade-in">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Queue Manager</h1>
          <p className="text-muted-foreground">Manage visitor entry and time slots</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 transition-all duration-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Updating..." : "Refresh"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Time Slot Management</CardTitle>
              <CardDescription>Configure and manage visitor time slots</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="today" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
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
                  <TabsTrigger
                    value="custom"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Custom
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="today">
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time Slot</TableHead>
                          <TableHead>Capacity</TableHead>
                          <TableHead>Booked</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeSlots.map((slot) => (
                          <TableRow key={slot.id} className="transition-colors hover:bg-muted/50">
                            <TableCell className="font-medium">{slot.time}</TableCell>
                            <TableCell>{slot.capacity}</TableCell>
                            <TableCell>{slot.booked}</TableCell>
                            <TableCell>
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
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Plus className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Clock className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button className="gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      <Plus className="h-4 w-4" />
                      Add Time Slot
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="tomorrow">
                  <div className="rounded-lg border p-6 text-center">
                    <h3 className="font-medium mb-2">Tomorrow's Schedule</h3>
                    <p className="text-sm text-muted-foreground">Configure time slots for tomorrow</p>
                    <Button className="mt-4 gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      <Plus className="h-4 w-4" />
                      Create Schedule
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="custom">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Select Date</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Template</Label>
                        <Select defaultValue="weekday">
                          <SelectTrigger>
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekday">Weekday</SelectItem>
                            <SelectItem value="weekend">Weekend</SelectItem>
                            <SelectItem value="festival">Festival Day</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button className="gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      <Calendar className="h-4 w-4" />
                      Generate Schedule
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Current Queue Status</CardTitle>
              <CardDescription>Live queue information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Current Wait Time</h3>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">25 min</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">People in Queue</h3>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">45</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Current Capacity</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-2xl font-bold">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>

              <div className="mt-6 rounded-lg border p-4">
                <h3 className="font-medium mb-2">Current Time Slot</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">10:30 AM - 11:00 AM</p>
                    <p className="text-sm text-muted-foreground">45/50 visitors checked in</p>
                  </div>
                  <Badge className="border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-400">
                    Almost Full
                  </Badge>
                </div>
                <Progress value={90} className="mt-2 h-2" indicatorClassName="bg-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common queue management tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 transition-all duration-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400"
              >
                <Users className="h-4 w-4" />
                Check-in Visitor
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 transition-all duration-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400"
              >
                <Clock className="h-4 w-4" />
                Adjust Wait Time
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 transition-all duration-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400"
              >
                <Send className="h-4 w-4" />
                Send Notification
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 transition-all duration-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400"
              >
                <Save className="h-4 w-4" />
                Save Current Status
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Queue Settings</CardTitle>
              <CardDescription>Configure queue parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Time Slot Duration</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Visitors Per Slot</Label>
                <Input type="number" defaultValue="50" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="auto-adjust">Auto-adjust capacity</Label>
                </div>
                <Switch id="auto-adjust" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="notifications">Send notifications</Label>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="overflow">Allow overflow</Label>
                </div>
                <Switch id="overflow" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                <Save className="h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
