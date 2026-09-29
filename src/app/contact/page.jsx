import { ContactView } from "@/components/sections/ContactView";
import { site } from "@/data/site";

export const metadata = {
  title: "تماس",
  description: `راه‌های ارتباطی با ${site.name}، معمار و طراح فضا.`,
  openGraph: {
    title: `تماس — ${site.name}`,
    description: `راه‌های ارتباطی با ${site.name}.`,
  },
};

export default function ContactPage() {
  return <ContactView />;
}
