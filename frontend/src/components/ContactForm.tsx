"use client";

import { useState, type FormEvent } from "react";
import { postContact } from "@/lib/api";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await postContact(form);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="text-green-600">Thanks — your message has been sent.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && <p className="text-red-600 text-sm">Something went wrong. Try again.</p>}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          required
          className="w-full border border-slate-300 rounded px-3 py-2"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full border border-slate-300 rounded px-3 py-2"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Subject</label>
        <input
          className="w-full border border-slate-300 rounded px-3 py-2"
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          required
          rows={5}
          className="w-full border border-slate-300 rounded px-3 py-2"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
