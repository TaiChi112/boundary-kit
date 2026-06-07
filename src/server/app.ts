import { Elysia } from "elysia";
import { projectRoute } from "./routes/project.route";

export const app = new Elysia()
    .get("/health", () => {
        return {
            status: "ok",
            service: "e2e-nextjs-elysia",
        };
    })
    .use(projectRoute);

export type App = typeof app;