import { app } from "../src/server/app";
import { prisma } from "../src/db/prisma";

async function request(path: string) {
    return app.handle(new Request(`http://localhost${path}`));
}

async function main() {
    const healthResponse = await request("/health");
    const health = await healthResponse.json();

    console.log("Health:");
    console.log(health);

    const projectsResponse = await request("/projects");
    const projects = await projectsResponse.json();

    console.log("Projects:");
    console.log(projects);

    const activeProjectsResponse = await request("/projects?status=active");
    const activeProjects = await activeProjectsResponse.json();

    console.log("Active projects:");
    console.log(activeProjects);

    const projectBySlugResponse = await request(
        "/projects/ai-agent-workflow-manager",
    );
    const projectBySlug = await projectBySlugResponse.json();

    console.log("Project by slug:");
    console.log(projectBySlug);

    const notFoundResponse = await request("/projects/not-existing-project");
    const notFound = await notFoundResponse.json();

    console.log("Not found status:");
    console.log(notFoundResponse.status);
    console.log(notFound);
}

main()
    .catch((error) => {
        console.error("Elysia app test failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });