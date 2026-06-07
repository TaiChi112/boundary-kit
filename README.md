# E2E Next.js + Elysia + Prisma

A learning project for building a read-only API with:

- Bun
- Next.js App Router
- Elysia
- Eden Treaty for end-to-end type safety
- Prisma ORM v7
- PostgreSQL via Docker Compose

## Goal

This project demonstrates how to run a Next.js application as the main app while mounting an Elysia server inside a Next.js Route Handler.

The API reads project data from PostgreSQL through Prisma and exposes type-safe access to the frontend through Eden Treaty.

## Stack

- Runtime / package manager: Bun
- Frontend: Next.js App Router
- API framework: Elysia
- Type-safe client: Eden Treaty
- ORM: Prisma v7
- Database: PostgreSQL
- Local database runtime: Docker Compose

## Architecture

```txt
Browser / Next.js Page
        ↓
Eden Treaty Client
        ↓
Next.js Route Handler: app/api/[[...slugs]]/route.ts
        ↓
Elysia App: src/server/app.ts
        ↓
Project Route: src/server/routes/project.route.ts
        ↓
Project Service: src/server/services/project.service.ts
        ↓
Project Repository: src/server/repositories/project.repository.ts
        ↓
Prisma Client: src/db/prisma.ts
        ↓
PostgreSQL Docker Container
```

## Project Structure

```txt
app/
├── api/
│   └── [[...slugs]]/
│       └── route.ts
├── projects/
│   ├── [slug]/
│   │   └── page.tsx
│   └── page.tsx
├── layout.tsx
└── page.tsx

src/
├── client/
│   ├── helpers/
│   │   └── api-response.ts
│   └── treaty.ts
├── db/
│   └── prisma.ts
├── generated/
│   └── prisma/
└── server/
    ├── app.ts
    ├── domain/
    │   └── project.constants.ts
    ├── repositories/
    │   └── project.repository.ts
    ├── routes/
    │   └── project.route.ts
    └── services/
        └── project.service.ts

prisma/
├── migrations/
├── schema.prisma
└── seed.ts

scripts/
├── test-eden.ts
├── test-elysia-app.ts
├── test-prisma.ts
└── test-project-service.ts
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/e2e_nextjs_elysia?schema=public"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

## Start PostgreSQL

```bash
docker compose up -d
```

Check database readiness:

```bash
docker exec e2e-nextjs-elysia-postgres pg_isready -U postgres
```

Open psql:

```bash
docker exec -it e2e-nextjs-elysia-postgres psql -U postgres -d e2e_nextjs_elysia
```

## Prisma Commands

Generate Prisma Client:

```bash
bunx prisma generate
```

Run migration:

```bash
bunx prisma migrate dev
```

Check migration status:

```bash
bunx prisma migrate status
```

Seed database:

```bash
bun run seed
```

## Development

Start Next.js:

```bash
bun dev
```

Open:

```txt
http://localhost:3000
```

Projects page:

```txt
http://localhost:3000/projects
```

## API Endpoints

Health check:

```txt
GET /api/health
```

Get all projects:

```txt
GET /api/projects
```

Filter by status:

```txt
GET /api/projects?status=active
GET /api/projects?status=draft
```

Filter by category:

```txt
GET /api/projects?category=ai_agent
GET /api/projects?category=backend
GET /api/projects?category=knowledge_base
```

Get project by slug:

```txt
GET /api/projects/:slug
```

Example:

```txt
GET /api/projects/ai-agent-workflow-manager
```

## Pages

Project list:

```txt
/projects
```

Filtered project list:

```txt
/projects?status=active
/projects?category=ai_agent
```

Project detail:

```txt
/projects/ai-agent-workflow-manager
```

Not found example:

```txt
/projects/not-existing-project
```

## Test Scripts

Test Prisma connection:

```bash
bun scripts/test-prisma.ts
```

Test project service layer:

```bash
bun scripts/test-project-service.ts
```

Test Elysia app without Next.js:

```bash
bun scripts/test-elysia-app.ts
```

Test Eden Treaty through Next.js API:

```bash
bun scripts/test-eden.ts
```

For `test-eden.ts`, make sure the Next.js dev server is running:

```bash
bun dev
```

## Build

```bash
bun run build
```

## Current Features

- PostgreSQL runs in Docker
- Prisma v7 uses generated client output at `src/generated/prisma`
- Prisma Client uses `@prisma/adapter-pg`
- Elysia is mounted inside a Next.js Route Handler
- Eden Treaty client is used by frontend pages
- Project list page supports filters through URL search params
- Project detail page supports dynamic route by slug
- Not found project pages use Next.js `notFound()`

## Notes

This project is intentionally read-only for now.

Not included yet:

- Authentication
- Create/update/delete API
- Pagination
- Search
- Validation error formatting
- Production deployment
- Dockerized Next.js app

These can be added later after the read-only architecture is stable.