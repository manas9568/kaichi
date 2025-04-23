"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChurchIcon as Temple, User, Lock, UserPlus } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [adminUsername, setAdminUsername] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminUsername === "admin" && adminPassword === "123") {
      router.push("/dashboard")
    } else {
      setError("Invalid admin credentials")
    }
  }

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate against your backend
    // For now, just redirect to the public info page
    router.push("http://localhost:3000/dashboard")
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    setActiveTab("login")
    setUsername(email.split("@")[0])
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#4CAF50"
              fillOpacity="0.1"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center"
        >
          <Temple className="mr-2 h-8 w-8 text-green-700" />
          <h1 className="text-2xl font-bold text-green-900">Kainchi Dham Traffic Control</h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user" onClick={() => setActiveTab("login")}>
                User
              </TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="user">
              <Card className="border-green-100 shadow-md">
                <CardHeader>
                  <CardTitle>User Access</CardTitle>
                  <CardDescription>Access traffic information and get route suggestions</CardDescription>
                </CardHeader>

                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                      <form onSubmit={handleUserLogin} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="username"
                              placeholder="Enter your username"
                              className="pl-10"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter your password"
                              className="pl-10"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                          Login
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="signup">
                      <form onSubmit={handleSignup} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <UserPlus className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              className="pl-10"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="signup-password"
                              type="password"
                              placeholder="Create a password"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="confirm-password"
                              type="password"
                              placeholder="Confirm your password"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                          Sign Up
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card className="border-green-100 shadow-md">
                <CardHeader>
                  <CardTitle>Admin Access</CardTitle>
                  <CardDescription>Control traffic flow and manage congestion</CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-username">Username</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="admin-username"
                          placeholder="Admin username"
                          className="pl-10"
                          value={adminUsername}
                          onChange={(e) => setAdminUsername(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="admin-password"
                          type="password"
                          placeholder="Admin password"
                          className="pl-10"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Login as Admin
                    </Button>
                  </form>
                </CardContent>

                <CardFooter className="text-xs text-gray-500">
                  <p>Admin password: 123</p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
