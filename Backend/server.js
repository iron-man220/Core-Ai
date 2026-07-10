import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import initializeFirebase from './config/firebase.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Initialize Firebase Admin SDK
  const firebaseStatus = initializeFirebase();
  console.log(`Firebase: ${firebaseStatus}`);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();