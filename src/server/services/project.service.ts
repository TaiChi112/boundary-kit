import {
    projectRepository,
    type ProjectFilters,
} from "../repositories/project.repository";
import {
    toProjectCategoryFilter,
    toProjectStatusFilter,
} from "../domain/project.constants";

export const projectService = {
    async getProjects(filters: ProjectFilters = {}) {
        const status = filters.status ? toProjectStatusFilter(filters.status) : undefined;
        const category = filters.category
            ? toProjectCategoryFilter(filters.category)
            : undefined;

        if (filters.status && !status) {
            return [];
        }

        if (filters.category && !category) {
            return [];
        }

        return projectRepository.findMany({
            status,
            category,
        });
    },

    async getProjectBySlug(slug: string) {
        const normalizedSlug = slug.trim().toLowerCase();

        if (!normalizedSlug) {
            return null;
        }

        return projectRepository.findBySlug(normalizedSlug);
    },
};