import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { RESOURCES } from "../lib/resources";

export default function ResourceListPage() {
  const { resource } = useParams();
  const config = resource ? RESOURCES[resource] : undefined;
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    if (!config) return;
    setLoading(true);
    const res = await api.get(`/${config.endpoint}/`);
    setItems(res.data.results ?? res.data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  async function handleDelete(item: any) {
    if (!config) return;
    if (!confirm(`Delete "${item[config.titleField]}"?`)) return;
    const lookup = item[config.lookupField];
    await api.delete(`/${config.endpoint}/${lookup}/`);
    load();
  }

  if (!config) return <p>Unknown resource.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{config.label}</h2>
        <Link
          to={`/${config.key}/new`}
          className="bg-indigo-600 text-white px-4 py-2 rounded font-medium hover:bg-indigo-700"
        >
          + New
        </Link>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 text-sm">
              <tr>
                <th className="px-4 py-3">{config.fields[0].label}</th>
                {config.fields.some((f) => f.type === "status") && (
                  <th className="px-4 py-3">Status</th>
                )}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{item[config.titleField]}</td>
                  {config.fields.some((f) => f.type === "status") && (
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  )}
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link
                      to={`/${config.key}/${item[config.lookupField]}/edit`}
                      className="text-indigo-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-slate-400">
                    No items yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
