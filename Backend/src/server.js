import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import initializeFirebase from './config/firebase.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Log crashes to crash.log
const logCrash = (error) => {
  try {
    const logPath = path.resolve(process.cwd(), 'crash.log');
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const logMessage = `[${timestamp}] CRASH DETECTED:\n${error.stack || error}\n\n`;
    fs.appendFileSync(logPath, logMessage);
  } catch (err) {
    console.error('Failed to write crash log:', err);
  }
};

process.on('uncaughtException', (err) => {
  logCrash(err);
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logCrash(reason);
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

const getTimestamp = () => {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
};

// 1. Initialize Firebase Admin SDK
let firebaseStatus = '';
try {
  firebaseStatus = initializeFirebase();
} catch (err) {
  firebaseStatus = `🔴 Error: ${err.message}`;
}

// 2. Connect to MongoDB and start Express server
let dbStatus = '';
connectDB()
  .then((conn) => {
    dbStatus = `🟢 Connected successfully at ${conn.connection.host}`;
    startServer(dbStatus, firebaseStatus, false);
  })
  .catch(err => {
    dbStatus = `🔴 Connection failed: ${err.message}`;
    startServer(dbStatus, firebaseStatus, true);
  });

function startServer(dbMsg, firebaseMsg, fallbackMode = false) {
  app.listen(PORT, () => {
    const time = getTimestamp();
    
    // Clear console for a fresh status screen
    console.clear();
    
    // Beautiful terminal UI dashboard
    console.log('\x1b[36m%s\x1b[0m', '==========================================================');
    console.log('\x1b[36m%s\x1b[0m', '                🚀 CORE-AI BACKEND ENGINE                 ');
    console.log('\x1b[36m%s\x1b[0m', '==========================================================');
    console.log(`  🕒 Time      : ${time}`);
    console.log(`  🔌 Database  : ${dbMsg}`);
    console.log(`  🔥 Firebase  : ${firebaseMsg}`);
    console.log(`  🟢 Server    : Active and running on port \x1b[32m${PORT}\x1b[0m${fallbackMode ? ' (Fallback Mode)' : ' (Full Mode)'}`);
    console.log('\x1b[36m%s\x1b[0m', '==========================================================');
    console.log('  Press Ctrl+C to shut down the server.\n');
  });
}
