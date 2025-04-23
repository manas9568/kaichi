"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Calendar, Clock, Download, LineChart, PieChart, Users } from "lucide-react"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("week")

  return (
    <div className="container mx-auto p-4 md:p-6 animate-fade-in">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Traffic and visitor statistics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="transition-all duration-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-md dark:border-green-900/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Total Visitors</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground">↑ 12% from previous period</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-md dark:border-green-900/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Average Wait Time</p>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">22 min</div>
            <p className="text-xs text-muted-foreground">↓ 8% from previous period</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-md dark:border-green-900/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Peak Hours</p>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">10 AM - 12 PM</div>
            <p className="text-xs text-muted-foreground">Consistent with previous period</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-md dark:border-green-900/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Busiest Day</p>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">Sunday</div>
            <p className="text-xs text-muted-foreground">↑ 24% more visitors than average</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-md dark:border-green-900/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Visitor Traffic</CardTitle>
              <CardDescription>Daily visitor count over time</CardDescription>
            </div>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-lg border bg-muted p-6">
              <div className="flex h-full flex-col items-center justify-center">
                <p className="text-muted-foreground">Visitor Traffic Chart</p>
                <p className="text-sm text-muted-foreground">Daily trends and patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md dark:border-green-900/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Wait Time Analysis</CardTitle>
              <CardDescription>Average wait times by hour</CardDescription>
            </div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-lg border bg-muted p-6">
              <div className="flex h-full flex-col items-center justify-center">
                <p className="text-muted-foreground">Wait Time Chart</p>
                <p className="text-sm text-muted-foreground">Hourly wait time patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="mt-6">
        <Card className="transition-all duration-300 hover:shadow-md dark:border-green-900/10">
          <CardHeader>
            <CardTitle>Detailed Analytics</CardTitle>
            <CardDescription>In-depth traffic and visitor analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="traffic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger
                  value="traffic"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Traffic
                </TabsTrigger>
                <TabsTrigger
                  value="visitors"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Visitors
                </TabsTrigger>
                <TabsTrigger
                  value="parking"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Parking
                </TabsTrigger>
                <TabsTrigger
                  value="comparison"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Comparison
                </TabsTrigger>
              </TabsList>

              <TabsContent value="traffic" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Traffic Distribution</h3>
                    <div className="h-[250px] w-full rounded-lg border bg-muted p-6">
                      <div className="flex h-full flex-col items-center justify-center">
                        <PieChart className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Traffic Distribution Chart</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Key Insights</h3>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Peak Traffic Times</h4>
                      <p className="text-sm text-muted-foreground">
                        Traffic is consistently highest between 10 AM and 12 PM, with a secondary peak around 4 PM.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Traffic Patterns</h4>
                      <p className="text-sm text-muted-foreground">
                        Weekend traffic is 35% higher than weekday traffic, with Sunday being the busiest day.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Congestion Points</h4>
                      <p className="text-sm text-muted-foreground">
                        The main entrance experiences the most congestion, followed by the parking entrance.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="visitors" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Visitor Demographics</h3>
                    <div className="h-[250px] w-full rounded-lg border bg-muted p-6">
                      <div className="flex h-full flex-col items-center justify-center">
                        <PieChart className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Visitor Demographics Chart</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Visitor Insights</h3>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Origin Locations</h4>
                      <p className="text-sm text-muted-foreground">
                        65% of visitors come from within a 50km radius, with 25% traveling from over 100km away.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Visit Duration</h4>
                      <p className="text-sm text-muted-foreground">
                        Average visit duration is 1.5 hours, with longer stays on weekends and holidays.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Return Visitors</h4>
                      <p className="text-sm text-muted-foreground">
                        Approximately 30% of visitors are returning within the same month.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="parking" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Parking Utilization</h3>
                    <div className="h-[250px] w-full rounded-lg border bg-muted p-6">
                      <div className="flex h-full flex-col items-center justify-center">
                        <BarChart3 className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Parking Utilization Chart</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Parking Insights</h3>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Capacity Utilization</h4>
                      <p className="text-sm text-muted-foreground">
                        Main parking area reaches 100% capacity by 10 AM on weekends and festival days.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Alternative Parking</h4>
                      <p className="text-sm text-muted-foreground">
                        Bhimtal Road parking utilization has increased by 45% since implementation of the traffic
                        management system.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Duration</h4>
                      <p className="text-sm text-muted-foreground">
                        Average parking duration is 2.5 hours, with longer durations during special events.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Year-over-Year Comparison</h3>
                    <div className="h-[250px] w-full rounded-lg border bg-muted p-6">
                      <div className="flex h-full flex-col items-center justify-center">
                        <LineChart className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Year-over-Year Comparison Chart</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Comparative Insights</h3>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Visitor Growth</h4>
                      <p className="text-sm text-muted-foreground">
                        Overall visitor count has increased by 22% compared to the previous year.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Wait Time Improvement</h4>
                      <p className="text-sm text-muted-foreground">
                        Average wait times have decreased by 35% since implementing the time slot system.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Traffic Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Congestion incidents have decreased by 40% compared to the previous year.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
