const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.json();
}

async function getList<T>(path: string): Promise<T[]> {
  const data = await getJSON<{ results?: T[] } | T[]>(path);
  return Array.isArray(data) ? data : data.results ?? [];
}

export interface About {
  name: string;
  title: string;
  bio: string;
  profile_image: string | null;
  resume: string | null;
  email: string;
  phone: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  image: string | null;
  tech_stack: string;
  github_url: string;
  live_url: string;
  featured: boolean;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string | null;
  company_logo: string | null;
}

export interface Testimonial {
  id: number;
  name: string;
  role_company: string;
  message: string;
  avatar: string | null;
  rating: number;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const getAbout = () => getJSON<About>("/about");
export const getSkills = () => getList<Skill>("/skills/");
export const getProjects = () => getList<Project>("/projects/");
export const getProject = (slug: string) => getJSON<Project>(`/projects/${slug}/`);
export const getBlogs = () => getList<Blog>("/blogs/");
export const getBlog = (slug: string) => getJSON<Blog>(`/blogs/${slug}/`);
export const getExperience = () => getList<Experience>("/experience/");
export const getTestimonials = () => getList<Testimonial>("/testimonials/");
export const getServices = () => getList<Service>("/services/");

export async function postContact(data: { name: string; email: string; subject?: string; message: string }) {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}
