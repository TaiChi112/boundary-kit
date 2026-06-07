import { prisma } from "../src/db/prisma";
import { projectService } from "../src/server/services/project.service";

async function main() {
    const allProjects = await projectService.getProjects();

    console.log("All projects:");
    console.log(allProjects.map((project) => project.slug));

    const activeProjects = await projectService.getProjects({
        status: "active",
    });

    console.log("Active projects:");
    console.log(activeProjects.map((project) => project.slug));

    const aiAgentProjects = await projectService.getProjects({
        category: "ai_agent",
    });

    console.log("AI agent projects:");
    console.log(aiAgentProjects.map((project) => project.slug));

    const project = await projectService.getProjectBySlug(
        "ai-agent-workflow-manager",
    );

    console.log("Project by slug:");
    console.log(project);
}

main()
    .catch((error) => {
        console.error("Project service test failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });