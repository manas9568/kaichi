"use client"

import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Button } from "@/components/ui/button"
import { Play, Square } from "lucide-react"

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

// ✅ Custom Icon
const customIcon = new L.Icon({
  iconUrl: "/icons/ping.png",
  iconRetinaUrl: "/icons/ping.png",
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// 🚗 Car Icon
const carIcon = new L.Icon({
  iconUrl: "/icons/car.png",
  iconRetinaUrl: "/icons/car.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
})

// 📍 Multiple traffic points
const trafficPoints = [
  {
    position: [29.422, 79.5128],
    description: "Near Kainchi Dham on Almora Road",
  },
  {
    position: [29.4232, 79.5105],
    description: "Almora Road Checkpoint - East",
  },
  {
    position: [29.4205, 79.5135],
    description: "Kainchi Bridge Area",
  },
  {
    position: [29.4215, 79.5152],
    description: "Parking Entry Gate",
  },
]

// 🛣️ Car route path (demo data)
const routePath = [
  [29.424, 79.509], // Starting point
  [29.4235, 79.51],
  [29.423, 79.511],
  [29.4225, 79.512],
  [29.422, 79.5128], // Kainchi Dham
  [29.4215, 79.5135],
  [29.421, 79.514],
  [29.4205, 79.5145], // End point
]

// Car Animation Component
const CarAnimation = ({ isPlaying, onAnimationEnd }: { isPlaying: boolean; onAnimationEnd: () => void }) => {
  const map = useMap()
  const markerRef = useRef<L.Marker | null>(null)
  const [currentPosition, setCurrentPosition] = useState(0)
  const animationRef = useRef<number | null>(null)
  const lastTimestampRef = useRef<number | null>(null)

  // Calculate angle between two points for car rotation
  const calculateAngle = (from: [number, number], to: [number, number]) => {
    const dx = to[1] - from[1]
    const dy = to[0] - from[0]
    return (Math.atan2(dx, dy) * 180) / Math.PI
  }

  // Update car marker position and rotation
  const updateCarPosition = (timestamp: number) => {
    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp
    }

    const elapsed = timestamp - lastTimestampRef.current

    if (elapsed > 500) {
      // Move every 500ms
      lastTimestampRef.current = timestamp

      if (currentPosition < routePath.length - 1) {
        setCurrentPosition((prev) => prev + 1)
      } else {
        onAnimationEnd()
        return
      }
    }

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateCarPosition)
    }
  }

  useEffect(() => {
    // Create or update marker
    if (isPlaying) {
      if (!markerRef.current) {
        markerRef.current = L.marker(routePath[0] as [number, number], { icon: carIcon }).addTo(map)
      }

      // Start animation
      animationRef.current = requestAnimationFrame(updateCarPosition)
    } else {
      // Clean up marker when not playing
      if (markerRef.current) {
        markerRef.current.remove()
        markerRef.current = null
      }

      // Cancel animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }

      // Reset position
      setCurrentPosition(0)
      lastTimestampRef.current = null
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (markerRef.current) {
        markerRef.current.remove()
      }
    }
  }, [isPlaying, map])

  // Update marker position and rotation when currentPosition changes
  useEffect(() => {
    if (markerRef.current && currentPosition < routePath.length) {
      const currentPoint = routePath[currentPosition] as [number, number]
      markerRef.current.setLatLng(currentPoint)

      // Calculate and set rotation angle
      if (currentPosition < routePath.length - 1) {
        const nextPoint = routePath[currentPosition + 1] as [number, number]
        const angle = calculateAngle(currentPoint, nextPoint)

        // Apply rotation to the icon
        const icon = markerRef.current.getIcon()
        const iconElement = markerRef.current.getElement()
        if (iconElement) {
          iconElement.style.transform = `${iconElement.style.transform} rotate(${angle}deg)`
        }
      }

      // Center map on car
      map.panTo(currentPoint)
    }
  }, [currentPosition, map])

  return null
}

const MapView = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleStop = () => {
    setIsPlaying(false)
  }

  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-[400px] rounded-xl overflow-hidden mb-2">
        <MapContainer
          center={[29.422, 79.5128]} // Kainchi Dham
          zoom={15}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 🚦 Mark all traffic points */}
          {trafficPoints.map((point, index) => (
            <Marker key={index} position={point.position as [number, number]} icon={customIcon}>
              <Popup>
                🚦 <strong>Traffic Checkpoint</strong> <br />
                {point.description}
              </Popup>
            </Marker>
          ))}

          {/* Car Animation Component */}
          <CarAnimation isPlaying={isPlaying} onAnimationEnd={handleStop} />
        </MapContainer>
      </div>

      {/* Animation Controls */}
      <div className="flex justify-center gap-4 mb-4">
        <Button onClick={handlePlay} disabled={isPlaying} className="bg-green-600 hover:bg-green-700 gap-2">
          <Play size={16} />
          <span>Start Car</span>
        </Button>
        <Button onClick={handleStop} disabled={!isPlaying} variant="destructive" className="gap-2">
          <Square size={16} />
          <span>Stop Car</span>
        </Button>
      </div>
    </div>
  )
}

export default MapView
