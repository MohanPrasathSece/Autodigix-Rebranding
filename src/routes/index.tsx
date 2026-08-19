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
      { title: "AutoDigiX · AI Automation & Digital Marketing" },
      {
        name: "description",
        content:
          "AutoDigiX helps businesses scale with data-driven performance marketing, AI automation systems, and growth strategies in India and globally.",
      },
      {
        name: "keywords",
        content:
          "digital marketing agency, digital marketing near me, online marketing agency, digital marketing agency near me, social media marketing, SEO agency, Google Ads agency, AI automation",
      },
      { property: "og:title", content: "AutoDigiX · AI Automation & Digital Marketing" },
      {
        property: "og:description",
        content:
          "AutoDigiX helps businesses scale with data-driven performance marketing, AI automation systems, and growth strategies in India and globally.",
      },
      { property: "og:url", content: "https://autodigix.in/" },
    ],
    links: [{ rel: "canonical", href: "https://autodigix.in/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://autodigix.in/#webpage",
          url: "https://autodigix.in/",
          name: "AutoDigiX · AI Automation & Digital Marketing",
          description:
            "AutoDigiX helps businesses scale with data-driven performance marketing, AI automation systems, and growth strategies in India and globally.",
          headline: "Digital Marketing Agency for Business Growth",
          keywords: "digital marketing agency, digital marketing near me, online marketing agency",
          isPartOf: { "@id": "https://autodigix.in/#website" },
          about: { "@type": "Organization", name: "AutoDigiX" },
          hasPart: [
            {
              "@type": "WebPageElement",
              cssSelector: "h2",
              name: "Grow Your Business With Digital Marketing",
            },
            {
              "@type": "WebPageElement",
              cssSelector: "h3",
              name: "SEO Services",
            },
            {
              "@type": "WebPageElement",
              cssSelector: "h4",
              name: "Google Ads & PPC Management",
            },
            {
              "@type": "WebPageElement",
              cssSelector: "h5",
              name: "Meta Ads & Social Media Marketing",
            },
            {
              "@type": "WebPageElement",
              cssSelector: "h6",
              name: "AI Automation Solutions for Businesses",
            },
          ],
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://autodigix.in/",
              },
            ],
          },
          publisher: {
            "@type": "Organization",
            name: "AutoDigiX",
            url: "https://autodigix.in",
            logo: "https://autodigix.in/logo.png",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://autodigix.in/#organization",
          name: "AutoDigiX",
          image: "https://autodigix.in/logo.png",
          description:
            "AutoDigiX helps businesses scale with data-driven performance marketing, AI automation systems, and growth strategies in India and globally.",
          url: "https://autodigix.in",
          telephone: "+91-8639191907",
          priceRange: "₹₹",
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
          },
          areaServed: [
            { "@type": "Country", name: "India" },
            { "@type": "AdministrativeArea", name: "Global" },
          ],
          serviceType: [
            "Digital Marketing Agency",
            "Online Marketing Agency",
            "SEO Agency",
            "Google Ads Agency",
            "Meta Ads Agency",
            "Social Media Marketing",
            "AI Automation",
          ],
          sameAs: [
            "https://www.facebook.com/autodigix",
            "https://www.instagram.com/autodigix",
            "https://www.linkedin.com/company/autodigix",
            "https://twitter.com/autodigix",
          ],
        }),
      },
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
