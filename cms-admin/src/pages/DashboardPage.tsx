import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { RESOURCES } from "../lib/resources";

export default function DashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    Object.values(RESOURCES).forEach((r) => {
      api.get(`/${r.endpoint}/`).then((res) => {
        setCounts((c) => ({ ...c, [r.key]: res.data.count ?? res.data.length ?? 0 }));
      });
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.values(RESOURCES).map((r) => (
          <Link
            key={r.key}
            to={`/${r.key}`}
            className="bg-white rounded-lg shadow p-5 hover:shadow-md transition"
          >
            <p className="text-sm text-slate-500">{r.label}</p>
            <p className="text-3xl font-bold text-slate-800">{counts[r.key] ?? "-"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
