import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/src/client/treaty";
import {
  isApiNotFound,
  unwrapApiData,
} from "@/src/client/helpers/api-response";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;

  const projectResponse = await api
    .projects({
      slug,
    })
    .get();

  const project = unwrapApiData(projectResponse);

  if (isApiNotFound(projectResponse) || !project) {
    notFound();
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "760px", margin: "0 auto" }}>
      <Link href="/projects">← Back to projects</Link>

      <article style={{ marginTop: "1.5rem" }}>
        <h1>{project.title}</h1>

        <p>{project.summary}</p>

        {project.description ? <p>{project.description}</p> : null}

        <dl
          style={{
            display: "grid",
            gap: "0.75rem",
            marginTop: "1.5rem",
          }}
        >
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>

          <div>
            <dt>Category</dt>
            <dd>{project.category}</dd>
          </div>

          <div>
            <dt>Slug</dt>
            <dd>{project.slug}</dd>
          </div>

          <div>
            <dt>Created at</dt>
            <dd>{new Date(project.createdAt).toLocaleString()}</dd>
          </div>

          <div>
            <dt>Updated at</dt>
            <dd>{new Date(project.updatedAt).toLocaleString()}</dd>
          </div>
        </dl>
      </article>
    </main>
  );
}
