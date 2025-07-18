// MongoDB Database Setup Script
const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const MONGODB_DB = process.env.MONGODB_DB || "skillforge_training"

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
  ]

  const userResult = await db.collection("users").insertMany(users)
  console.log(`✓ Inserted ${userResult.insertedCount} users`)

  // Seed courses
  const courses = [
    {
      title: "Advanced Workplace Safety",
      description: "Comprehensive safety training covering OSHA guidelines, emergency procedures, and hazard identification.",
      duration: "4 hours",
      category: "Safety",
      difficulty: "Intermediate",
      status: "Active",
      maxEnrollment: 50,
      createdBy: userResult.insertedIds[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Leadership Excellence Program",
      description: "Develop essential leadership skills including team management, strategic thinking, and decision-making.",
      duration: "8 hours",
      category: "Leadership",
      difficulty: "Advanced",
      status: "Active",
      maxEnrollment: 25,
      createdBy: userResult.insertedIds[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  const courseResult = await db.collection("courses").insertMany(courses)
  console.log(`✓ Inserted ${courseResult.insertedCount} courses`)

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