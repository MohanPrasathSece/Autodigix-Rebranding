import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Target,
  Search,
  TrendingUp,
  Mail,
  Bot,
  Code2,
  Globe,
  Smartphone,
  Database,
  X,
  ArrowUpRight,
} from "lucide-react";
import { Reveal, CinematicTitle } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";
import { useIsMobile } from "../hooks/use-mobile";
import { StackedCards } from "../components/sections/StackedCards";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      {
        title: "Digital Marketing Services | SEO, Ads & More | AutoDigiX",
      },
      {
        name: "description",
        content:
          "AutoDigiX digital marketing services including SEO, Google Ads, Meta Ads, social media marketing, website development and AI automation.",
      },
      {
        name: "keywords",
        content:
          "digital marketing services, SEO services, SEO agency, SEO company, local SEO services, Google Ads agency, Google Ads services, Google Ads management, PPC agency, PPC management, Meta Ads agency, Facebook Ads agency, Facebook advertising agency, Instagram marketing agency, social media marketing, social media marketing services, social media management agency, website development company, website development services, website design company, website design services, digital marketing services for small business, marketing agency for small business",
      },
      {
        property: "og:title",
        content: "Digital Marketing Services | SEO, Ads & More | AutoDigiX",
      },
      {
        property: "og:description",
        content:
          "AutoDigiX digital marketing services including SEO, Google Ads, Meta Ads, social media marketing, website development and AI automation.",
      },
      { property: "og:url", content: "https://autodigix.in/services" },
    ],
    links: [{ rel: "canonical", href: "https://autodigix.in/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "AutoDigiX Digital Marketing Services",
          url: "https://autodigix.in/services",
          description: "Comprehensive digital marketing services including SEO, Google Ads, Meta Ads, social media marketing, and website development.",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Service",
                name: "Digital Marketing",
                serviceType: ["Digital Marketing Agency", "Performance Marketing"],
                description: "Full-funnel growth marketing and creative brand positioning.",
                provider: { "@type": "Organization", name: "AutoDigiX", url: "https://autodigix.in" },
                url: "https://autodigix.in/services?service=digital-marketing",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Service",
                name: "SEO Optimization",
                serviceType: ["SEO Agency", "Local SEO Services", "SEO Optimization"],
                description: "On-page, technical, and local SEO services to improve organic rankings.",
                provider: { "@type": "Organization", name: "AutoDigiX", url: "https://autodigix.in" },
                url: "https://autodigix.in/services?service=seo-optimization",
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "Service",
                name: "Google & Meta Ads",
                serviceType: ["Google Ads Agency", "Meta Ads Agency", "PPC Management"],
                description: "Paid traffic campaigns optimized for conversions and high ROAS.",
                provider: { "@type": "Organization", name: "AutoDigiX", url: "https://autodigix.in" },
                url: "https://autodigix.in/services?service=google-meta-ads",
              },
            },
            {
              "@type": "ListItem",
              position: 4,
              item: {
                "@type": "Service",
                name: "Lead Generation",
                serviceType: ["B2B Lead Generation", "Outbound Funnel Systems"],
                description: "Structured outbound pipelines to acquire high-value clients.",
                provider: { "@type": "Organization", name: "AutoDigiX", url: "https://autodigix.in" },
                url: "https://autodigix.in/services?service=lead-generation",
              },
            },
            {
              "@type": "ListItem",
              position: 5,
              item: {
                "@type": "Service",
                name: "AI Automations",
                serviceType: ["AI Automation", "Workflow Automation"],
                description: "Automated workflows using N8N, Zapier, and Make that eliminate operational overhead.",
                provider: { "@type": "Organization", name: "AutoDigiX", url: "https://autodigix.in" },
                url: "https://autodigix.in/services?service=ai-automations",
              },
            },
            {
              "@type": "ListItem",
              position: 6,
              item: {
                "@type": "Service",
                name: "Software Development",
                serviceType: ["Software Engineering", "Full-Stack Development"],
                description: "Scalable backend architectures and full-stack software solutions.",
                provider: { "@type": "Organization", name: "AutoDigiX", url: "https://autodigix.in" },
                url: "https://autodigix.in/services?service=software-development",
              },
            },
            {
              "@type": "ListItem",
              position: 7,
              item: {
                "@type": "Service",
                name: "Website Development",
                serviceType: ["Website Design", "Web App Development"],
                description: "High-performance, modern responsive websites built to convert.",
                provider: { "@type": "Organization", name: "AutoDigiX", url: "https://autodigix.in" },
                url: "https://autodigix.in/services?service=website-development",
              },
            },
            {
              "@type": "ListItem",
              position: 8,
              item: {
                "@type": "Service",
                name: "Mobile Apps",
                serviceType: ["Mobile App Development", "iOS & Android Apps"],
                description: "Cross-platform iOS and Android applications with native performance.",
                provider: { "@type": "Organization", name: "AutoDigiX", url: "https://autodigix.in" },
                url: "https://autodigix.in/services?service=mobile-apps",
              },
            },
            {
              "@type": "ListItem",
              position: 9,
              item: {
                "@type": "Service",
                name: "Custom CRMs",
                serviceType: ["Custom CRM", "Lead Management Database"],
                description: "Tailor-made CRM portals and lead management databases.",
                provider: { "@type": "Organization", name: "AutoDigiX", url: "https://autodigix.in" },
                url: "https://autodigix.in/services?service=custom-crms",
              },
            },
          ],
        }),
      },
    ],
  }),

  component: ServicesPage,
});

