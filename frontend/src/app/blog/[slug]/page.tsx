import { notFound } from "next/navigation";
import { getBlog } from "@/lib/api";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug).catch(() => null);
  if (!blog) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {blog.cover_image && (
        <img src={blog.cover_image} alt={blog.title} className="rounded-xl mb-6 w-full aspect-video object-cover" />
      )}
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
        {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
      </p>
      <div className="text-slate-700 dark:text-slate-300 mt-6 whitespace-pre-line leading-relaxed">{blog.content}</div>
    </div>
  );
}
