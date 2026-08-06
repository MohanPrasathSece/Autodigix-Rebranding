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
      { title: "AutoDigiX · AI Automation & Digital Marketing" },
      {
        name: "description",
        content:
          "AutoDigiX helps businesses scale with data-driven performance marketing, AI automation systems, and growth strategies.",
      },
      { name: "author", content: "AutoDigiX" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "AutoDigiX" },
      { property: "og:title", content: "AutoDigiX · AI Automation & Digital Marketing" },
      {
        property: "og:description",
        content: "Performance Marketing • Lead Generation • Automation Systems • Growth Strategy",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://autodigix.in" },
      { property: "og:image", content: "https://autodigix.in/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AutoDigiX · AI Automation & Digital Marketing" },
      {
        name: "twitter:description",
        content: "Performance Marketing • Lead Generation • Automation Systems • Growth Strategy",
      },
      { name: "twitter:image", content: "https://autodigix.in/logo.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "AutoDigiX",
          url: "https://autodigix.in",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://autodigix.in/?s={search_term_string}",
            "query-input": "required name=search_term_string"
          }
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

  return (
    <>
      <PageIntro />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main className="overflow-x-clip min-h-screen">
        <Outlet />
      </main>

      <CTA />
      <Footer />
      <ScrollToTop />
      <StickyCTA />
    </>
  );
}
