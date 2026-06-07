import { prisma } from "../../db/prisma";

export type ProjectFilters = {
    status?: string;
    category?: string;
};

export const projectRepository = {
    findMany(filters: ProjectFilters = {}) {
        return prisma.project.findMany({
            where: {
                status: filters.status,
                category: filters.category,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    },

    findBySlug(slug: string) {
        return prisma.project.findUnique({
            where: {
                slug,
            },
        });
    },
};