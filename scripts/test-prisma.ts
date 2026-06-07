import { prisma } from "../src/db/prisma";

async function main() {
    const projects = await prisma.project.findMany();

    console.log("Database connected successfully.");
    console.log(`Project count: ${projects.length}`);
    console.log(projects);
}

main()
    .catch((error) => {
        console.error("Prisma test failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });