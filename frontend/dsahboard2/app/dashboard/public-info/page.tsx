"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ChurchIcon as Temple } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PublicInfoPage() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  const [congestionLevel, setCongestionLevel] = useState(65)
  const [waitTime, setWaitTime] = useState(25)
  const [recommendedEntry] = useState("11:30 AM")
  const [estimatedDelay] = useState(20)
  const [alternateParking] = useState("Bhimtal Road Parking")
  const [visitorCount] = useState(245)
  const [isLoading, setIsLoading] = useState(false)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 60000)
    
    return () => clearInterval(timer)
  }, [])

  // Simulate refresh data
  const handleRefresh = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Update with random values to simulate real-time changes
      setCongestionLevel(Math.floor(Math.random() * 30) + 50) // Between 50-80
      setWaitTime(Math.floor(Math.random() * 15) + 15) // Between 15-30
      setIsLoading(false)
    }, 1500)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30">
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        className="relative bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover opacity-20"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Temple className="h-8 w-8" />
              <h1 className="text-2xl md:text-3xl font-bold">Kainchi Dham</h1>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 bg-white/20 hover:bg-white/30 text-white border-white/40"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-4 mb-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div\
