import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const courseId = params.id

    // Simulate enrollment process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      message: "Successfully enrolled in course",
      courseId,
      userId: user.userId,
      enrollmentDate: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Enrollment error:", error)
    return NextResponse.json({ error: "Failed to enroll in course" }, { status: 500 })
  }
}
