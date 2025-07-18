import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const courses = await db.collection("courses").find({}).toArray()

    return NextResponse.json(courses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const courseData = await request.json()
    const { db } = await connectToDatabase()

    const newCourse = {
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date(),
      enrolledUsers: [],
      status: "draft",
    }

    const result = await db.collection("courses").insertOne(newCourse)

    return NextResponse.json(
      {
        message: "Course created successfully",
        courseId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}
