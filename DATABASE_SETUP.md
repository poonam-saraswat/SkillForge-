# Database Setup Guide

## Prerequisites

You need to have MongoDB running. Choose one of these options:

### Option 1: Local MongoDB Installation

1. **Install MongoDB Community Server**
   - Download from: https://www.mongodb.com/try/download/community
   - Follow installation instructions for your OS

2. **Start MongoDB Service**
   \`\`\`bash
   # On macOS with Homebrew
   brew services start mongodb-community

   # On Windows (run as Administrator)
   net start MongoDB

   # On Linux
   sudo systemctl start mongod
   \`\`\`

### Option 2: MongoDB Atlas (Cloud)

1. **Create a free account** at https://www.mongodb.com/atlas
2. **Create a new cluster** (free tier available)
3. **Get your connection string** from the cluster dashboard
4. **Update your environment variables**

## Environment Variables

Create a `.env.local` file in your project root:

\`\`\`env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=corporate_training
JWT_SECRET=your-super-secret-jwt-key-here

# For MongoDB Atlas (replace with your connection string)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
# MONGODB_DB=corporate_training
# JWT_SECRET=your-super-secret-jwt-key-here
\`\`\`

## Setup Steps

1. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Check MongoDB connection**
   \`\`\`bash
   npm run check-db
   \`\`\`

3. **Setup database and seed data**
   \`\`\`bash
   npm run setup-db
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## Demo Login Credentials

After running the setup script, you can login with:

- **Admin**: admin@company.com / password123
- **Trainer**: trainer@company.com / password123  
- **Employee**: employee@company.com / password123

## Troubleshooting

### Connection Issues
- Ensure MongoDB is running
- Check your connection string
- Verify network access (for Atlas)

### Permission Issues
- Make sure your MongoDB user has read/write permissions
- For Atlas, check IP whitelist settings

### Data Issues
- Run `npm run setup-db` again to reset the database
- Check logs for specific error messages
