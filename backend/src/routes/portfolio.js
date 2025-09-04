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
        const githubToken = process.env.GITHUB_TOKEN;
        const templateOwner = "zonefolio-platform";
        const templateRepo = "Na8am-Template";
        const newRepoName = `${user.username}-zonefolio`;

        const githubResponse = await axios.post(
            `https://api.github.com/repos/${templateOwner}/${templateRepo}/generate`,
            {
                owner: "zonefolio-platform", // لازم يكون org/team عندك
                name: newRepoName,
                private: false,
            },
            {
                headers: {
                    Authorization: `Bearer ${githubToken}`,
                    Accept: "application/vnd.github+json",
                },
            }
        );

        // 6) Deploy on Vercel with API env var
        const vercelToken = process.env.VERCEL_TOKEN;
        const vercelTeamId = process.env.VERCEL_TEAM_ID; // optional
        const apiUrl = `https://zonefolio-backend.up.railway.app/portfolio/${user.username}`;
        const vercelResponse = await axios.post(
            "https://api.vercel.com/v9/projects",
            {
                name: newRepoName,
                gitRepository: {
                    type: "github",
                    repo: `zonefolio-platform/${newRepoName}`,
                },
                environmentVariables: [
                    {
                        key: "NEXT_PUBLIC_API_URL",
                        value: apiUrl,
                        target: ["production", "preview", "development"],
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${vercelToken}`,
                },
                params: vercelTeamId ? { teamId: vercelTeamId } : {},
            }
        );

        const deployedUrl = `https://${newRepoName}.vercel.app`;

        res.status(201).json({
            message: "Portfolio created, repo cloned & deployed successfully",
            domain: deployedUrl,
            portfolioId: portfolio.id,
            githubRepo: githubResponse.data.html_url,
            vercelProject: vercelResponse.data,
        });
    } catch (error) {
        console.error("Portfolio creation error:", error.response?.data || error.message);
        res.status(500).json({ error: error.message, details: error.response?.data });
    }
});







router.get("/:username", async (req, res) => {
    try {
        const { username } = req.params;

        // 1) Get the user
        const user = await prisma.saaSUser.findUnique({
            where: { username },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // 2) Get portfolio for this user
        const portfolio = await prisma.portfolio.findFirst({
            where: { userId: user.id },
            include: {
                sections: true, // fetch hero, about, projects, contact
            },
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }

        // 3) Transform sections into desired shape
        const responseData = {};

        portfolio.sections.forEach((section) => {
            responseData[section.type] = section.content;
        });

        // 4) Send formatted JSON
        res.json(responseData);
    } catch (error) {
        console.error("Get portfolio error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;