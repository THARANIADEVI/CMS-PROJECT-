import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function MessagesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/messages").then((res) => {
      setItems(res.data.results ?? res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Contact Messages</h2>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="space-y-3">
          {items.map((m) => (
            <div key={m.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between text-sm text-slate-500">
                <span>
                  {m.name} &lt;{m.email}&gt;
                </span>
                <span>{new Date(m.created_at).toLocaleString()}</span>
              </div>
              {m.subject && <p className="font-medium mt-1">{m.subject}</p>}
              <p className="text-slate-700 mt-1">{m.message}</p>
            </div>
          ))}
          {items.length === 0 && <p className="text-slate-400">No messages yet.</p>}
        </div>
      )}
    </div>
  );
}
