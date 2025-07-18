import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // For demo purposes, we'll use hardcoded credentials that match our seeded data
    const demoUsers = [
      {
        _id: "admin123",
        email: "admin@company.com",
        password: "password123",
        name: "System Administrator",
        role: "admin",
        department: "IT",
        position: "System Administrator",
      },
      {
        _id: "trainer123",
        email: "trainer@company.com",
        password: "password123",
        name: "John Smith",
        role: "trainer",
        department: "Human Resources",
        position: "Senior Training Specialist",
      },
      {
        _id: "employee123",
        email: "employee@company.com",
        password: "password123",
        name: "Jane Employee",
        role: "employee",
        department: "Sales",
        position: "Sales Representative",
      },
    ]

    const user = demoUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" },
    )

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department,
        position: user.position,
      },
    })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 hours
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
