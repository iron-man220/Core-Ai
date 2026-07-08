import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Establish connection to MongoDB using Mongoose
 */
const connectDB = async () => {
  try {
    const connString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/CoreAI';
    
    const conn = await mongoose.connect(connString);
    return conn;
  } catch (error) {
    throw error;
  }
};

export default connectDB;
