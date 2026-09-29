import { getAllProjects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap() {
  const base = "https://architect.example.com";
  const staticRoutes = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];
  const projectRoutes = getAllProjects().map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...staticRoutes, ...projectRoutes];
}
