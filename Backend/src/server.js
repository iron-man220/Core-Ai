import 'dotenv/config';
import http from 'http';
import app from './app.js';
import connectDB from './config/db.js';
import initializeFirebase from './config/firebase.js';
import { setupSocket } from './Service/AiSocket.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Initialize Firebase Admin SDK
  const firebaseStatus = initializeFirebase();
  console.log(`Firebase: ${firebaseStatus}`);

  // Create HTTP server wrapping Express app
  const server = http.createServer(app);

  // Set up Socket.io server
  setupSocket(server);

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();