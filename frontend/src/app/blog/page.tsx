import Link from "next/link";
import { getBlogs } from "@/lib/api";

export const metadata = { title: "Blog | Portfolio" };

export default async function BlogPage() {
  const blogs = await getBlogs().catch(() => []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-6">
        {blogs.map((b) => (
          <Link key={b.id} href={`/blog/${b.slug}`} className="block border-b border-slate-100 dark:border-slate-800 pb-6">
            <h2 className="text-xl font-semibold hover:text-indigo-600 dark:hover:text-indigo-400">{b.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{b.excerpt}</p>
          </Link>
        ))}
        {blogs.length === 0 && <p className="text-slate-400 dark:text-slate-500">No posts published yet.</p>}
      </div>
    </div>
  );
}
