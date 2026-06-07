import { Elysia, t } from "elysia";
import { projectService } from "../services/project.service";

export const projectRoute = new Elysia({ prefix: "/projects" })
    .get(
        "/",
        async ({ query }) => {
            const projects = await projectService.getProjects({
                status: query.status,
                category: query.category,
            });

            return {
                data: projects,
            };
        },
        {
            query: t.Object({
                status: t.Optional(t.String()),
                category: t.Optional(t.String()),
            }),
        },
    )
    .get(
        "/:slug",
        async ({ params, set }) => {
            const project = await projectService.getProjectBySlug(params.slug);

            if (!project) {
                set.status = 404;

                return {
                    error: "PROJECT_NOT_FOUND",
                    message: `Project with slug "${params.slug}" was not found.`,
                };
            }

            return {
                data: project,
            };
        },
        {
            params: t.Object({
                slug: t.String(),
            }),
        },
    );