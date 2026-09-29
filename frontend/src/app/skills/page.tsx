import { getSkills, type Skill } from "@/lib/api";
import Reveal from "@/components/motion/Reveal";
import SkillBar from "@/components/motion/SkillBar";

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
      <Reveal>
        <h1 className="text-3xl font-bold mb-8">Skills</h1>
      </Reveal>
      <div className="space-y-8">
        {Object.entries(byCategory).map(([category, items], i) => (
          <Reveal key={category} delay={i * 0.1}>
            <h2 className="font-semibold text-lg mb-3">{category}</h2>
            <div className="space-y-3">
              {items.map((s) => (
                <SkillBar key={s.id} name={s.name} proficiency={s.proficiency} />
              ))}
            </div>
          </Reveal>
        ))}
        {skills.length === 0 && <p className="text-slate-400">No skills published yet.</p>}
      </div>
    </div>
  );
}
