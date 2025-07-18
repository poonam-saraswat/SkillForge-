import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

export interface User {
  userId: string
  email: string
  role: "employee" | "trainer" | "admin"
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as User
    return decoded
  } catch (error) {
    return null
  }
}

export function getUserFromRequest(request: NextRequest): User | null {
  const token = request.cookies.get("token")?.value
  if (!token) return null

  return verifyToken(token)
}
