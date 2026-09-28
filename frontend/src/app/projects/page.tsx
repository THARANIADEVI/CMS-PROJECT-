import Link from "next/link";
import { getProjects } from "@/lib/api";

export const metadata = { title: "Projects | Portfolio" };

export default async function ProjectsPage() {
  const projects = await getProjects().catch(() => []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition block"
          >
            {p.image && (
              <img src={p.image} alt={p.title} className="rounded-lg mb-3 aspect-video object-cover w-full" />
            )}
            <h2 className="font-semibold text-lg">{p.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{p.short_description}</p>
            {p.tech_stack && (
              <p className="text-xs text-indigo-600 mt-2">{p.tech_stack}</p>
            )}
          </Link>
        ))}
        {projects.length === 0 && <p className="text-slate-400">No projects published yet.</p>}
      </div>
    </div>
  );
}
