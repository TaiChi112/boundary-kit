import { app } from "@/src/server/app";

type RouteContext = {
    params: Promise<{
        slugs?: string[];
    }>;
};

async function handler(request: Request, context: RouteContext) {
    const { slugs = [] } = await context.params;

    const url = new URL(request.url);
    const pathname = `/${slugs.join("/")}`;

    const forwardedUrl = new URL(url);
    forwardedUrl.pathname = pathname;

    const forwardedRequest = new Request(forwardedUrl, request);

    return app.handle(forwardedRequest);
}

export const GET = handler;