import { getAbout, getExperience, getTestimonials } from "@/lib/api";

export const metadata = { title: "About | Portfolio" };

export default async function AboutPage() {
  const [about, experience, testimonials] = await Promise.all([
    getAbout().catch(() => null),
    getExperience().catch(() => []),
    getTestimonials().catch(() => []),
  ]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      {about?.profile_image && (
        <img src={about.profile_image} alt={about.name} className="w-32 h-32 rounded-full object-cover mb-6" />
      )}
      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{about?.bio}</p>

      <div className="mt-6 space-y-1 text-sm text-slate-600 dark:text-slate-400">
        {about?.email && <p>Email: {about.email}</p>}
        {about?.location && <p>Location: {about.location}</p>}
        <div className="flex gap-4 mt-3">
          {about?.github_url && (
            <a href={about.github_url} className="text-indigo-600 dark:text-indigo-400 hover:underline" target="_blank">
              GitHub
            </a>
          )}
          {about?.linkedin_url && (
            <a href={about.linkedin_url} className="text-indigo-600 dark:text-indigo-400 hover:underline" target="_blank">
              LinkedIn
            </a>
          )}
          {about?.resume && (
            <a href={about.resume} className="text-indigo-600 dark:text-indigo-400 hover:underline" target="_blank">
              Resume
            </a>
          )}
        </div>
      </div>

      {experience.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <ul className="space-y-6 border-l border-slate-200 dark:border-slate-700 pl-6">
            {experience.map((e) => (
              <li key={e.id}>
                <p className="font-semibold">
                  {e.position} · {e.company}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {e.start_date} — {e.end_date || "Present"}
                </p>
                <p className="text-slate-700 dark:text-slate-300 mt-1">{e.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <blockquote key={t.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                <p className="text-slate-700 dark:text-slate-300 italic">&ldquo;{t.message}&rdquo;</p>
                <footer className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  {t.name}
                  {t.role_company && `, ${t.role_company}`}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
