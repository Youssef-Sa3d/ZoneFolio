const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const formData = req.body;

        const { userId, templateId, hero, about, projects, contact } = formData;

        // 1️⃣ Create Portfolio
        const portfolio = await prisma.portfolio.create({
            data: {
                userId: userId,
                templateId: templateId,
            },
        });

        // 2️⃣ Prepare sections
        const sections = [
            {
                type: "hero",
                order: 1,
                content: hero,
            },
            {
                type: "about",
                order: 2,
                content: about,
            },
            {
                type: "projects",
                order: 3,
                content: projects,
            },
            {
                type: "contact",
                order: 4,
                content: contact,
            },
        ];

        // 3️⃣ Insert sections
        await prisma.portfolioSection.createMany({
            data: sections.map((section) => ({
                portfolioId: portfolio.id,
                type: section.type,
                order: section.order,
                content: section.content, // Prisma supports Json
            })),
        });

        return res.status(201).json({
            message: "Portfolio created successfully",
            portfolioId: portfolio.id,
        });
    } catch (error) {
        console.error("Error creating portfolio:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;