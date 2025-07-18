// MongoDB Database Setup Script
const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const MONGODB_DB = process.env.MONGODB_DB || "corporate_training"

async function setupDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    console.log("Connecting to MongoDB...")
    await client.connect()
    console.log("Connected successfully to MongoDB")

    const db = client.db(MONGODB_DB)

    // Create collections and indexes
    console.log("Setting up collections and indexes...")

    // Users collection with indexes
    await db.createCollection("users")
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("users").createIndex({ role: 1 })

    // Courses collection with indexes
    await db.createCollection("courses")
    await db.collection("courses").createIndex({ title: 1 })
    await db.collection("courses").createIndex({ category: 1 })
    await db.collection("courses").createIndex({ status: 1 })

    // Training sessions collection with indexes
    await db.createCollection("training_sessions")
    await db.collection("training_sessions").createIndex({ courseId: 1 })
    await db.collection("training_sessions").createIndex({ trainerId: 1 })
    await db.collection("training_sessions").createIndex({ scheduledDate: 1 })

    // Certifications collection with indexes
    await db.createCollection("certifications")
    await db.collection("certifications").createIndex({ userId: 1 })
    await db.collection("certifications").createIndex({ courseId: 1 })
    await db.collection("certifications").createIndex({ certificateNumber: 1 }, { unique: true })
    await db.collection("certifications").createIndex({ expiryDate: 1 })

    // Progress tracking collection with indexes
    await db.createCollection("progress")
    await db.collection("progress").createIndex({ userId: 1, courseId: 1 }, { unique: true })
    await db.collection("progress").createIndex({ userId: 1 })
    await db.collection("progress").createIndex({ courseId: 1 })

    console.log("Collections and indexes created successfully!")

    // Seed initial data
    await seedInitialData(db)

    console.log("Database setup completed successfully!")
  } catch (error) {
    console.error("Error setting up database:", error)
    throw error
  } finally {
    await client.close()
  }
}

