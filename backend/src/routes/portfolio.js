const express = require("express");
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
    const prismaTx = prisma.$transaction; // in case we want rollback later
    try {
        const { userId, username, templateId, hero, about, projects, contact } = req.body;

        // 1) Validate user & template
        const user = await prisma.saaSUser.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ error: "User not found" });

        const template = await prisma.template.findUnique({ where: { id: templateId } });
        if (!template) return res.status(404).json({ error: "Template not found" });

        // 2) Create GitHub repo
        let githubRepoUrl, newRepoName;
        try {
            const githubToken = process.env.GITHUB_TOKEN;
            const templateOwner = "zonefolio-platform";
            const templateRepo = "Na8am-Template";
            newRepoName = `${user.username}-zonefolio`;

            const githubResponse = await axios.post(
                `https://api.github.com/repos/${templateOwner}/${templateRepo}/generate`,
                { owner: "zonefolio-platform", name: newRepoName, private: false },
                { headers: { Authorization: `Bearer ${githubToken}`, Accept: "application/vnd.github+json" } }
            );

            githubRepoUrl = githubResponse.data.html_url;
        } catch (err) {
            return res.status(500).json({ error: "GitHub clone failed", details: err.response?.data || err.message });
        }

        // 3) Deploy on Vercel
        let deployedUrl;
        try {
            const vercelToken = process.env.VERCEL_TOKEN;
            const vercelTeamId = process.env.VERCEL_TEAM_ID;
            const apiUrl = `https://zonefolio-backend.up.railway.app/portfolio/${user.username}`;

            const vercelResponse = await axios.post(
                "https://api.vercel.com/v9/projects",
                {
                    name: newRepoName,
                    gitRepository: { type: "github", repo: `zonefolio-platform/${newRepoName}` },
                    environmentVariables: [
                        { key: "NEXT_PUBLIC_DATA_API_URL", value: apiUrl, target: ["production", "preview", "development"] }
                    ],
                },
                {
                    headers: { Authorization: `Bearer ${vercelToken}` },
                    params: vercelTeamId ? { teamId: vercelTeamId } : {},
                }
            );

            deployedUrl = `https://${newRepoName}.vercel.app`;
        } catch (err) {
            console.error("Vercel error:", err.response?.data || err.message);
            return res.status(500).json({
                error: "Vercel deploy failed",
                details: err.response?.data || err.message,
            });
        }

        // 4) Only now → create portfolio in DB
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
                domainType: "Free",
                deployedUrl, // add deployed url to DB
            },
        });

        await prisma.portfolioSection.createMany({
            data: [
                { portfolioId: portfolio.id, type: "hero", order: 1, content: hero },
                { portfolioId: portfolio.id, type: "about", order: 2, content: about },
                { portfolioId: portfolio.id, type: "projects", order: 3, content: projects },
                { portfolioId: portfolio.id, type: "contact", order: 4, content: contact },
            ],
        });

        res.status(201).json({
            message: "Portfolio created & deployed",
            domain: deployedUrl,
            portfolioId: portfolio.id,
            githubRepo: githubRepoUrl,
        });
    } catch (err) {
        console.error("Portfolio creation error:", err);
        res.status(500).json({ error: err.message });
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