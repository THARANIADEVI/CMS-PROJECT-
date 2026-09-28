import { useEffect, useState, type FormEvent } from "react";
import { api } from "../lib/api";

const FIELDS: { name: string; label: string; type: "text" | "textarea" | "email" }[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "title", label: "Title", type: "text" },
  { name: "bio", label: "Bio", type: "textarea" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "location", label: "Location", type: "text" },
  { name: "github_url", label: "GitHub URL", type: "text" },
  { name: "linkedin_url", label: "LinkedIn URL", type: "text" },
  { name: "twitter_url", label: "Twitter URL", type: "text" },
];

export default function AboutPage() {
  const [values, setValues] = useState<Record<string, any>>({});
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/about").then((res) => {
      setValues(res.data);
      setLoading(false);
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const fd = new FormData();
    FIELDS.forEach((f) => fd.append(f.name, values[f.name] ?? ""));
    if (profileFile) fd.append("profile_image", profileFile);
    if (resumeFile) fd.append("resume", resumeFile);
    await api.put("/about", fd, { headers: { "Content-Type": "multipart/form-data" } });
    setSaving(false);
    setSaved(true);
  }

  if (loading) return <p className="text-slate-500">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">About</h2>
      {saved && <p className="text-green-600 text-sm mb-4">Saved.</p>}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        {FIELDS.map((f) => (
          <div key={f.name}>
            <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea
                className="w-full border border-slate-300 rounded px-3 py-2"
                rows={4}
                value={values[f.name] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              />
            ) : (
              <input
                className="w-full border border-slate-300 rounded px-3 py-2"
                value={values[f.name] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              />
            )}
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Profile image</label>
          {values.profile_image && (
            <img src={values.profile_image} alt="" className="h-20 mb-2 rounded-full" />
          )}
          <input type="file" accept="image/*" onChange={(e) => setProfileFile(e.target.files?.[0] ?? null)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Resume</label>
          {values.resume && (
            <a href={values.resume} target="_blank" rel="noreferrer" className="text-indigo-600 text-sm block mb-2">
              Current resume
            </a>
          )}
          <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)} />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-indigo-600 text-white px-4 py-2 rounded font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
