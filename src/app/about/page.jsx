import Image from "next/image";
import { architect } from "@/data/architect";
import { site } from "@/data/site";
import { AboutView } from "@/components/sections/AboutView";

export const metadata = {
  title: "درباره من",
  description: `${architect.intro}`,
  openGraph: {
    title: `درباره من — ${site.name}`,
    description: architect.intro,
  },
};

export default function AboutPage() {
  return <AboutView />;
}
