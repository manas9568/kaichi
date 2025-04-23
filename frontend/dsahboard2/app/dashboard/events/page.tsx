"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, CalendarDays, Clock, Download, Edit, Plus, Trash, Users } from "lucide-react"

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="container mx-auto p-4 md:p-6 animate-fade-in">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events Calendar</h1>
          <p className="text-muted-foreground">Manage temple events and festivals</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
              <CardDescription>View and manage upcoming events</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="upcoming"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger value="past" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    Past
                  </TabsTrigger>
                  <TabsTrigger value="all" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="mt-6 space-y-4">
                  <div className="rounded-lg border p-4 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                          <CalendarDays className="h-6 w-6 text-green-700 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Neem Karoli Baba Jayanti</h3>
                          <p className="text-sm text-muted-foreground">June 15, 2023</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge className="bg-yellow-500">High Traffic</Badge>
                            <Badge className="bg-blue-500">Major Event</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>All Day Event</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Expected: 500+ visitors</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                          <CalendarDays className="h-6 w-6 text-green-700 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Monthly Bhandara</h3>
                          <p className="text-sm text-muted-foreground">May 28, 2023</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge className="bg-green-500">Moderate Traffic</Badge>
                            <Badge className="bg-purple-500">Regular Event</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>10:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Expected: 200-300 visitors</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                          <CalendarDays className="h-6 w-6 text-green-700 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Special Puja Ceremony</h3>
                          <p className="text-sm text-muted-foreground">June 5, 2023</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge className="bg-green-500">Moderate Traffic</Badge>
                            <Badge className="bg-orange-500">Special Event</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>7:00 AM - 9:00 AM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Expected: 150-200 visitors</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="past" className="mt-6">
                  <div className="rounded-lg border p-4 text-center">
                    <h3 className="font-medium mb-2">Past Events</h3>
                    <p className="text-sm text-muted-foreground">View historical events and attendance data</p>
                    <Button className="mt-4 gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      <Calendar className="h-4 w-4" />
                      View Archive
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="all" className="mt-6">
                  <div className="rounded-lg border p-4 text-center">
                    <h3 className="font-medium mb-2">Full Calendar View</h3>
                    <p className="text-sm text-muted-foreground">View all events in calendar format</p>
                    <Button className="mt-4 gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      <Calendar className="h-4 w-4" />
                      Open Calendar
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Event Impact Analysis</CardTitle>
              <CardDescription>Traffic and visitor impact of events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg border bg-muted p-6">
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="text-muted-foreground">Event Impact Visualization</p>
                  <p className="text-sm text-muted-foreground">Traffic patterns during events</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Traffic Increase</h3>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">+85%</p>
                  <p className="text-sm text-muted-foreground">During major festivals</p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Parking Demand</h3>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">+120%</p>
                  <p className="text-sm text-muted-foreground">Additional capacity needed</p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Wait Time</h3>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">45 min</p>
                  <p className="text-sm text-muted-foreground">Average during events</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full gap-2 transition-all duration-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400"
              >
                <Download className="h-4 w-4" />
                Download Impact Report
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Add New Event</CardTitle>
              <CardDescription>Create a new event or festival</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-name">Event Name</Label>
                <Input id="event-name" placeholder="Enter event name" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Input id="event-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select>
                    <SelectTrigger id="event-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="major">Major Festival</SelectItem>
                      <SelectItem value="regular">Regular Event</SelectItem>
                      <SelectItem value="special">Special Ceremony</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input id="start-time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input id="end-time" type="time" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expected-visitors">Expected Visitors</Label>
                <Input id="expected-visitors" type="number" placeholder="Estimated number of visitors" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="traffic-impact">Traffic Impact</Label>
                <Select>
                  <SelectTrigger id="traffic-impact">
                    <SelectValue placeholder="Select impact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Impact</SelectItem>
                    <SelectItem value="moderate">Moderate Impact</SelectItem>
                    <SelectItem value="high">High Impact</SelectItem>
                    <SelectItem value="severe">Severe Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea id="event-description" placeholder="Enter event details" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                Save Event
              </Button>
            </CardFooter>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Annual Calendar</CardTitle>
              <CardDescription>Major events for the year</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Hanuman Jayanti</h3>
                  <Badge className="bg-yellow-500">April</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Major festival with high attendance</p>
              </div>

              <div className="rounded-lg border p-3 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Guru Purnima</h3>
                  <Badge className="bg-yellow-500">July</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Major festival with high attendance</p>
              </div>

              <div className="rounded-lg border p-3 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Neem Karoli Baba Jayanti</h3>
                  <Badge className="bg-yellow-500">June</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Major festival with highest attendance</p>
              </div>

              <div className="rounded-lg border p-3 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Monthly Bhandara</h3>
                  <Badge className="bg-green-500">Monthly</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Regular event on the last Sunday</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full gap-2 transition-all duration-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400"
              >
                <Download className="h-4 w-4" />
                Download Annual Calendar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
