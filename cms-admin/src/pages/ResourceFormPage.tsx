import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { RESOURCES } from "../lib/resources";

export default function ResourceFormPage() {
  const { resource, id } = useParams();
  const config = resource ? RESOURCES[resource] : undefined;
  const isEdit = !!id;
  const navigate = useNavigate();

  const [values, setValues] = useState<Record<string, any>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!config || !isEdit) return;
    api.get(`/${config.endpoint}/${id}/`).then((res) => {
      setValues(res.data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, id]);

  if (!config) return <p>Unknown resource.</p>;

  function setField(name: string, value: any) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const hasFile = Object.values(files).some(Boolean);
      let payload: any;
      let headers = {};
      if (hasFile) {
        const fd = new FormData();
        config!.fields.forEach((f) => {
          if (f.type === "image") {
            if (files[f.name]) fd.append(f.name, files[f.name] as File);
          } else if (f.type === "boolean") {
            fd.append(f.name, values[f.name] ? "true" : "false");
          } else if (values[f.name] !== undefined && values[f.name] !== null && values[f.name] !== "") {
            fd.append(f.name, values[f.name]);
          }
        });
        payload = fd;
        headers = { "Content-Type": "multipart/form-data" };
      } else {
        payload = {};
        config!.fields.forEach((f) => {
          if (f.type === "image") return; // unchanged, skip
          payload[f.name] = values[f.name] ?? (f.type === "boolean" ? false : "");
        });
      }

      if (isEdit) {
        await api.patch(`/${config!.endpoint}/${id}/`, payload, { headers });
      } else {
        await api.post(`/${config!.endpoint}/`, payload, { headers });
      }
      navigate(`/${config!.key}`);
    } catch (err: any) {
      setError(JSON.stringify(err.response?.data ?? "Failed to save."));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-slate-500">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {isEdit ? `Edit ${config.label}` : `New ${config.label}`}
      </h2>
      {error && <p className="text-red-600 text-sm mb-4 break-all">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        {config.fields.map((f) => (
          <div key={f.name}>
            <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}</label>
            {f.type === "textarea" && (
              <textarea
                className="w-full border border-slate-300 rounded px-3 py-2"
                rows={4}
                value={values[f.name] ?? ""}
                onChange={(e) => setField(f.name, e.target.value)}
              />
            )}
            {f.type === "text" && (
              <input
                className="w-full border border-slate-300 rounded px-3 py-2"
                value={values[f.name] ?? ""}
                onChange={(e) => setField(f.name, e.target.value)}
              />
            )}
            {f.type === "number" && (
              <input
                type="number"
                className="w-full border border-slate-300 rounded px-3 py-2"
                value={values[f.name] ?? 0}
                onChange={(e) => setField(f.name, Number(e.target.value))}
              />
            )}
            {f.type === "date" && (
              <input
                type="date"
                className="w-full border border-slate-300 rounded px-3 py-2"
                value={values[f.name] ?? ""}
                onChange={(e) => setField(f.name, e.target.value)}
              />
            )}
            {f.type === "boolean" && (
              <input
                type="checkbox"
                checked={!!values[f.name]}
                onChange={(e) => setField(f.name, e.target.checked)}
                className="h-5 w-5"
              />
            )}
            {f.type === "status" && (
              <select
                className="w-full border border-slate-300 rounded px-3 py-2"
                value={values[f.name] ?? "draft"}
                onChange={(e) => setField(f.name, e.target.value)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            )}
            {f.type === "image" && (
              <div>
                {values[f.name] && typeof values[f.name] === "string" && (
                  <img src={values[f.name]} alt="" className="h-20 mb-2 rounded" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFiles((fl) => ({ ...fl, [f.name]: e.target.files?.[0] ?? null }))}
                />
              </div>
            )}
          </div>
        ))}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-indigo-600 text-white px-4 py-2 rounded font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/${config.key}`)}
            className="px-4 py-2 rounded border border-slate-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
