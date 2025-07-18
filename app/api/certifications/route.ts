import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const certifications = await db
      .collection("certifications")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
      ])
      .toArray()

    return NextResponse.json(certifications)
  } catch (error) {
    console.error("Error fetching certifications:", error)
    return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const certData = await request.json()
    const { db } = await connectToDatabase()

    const newCertification = {
      userId: new ObjectId(certData.userId),
      courseId: new ObjectId(certData.courseId),
      issuedDate: new Date(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      status: "active",
      certificateNumber: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }

    const result = await db.collection("certifications").insertOne(newCertification)

    return NextResponse.json(
      {
        message: "Certification issued successfully",
        certificationId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error issuing certification:", error)
    return NextResponse.json({ error: "Failed to issue certification" }, { status: 500 })
  }
}
