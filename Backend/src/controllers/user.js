import User from '../models/user.js';
import { getAuth } from 'firebase-admin/auth';
import { getApps } from 'firebase-admin/app';
import https from 'https';
import mongoose from 'mongoose';

// Helper function to call Firebase Auth REST API for sign-in
const firebaseSignIn = (email, password, apiKey) => {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            email,
            password,
            returnSecureToken: true
        });

        const options = {
            hostname: 'identitytoolkit.googleapis.com',
            port: 443,
            path: `/v1/accounts:signInWithPassword?key=${apiKey}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(parsed);
                    } else {
                        reject(new Error(parsed.error?.message || 'Authentication failed'));
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.write(postData);
        req.end();
    });
};

// Helper to decode Firebase JWT token payload (fallback when Firebase Admin is not initialized)
const decodeFirebaseToken = (idToken) => {
    try {
        const parts = idToken.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token format');
        }
        const payloadJson = Buffer.from(parts[1], 'base64').toString('utf8');
        return JSON.parse(payloadJson);
    } catch (err) {
        throw new Error('Failed to decode token: ' + err.message);
    }
};

const userController = {
    // 🔹 SAVE (Insert or Update based on existence of id)
    saveEntry: async (req, res) => {
        const {
            id,
            username,
            email_id,
            password
        } = req.body;

        try {
            // Check if update or insert
            if (id && mongoose.Types.ObjectId.isValid(id)) {
                // UPDATE USER
                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    { username, email_id, password },
                    { new: true, runValidators: true }
                );

                if (!updatedUser) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found for update"
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: "User updated successfully",
                    data: [updatedUser] // Kept as array to match original MSSQL structure
                });
            } else {
                // INSERT USER / SIGNUP
                // 🔹 Create user in Firebase Auth first (only for signup)
                if (email_id && password) {
                    if (getApps().length > 0) {
                        try {
                            const auth = getAuth();
                            await auth.createUser({
                                email: email_id,
                                password: password,
                                displayName: username || undefined
                            });
                            console.log(`[Firebase] User created successfully: ${email_id}`);
                        } catch (fbErr) {
                            if (fbErr.code === 'auth/email-already-exists') {
                                console.log(`[Firebase] User already exists in Firebase: ${email_id}`);
                            } else {
                                console.error("[Firebase] Signup Error:", fbErr.message);
                                return res.status(400).json({
                                    success: false,
                                    message: `Firebase Auth Error: ${fbErr.message}`
                                });
                            }
                        }
                    } else {
                        console.warn(`[Warning] Firebase Admin SDK is not initialized. Skipping Firebase user creation for ${email_id}, proceeding with local database signup.`);
                    }
                }

                // Check duplicate email in MongoDB
                const existingUser = await User.findOne({ email_id: email_id?.toLowerCase() });
                if (existingUser) {
                    return res.status(400).json({
                        success: false,
                        message: "User already exists with this email"
                    });
                }

                const newUser = new User({
                    username,
                    email_id,
                    password
                });

                await newUser.save();

                return res.status(200).json({
                    success: true,
                    message: "User saved successfully",
                    data: [newUser] // Kept as array to match original MSSQL structure
                });
            }

        } catch (err) {
            console.error("Save User Error:", err.message);
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    // 🔹 GET ALL ENTRIES (For Grid / List)
    getAllEntries: async (req, res) => {
        try {
            const users = await User.find({});
            return res.status(200).json({
                success: true,
                data: users
            });
        } catch (err) {
            console.error("Get All Users Error:", err.message);
            return res.status(500).json({ 
                success: false, 
                message: err.message 
            });
        }
    },

    // 🔹 DELETE ENTRY
    deleteEntry: async (req, res) => {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ 
                success: false, 
                message: "User ID is required" 
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid User ID format" 
            });
        }

        try {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: [deletedUser]
            });

        } catch (err) {
            console.error("Delete User Error:", err.message);
            return res.status(500).json({
                success: false,
                message: err.message || "Delete User Error"
            });
        }
    },

    // 🔹 LOGIN (Authenticate against Firebase with local DB verification fallback)
    loginEntry: async (req, res) => {
        const { email_id, password } = req.body;

        if (!email_id || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        try {
            const apiKey = process.env.FIREBASE_API_KEY;
            let firebaseUser = null;

            if (apiKey) {
                try {
                    firebaseUser = await firebaseSignIn(email_id, password, apiKey);
                    console.log(`[Firebase] User authenticated successfully: ${email_id}`);
                } catch (fbErr) {
                    console.error("[Firebase] Login Error:", fbErr.message);
                    return res.status(401).json({
                        success: false,
                        message: fbErr.message || "Invalid credentials"
                    });
                }
            } else {
                console.warn("[Warning] FIREBASE_API_KEY is not defined in .env. Falling back to local database password verification.");
            }

            // 🔹 Verify / Fetch profile from MongoDB database
            const dbUser = await User.findOne({ email_id: email_id.toLowerCase() });

            if (!dbUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found in local database"
                });
            }

            // Fallback password comparison if Firebase API key is not configured
            if (!apiKey) {
                if (dbUser.password !== password) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid password"
                    });
                }
            }

            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    id: dbUser.id,
                    username: dbUser.username,
                    email_id: dbUser.email_id,
                    firebaseToken: firebaseUser?.idToken || null
                }
            });

        } catch (err) {
            console.error("Login User Error:", err.message);
            return res.status(500).json({
                success: false,
                message: err.message || "Internal server error"
            });
        }
    },

    // 🔹 GOOGLE AUTH (Verify Firebase ID Token & auto-register/fetch user)
    googleAuthEntry: async (req, res) => {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: "Firebase ID Token is required"
            });
        }

        try {
            let email, name, uid;

            if (getApps().length > 0) {
                // Verify the ID token using Firebase Admin SDK
                const auth = getAuth();
                const decodedToken = await auth.verifyIdToken(idToken);
                email = decodedToken.email;
                name = decodedToken.name;
                uid = decodedToken.uid;
            } else {
                console.warn("[Warning] Firebase Admin SDK is not initialized. Decoding token payload as fallback.");
                const payload = decodeFirebaseToken(idToken);
                email = payload.email;
                name = payload.name;
                uid = payload.user_id || payload.sub;
            }

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "No email found in Google account"
                });
            }

            console.log(`[Firebase] Google auth decoded for: ${email}`);

            // Check if user exists in MongoDB
            let dbUser = await User.findOne({ email_id: email.toLowerCase() });

            // If user doesn't exist, auto-register them
            if (!dbUser) {
                console.log(`[Firebase] Auto-registering Google user: ${email}`);
                dbUser = new User({
                    username: name || email.split('@')[0],
                    email_id: email,
                    password: `google_${uid}`
                });
                await dbUser.save();
            }

            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    id: dbUser.id,
                    username: dbUser.username,
                    email_id: dbUser.email_id,
                    firebaseToken: idToken
                }
            });

        } catch (err) {
            console.error("Google Auth Error:", err.message);
            return res.status(401).json({
                success: false,
                message: err.message || "Google authentication failed"
            });
        }
    }
};

export default userController;
