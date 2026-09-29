import { ProjectsView } from "@/components/projects/ProjectsView";
import { site } from "@/data/site";

export const metadata = {
  title: "پروژه‌ها",
  description: `آرشیو پروژه‌های معماری ${site.name}؛ مسکونی، تجاری، فرهنگی و بازسازی.`,
  openGraph: {
    title: `پروژه‌ها — ${site.name}`,
    description: `آرشیو پروژه‌های معماری ${site.name}.`,
  },
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
