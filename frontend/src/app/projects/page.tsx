import { getProjects } from "@/lib/api";
import Reveal from "@/components/motion/Reveal";
import AnimatedCard from "@/components/motion/AnimatedCard";

export const metadata = { title: "Projects | Portfolio" };

export default async function ProjectsPage() {
  const projects = await getProjects().catch(() => []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Reveal>
        <h1 className="text-3xl font-bold mb-8">Projects</h1>
      </Reveal>
      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <AnimatedCard
              href={`/projects/${p.slug}`}
              className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow block h-full"
            >
              {p.image && (
                <img src={p.image} alt={p.title} className="rounded-lg mb-3 aspect-video object-cover w-full" />
              )}
              <h2 className="font-semibold text-lg">{p.title}</h2>
              <p className="text-sm text-slate-500 mt-1">{p.short_description}</p>
              {p.tech_stack && (
                <p className="text-xs text-indigo-600 mt-2">{p.tech_stack}</p>
              )}
            </AnimatedCard>
          </Reveal>
        ))}
        {projects.length === 0 && <p className="text-slate-400">No projects published yet.</p>}
      </div>
    </div>
  );
}