// =========================================================================
// ROW 1: DIGITAL MARKETING & LEAD GENERATION (4 Modals)
// Order: Digital Marketing (left) -> SEO Optimization -> Google & Meta Ads -> Lead Generation
// =========================================================================
export const marketingServices = [
  {
    id: "digital-marketing",
    icon: Target,
    title: "Digital Marketing",
    short: "Full-funnel growth marketing and creative brand positioning.",
    long: "Comprehensive growth marketing strategies and high-impact creative brand campaigns engineered to capture attention, build authority, and maximize customer acquisition.",
    bullets: [
      "Performance Marketing (Google & Meta)",
      "High-Retention Video Editing & Creative Ads",
      "Social Media & Brand Authority Building",
      "Content Marketing & Organic Acquisition",
    ],
  },
  {
    id: "seo-optimization",
    icon: Search,
    title: "SEO Optimization",
    short: "Improve organic rankings, search visibility, and inbound traffic.",
    long: "Dominating search engine results through technical SEO audits, keyword gap mapping, local business optimization, and authority-building backlink architecture.",
    bullets: [
      "On-Page & Technical SEO Audits",
      "Local Google My Business & Maps Setup",
      "Keyword Research & Strategic Content Mapping",
      "Search Authority & High-Tier Link Building",
    ],
  },
  {
    id: "google-meta-ads",
    icon: TrendingUp,
    title: "Google & Meta Ads",
    short: "High-ROAS paid traffic campaigns across search and social.",
    long: "Data-driven paid advertising campaigns spanning Meta (Facebook & Instagram) and Google (Search, Performance Max, Display, and YouTube) with advanced tracking setups.",
    bullets: [
      "Meta Ads Management (Facebook & Instagram)",
      "Google Search, Performance Max & YouTube Ads",
      "Meta Conversions API (CAPI) & GA4 Tracking",
      "Creative Split-Testing & Retargeting Funnels",
    ],
  },
  {
    id: "lead-generation",
    icon: Mail,
    title: "Lead Generation",
    short: "Structured outbound pipelines to acquire high-value clients.",
    long: "Predictable B2B client acquisition systems combining ideal customer profiling, high-converting landing pages, outbound email funnels, and automated lead routing.",
    bullets: [
      "Ideal Customer Profile (ICP) Prospecting",
      "High-Converting Landing Pages & Lead Magnets",
      "Outbound Cold Email & Outreach Pipelines",
      "Automated Lead Qualification & CRM Routing",
    ],
  },
];

