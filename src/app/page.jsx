import { Hero } from "@/components/sections/Hero";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { Capabilities } from "@/components/sections/Capabilities";
import { ContactPreview } from "@/components/sections/ContactPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedProjects />
      <AboutPreview />
      <Capabilities />
      <ContactPreview />
    </>
  );
}
