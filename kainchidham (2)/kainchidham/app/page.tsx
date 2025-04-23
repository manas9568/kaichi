"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Car, MapPin, RouteIcon as Road, ChurchIcon as Temple } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  const handlePlay = () => {
    setIsAnimating(true)
    setTimeout(() => {
      router.push("/auth")
    }, 1000)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-100 to-green-100">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 text-green-500 opacity-20">
          <Car size={80} />
        </div>
        <div className="absolute top-40 right-20 text-blue-500 opacity-20">
          <Road size={100} />
        </div>
        <div className="absolute bottom-40 left-20 text-amber-500 opacity-20">
          <Temple size={120} />
        </div>
        <div className="absolute bottom-20 right-10 text-red-500 opacity-20">
          <MapPin size={80} />
        </div>

        {/* Hills silhouette */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#4CAF50"
              fillOpacity="0.2"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#2E7D32"
              fillOpacity="0.3"
              d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,218.7C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isAnimating ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Temple className="mx-auto h-24 w-24 text-green-700" />
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4 text-4xl font-extrabold tracking-tight text-green-900 sm:text-5xl md:text-6xl"
        >
          Kainchi Dham
        </motion.h1>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 max-w-2xl text-xl text-green-800 sm:text-2xl"
        >
          Smart Traffic Control System
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button onClick={handlePlay} size="lg" className="bg-green-700 px-8 py-6 text-lg hover:bg-green-800">
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
