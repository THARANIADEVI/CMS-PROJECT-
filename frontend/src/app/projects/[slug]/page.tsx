import { notFound } from "next/navigation";
import { getProject } from "@/lib/api";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug).catch(() => null);
  if (!project) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {project.image && (
        <img src={project.image} alt={project.title} className="rounded-xl mb-6 w-full aspect-video object-cover" />
      )}
      <h1 className="text-3xl font-bold">{project.title}</h1>
      {project.tech_stack && <p className="text-sm text-indigo-600 mt-2">{project.tech_stack}</p>}
      <p className="text-slate-700 mt-6 whitespace-pre-line leading-relaxed">{project.description}</p>
      <div className="flex gap-4 mt-8">
        {project.github_url && (
          <a href={project.github_url} target="_blank" className="text-indigo-600 hover:underline">
            GitHub →
          </a>
        )}
        {project.live_url && (
          <a href={project.live_url} target="_blank" className="text-indigo-600 hover:underline">
            Live Demo →
          </a>
        )}
      </div>
    </div>
  );
}
