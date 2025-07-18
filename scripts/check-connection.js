// Script to test MongoDB connection
const { MongoClient } = require("mongodb")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const MONGODB_DB = process.env.MONGODB_DB || "skillforge_training"

async function checkConnection() {
  const client = new MongoClient(MONGODB_URI)

  try {
    console.log("Testing MongoDB connection...")
    console.log(`URI: ${MONGODB_URI}`)
    console.log(`Database: ${MONGODB_DB}`)

    await client.connect()
    console.log("✅ Successfully connected to MongoDB!")

    const db = client.db(MONGODB_DB)

    // Test database operations
    const collections = await db.listCollections().toArray()
    console.log(`📁 Found ${collections.length} collections:`)
    collections.forEach((col) => console.log(`  - ${col.name}`))

    // Check if we have data
    const userCount = await db.collection("users").countDocuments()
    const courseCount = await db.collection("courses").countDocuments()

    console.log(`👥 Users: ${userCount}`)
    console.log(`📚 Courses: ${courseCount}`)

    if (userCount === 0) {
      console.log("⚠️  No data found. Run 'npm run setup-db' to initialize the database.")
    }
  } catch (error) {
    console.error("❌ Connection failed:", error.message)

    if (error.message.includes("ECONNREFUSED")) {
      console.log("\n💡 Troubleshooting tips:")
      console.log("1. Make sure MongoDB is running locally")
      console.log("2. Or update MONGODB_URI to point to your MongoDB Atlas cluster")
      console.log("3. Check if the connection string is correct")
    }
  } finally {
    await client.close()
  }
}

checkConnection()