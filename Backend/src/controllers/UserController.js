import { sql, getPool } from '../config/db.js';
import { getAuth } from 'firebase-admin/auth';
import https from 'https';

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
            // 🔹 Create user in Firebase Auth first (only for INSERT / signup)
            if (!id && email_id && password) {
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
            }

            const pool = await getPool();
            const result = await pool.request()
                .input("Action", sql.VarChar(20), id ? "UPDATE" : "INSERT")
                .input("Id", sql.Int, id || null)
                .input("Username", sql.VarChar(100), username || null)
                .input("EmailId", sql.VarChar(255), email_id || null)
                .input("Password", sql.VarChar(255), password || null)
                .execute("USP_User_operation");

            return res.status(200).json({
                success: true,
                message: id ? "User updated successfully" : "User saved successfully",
                data: result.recordset
            });

        } catch (err) {
            console.error("Save User Error:", err.message);
            const statusCode = err.number === 50000 ? 400 : 500;
            return res.status(statusCode).json({
                success: false,
                message: err.message
            });
        }
    },

    // 🔹 GET ALL ENTRIES (For Grid / List)
    getAllEntries: async (req, res) => {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input("Action", sql.VarChar(20), "SELECT")
                .execute("USP_User_operation");

            return res.status(200).json({
                success: true,
                data: result.recordset
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

        try {
            const pool = await getPool();
            const result = await pool.request()
                .input("Action", sql.VarChar(20), "DELETE")
                .input("Id", sql.Int, id)
                .execute("USP_User_operation");

            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: result.recordset
            });

        } catch (err) {
            console.error("Delete User Error:", err.message);
            const statusCode = err.number === 50000 ? 400 : 500;
            return res.status(statusCode).json({
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

            // 🔹 Verify / Fetch profile from MSSQL database
            const pool = await getPool();
            const result = await pool.request()
                .input("Action", sql.VarChar(20), "SELECT")
                .execute("USP_User_operation");

            const users = result.recordset || [];
            const dbUser = users.find(u => u.email_id?.toLowerCase() === email_id.toLowerCase());

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
            // Verify the ID token using Firebase Admin SDK
            const auth = getAuth();
            const decodedToken = await auth.verifyIdToken(idToken);
            const { email, name, uid } = decodedToken;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "No email found in Google account"
                });
            }

            console.log(`[Firebase] Google auth verified for: ${email}`);

            // Check if user exists in MSSQL
            const pool = await getPool();
            const selectResult = await pool.request()
                .input("Action", sql.VarChar(20), "SELECT")
                .execute("USP_User_operation");

            const users = selectResult.recordset || [];
            let dbUser = users.find(u => u.email_id?.toLowerCase() === email.toLowerCase());

            // If user doesn't exist, auto-register them
            if (!dbUser) {
                console.log(`[Firebase] Auto-registering Google user: ${email}`);
                const insertResult = await pool.request()
                    .input("Action", sql.VarChar(20), "INSERT")
                    .input("Id", sql.Int, null)
                    .input("Username", sql.VarChar(100), name || email.split('@')[0])
                    .input("EmailId", sql.VarChar(255), email)
                    .input("Password", sql.VarChar(255), `google_${uid}`)
                    .execute("USP_User_operation");

                // Fetch the newly created user
                const refetchResult = await pool.request()
                    .input("Action", sql.VarChar(20), "SELECT")
                    .execute("USP_User_operation");

                dbUser = (refetchResult.recordset || []).find(u => u.email_id?.toLowerCase() === email.toLowerCase());
            }

            return res.status(200).json({
                success: true,
                message: dbUser ? "Login successful" : "User registered and logged in",
                user: {
                    id: dbUser?.id,
                    username: dbUser?.username || name,
                    email_id: dbUser?.email_id || email,
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
