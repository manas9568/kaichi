"use client"

import { useState } from "react"
import { ArrowRight, Calendar, Car, Clock, Edit, Plus, RefreshCw, Save, Trash, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Fake data for time slots
const initialTimeSlots = [
  { id: 1, time: "10:00 AM - 10:30 AM", vehicles: 50, capacity: 50, status: "Full" },
  { id: 2, time: "10:30 AM - 11:00 AM", vehicles: 45, capacity: 50, status: "Almost Full" },
  { id: 3, time: "11:00 AM - 11:30 AM", vehicles: 30, capacity: 50, status: "Available" },
  { id: 4, time: "11:30 AM - 12:00 PM", vehicles: 15, capacity: 50, status: "Available" },
  { id: 5, time: "12:00 PM - 12:30 PM", vehicles: 10, capacity: 50, status: "Available" },
  { id: 6, time: "12:30 PM - 1:00 PM", vehicles: 5, capacity: 50, status: "Available" },
]

export default function QueueManager() {
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots)
  const [editingSlot, setEditingSlot] = useState<number | null>(null)
  const [editedVehicles, setEditedVehicles] = useState(0)
  const [isAddingSlot, setIsAddingSlot] = useState(false)
  const [newSlotTime, setNewSlotTime] = useState("")
  const [newSlotCapacity, setNewSlotCapacity] = useState(50)

  const handleEditSlot = (id: number, vehicles: number) => {
    setEditingSlot(id)
    setEditedVehicles(vehicles)
  }

  const handleSaveEdit = (id: number) => {
    setTimeSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === id) {
          const status =
            editedVehicles >= slot.capacity
              ? "Full"
              : editedVehicles >= slot.capacity * 0.8
                ? "Almost Full"
                : "Available"
          return { ...slot, vehicles: editedVehicles, status }
        }
        return slot
      }),
    )
    setEditingSlot(null)
  }

  const handleCancelEdit = () => {
    setEditingSlot(null)
  }

  const handleAddSlot = () => {
    if (newSlotTime) {
      const newId = Math.max(...timeSlots.map((slot) => slot.id)) + 1
      setTimeSlots([
        ...timeSlots,
        {
          id: newId,
          time: newSlotTime,
          vehicles: 0,
          capacity: newSlotCapacity,
          status: "Available",
        },
      ])
      setIsAddingSlot(false)
      setNewSlotTime("")
      setNewSlotCapacity(50)
    }
  }

  const handleDeleteSlot = (id: number) => {
    setTimeSlots((prev) => prev.filter((slot) => slot.id !== id))
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Queue & Load Manager</h1>
          <p className="text-muted-foreground">Manage time slots and vehicle distribution</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-3.5 w-3.5" />
            Today
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
          <Dialog open={isAddingSlot} onOpenChange={setIsAddingSlot}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                <Plus className="h-3.5 w-3.5" />
                Add Time Slot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Time Slot</DialogTitle>
                <DialogDescription>Create a new time slot for vehicle entry</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="time-slot">Time Slot</Label>
                  <Input
                    id="time-slot"
                    placeholder="e.g. 2:00 PM - 2:30 PM"
                    value={newSlotTime}
                    onChange={(e) => setNewSlotTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Vehicle Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newSlotCapacity}
                    onChange={(e) => setNewSlotCapacity(Number.parseInt(e.target.value) || 50)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingSlot(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSlot} className="bg-green-600 hover:bg-green-700">
                  Add Slot
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="slots" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="slots">Time Slots</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicle Queue</TabsTrigger>
        </TabsList>

        <TabsContent value="slots" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {timeSlots.map((slot) => (
              <Card key={slot.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">{slot.time}</CardTitle>
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
                  <CardDescription>
                    {slot.vehicles} / {slot.capacity} vehicles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={(slot.vehicles / slot.capacity) * 100} className="h-2" />

                  {editingSlot === slot.id ? (
                    <div className="mt-4 flex items-center gap-2">
                      <Label htmlFor={`edit-vehicles-${slot.id}`} className="sr-only">
                        Edit Vehicles
                      </Label>
                      <Input
                        id={`edit-vehicles-${slot.id}`}
                        type="number"
                        value={editedVehicles}
                        onChange={(e) => setEditedVehicles(Number.parseInt(e.target.value) || 0)}
                        className="h-8"
                      />
                      <Button variant="ghost" size="icon" onClick={() => handleSaveEdit(slot.id)} className="h-8 w-8">
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleCancelEdit} className="h-8 w-8">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {slot.status === "Full"
                            ? "No slots available"
                            : slot.status === "Almost Full"
                              ? "Few slots left"
                              : "Slots available"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditSlot(slot.id, slot.vehicles)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vehicles" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Queue</CardTitle>
              <CardDescription>Manage vehicles waiting to enter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-full max-w-sm">
                    <Label htmlFor="filter-status" className="sr-only">
                      Filter by Status
                    </Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="filter-status">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Vehicles</SelectItem>
                        <SelectItem value="waiting">Waiting</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="entered">Entered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="gap-1">
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </Button>
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-2 border-b bg-muted/50 p-2 text-sm font-medium">
                    <div>Vehicle ID</div>
                    <div>Type</div>
                    <div>Arrival Time</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>

                  <div className="divide-y">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="grid grid-cols-5 gap-2 p-2 text-sm">
                        <div className="font-medium">KD-{1000 + i}</div>
                        <div className="flex items-center gap-1">
                          <Car className="h-3 w-3" />
                          {i % 3 === 0 ? "Bus" : "Car"}
                        </div>
                        <div>{`${10 + Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"} AM`}</div>
                        <div>
                          <Badge
                            variant="outline"
                            className={
                              i === 0
                                ? "border-green-200 bg-green-50 text-green-700"
                                : i < 3
                                  ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                                  : "border-blue-200 bg-blue-50 text-blue-700"
                            }
                          >
                            {i === 0 ? "Entered" : i < 3 ? "Waiting" : "Assigned"}
                          </Badge>
                        </div>
                        <div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto gap-1">
                <ArrowRight className="h-4 w-4" />
                View All Vehicles
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
