import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
    PROJECT_CATEGORIES,
    PROJECT_STATUSES,
} from "../src/server/domain/project.constants";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    await prisma.project.upsert({
        where: {
            slug: "ai-agent-workflow-manager",
        },
        update: {},
        create: {
            title: "AI Agent Workflow Manager",
            slug: "ai-agent-workflow-manager",
            summary: "A workflow system for coordinating AI agents with human approval checkpoints.",
            description:
                "A prototype project for managing AI-assisted task execution, review loops, and human-in-the-loop decision points.",
            status: PROJECT_STATUSES.ACTIVE,
            category: PROJECT_CATEGORIES.AI_AGENT,
        },
    });

    await prisma.project.upsert({
        where: {
            slug: "portfolio-knowledge-base",
        },
        update: {},
        create: {
            title: "Portfolio Knowledge Base",
            slug: "portfolio-knowledge-base",
            summary: "A structured knowledge base for documenting software engineering and AI-agent learning notes.",
            description:
                "A documentation-focused project that organizes technical notes, project logs, and learning resources into a searchable portfolio system.",
            status: PROJECT_STATUSES.ACTIVE,
            category: PROJECT_CATEGORIES.KNOWLEDGE_BASE,
        },
    });

    await prisma.project.upsert({
        where: {
            slug: "internal-tool-api-prototype",
        },
        update: {},
        create: {
            title: "Internal Tool API Prototype",
            slug: "internal-tool-api-prototype",
            summary: "A backend API prototype for reading internal tool configuration and project metadata.",
            description:
                "A read-focused API prototype designed to practice clean architecture, Prisma repositories, and type-safe client consumption.",
            status: PROJECT_STATUSES.DRAFT,
            category: PROJECT_CATEGORIES.BACKEND,
        },
    });

    const projectCount = await prisma.project.count();

    console.log("Seed completed successfully.");
    console.log(`Project count: ${projectCount}`);
}

main()
    .catch((error) => {
        console.error("Seed failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });