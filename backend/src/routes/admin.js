const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();


router.post("/templates", async (req, res) => {
    const { name, description, category, demoUrl , imageUrl } = req.body;

    try {
        const template = await prisma.template.create({
            data: {
                name,
                description,
                category,
                demoUrl,
                imageUrl
            }
        });
        res.status(201).json(template);
    } catch (error) {
        res.status(500).json({ error: "Failed to create template" });
    }
});



module.exports = router;