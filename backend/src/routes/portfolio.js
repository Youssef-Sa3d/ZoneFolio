const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();


router.post("/portfolio", async (req, res) => {
    try {
        const formData = req.body;
        const { userId, templateId, hero, about, projects, contact } = formData;

        const user = await prisma.saasUser.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const template = await prisma.template.findUnique({
            where: { id: templateId },
        });
        if (!template) {
            return res.status(404).json({ error: "Template not found" });
        }

        const portfolio = await prisma.portfolio.create({
            data: {
                userId,
                templateId
            },
        });

        const sections = [
            { type: "hero", order: 1, content: hero },
            { type: "about", order: 2, content: about },
            { type: "projects", order: 3, content: projects },
            { type: "contact", order: 4, content: contact },
        ];

        await prisma.portfolioSection.createMany({
            data: sections.map(({ type, order, content }) => ({
                portfolioId: portfolio.id,
                type,
                order,
                content,
            })),
        });

        res.status(201).json({ message: "Portfolio created successfully", portfolioId: portfolio.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;