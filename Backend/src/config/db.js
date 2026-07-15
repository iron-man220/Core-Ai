import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

// Force Google Public DNS to bypass network restrictions on SRV lookups
dns.setServers(['8.8.8.8', '8.8.4.4']);

let mongoServer = null;

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    if (!uri) {
      console.log("MONGODB_URI is not set. Starting in-memory MongoDB server...");
      mongoServer = await MongoMemoryServer.create({
        binary: {
          version: '5.0.26'
        }
      });
      uri = mongoServer.getUri();
      console.log(`In-memory MongoDB server started at: ${uri}`);
    }
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export default connectDB