"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Github, Globe, Linkedin, Mail, Phone } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
        <p className="text-muted-foreground">The team behind Kainchi Dham Traffic Management System</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>About the traffic management system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Kainchi Dham Traffic Management System was developed to address the growing congestion and traffic
              challenges faced by visitors to the sacred Kainchi Dham temple. Our system provides real-time traffic
              information, wait time estimates, and intelligent queue management to improve the visitor experience.
            </p>
            <p>
              Launched in 2023, this initiative has already reduced average wait times by 35% and significantly improved
              the overall visitor experience. The system uses advanced analytics and real-time data processing to
              provide accurate information and recommendations.
            </p>
            <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-900/20">
              <h3 className="font-medium mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Real-time traffic monitoring and updates</li>
                <li>Intelligent time slot management</li>
                <li>Visitor queue optimization</li>
                <li>Alternate parking recommendations</li>
                <li>Event and festival planning tools</li>
                <li>Advanced analytics and reporting</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Improving the visitor experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our mission is to enhance the spiritual experience of visitors to Kainchi Dham by minimizing wait times,
              reducing traffic congestion, and providing accurate, timely information to help plan their visit.
            </p>
            <p>
              We believe that technology can be leveraged respectfully to improve access to sacred sites while
              maintaining their sanctity and spiritual atmosphere. By streamlining the logistical aspects of visiting
              Kainchi Dham, we allow devotees to focus more on their spiritual journey.
            </p>
            <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-900/20">
              <h3 className="font-medium mb-2">Impact</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>35% reduction in average wait times</li>
                <li>40% decrease in traffic congestion incidents</li>
                <li>25% increase in visitor satisfaction</li>
                <li>Improved emergency response capabilities</li>
                <li>Better resource allocation during festivals</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mt-8 mb-4">Our Team</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Amit Sharma" />
              <AvatarFallback className="text-xl bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                AS
              </AvatarFallback>
            </Avatar>
            <CardTitle>Amit Sharma</CardTitle>
            <CardDescription>Project Lead & Developer</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-green-600">Frontend</Badge>
              <Badge className="bg-blue-600">Backend</Badge>
              <Badge className="bg-purple-600">UI/UX</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Full-stack developer with expertise in traffic management systems and real-time data processing.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Github className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Priya Patel" />
              <AvatarFallback className="text-xl bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                PP
              </AvatarFallback>
            </Avatar>
            <CardTitle>Priya Patel</CardTitle>
            <CardDescription>Data Scientist</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-yellow-600">Analytics</Badge>
              <Badge className="bg-red-600">ML</Badge>
              <Badge className="bg-indigo-600">Visualization</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Specializes in predictive analytics and machine learning models for traffic pattern recognition.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Globe className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Rahul Verma" />
              <AvatarFallback className="text-xl bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                RV
              </AvatarFallback>
            </Avatar>
            <CardTitle>Rahul Verma</CardTitle>
            <CardDescription>Traffic Management Specialist</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-orange-600">Traffic</Badge>
              <Badge className="bg-cyan-600">Planning</Badge>
              <Badge className="bg-emerald-600">Logistics</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Expert in traffic flow optimization and crowd management for religious sites.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Linkedin className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="mt-8 transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Get in touch with our team</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <Mail className="h-5 w-5 text-green-700 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-sm text-muted-foreground">contact@kainchidham-traffic.org</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <Phone className="h-5 w-5 text-green-700 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-sm text-muted-foreground">+91 1234567890</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <Globe className="h-5 w-5 text-green-700 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Website</h3>
                <p className="text-sm text-muted-foreground">www.kainchidham-traffic.org</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Feedback & Suggestions</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We're constantly working to improve our system. If you have any feedback or suggestions, please reach out
              to us.
            </p>
            <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
              <Mail className="h-4 w-4" />
              Send Feedback
            </Button>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© 2023 Kainchi Dham Traffic Management System</p>
        <p className="mt-2">Developed with ❤️ for the devotees of Neem Karoli Baba</p>
      </footer>
    </div>
  )
}
