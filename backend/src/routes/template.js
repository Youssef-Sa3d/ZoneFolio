const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const templates = await prisma.template.findMany({
            where: { isActive: true },
            select: {
                id: true,
                name: true,
                description: true,
                category: true,
                imageUrl: true,
                demoUrl: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(templates);
    } catch (error) {
        console.error("Error fetching templates:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;