// =========================================================================
// ROW 2: AI AUTOMATION & SOFTWARE DEVELOPMENT (5 Modals)
// Order: AI Automations (left) -> Software Dev -> Website Dev -> Mobile Apps -> Custom CRMs
// =========================================================================
export const techServices = [
  {
    id: "ai-automations",
    icon: Bot,
    title: "AI Automations",
    short: "Automated workflows eliminating manual operational overhead.",
    long: "Intelligent autonomous systems connecting your tools, databases, and communication channels using N8N, Zapier, Make.com, and custom LLM AI agents.",
    bullets: [
      "N8N & Make.com Workflow Pipelines",
      "Custom AI Chatbots & Voice Agents",
      "Automated Database Sync & Webhooks",
      "End-to-End Business Process Integration",
    ],
  },
  {
    id: "software-development",
    icon: Code2,
    title: "Software Development",
    short: "Scalable backend architectures and full-stack software solutions.",
    long: "Modern full-stack software engineering built for performance, rock-solid security, and seamless integration with existing enterprise tools and databases.",
    bullets: [
      "Full-Stack Web & Cloud Architecture",
      "Scalable REST & GraphQL APIs",
      "Database Modeling & Cloud Infrastructure",
      "Enterprise-Grade Security & Performance",
    ],
  },
  {
    id: "website-development",
    icon: Globe,
    title: "Website Development",
    short: "High-performance, modern responsive websites built to convert.",
    long: "Bespoke, lightning-fast responsive websites and web applications built with React, Next.js, and modern styling to deliver stunning aesthetics and high conversion rates.",
    bullets: [
      "Custom Responsive Web Design",
      "Lightning-Fast Page Speeds & Core Web Vitals",
      "Conversion-Optimized Landing Pages",
      "Modern CMS & Headless Integration",
    ],
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    title: "Mobile Apps",
    short: "Cross-platform iOS and Android apps with native performance.",
    long: "User-centric mobile app development utilizing modern cross-platform frameworks to deliver fluid, intuitive, and secure mobile experiences on both iOS and Android.",
    bullets: [
      "Cross-Platform iOS & Android Applications",
      "Intuitive UI/UX & Native Gesture Controls",
      "Real-Time Push Notifications & Offline Support",
      "App Store & Google Play Store Deployment",
    ],
  },
  {
    id: "custom-crms",
    icon: Database,
    title: "Custom CRMs",
    short: "Tailor-made CRM portals and lead management databases.",
    long: "Custom customer relationship management (CRM) platforms tailored specifically to your sales workflows, deal pipeline stages, client analytics, and team access roles.",
    bullets: [
      "Custom Sales Pipelines & Deal Tracking",
      "Client Portals & Role-Based Permissions",
      "Real-Time Activity Logs & Revenue Analytics",
      "Seamless Integration with WhatsApp, Email & SMS",
    ],
  },
];

export const allServices = [...marketingServices, ...techServices];

