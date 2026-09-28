import { getSkills, type Skill } from "@/lib/api";

export const metadata = { title: "Skills | Portfolio" };

export default async function SkillsPage() {
  const skills = await getSkills().catch((): Skill[] => []);
  const byCategory = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const key = s.category || "Other";
    (acc[key] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Skills</h1>
      <div className="space-y-8">
        {Object.entries(byCategory).map(([category, items]) => (
          <div key={category}>
            <h2 className="font-semibold text-lg mb-3">{category}</h2>
            <div className="space-y-3">
              {items.map((s) => (
                <div key={s.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{s.name}</span>
                    <span className="text-slate-400">{s.proficiency}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${s.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {skills.length === 0 && <p className="text-slate-400">No skills published yet.</p>}
      </div>
    </div>
  );
}
