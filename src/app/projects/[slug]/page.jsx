import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { getAllProjects, getProjectBySlug } from "@/data/projects";
import { site } from "@/data/site";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.shortDescription,
      images: [{ url: project.cover }],
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetail slug={slug} />;
}
