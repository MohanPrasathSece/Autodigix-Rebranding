import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/sections/Hero";
import { ExpandingCard } from "../components/sections/ExpandingCard";
import { Stats } from "../components/sections/Stats";
import { HorizontalServices } from "../components/sections/HorizontalServices";
import { StackedCards } from "../components/sections/StackedCards";
import { CoursesSection } from "../components/sections/CoursesSection";

import { Testimonials } from "../components/sections/Testimonials";
import { LogoMarquee } from "../components/sections/LogoMarquee";
import { FAQSection } from "../components/sections/FAQSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoDigiX · AI Automation & Digital Marketing Agency" },
      {
        name: "description",
        content:
          "AutoDigiX is a leading AI Automation & Digital Marketing Agency. We scale brands with data-driven SEO, Google Ads, Meta Ads, and AI systems.",
      },
      { property: "og:title", content: "AutoDigiX · AI Automation & Digital Marketing Agency" },
      {
        property: "og:description",
        content:
          "AutoDigiX is a leading AI Automation & Digital Marketing Agency. We scale brands with data-driven SEO, Google Ads, Meta Ads, and AI systems.",
      },
      { property: "og:url", content: "https://autodigix.in/" },
      { tagName: "link", rel: "canonical", href: "https://autodigix.in/" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ExpandingCard />
      <Stats />
      <HorizontalServices />
      <StackedCards />
      <CoursesSection />
      <FAQSection />
      <Testimonials />
    </>
  );
}
