"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  Calendar,
  Clock,
  Home,
  Layers,
  LogOut,
  Map,
  Menu,
  Moon,
  Sun,
  ChurchIcon as Temple,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Map & Simulation",
    href: "/dashboard/map",
    icon: <Map className="h-5 w-5" />,
  },
  {
    title: "Scenario Simulator",
    href: "/dashboard/simulator",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    title: "Queue Manager",
    href: "/dashboard/queue",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: "Public Info",
    href: "/dashboard/public-info",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "About Us",
    href: "/dashboard/about",
    icon: <Users className="h-5 w-5" />,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="flex min-h-screen flex-col bg-background">
        {/* Top Navigation */}
        <motion.header
          className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 sm:max-w-xs">
              <div className="flex h-full flex-col">
                <div className="flex items-center border-b py-4">
                  <Temple className="mr-2 h-6 w-6 text-green-600" />
                  <h2 className="text-lg font-semibold">Kainchi Dham</h2>
                  <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex-1 overflow-auto py-4">
                  <div className="grid gap-1 px-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                            pathname === item.href
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon}
                          {item.title}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>
                <div className="border-t p-4">
                  <Link href="/auth">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Temple className="h-6 w-6 text-green-600" />
            <span className="text-lg font-semibold tracking-tight">Kainchi Dham Traffic Control</span>
          </motion.div>
          <div className="ml-auto flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="transition-all duration-300"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 p-0 text-xs text-white">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Avatar>
                <AvatarFallback className="bg-green-100 text-green-800">AD</AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar (desktop only) */}
          <motion.aside
            className="hidden w-64 border-r bg-background md:block"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="grid gap-1 p-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      pathname === item.href
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.aside>

          {/* Page Content */}
          <motion.main
            className="flex-1 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {children}
          </motion.main>
        </div>
      </div>
    </ThemeProvider>
  )
}
