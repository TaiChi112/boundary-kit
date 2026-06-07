import { api } from "../src/client/treaty";

async function main() {
    const health = await api.health.get();

    console.log("Health:");
    console.log(health);

    const projects = await api.projects.get();

    console.log("Projects:");
    console.log(projects);

    const activeProjects = await api.projects.get({
        query: {
            status: "active",
        },
    });

    console.log("Active projects:");
    console.log(activeProjects);

    const aiAgentProjects = await api.projects.get({
        query: {
            category: "ai_agent",
        },
    });

    console.log("AI agent projects:");
    console.log(aiAgentProjects);

    const projectBySlug = await api.projects({
        slug: "ai-agent-workflow-manager",
    }).get();

    console.log("Project by slug:");
    console.log(projectBySlug);

    const notFound = await api.projects({
        slug: "not-existing-project",
    }).get();

    console.log("Not found:");
    console.log({
        status: notFound.status,
        data: notFound.data,
        error: notFound.error,
    });
}

main().catch((error) => {
    console.error("Eden Treaty test failed:");
    console.error(error);
    process.exit(1);
});