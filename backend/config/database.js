const mongoose = require('mongoose');

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        let dbUrl = process.env.MONGODB_URI;

        // If no URL or local default and we want to use memory server
        if (!dbUrl || dbUrl.includes('localhost')) {
            try {
                // Try to use memory server if installed
                const { MongoMemoryServer } = require('mongodb-memory-server');
                const mongoServer = await MongoMemoryServer.create();
                dbUrl = mongoServer.getUri();
                console.log('🚀 Using In-Memory MongoDB');
            } catch (err) {
                console.log('⚠️ mongodb-memory-server not available, falling back to local/default URI');
                dbUrl = dbUrl || 'mongodb://localhost:27017/ecolife';
            }
        }

        const conn = await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection failed:', error.message);
        // Don't exit process in dev if we want it to keep running (optional)
        // process.exit(1);
    }
};

module.exports = connectDB;