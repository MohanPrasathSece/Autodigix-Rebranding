import { useEffect } from "react";
import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

import appCss from "../styles.css?url";
import logo from "../assets/logo.png";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ScrollProgress";
import { ScrollToTop } from "../components/ScrollToTop";
import { SmoothScroll } from "../components/SmoothScroll";
import { PageIntro } from "../components/PageIntro";
import { Cursor } from "../components/Cursor";
import { CTA } from "../components/sections/CTA";
import { StickyCTA } from "../components/StickyCTA";

function NotFoundComponent() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-[var(--beige)] px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-9xl text-[var(--ink)] font-light ">404</h1>
          <h2 className="mt-4 text-xl font-display text-[var(--ink)]">Page not found</h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            The page you're looking for has wandered off.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--beige-light)] hover:shadow-gold transition-shadow"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AutoDigiX · AI Automation & Digital Marketing Agency" },
      {
        name: "description",
        content:
          "AutoDigiX is a leading digital marketing agency helping businesses scale with data-driven SEO, Google Ads, Meta Ads, AI automation, and growth strategies in India and globally.",
      },
      { name: "author", content: "AutoDigiX" },
      { name: "robots", content: "index, follow" },
      {
        name: "keywords",
        content:
          "digital marketing agency, digital marketing near me, online marketing agency, SEO agency, SEO services, SEO company, local SEO services, Google Ads agency, Google Ads management, PPC agency, PPC management, Meta Ads agency, Facebook Ads agency, Instagram marketing agency, social media marketing, website development company, website design company, digital marketing company, marketing agency near me, SEO agency near me",
      },
      { name: "geo.region", content: "IN" },
      { name: "geo.placename", content: "India" },
      { name: "language", content: "English" },
      { property: "og:site_name", content: "AutoDigiX" },
      { property: "og:title", content: "AutoDigiX · AI Automation & Digital Marketing Agency" },
      {
        property: "og:description",
        content: "Performance Marketing • SEO Agency • Google & Meta Ads • AI Automation • Social Media Marketing",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://autodigix.in" },
      { property: "og:image", content: "https://autodigix.in/logo.png" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@autodigix" },
      { name: "twitter:title", content: "AutoDigiX · AI Automation & Digital Marketing Agency" },
      {
        name: "twitter:description",
        content: "Performance Marketing • SEO Agency • Google & Meta Ads • AI Automation • Social Media Marketing",
      },
      { name: "twitter:image", content: "https://autodigix.in/logo.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AutoDigiX",
          url: "https://autodigix.in",
          logo: "https://autodigix.in/logo.png",
          description:
            "AutoDigiX is a leading digital marketing agency offering SEO, Google Ads, Meta Ads, social media marketing, AI automation, and web development services.",
          foundingDate: "2022",
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
            addressRegion: "India",
          },
          areaServed: [
            { "@type": "Country", name: "India" },
            { "@type": "AdministrativeArea", name: "Global" },
          ],
          serviceType: [
            "Digital Marketing Agency",
            "SEO Agency",
            "Google Ads Agency",
            "Meta Ads Agency",
            "Social Media Marketing",
            "PPC Agency",
            "Website Design Company",
            "AI Automation",
          ],
          sameAs: [
            "https://www.facebook.com/autodigix",
            "https://www.instagram.com/autodigix",
            "https://www.linkedin.com/company/autodigix",
            "https://twitter.com/autodigix",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-8639191907",
            contactType: "customer service",
            availableLanguage: ["English", "Hindi"],
          },
          potentialAction: {
            "@type": "SearchAction",
            target: "https://autodigix.in/?s={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  const location = useLocation();
  const isContact = location.pathname === "/contact";
  const isWebinar = location.pathname === "/webinar";

  // GA4: fire page_view on every SPA navigation
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "page_view", {
          page_path: window.location.pathname + window.location.search,
          page_title: document.title,
        });
      }
    } catch (_) {
      // silently ignore GA4 errors — never crash the app
    }
  }, [location.pathname]);

  return (
    <>
      <PageIntro />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      {!isWebinar && <Navbar />}
      <main className="overflow-x-clip min-h-screen">
        <Outlet />
      </main>

      {!isWebinar && <CTA />}
      {!isWebinar && <Footer />}
      <ScrollToTop />
      {!isWebinar && <StickyCTA />}
    </>
  );
}