function ServiceCard({
  s,
  number,
  onOpen,
}: {
  s: (typeof allServices)[number];
  number: string;
  onOpen: () => void;
}) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      onClick={onOpen}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      transition={{ duration: 0.3 }}
      className="glow-container relative group bg-[var(--beige-light)] rounded-3xl p-6 md:p-7 cursor-pointer border border-[var(--ink)]/5 hover:border-[var(--ink)]/20 shadow-soft transition-all duration-500 min-h-[360px] flex flex-col justify-between overflow-hidden"
    >
      <div className="glow-card-border" />
      <div className="absolute inset-0 bg-[var(--ink)] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-0" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)] group-hover:text-[var(--beige-light)]/60 transition-colors duration-500 font-medium">
              {number}
            </div>
            <div className="w-9 h-9 rounded-full border border-[var(--ink)]/20 flex items-center justify-center text-[var(--ink)] group-hover:border-[var(--beige-light)]/20 group-hover:text-[var(--beige-light)] group-hover:rotate-45 transition-all duration-500">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[var(--ink)] group-hover:bg-[var(--beige-light)] flex items-center justify-center text-[var(--beige-light)] group-hover:text-[var(--ink)] mb-6 transition-colors duration-500">
            <s.icon className="w-5 h-5" />
          </div>

          <h3 className="font-display text-2xl text-[var(--ink)] group-hover:text-[var(--beige-light)] leading-[1.15] font-light transition-colors duration-500 mb-3">
            {s.title}
          </h3>

          <p className="text-[var(--ink-soft)] group-hover:text-[var(--beige-light)]/75 text-xs md:text-sm leading-relaxed transition-colors duration-500">
            {s.short}
          </p>
        </div>

        <div className="pt-6 border-t border-[var(--ink)]/5 group-hover:border-[var(--beige-light)]/15 transition-colors duration-500">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--gold)] group-hover:text-[var(--gold-soft)]">
            Explore details <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ServicesHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  return (
    <section ref={ref} className="relative pt-40 pb-16 px-6">
      <motion.div
        style={{ y }}
        aria-hidden
        className="absolute top-4 right-8 font-display text-[16vw] md:text-[14vw] text-ink opacity-5 leading-[0.85] select-none pointer-events-none"
      >
        services
      </motion.div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-6">
          ◆ Capabilities
        </div>
        <h1 className="font-display text-[clamp(2rem,9vw,9rem)] leading-[1.2] md:leading-[1.1] text-[var(--ink)] font-light">
          <CinematicTitle text="Performance Marketing" />
          <br />
          <span className="">
            <CinematicTitle text="& Automation Systems" delay={0.25} />
          </span>
        </h1>
        <Reveal delay={0.4}>
          <p className="mt-8 max-w-2xl text-lg text-[var(--ink-soft)] leading-relaxed font-light">
            We design structured revenue engines using data-driven campaigns, AI automation, and
            scalable digital infrastructure to create predictable business growth.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesPage() {
  const isMobile = useIsMobile();
  const [openItem, setOpenItem] = useState<(typeof allServices)[number] | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const service = searchParams.get("service");
      if (service) {
        const found = allServices.find(
          (s) => s.id === service || s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === service,
        );
        if (found) {
          setOpenItem(found);
        }
      }
    }
  }, []);

  return (
    <>
      <ServicesHero />

      <section className="py-20 px-6 bg-[var(--beige)]">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* ========================================================= */}
          {/* ROW 1: Digital Marketing, SEO, Google & Meta Ads, Lead Gen */}
          {/* ========================================================= */}
          <div>
            <div className="mb-10">
              <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)] font-medium mb-2">
                01 • Performance & Growth
              </div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--ink)] font-light">
                Digital Marketing & Acquisition
              </h2>
              <p className="mt-3 text-sm md:text-base text-[var(--ink-soft)] max-w-2xl leading-relaxed">
                Full-funnel marketing strategies, search authority, high-ROAS paid advertising, and structured client acquisition engines.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketingServices.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.08}>
                  <ServiceCard s={s} number={`0${i + 1}`} onOpen={() => setOpenItem(s)} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* ROW 2: AI Automation, Software Dev, Website Dev, Mobile Apps, Custom CRMs */}
          {/* ========================================================= */}
          <div>
            <div className="mb-10">
              <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)] font-medium mb-2">
                02 • Engineering & Intelligence
              </div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--ink)] font-light">
                AI Automations & Software Development
              </h2>
              <p className="mt-3 text-sm md:text-base text-[var(--ink-soft)] max-w-2xl leading-relaxed">
                Autonomous workflow systems, full-stack software, conversion-focused websites, mobile applications, and custom CRM platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {techServices.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.08}>
                  <ServiceCard s={s} number={`0${marketingServices.length + i + 1}`} onOpen={() => setOpenItem(s)} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StackedCards />

      {/* Detail Modal for each Service */}
      <AnimatePresence>
        {openItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenItem(null)}
              className="fixed inset-0 z-[60] bg-[var(--ink)]/60 backdrop-blur-md"
            />

            {/* Modal / Bottom Sheet */}
            <motion.div
              initial={isMobile ? { y: "100%" } : { scale: 0.9, opacity: 0, y: 30 }}
              animate={isMobile ? { y: "0%" } : { scale: 1, opacity: 1, y: 0 }}
              exit={isMobile ? { y: "100%" } : { scale: 0.95, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: isMobile ? 300 : 200,
                damping: isMobile ? 32 : 25,
              }}
              drag={isMobile ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) setOpenItem(null);
              }}
              onClick={(e) => e.stopPropagation()}
              className={`fixed z-[70] bg-[var(--beige-light)] shadow-gold border border-[var(--ink)]/15 overflow-hidden 
                ${isMobile
                  ? "inset-x-0 bottom-0 rounded-t-[2.5rem] p-8 pt-12 pb-16 h-[85vh] overflow-y-auto"
                  : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl rounded-[2rem] p-10 md:p-14 max-h-[90vh] overflow-y-auto"
                }`}
            >
              {isMobile && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[var(--ink)]/10 rounded-full" />
              )}

              <button
                onClick={() => setOpenItem(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[var(--ink)] text-[var(--beige-light)] flex items-center justify-center z-10 hover:opacity-80 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[var(--ink)] flex items-center justify-center text-[var(--beige-light)]">
                  <openItem.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-8 font-display text-3xl md:text-5xl text-[var(--ink)] leading-[1.1] font-light">
                  {openItem.title}
                </h3>
                <p className="mt-6 text-[var(--ink-soft)] text-base md:text-lg leading-relaxed">{openItem.long}</p>
                <ul className="mt-8 grid sm:grid-cols-2 gap-3.5">
                  {openItem.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm md:text-[15px] text-[var(--ink)]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <MagneticButton href="/contact">Discuss this service</MagneticButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
