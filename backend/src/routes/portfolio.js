const express = require("express");
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const formData = req.body;
        const { userId, username, templateId, hero, about, projects, contact } = formData;

        // 1) Check if user exists
        const user = await prisma.saaSUser.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // 2) Check if template exists
        const template = await prisma.template.findUnique({
            where: { id: templateId },
        });
        if (!template) {
            return res.status(404).json({ error: "Template not found" });
        }

        // 3) Create portfolio in DB
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const signs = ["!", "@", "#", "$", "%", "&"];
        const randomSign = signs[Math.floor(Math.random() * signs.length)];

        const dashboardEmail = `${username}${randomNum}@zonefolio.com`;
        const dashboardPassword = `${username}${randomNum}${randomSign}`;

        const portfolio = await prisma.portfolio.create({
            data: {
                userId,
                templateId,
                dashboardEmail,
                dashboardPassword,
                domainType: "Free", // default MVP
            },
        });

        // 4) Store portfolio sections
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

        // 5) Create new GitHub repo from template
        const githubToken = process.env.GITHUB_TOKEN; // 🔑 لازم تحطه في env
        const templateOwner = "zonefolio-platform";
        const templateRepo = "Na8am-Template";

        const newRepoName = `portfolio-${portfolio.id}`;

        const githubResponse = await axios.post(
            `https://api.github.com/repos/${templateOwner}/${templateRepo}/generate`,
            {
                owner: "zonefolio-platform", // تقدر تخليها org أو user جديد
                name: newRepoName,
                private: false, // خليه false في الـ MVP
            },
            {
                headers: {
                    Authorization: `Bearer ${githubToken}`,
                    Accept: "application/vnd.github+json",
                },
            }
        );

        res.status(201).json({
            message: "Portfolio created & repo cloned successfully",
            portfolioId: portfolio.id,
            githubRepo: githubResponse.data.html_url,
        });
    } catch (error) {
        console.error("Portfolio creation error:", error.response?.data || error.message);
        res.status(500).json({ error: error.message, details: error.response?.data });
    }
});

module.exports = router;