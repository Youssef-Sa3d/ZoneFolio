const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require("@prisma/client");
const sendVerificationEmail = require("../utils/sendEmail");

const prisma = new PrismaClient();
const router = express.Router();



// Generate random 6-digit code
const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// REGISTER (without auto-login)
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, username } = req.body;
        if (!name || !email || !password || !username) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await prisma.saaSUser.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateVerificationCode();
        const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        const newUser = await prisma.saaSUser.create({
            data: {
                name,
                email,
                password: hashedPassword,
                username,
                verificationCode,
                verificationCodeExpires,
            },
        });

        // Send verification email
        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({
            message: "Verification code sent to your email",
            userId: newUser.id,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// VERIFY EMAIL
router.post("/verify", async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            return res.status(400).json({ error: "Email and code are required" });
        }

        const user = await prisma.saaSUser.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if already verified
        if (user.isVerified) {
            return res.status(400).json({ error: "Email already verified" });
        }

        // Check code and expiration
        if (user.verificationCode !== code) {
            return res.status(400).json({ error: "Invalid verification code" });
        }

        if (user.verificationCodeExpires < new Date()) {
            return res.status(400).json({ error: "Verification code has expired" });
        }

        // Mark as verified and clear code
        await prisma.saaSUser.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationCode: null,
                verificationCodeExpires: null,
            },
        });

        // Automatically log in after verification
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Email verified and logged in successfully",
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// RESEND VERIFICATION CODE
router.post("/resend-verification", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = await prisma.saaSUser.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ error: "Email already verified" });
        }

        const newCode = generateVerificationCode();
        const newExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        await prisma.saaSUser.update({
            where: { id: user.id },
            data: {
                verificationCode: newCode,
                verificationCodeExpires: newExpiry,
            },
        });

        await sendVerificationEmail(email, newCode);

        res.status(200).json({ message: "New verification code sent" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// LOGIN (updated with verification check)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await prisma.saaSUser.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Email or password is incorrect" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: "Email or password is incorrect" });
        }

        // Check if email is verified
        if (!user.isVerified) {
            return res.status(403).json({
                error: "Email not verified",
                userId: user.id
            });
        }

        // Proceed with login
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// LOGOUT
router.post("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0
    });
    res.status(200).json({
        message: "User logged out successfully",
    });
});

// AUTH CHECK
router.get("/me", (req, res) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ error: "Not logged in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ userId: decoded.userId });
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
});



module.exports = router;