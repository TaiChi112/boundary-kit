import Link from "next/link";
import { api } from "@/src/client/treaty";
import { unwrapApiData } from "@/src/client/helpers/api-response";

const projectFilterLinks = [
  { href: "/projects", label: "All" },
  { href: "/projects?status=active", label: "Active" },
  { href: "/projects?status=draft", label: "Draft" },
  { href: "/projects?category=ai_agent", label: "AI Agent" },
  { href: "/projects?category=backend", label: "Backend" },
  { href: "/projects?category=knowledge_base", label: "Knowledge Base" },
] as const;

type ProjectsPageProps = {
  searchParams: Promise<{
    status?: string;
    category?: string;
  }>;
};

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const { status, category } = await searchParams;

  const projectsResponse = await api.projects.get({
    query: {
      status,
      category,
    },
  });

  if (projectsResponse.error) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Projects</h1>
        <p>Failed to load projects.</p>
      </main>
    );
  }

  const projects = unwrapApiData(projectsResponse) ?? [];

  return (
    <main style={{ padding: "2rem", maxWidth: "960px", margin: "0 auto" }}>
      <h1>Projects</h1>

      <p>
        Read-only project data loaded from PostgreSQL through Prisma, Elysia,
        and Eden Treaty.
      </p>

      <nav
        aria-label="Project filters"
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginTop: "1rem",
        }}
      >
        {projectFilterLinks.map((filter) => (
          <Link key={filter.href} href={filter.href}>
            {filter.label}
          </Link>
        ))}
      </nav>

      <p style={{ marginTop: "1rem" }}>
        Showing {projects.length} project{projects.length === 1 ? "" : "s"}
        {status ? ` with status "${status}"` : ""}
        {category ? ` in category "${category}"` : ""}.
      </p>

      <section style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
        {projects.map((project) => (
          <article
            key={project.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "1rem",
            }}
          >
            <h2>{project.title}</h2>
            <p>{project.summary}</p>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span>Status: {project.status}</span>
              <span>Category: {project.category}</span>
            </div>

            <p style={{ marginTop: "0.75rem" }}>
              <strong>Slug:</strong> {project.slug}
            </p>

            <Link href={`/projects/${project.slug}`}>View detail</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
