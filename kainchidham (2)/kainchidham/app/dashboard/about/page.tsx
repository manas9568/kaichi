"use client"

import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const teamMembers = [
  {
    name: "Mayank Kumar",
    role: "Team Lead & Full Stack Developer",
    bio: "Passionate about solving real-world problems with technology. Specializes in algorithm design and traffic optimization.",
    avatar: "MK",
    avatarColor: "bg-blue-100 text-blue-800",
  },
  {
    name: "Anjali Padaliya",
    role: "UI/UX Designer & Frontend Developer",
    bio: "Creates intuitive user experiences with a focus on accessibility. Expert in data visualization and interactive maps.",
    avatar: "AP",
    avatarColor: "bg-purple-100 text-purple-800",
  },
  {
    name: "Sujal Joshi",
    role: "Backend Developer & Data Scientist",
    bio: "Builds robust backend systems and implements traffic prediction algorithms. Passionate about data-driven solutions.",
    avatar: "SJ",
    avatarColor: "bg-green-100 text-green-800",
  },
  {
    name: "Manas Mehta",
    role: "ML Engineer & System Architect",
    bio: "Designs scalable architectures and implements machine learning models for traffic pattern recognition.",
    avatar: "MM",
    avatarColor: "bg-amber-100 text-amber-800",
  },
]

export default function AboutUs() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">About Us</h1>
        <p className="text-muted-foreground">Meet the team behind the Kainchi Dham Traffic Control System</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>Solving traffic congestion at Kainchi Dham through innovative software</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Kainchi Dham Traffic Control System was developed to address the severe traffic congestion issues faced
            by visitors to this important pilgrimage site. Our solution uses advanced algorithms and simulation
            techniques to optimize traffic flow without requiring additional hardware infrastructure.
          </p>
          <p>
            By implementing time-based regulation, virtual queues, and intelligent routing suggestions, we aim to reduce
            wait times, improve the visitor experience, and create a more organized traffic management system for
            authorities.
          </p>
          <p>
            Our approach is unique because it focuses on software-only solutions that can be deployed quickly and
            cost-effectively, making it ideal for areas with limited resources or infrastructure constraints.
          </p>
        </CardContent>
      </Card>

      <h2 className="mb-4 text-xl font-bold">Our Team</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member, index) => (
          <Card key={index}>
            <CardHeader className="pb-2 text-center">
              <Avatar className={`mx-auto h-20 w-20 ${member.avatarColor}`}>
                <AvatarFallback>{member.avatar}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4 text-lg">{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4 text-sm text-muted-foreground">{member.bio}</p>
              <div className="flex justify-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Technical information about our solution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-2 text-base font-medium">Key Technologies</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Next.js for the frontend and backend infrastructure</li>
              <li>Leaflet.js for map visualization and traffic simulation</li>
              <li>Custom algorithms for traffic prediction and queue management</li>
              <li>Responsive design for both admin dashboards and public interfaces</li>
              <li>Time-based slot allocation system for vehicle entry management</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-base font-medium">Future Enhancements</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Mobile app for drivers with real-time notifications</li>
              <li>Integration with local weather data for more accurate predictions</li>
              <li>Machine learning models to improve traffic pattern recognition</li>
              <li>Expanded support for multiple languages to serve all visitors</li>
              <li>API integrations with other traffic management systems</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
