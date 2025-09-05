const express = require("express");
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const prisma = new PrismaClient();
const router = express.Router();



router.post("/", async (req, res) => {
    const formData = req.body;
    const { userId, username, templateId, hero, about, projects, contact } = formData;

    const githubToken = process.env.GITHUB_TOKEN;
    const vercelToken = process.env.VERCEL_TOKEN;
    const vercelTeamId = process.env.VERCEL_TEAM_ID; // optional

    try {
        // 1) Check user
        const user = await prisma.saaSUser.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ error: "User not found" });

        // 2) Check template
        const template = await prisma.template.findUnique({ where: { id: templateId } });
        if (!template) return res.status(404).json({ error: "Template not found" });

        // 3) Generate new GitHub repo from template
        const templateOwner = "zonefolio-platform";
        const templateRepo = "Na8am-Template";
        const newRepoName = `${username}-zonefolio`;

        const githubResponse = await axios.post(
            `https://api.github.com/repos/${templateOwner}/${templateRepo}/generate`,
            {
                owner: "zonefolio-platform",
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

        const githubRepoUrl = githubResponse.data.html_url;

        // 4) Create Project on Vercel linked with GitHub
        const vercelProjectRes = await axios.post(
            "https://api.vercel.com/v9/projects",
            {
                name: newRepoName,
                gitRepository: {
                    type: "github",
                    repo: `zonefolio-platform/${newRepoName}`,
                },
                framework: "nextjs",
            },
            {
                headers: {
                    Authorization: `Bearer ${vercelToken}`,
                    "Content-Type": "application/json",
                },
                params: vercelTeamId ? { teamId: vercelTeamId } : {},
            }
        );

        const projectId = vercelProjectRes.data.id;

        // 5) Add Environment Variable
        const apiUrl = `${process.env.API_BASE_URL}/portfolio/${username}`;
        await axios.post(
            `https://api.vercel.com/v9/projects/${newRepoName}/env`,
            {
                key: "NEXT_PUBLIC_DATA_API_URL",
                value: apiUrl,
                type: "encrypted",
                target: ["production", "preview", "development"],
            },
            {
                headers: {
                    Authorization: `Bearer ${vercelToken}`,
                    "Content-Type": "application/json",
                },
                params: vercelTeamId ? { teamId: vercelTeamId } : {},
            }
        );

        // 6) Trigger Deployment
        const vercelDeployRes = await axios.post(
            "https://api.vercel.com/v13/deployments",
            {
                name: newRepoName,
                project: projectId,
                target: "production",
            },
            {
                headers: {
                    Authorization: `Bearer ${vercelToken}`,
                    "Content-Type": "application/json",
                },
                params: vercelTeamId ? { teamId: vercelTeamId } : {},
            }
        );

        const deployedUrl = vercelDeployRes.data.url.startsWith("http")
            ? vercelDeployRes.data.url
            : `https://${vercelDeployRes.data.url}`;

        // 7) Generate dashboard credentials
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const signs = ["!", "@", "#", "$", "%", "&"];
        const randomSign = signs[Math.floor(Math.random() * signs.length)];

        const dashboardEmail = `${username}${randomNum}@zonefolio.com`;
        const dashboardPassword = `${username}${randomNum}${randomSign}`;

        // 8) Save portfolio to DB **after everything succeeds**
        const portfolio = await prisma.portfolio.create({
            data: {
                userId,
                templateId,
                dashboardEmail,
                dashboardPassword,
                domainType: "Free",
                deployedUrl,
            },
        });

        // 9) Store portfolio sections
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

        res.status(201).json({
            message: "Portfolio created, repo cloned & deployed successfully",
            portfolioId: portfolio.id,
            githubRepo: githubRepoUrl,
            deployedUrl,
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