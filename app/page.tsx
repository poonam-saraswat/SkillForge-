"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  User,
  Lock,
  Plus,
  Edit,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Star,
  Download,
  Search,
  Filter,
  Bell,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPinIcon,
  Smartphone,
  Monitor,
  Heart,
  ExternalLink,
  FileText,
  Shield,
  HelpCircle,
  LogOut,
  UserCheck,
  GraduationCap,
  Target,
  Zap,
  Globe,
  PlayCircle,
} from "lucide-react"

interface UserType {
  id: string
  email: string
  name: string
  role: "employee" | "trainer" | "admin"
  department?: string
  position?: string
}

interface Course {
  id: string
  title: string
  description: string
  duration: string
  enrolled: number
  status: "Active" | "Draft" | "Archived"
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  instructor: string
  price: number
  thumbnail: string
  modules: string[]
  prerequisites: string[]
  learningOutcomes: string[]
}

interface TrainingSession {
  id: string
  course: string
  date: string
  time: string
  trainer: string
  attendees: number
  maxAttendees: number
  location: string
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled"
}

interface Certification {
  id: string
  employee: string
  certification: string
  issued: string
  expires: string
  status: "Valid" | "Expiring Soon" | "Expired"
  score: number
}

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  // Enhanced sample data with real images
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Advanced Workplace Safety",
      description:
        "Comprehensive safety training covering OSHA guidelines, emergency procedures, hazard identification, and workplace safety protocols. Learn to create a safer work environment for everyone.",
      duration: "4 hours",
      enrolled: 45,
      status: "Active",
      category: "Safety",
      difficulty: "Intermediate",
      rating: 4.8,
      instructor: "John Smith",
      price: 299,
      thumbnail: "/images/safety-training.png",
      modules: [
        "Safety Fundamentals",
        "OSHA Guidelines",
        "Emergency Procedures",
        "Hazard Identification",
        "Safety Equipment",
      ],
      prerequisites: ["Basic workplace orientation"],
      learningOutcomes: [
        "Identify workplace hazards",
        "Implement safety protocols",
        "Respond to emergencies",
        "Use safety equipment properly",
      ],
    },
    {
      id: "2",
      title: "Leadership Excellence Program",
      description:
        "Develop essential leadership skills including team management, strategic thinking, decision-making, and communication. Transform your leadership potential into measurable results.",
      duration: "8 hours",
      enrolled: 32,
      status: "Active",
      category: "Leadership",
      difficulty: "Advanced",
      rating: 4.9,
      instructor: "Sarah Wilson",
      price: 599,
      thumbnail: "/images/leadership-training.png",
      modules: [
        "Leadership Fundamentals",
        "Team Management",
        "Strategic Thinking",
        "Decision Making",
        "Communication Skills",
      ],
      prerequisites: ["Management experience preferred"],
      learningOutcomes: [
        "Lead effective teams",
        "Make strategic decisions",
        "Communicate vision",
        "Drive organizational change",
      ],
    },
    {
      id: "3",
      title: "Project Management Mastery",
      description:
        "Master Agile, Scrum, and traditional project management methodologies with hands-on exercises. Learn to deliver projects on time and within budget consistently.",
      duration: "12 hours",
      enrolled: 28,
      status: "Active",
      category: "Management",
      difficulty: "Advanced",
      rating: 4.7,
      instructor: "Mike Johnson",
      price: 799,
      thumbnail: "/images/project-management.png",
      modules: ["Project Planning", "Agile Methodology", "Scrum Framework", "Risk Management", "Quality Assurance"],
      prerequisites: ["Basic project experience"],
      learningOutcomes: [
        "Plan complex projects",
        "Implement Agile practices",
        "Manage project risks",
        "Ensure quality delivery",
      ],
    },
    {
      id: "4",
      title: "Digital Communication Skills",
      description:
        "Master modern communication tools and techniques for remote and hybrid work environments. Enhance your digital presence and collaboration skills.",
      duration: "3 hours",
      enrolled: 38,
      status: "Active",
      category: "Communication",
      difficulty: "Beginner",
      rating: 4.6,
      instructor: "Lisa Chen",
      price: 199,
      thumbnail: "/images/communication-skills.png",
      modules: [
        "Digital Communication Basics",
        "Virtual Meeting Skills",
        "Email Etiquette",
        "Collaboration Tools",
        "Remote Work Best Practices",
      ],
      prerequisites: ["None"],
      learningOutcomes: [
        "Communicate effectively online",
        "Lead virtual meetings",
        "Use collaboration tools",
        "Build digital relationships",
      ],
    },
    {
      id: "5",
      title: "Cybersecurity Awareness",
      description:
        "Essential cybersecurity training covering phishing, password security, data protection, and threat awareness. Protect yourself and your organization from cyber threats.",
      duration: "2 hours",
      enrolled: 67,
      status: "Active",
      category: "Security",
      difficulty: "Beginner",
      rating: 4.5,
      instructor: "David Brown",
      price: 149,
      thumbnail: "/images/cybersecurity.png",
      modules: [
        "Cyber Threat Landscape",
        "Password Security",
        "Phishing Awareness",
        "Data Protection",
        "Incident Response",
      ],
      prerequisites: ["Basic computer skills"],
      learningOutcomes: [
        "Identify cyber threats",
        "Create secure passwords",
        "Recognize phishing attempts",
        "Protect sensitive data",
      ],
    },
  ])

  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([
    {
      id: "1",
      course: "Advanced Workplace Safety",
      date: "2024-01-15",
      time: "09:00 AM - 01:00 PM",
      trainer: "John Smith",
      attendees: 25,
      maxAttendees: 30,
      location: "Conference Room A",
      status: "Scheduled",
    },
    {
      id: "2",
      course: "Leadership Excellence Program",
      date: "2024-01-16",
      time: "02:00 PM - 06:00 PM",
      trainer: "Sarah Wilson",
      attendees: 18,
      maxAttendees: 20,
      location: "Training Center B",
      status: "Scheduled",
    },
    {
      id: "3",
      course: "Project Management Mastery",
      date: "2024-01-20",
      time: "09:00 AM - 05:00 PM",
      trainer: "Mike Johnson",
      attendees: 22,
      maxAttendees: 25,
      location: "Main Conference Hall",
      status: "In Progress",
    },
  ])

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      employee: "John Doe",
      certification: "Workplace Safety Specialist",
      issued: "2024-01-10",
      expires: "2025-01-10",
      status: "Valid",
      score: 95,
    },
    {
      id: "2",
      employee: "Sarah Wilson",
      certification: "Leadership Professional",
      issued: "2024-01-08",
      expires: "2025-01-08",
      status: "Valid",
      score: 88,
    },
    {
      id: "3",
      employee: "Mike Johnson",
      certification: "Project Management Professional",
      issued: "2023-12-15",
      expires: "2024-12-15",
      status: "Expiring Soon",
      score: 92,
    },
  ])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      })

      const data = await response.json()

      if (response.ok) {
        setIsLoggedIn(true)
        setCurrentUser(data.user)
        toast({
          title: "Login Successful",
          description: `Welcome back, ${data.user.name}!`,
        })
      } else {
        toast({
          title: "Login Failed",
          description: data.error || "Invalid credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setLoginForm({ email: "", password: "" })
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const handleEnrollCourse = async (courseId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Enrollment Successful",
          description: "You have been enrolled in the course!",
        })
        // Update course enrollment count
        setCourses((prev) =>
          prev.map((course) => (course.id === courseId ? { ...course, enrolled: course.enrolled + 1 } : course)),
        )
      } else {
        toast({
          title: "Enrollment Failed",
          description: data.error || "Failed to enroll in course",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Enrollment Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadSyllabus = async (courseId: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/syllabus`)

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `course-${courseId}-syllabus.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        toast({
          title: "Download Started",
          description: "Syllabus download has started.",
        })
      } else {
        toast({
          title: "Download Failed",
          description: "Failed to download syllabus",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Download Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCreateCourse = (courseData: any) => {
    const newCourse: Course = {
      id: Date.now().toString(),
      ...courseData,
      enrolled: 0,
      rating: 0,
      thumbnail: "/images/safety-training.png",
      modules: ["Introduction", "Core Concepts", "Practical Application", "Assessment"],
      prerequisites: [],
      learningOutcomes: ["Understand key concepts", "Apply knowledge practically", "Pass assessment"],
    }
    setCourses([...courses, newCourse])
    setIsCreateCourseOpen(false)
    toast({
      title: "Course Created",
      description: "New course has been created successfully!",
    })
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || course.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Valid":
      case "Scheduled":
        return "bg-green-100 text-green-800 border-green-200"
      case "Draft":
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Expiring Soon":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Expired":
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">SkillForge</h1>
                  <p className="text-xs text-gray-500">Corporate Training Platform</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help
                </Button>
                <Button variant="outline" size="sm">
                  <UserCheck className="w-4 h-4 mr-2" />
                  For Business
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                    Unlock Your Team's
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {" "}
                      Potential
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Transform your workforce with our comprehensive corporate training platform. Build skills, track
                    progress, and achieve certification excellence.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">Skill-focused Learning</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">Real-time Progress</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Industry Certifications</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">Courses Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">10K+</div>
                    <div className="text-sm text-gray-600">Learners Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold text-gray-900">Sign In to Your Account</CardTitle>
                    <CardDescription className="text-gray-600">
                      Access your personalized learning dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          className="h-12 border-2 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          className="h-12 border-2 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg transition-all duration-200"
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Signing In...
                          </div>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Sign In to Dashboard
                          </>
                        )}
                      </Button>
                    </form>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 text-sm">
                      <p className="font-medium mb-3 text-gray-800">Demo Accounts:</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-white rounded-lg p-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-2">
                              <Shield className="w-4 h-4 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Admin</p>
                              <p className="text-xs text-gray-500">admin@company.com</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-white rounded-lg p-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                              <GraduationCap className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Trainer</p>
                              <p className="text-xs text-gray-500">trainer@company.com</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-white rounded-lg p-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                              <User className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Employee</p>
                              <p className="text-xs text-gray-500">employee@company.com</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2 font-medium">Password: password123</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SkillForge?</h2>
              <p className="text-xl text-gray-600">Comprehensive training solutions for modern enterprises</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert-Led Courses</h3>
                <p className="text-gray-600">
                  Learn from industry experts with real-world experience and proven track records.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Industry Certifications</h3>
                <p className="text-gray-600">
                  Earn recognized certifications that advance your career and validate your skills.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-600">
                  Monitor learning progress with detailed analytics and personalized insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SkillForge</h1>
                <p className="text-xs text-gray-500">Corporate Training Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {currentUser?.role} • {currentUser?.department}
                  </p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{currentUser?.name?.charAt(0)}</span>
                </div>
                <Button variant="outline" onClick={handleLogout} size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Courses</p>
                  <p className="text-3xl font-bold">{courses.length}</p>
                  <p className="text-blue-100 text-xs">+3 this month</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active Learners</p>
                  <p className="text-3xl font-bold">156</p>
                  <p className="text-green-100 text-xs">+12 this week</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Certifications</p>
                  <p className="text-3xl font-bold">89</p>
                  <p className="text-yellow-100 text-xs">+7 this month</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Completion Rate</p>
                  <p className="text-3xl font-bold">78%</p>
                  <p className="text-purple-100 text-xs">+5% improvement</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border shadow-sm h-12">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="training"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Training
            </TabsTrigger>
            <TabsTrigger
              value="certifications"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
            >
              <Award className="w-4 h-4 mr-2" />
              Certifications
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
            >
              <PieChart className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-blue-600" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          user: "John Smith",
                          action: "completed",
                          course: "Safety Training",
                          time: "2 hours ago",
                          type: "success",
                        },
                        {
                          user: "Sarah Wilson",
                          action: "enrolled in",
                          course: "Leadership Skills",
                          time: "4 hours ago",
                          type: "info",
                        },
                        {
                          user: "Mike Johnson",
                          action: "earned certificate for",
                          course: "Project Management",
                          time: "1 day ago",
                          type: "warning",
                        },
                        {
                          user: "Lisa Chen",
                          action: "started",
                          course: "Communication Skills",
                          time: "2 days ago",
                          type: "info",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${
                              activity.type === "success"
                                ? "bg-green-500"
                                : activity.type === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                              <span className="font-medium text-blue-600">"{activity.course}"</span>
                            </p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Learning Progress Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { course: "Safety Training", progress: 95, students: 45 },
                        { course: "Leadership Skills", progress: 78, students: 32 },
                        { course: "Project Management", progress: 82, students: 28 },
                        { course: "Communication Skills", progress: 65, students: 38 },
                      ].map((item, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{item.course}</span>
                            <span className="text-sm text-gray-500">
                              {item.progress}% • {item.students} students
                            </span>
                          </div>
                          <Progress value={item.progress} className="h-3" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-green-600" />
                      Upcoming Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trainingSessions.slice(0, 3).map((session, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg">
                          <h4 className="font-medium text-sm">{session.course}</h4>
                          <div className="text-xs text-gray-600 space-y-1 mt-2">
                            <p className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {session.date}
                            </p>
                            <p className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {session.time}
                            </p>
                            <p className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {session.location}
                            </p>
                          </div>
                          <Badge className={`mt-2 ${getStatusColor(session.status)}`}>{session.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">This Month</span>
                        <span className="text-2xl font-bold text-blue-600">1,247</span>
                      </div>
                      <p className="text-xs text-gray-500">Total learning hours</p>
                      <div className="text-sm text-green-600 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />↑ 15% from last month
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <div className="space-y-6">
              {/* Course Management Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
                  <p className="text-gray-600">Create, manage, and track your training courses</p>
                </div>
                {(currentUser?.role === "admin" || currentUser?.role === "trainer") && (
                  <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Course
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Course</DialogTitle>
                        <DialogDescription>Fill in the details to create a new training course</DialogDescription>
                      </DialogHeader>
                      <CreateCourseForm onSubmit={handleCreateCourse} onCancel={() => setIsCreateCourseOpen(false)} />
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {/* Search and Filter */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-full sm:w-48 h-12">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="communication">Communication</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className={`${getStatusColor(course.status)} shadow-sm`}>{course.status}</Badge>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-700 shadow-sm">
                          {course.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center bg-black/70 rounded-full px-2 py-1">
                          <PlayCircle className="w-3 h-3 text-white mr-1" />
                          <span className="text-white text-xs">{course.duration}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{course.description}</p>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.enrolled} enrolled
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-medium">{course.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={
                              course.difficulty === "Beginner"
                                ? "border-green-200 text-green-700 bg-green-50"
                                : course.difficulty === "Intermediate"
                                  ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                                  : "border-red-200 text-red-700 bg-red-50"
                            }
                          >
                            {course.difficulty}
                          </Badge>
                          <span className="text-lg font-bold text-blue-600">${course.price}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedCourse(course)}
                                className="flex-1"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <CourseDetailModal
                                course={course}
                                userRole={currentUser?.role || "employee"}
                                onEnroll={() => handleEnrollCourse(course.id)}
                                onDownloadSyllabus={() => handleDownloadSyllabus(course.id)}
                                isLoading={isLoading}
                              />
                            </DialogContent>
                          </Dialog>

                          {currentUser?.role === "employee" ? (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 flex-1"
                              onClick={() => handleEnrollCourse(course.id)}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                              ) : (
                                <UserCheck className="w-4 h-4 mr-1" />
                              )}
                              Enroll
                            </Button>
                          ) : currentUser?.role === "admin" || currentUser?.role === "trainer" ? (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1">
                              <Edit className="w-4 h-4 mr-1" />
                              Manage
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="training">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      Training Sessions
                    </CardTitle>
                    <CardDescription>Schedule and manage training sessions</CardDescription>
                  </div>
                  {(currentUser?.role === "admin" || currentUser?.role === "trainer") && (
                    <Button className="bg-green-600 hover:bg-green-700 shadow-lg">
                      <Plus className="w-4 h-4 mr-2" />
                      Schedule Session
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingSessions.map((session, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3">
                            <h3 className="font-bold text-lg">{session.course}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                {session.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-green-500" />
                                {session.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-red-500" />
                                {session.location}
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                              <span>
                                Trainer: <strong>{session.trainer}</strong>
                              </span>
                              <span>
                                Attendees:{" "}
                                <strong>
                                  {session.attendees}/{session.maxAttendees}
                                </strong>
                              </span>
                            </div>
                            <Progress value={(session.attendees / session.maxAttendees) * 100} className="w-48 h-3" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Details
                            </Button>
                            {(currentUser?.role === "admin" || currentUser?.role === "trainer") && (
                              <Button size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-yellow-600" />
                      Certifications
                    </CardTitle>
                    <CardDescription>Track and manage employee certifications</CardDescription>
                  </div>
                  <Button className="bg-yellow-600 hover:bg-yellow-700 shadow-lg">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <Card key={index} className="border-l-4 border-l-yellow-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-bold text-lg">{cert.employee}</h3>
                              <Badge className={getStatusColor(cert.status)}>{cert.status}</Badge>
                            </div>
                            <p className="text-blue-600 font-medium">{cert.certification}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Issued:</span> {cert.issued}
                              </div>
                              <div>
                                <span className="font-medium">Expires:</span> {cert.expires}
                              </div>
                              <div>
                                <span className="font-medium">Score:</span> {cert.score}%
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Progress value={cert.score} className="w-32 h-3" />
                              <span className="text-sm font-medium">{cert.score}%</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                            <Button size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    Course Completion Rates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { course: "Safety Training", completion: 95, color: "bg-green-500" },
                      { course: "Leadership Skills", completion: 78, color: "bg-blue-500" },
                      { course: "Project Management", completion: 82, color: "bg-purple-500" },
                      { course: "Communication Skills", completion: 65, color: "bg-yellow-500" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.course}</span>
                          <span className="text-sm font-bold">{item.completion}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className={`${item.color} h-4 rounded-full transition-all duration-500`}
                            style={{ width: `${item.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-green-600" />
                    Learning Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">1,247</div>
                      <p className="text-sm text-gray-600">Total learning hours this month</p>
                      <div className="flex items-center justify-center text-sm text-green-600 mt-1">
                        <TrendingUp className="w-4 h-4 mr-1" />↑ 15% from last month
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">89</div>
                        <p className="text-xs text-gray-600">Certificates Issued</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">156</div>
                        <p className="text-xs text-gray-600">Active Learners</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Top Performing Courses</h4>
                      {[
                        { name: "Safety Training", score: 4.8 },
                        { name: "Leadership Skills", score: 4.7 },
                        { name: "Project Management", score: 4.6 },
                      ].map((course, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{course.name}</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm font-medium">{course.score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SkillForge</h3>
                  <p className="text-sm text-gray-400">Corporate Training Platform</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering organizations with comprehensive training solutions. Build skills, track progress, and
                achieve excellence.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Our Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Instructors
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Accessibility
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Apps */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">support@skillforge.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">San Francisco, CA</span>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-medium">Download Our App</h5>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-gray-600 text-gray-400 hover:text-white hover:border-white"
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    iOS App
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-gray-600 text-gray-400 hover:text-white hover:border-white"
                  >
                    <Monitor className="w-4 h-4 mr-2" />
                    Android
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>© 2024 SkillForge. All rights reserved.</span>
                <span>•</span>
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>for learning</span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  English
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Status
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Create Course Form Component
function CreateCourseForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    category: "",
    difficulty: "Beginner",
    instructor: "",
    price: 0,
    status: "Draft",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter course title"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            placeholder="Instructor name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Course description"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g., 4 hours"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Safety">Safety</SelectItem>
              <SelectItem value="Leadership">Leadership</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
              <SelectItem value="Communication">Communication</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
              <SelectItem value="Technical">Technical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            placeholder="0"
            min="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Create Course
        </Button>
      </div>
    </form>
  )
}

// Enhanced Course Detail Modal Component
function CourseDetailModal({
  course,
  userRole,
  onEnroll,
  onDownloadSyllabus,
  isLoading,
}: {
  course: Course
  userRole: string
  onEnroll: () => void
  onDownloadSyllabus: () => void
  isLoading: boolean
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Valid":
      case "Scheduled":
        return "bg-green-100 text-green-800 border-green-200"
      case "Draft":
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Expiring Soon":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Expired":
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-48 h-32 object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h2>
          <p className="text-gray-600 mb-3">by {course.instructor}</p>
          <div className="flex items-center space-x-4 mb-4">
            <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">${course.price}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-medium">{course.duration}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-gray-600">Enrolled</p>
                <p className="font-medium">{course.enrolled} students</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-gray-600">Difficulty</p>
                <p className="font-medium">{course.difficulty}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-3">Course Description</h3>
        <p className="text-gray-700 leading-relaxed">{course.description}</p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-3">Learning Outcomes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {course.learningOutcomes.map((outcome, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-3">Course Modules</h3>
        <div className="space-y-3">
          {course.modules.map((module, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
              </div>
              <span className="text-sm font-medium">{module}</span>
            </div>
          ))}
        </div>
      </div>

      {course.prerequisites.length > 0 && (
        <div>
          <h3 className="font-bold text-xl mb-3">Prerequisites</h3>
          <div className="space-y-2">
            {course.prerequisites.map((prereq, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <FileText className="w-5 h-5 text-yellow-500" />
                <span className="text-sm">{prereq}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-6 border-t">
        <Button
          variant="outline"
          onClick={onDownloadSyllabus}
          disabled={isLoading}
          className="flex items-center bg-transparent"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          Download Syllabus
        </Button>

        {userRole === "employee" && (
          <Button className="bg-green-600 hover:bg-green-700 px-8" onClick={onEnroll} disabled={isLoading}>
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <UserCheck className="w-4 h-4 mr-2" />
            )}
            Enroll Now
          </Button>
        )}

        {(userRole === "admin" || userRole === "trainer") && (
          <Button className="bg-blue-600 hover:bg-blue-700 px-8">
            <Edit className="w-4 h-4 mr-2" />
            Manage Course
          </Button>
        )}
      </div>
    </div>
  )
}
