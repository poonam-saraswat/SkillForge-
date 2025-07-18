import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const sessions = await db
      .collection("training_sessions")
      .aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "trainerId",
            foreignField: "_id",
            as: "trainer",
          },
        },
      ])
      .toArray()

    return NextResponse.json(sessions)
  } catch (error) {
    console.error("Error fetching training sessions:", error)
    return NextResponse.json({ error: "Failed to fetch training sessions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionData = await request.json()
    const { db } = await connectToDatabase()

    const newSession = {
      ...sessionData,
      courseId: new ObjectId(sessionData.courseId),
      trainerId: new ObjectId(sessionData.trainerId),
      createdAt: new Date(),
      attendees: [],
      status: "scheduled",
    }

    const result = await db.collection("training_sessions").insertOne(newSession)

    return NextResponse.json(
      {
        message: "Training session created successfully",
        sessionId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating training session:", error)
    return NextResponse.json({ error: "Failed to create training session" }, { status: 500 })
  }
}
