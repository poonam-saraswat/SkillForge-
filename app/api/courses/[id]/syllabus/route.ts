import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const courseId = params.id

    // Generate a sample PDF content (in real app, this would be actual PDF generation)
    const pdfContent = `Course Syllabus - Course ID: ${courseId}
    
Generated for: ${user.email}
Date: ${new Date().toLocaleDateString()}

This is a sample syllabus document.`

    return new NextResponse(pdfContent, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="course-${courseId}-syllabus.pdf"`,
      },
    })
  } catch (error) {
    console.error("Syllabus download error:", error)
    return NextResponse.json({ error: "Failed to download syllabus" }, { status: 500 })
  }
}
