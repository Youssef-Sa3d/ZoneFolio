const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// REGISTER & AUTO-LOGIN
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, username } = req.body;
        if (!name || !email || !password || !username) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await prisma.saaSUser.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email or password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.saaSUser.create({
            data: {
                name,
                email,
                password: hashedPassword,
                username,
            },
        });

        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.status(201).json({
            message: "User registered & logged in successfully",
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// LOGIN
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

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
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
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
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