// File: server.js (Node.js Express Backend)
import express from 'express';
import cors from 'cors';
import { initializeApp, cert } from 'firebase-admin/app';
import { getPool } from './src/config/db.js';
import userRouter from './src/routes/User.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Helper to get formatted local ISO-like timestamp
const getTimestamp = () => {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
};

// 1. Firebase Admin SDK Configuration (using fs to parse JSON in ES Module)
const serviceAccount = JSON.parse(fs.readFileSync('./firebase-Auth.json', 'utf8'));

// Fix private key formatting (converting literal \n to actual newlines)
if (serviceAccount.private_key && serviceAccount.private_key.includes('\\n')) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
}

initializeApp({
  credential: cert(serviceAccount)
});


const app = express();
app.use(cors());
app.use(express.json());

// 2. Mount API Routes directly (removes app.js dependency)
app.use('/api/users', userRouter);

// 3. Test MSSQL Database Connection and start Express Server
getPool()
  .then(() => {
    const time = getTimestamp();
    console.log(`[${time}] Database: Connected to MSSQL successfully via Pool.`);
    
    app.listen(PORT, () => {
      console.log(`[${time}] Server: Running on port ${PORT}`);
    });
  })
  .catch(err => {
    const time = getTimestamp();
    console.error(`[${time}] Database Error: Failed to connect to MSSQL. ${err.message}`);
    console.log(`[${time}] Server: Starting on port ${PORT} in Fallback Mode (without database features)...`);
    
    app.listen(PORT, () => {
      console.log(`[${time}] Server: Running on port ${PORT} (Fallback Mode)`);
    });
  });