async function seedInitialData(db) {
  console.log("Seeding initial data...")

  // Clear existing data
  const collections = ["users", "courses", "training_sessions", "certifications", "progress"]
  for (const collection of collections) {
    await db.collection(collection).deleteMany({})
  }

  // Hash password for demo users
  const hashedPassword = await bcrypt.hash("password123", 12)

  // Seed users
  const users = [
    {
      name: "System Administrator",
      email: "admin@company.com",
      password: hashedPassword,
      role: "admin",
      department: "IT",
      position: "System Administrator",
      hireDate: new Date("2020-01-15"),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "John Smith",
      email: "trainer@company.com",
      password: hashedPassword,
      role: "trainer",
      department: "Human Resources",
      position: "Senior Training Specialist",
      hireDate: new Date("2021-03-10"),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Sarah Wilson",
      email: "trainer2@company.com",
      password: hashedPassword,
      role: "trainer",
      department: "Human Resources",
      position: "Training Coordinator",
      hireDate: new Date("2021-08-15"),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Jane Employee",
      email: "employee@company.com",
      password: hashedPassword,
      role: "employee",
      department: "Sales",
      position: "Sales Representative",
      hireDate: new Date("2022-06-01"),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Mike Johnson",
      email: "employee2@company.com",
      password: hashedPassword,
      role: "employee",
      department: "Marketing",
      position: "Marketing Specialist",
      hireDate: new Date("2022-09-15"),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  const userResult = await db.collection("users").insertMany(users)
  console.log(`✓ Inserted ${userResult.insertedCount} users`)

  // Get user IDs for references
  const adminId = userResult.insertedIds[0]
  const trainer1Id = userResult.insertedIds[1]
  const trainer2Id = userResult.insertedIds[2]
  const employee1Id = userResult.insertedIds[3]
  const employee2Id = userResult.insertedIds[4]

  // Seed courses
  const courses = [
    {
      title: "Workplace Safety Training",
      description:
        "Comprehensive workplace safety training covering OSHA guidelines, emergency procedures, and hazard identification.",
      duration: 2,
      category: "Safety",
      difficulty: "beginner",
      materials: ["safety-manual.pdf", "emergency-procedures.pdf", "safety-checklist.pdf"],
      prerequisites: [],
      status: "active",
      maxEnrollment: 50,
      createdBy: adminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Leadership and Management Skills",
      description: "Develop essential leadership skills including team management, communication, and decision-making.",
      duration: 8,
      category: "Leadership",
      difficulty: "intermediate",
      materials: ["leadership-handbook.pdf", "case-studies.pdf", "assessment-tools.pdf"],
      prerequisites: [],
      status: "active",
      maxEnrollment: 25,
      createdBy: adminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Project Management Fundamentals",
      description:
        "Learn project management methodologies including Agile, Scrum, and traditional waterfall approaches.",
      duration: 12,
      category: "Management",
      difficulty: "advanced",
      materials: ["pm-guide.pdf", "templates.zip", "software-tools.pdf"],
      prerequisites: [],
      status: "active",
      maxEnrollment: 20,
      createdBy: adminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Cybersecurity Awareness",
      description: "Essential cybersecurity training covering phishing, password security, and data protection.",
      duration: 3,
      category: "Security",
      difficulty: "beginner",
      materials: ["cybersecurity-basics.pdf", "phishing-examples.pdf", "security-policies.pdf"],
      prerequisites: [],
      status: "active",
      maxEnrollment: 100,
      createdBy: adminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Communication Skills Workshop",
      description: "Improve verbal and written communication skills for professional environments.",
      duration: 4,
      category: "Soft Skills",
      difficulty: "beginner",
      materials: ["communication-guide.pdf", "presentation-tips.pdf", "writing-templates.pdf"],
      prerequisites: [],
      status: "draft",
      maxEnrollment: 30,
      createdBy: adminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  const courseResult = await db.collection("courses").insertMany(courses)
  console.log(`✓ Inserted ${courseResult.insertedCount} courses`)

  // Get course IDs for references
  const safetyId = courseResult.insertedIds[0]
  const leadershipId = courseResult.insertedIds[1]
  const projectMgmtId = courseResult.insertedIds[2]
  const cybersecurityId = courseResult.insertedIds[3]

  // Seed training sessions
  const sessions = [
    {
      courseId: safetyId,
      trainerId: trainer1Id,
      title: "Safety Training - Morning Session",
      scheduledDate: new Date("2024-01-15"),
      startTime: "09:00",
      endTime: "11:00",
      location: "Conference Room A",
      maxAttendees: 25,
      attendees: [employee1Id, employee2Id],
      status: "scheduled",
      createdAt: new Date(),
    },
    {
      courseId: leadershipId,
      trainerId: trainer2Id,
      title: "Leadership Workshop - Part 1",
      scheduledDate: new Date("2024-01-16"),
      startTime: "14:00",
      endTime: "18:00",
      location: "Training Room B",
      maxAttendees: 15,
      attendees: [employee1Id],
      status: "scheduled",
      createdAt: new Date(),
    },
    {
      courseId: projectMgmtId,
      trainerId: trainer1Id,
      title: "Project Management Intensive",
      scheduledDate: new Date("2024-01-20"),
      startTime: "09:00",
      endTime: "17:00",
      location: "Main Conference Hall",
      maxAttendees: 20,
      attendees: [],
      status: "scheduled",
      createdAt: new Date(),
    },
    {
      courseId: cybersecurityId,
      trainerId: trainer2Id,
      title: "Cybersecurity Awareness Session",
      scheduledDate: new Date("2024-01-18"),
      startTime: "10:00",
      endTime: "13:00",
      location: "Virtual Meeting Room",
      maxAttendees: 50,
      attendees: [employee1Id, employee2Id],
      status: "scheduled",
      createdAt: new Date(),
    },
  ]

  const sessionResult = await db.collection("training_sessions").insertMany(sessions)
  console.log(`✓ Inserted ${sessionResult.insertedCount} training sessions`)

  // Seed some completed certifications
  const certifications = [
    {
      userId: employee1Id,
      courseId: safetyId,
      certificateNumber: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      issuedDate: new Date("2023-12-10"),
      expiryDate: new Date("2024-12-10"),
      status: "active",
      score: 95,
      completionDate: new Date("2023-12-10"),
      issuedBy: trainer1Id,
    },
    {
      userId: employee2Id,
      courseId: safetyId,
      certificateNumber: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      issuedDate: new Date("2023-12-15"),
      expiryDate: new Date("2024-12-15"),
      status: "active",
      score: 88,
      completionDate: new Date("2023-12-15"),
      issuedBy: trainer1Id,
    },
  ]

  const certResult = await db.collection("certifications").insertMany(certifications)
  console.log(`✓ Inserted ${certResult.insertedCount} certifications`)

  // Seed progress tracking
  const progressRecords = [
    {
      userId: employee1Id,
      courseId: leadershipId,
      progress: 65,
      status: "in-progress",
      startDate: new Date("2024-01-01"),
      timeSpent: 180, // minutes
      lastAccessed: new Date("2024-01-10"),
      completedModules: ["introduction", "communication-basics"],
      totalModules: ["introduction", "communication-basics", "team-management", "decision-making"],
    },
    {
      userId: employee2Id,
      courseId: cybersecurityId,
      progress: 100,
      status: "completed",
      startDate: new Date("2023-12-01"),
      completionDate: new Date("2023-12-20"),
      timeSpent: 240,
      lastAccessed: new Date("2023-12-20"),
      completedModules: ["basics", "phishing", "passwords", "data-protection"],
      totalModules: ["basics", "phishing", "passwords", "data-protection"],
    },
  ]

  const progressResult = await db.collection("progress").insertMany(progressRecords)
  console.log(`✓ Inserted ${progressResult.insertedCount} progress records`)

  console.log("Initial data seeded successfully!")
}

// Run the setup
if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log("✅ Database setup completed!")
      process.exit(0)
    })
    .catch((error) => {
      console.error("❌ Database setup failed:", error)
      process.exit(1)
    })
}

module.exports = { setupDatabase }
