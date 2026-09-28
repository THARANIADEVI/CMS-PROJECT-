import Link from "next/link";
import { getAbout, getProjects, getSkills } from "@/lib/api";

export default async function Home() {
  const [about, projects, skills] = await Promise.all([
    getAbout().catch(() => null),
    getProjects().catch(() => []),
    getSkills().catch(() => []),
  ]);

  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="py-24 text-center">
        {about?.profile_image && (
          <img
            src={about.profile_image}
            alt={about.name}
            className="w-28 h-28 rounded-full mx-auto mb-6 object-cover"
          />
        )}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          {about?.name || "Your Name"}
        </h1>
        <p className="text-xl text-indigo-600 mt-2">{about?.title || "Full-Stack Developer"}</p>
        <p className="text-slate-600 max-w-xl mx-auto mt-4">{about?.bio}</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/projects"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="border border-slate-300 px-5 py-2.5 rounded-lg font-medium hover:bg-slate-50"
          >
            Contact Me
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {featured.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition block"
              >
                {p.image && (
                  <img src={p.image} alt={p.title} className="rounded-lg mb-3 aspect-video object-cover" />
                )}
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{p.short_description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s.id}
                className="px-3 py-1.5 rounded-full bg-slate-100 text-sm text-slate-700"
              >
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
