export type FieldType = "text" | "textarea" | "number" | "boolean" | "date" | "image" | "status";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
}

export interface ResourceConfig {
  key: string;
  label: string;
  endpoint: string;
  titleField: string;
  lookupField: "id" | "slug";
  fields: FieldConfig[];
}

export const RESOURCES: Record<string, ResourceConfig> = {
  skills: {
    key: "skills",
    label: "Skills",
    endpoint: "skills",
    lookupField: "id",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "category", label: "Category", type: "text" },
      { name: "proficiency", label: "Proficiency (0-100)", type: "number" },
      { name: "icon", label: "Icon (name/emoji)", type: "text" },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  projects: {
    key: "projects",
    label: "Projects",
    endpoint: "projects",
    lookupField: "slug",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "slug", label: "Slug", type: "text" },
      { name: "short_description", label: "Short description", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Image", type: "image" },
      { name: "tech_stack", label: "Tech stack (comma-separated)", type: "text" },
      { name: "github_url", label: "GitHub URL", type: "text" },
      { name: "live_url", label: "Live URL", type: "text" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  blogs: {
    key: "blogs",
    label: "Blogs",
    endpoint: "blogs",
    lookupField: "slug",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "text" },
      { name: "content", label: "Content", type: "textarea" },
      { name: "cover_image", label: "Cover image", type: "image" },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  experience: {
    key: "experience",
    label: "Experience",
    endpoint: "experience",
    lookupField: "id",
    titleField: "company",
    fields: [
      { name: "company", label: "Company", type: "text" },
      { name: "position", label: "Position", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "location", label: "Location", type: "text" },
      { name: "start_date", label: "Start date", type: "date" },
      { name: "end_date", label: "End date (blank = current)", type: "date" },
      { name: "company_logo", label: "Company logo", type: "image" },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  testimonials: {
    key: "testimonials",
    label: "Testimonials",
    endpoint: "testimonials",
    lookupField: "id",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "role_company", label: "Role / Company", type: "text" },
      { name: "message", label: "Message", type: "textarea" },
      { name: "avatar", label: "Avatar", type: "image" },
      { name: "rating", label: "Rating (1-5)", type: "number" },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  services: {
    key: "services",
    label: "Services",
    endpoint: "services",
    lookupField: "id",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon (name/emoji)", type: "text" },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "status", label: "Status", type: "status" },
    ],
  },
};
