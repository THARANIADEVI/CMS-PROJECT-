import { getExperience } from "@/lib/api";

export const metadata = { title: "Experience | Portfolio" };

export default async function ExperiencePage() {
  const experience = await getExperience().catch(() => []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Experience</h1>
      <ul className="space-y-8 border-l border-slate-200 pl-6">
        {experience.map((e) => (
          <li key={e.id}>
            <div className="flex items-center gap-3">
              {e.company_logo && <img src={e.company_logo} alt={e.company} className="w-8 h-8 rounded" />}
              <p className="font-semibold">
                {e.position} · {e.company}
              </p>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {e.location} · {e.start_date} — {e.end_date || "Present"}
            </p>
            <p className="text-slate-700 mt-2 whitespace-pre-line">{e.description}</p>
          </li>
        ))}
        {experience.length === 0 && <p className="text-slate-400">No experience published yet.</p>}
      </ul>
    </div>
  );
}
