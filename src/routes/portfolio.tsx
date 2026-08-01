import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealText, CinematicTitle } from "../components/Reveal";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio & Crypto Case Studies · AutoDigiX" },
      {
        name: "description",
        content:
          "View our portfolio of successful Web3 and cryptocurrency projects showcasing ROI driven by our digital marketing and AI automation strategies.",
      },
      { property: "og:title", content: "Portfolio & Crypto Case Studies · AutoDigiX" },
      {
        property: "og:description",
        content:
          "View our portfolio of successful Web3 and cryptocurrency projects showcasing ROI driven by our digital marketing and AI automation strategies.",
      },
      { property: "og:url", content: "https://autodigix.in/portfolio" },
      { tagName: "link", rel: "canonical", href: "https://autodigix.in/portfolio" },
    ],
  }),
  component: PortfolioPage,
});

import img1 from "../components/brands/altum.png";
import img2 from "../components/brands/winsta.png";
import img3 from "../components/brands/nirvana.png";
import img4 from "../components/brands/solter - crypto.png";
import img5 from "../components/brands/murtik.png";
import img6 from "../components/brands/city pet mart.png";
import imgCrypto1 from "../components/brands/asset office crypto.png";
import imgCrypto2 from "../components/brands/vertex iq crypto.png";
import img7 from "../components/brands/bhumi.png";

const projects = [
  {
    client: "Altum Systems",
    sector: "Premium Windows & Doors",
    metric: "High Value Lead Gen",
    year: "2024",
    color: "oklch(0.60 0.16 240)",
    image: img1,
    desc: "Digital marketing strategies targeting premium customers for high-value architectural products.",
  },
  {
    client: "Winsta",
    sector: "Premium Windows & Doors",
    metric: "Targeted Reach",
    year: "2024",
    color: "oklch(0.60 0.16 240)",
    image: img2,
    desc: "Optimized digital campaigns driving qualified leads for luxury window and door installations.",
  },
  {
    client: "Nirvana Pain Clinic",
    sector: "Healthcare",
    metric: "Patient Acquisition",
    year: "2025",
    color: "oklch(0.60 0.16 240)",
    image: img3,
    desc: "Comprehensive digital marketing to increase local visibility and patient bookings.",
  },
  {
    client: "Solter",
    sector: "Web3 & Crypto",
    metric: "Brand Growth",
    year: "2024",
    color: "oklch(0.60 0.16 240)",
    image: img4,
    desc: "Showcasing design portfolios through targeted social media and search engine marketing.",
  },
  {
    client: "Murtik",
    sector: "E-Commerce",
    metric: "Online Sales",
    year: "2025",
    color: "oklch(0.60 0.16 240)",
    image: img5,
    desc: "E-commerce marketing campaigns to drive sales for divine murtis and spiritual products.",
  },
  {
    client: "City Pet Mart USA",
    sector: "Pet Retail",
    metric: "Market Expansion",
    year: "2024",
    color: "oklch(0.60 0.16 240)",
    image: img6,
    desc: "Cross-border digital marketing strategies to scale pet item retail operations in the US market.",
  },
  {
    client: "Bhumi Safety Nets",
    sector: "Home Safety Services",
    metric: "Local Dominance",
    year: "2023",
    color: "oklch(0.60 0.16 240)",
    image: img7,
    desc: "Localized search campaigns driving immediate inquiries for safety net installations.",
  },
  {
    client: "Asset Office",
    sector: "Web3 & Crypto",
    metric: "User Adoption",
    year: "2025",
    color: "oklch(0.60 0.16 240)",
    image: imgCrypto1,
    desc: "High-performance digital marketing campaigns tailored for cryptocurrency projects and user onboarding.",
  },
  {
    client: "Vertex IQ",
    sector: "Web3 & Crypto",
    metric: "Community Growth",
    year: "2024",
    color: "oklch(0.60 0.16 240)",
    image: imgCrypto2,
    desc: "Strategic community building and engagement strategies for decentralized ecosystems.",
  },
];

function ParallaxColumn({ children, offset }: { children: React.ReactNode; offset: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div ref={ref} style={{ y: isMobile ? 0 : y }} className="flex flex-col gap-8">
      {children}
    </motion.div>
  );
}

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Reveal delay={i * 0.05}>
      <div
        onMouseMove={handleMouseMove}
        className="glow-container relative group bg-[var(--beige-light)] rounded-[2rem] overflow-hidden border border-[var(--ink)]/5 shadow-soft h-[480px] flex flex-col cursor-pointer transition-all duration-300"
      >
        <div className="glow-card-border" />
        <div className="relative h-48 overflow-hidden z-10 flex items-center justify-center bg-white p-6">
          <img
            src={p.image}
            alt={p.client}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 text-xs font-medium bg-[var(--ink)] text-[var(--beige-light)] px-3 py-1 rounded-full uppercase tracking-wider">
            {p.year}
          </div>
        </div>

        <div className="p-8 flex-grow flex flex-col justify-between z-10">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)] mb-2">
              {p.sector}
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light leading-tight mb-3">
              {p.client}
            </h3>
            <p className="text-sm text-[var(--ink-soft)] leading-relaxed line-clamp-3">{p.desc}</p>
          </div>

          <div className="flex items-center justify-between border-t border-[var(--ink)]/10 pt-4 mt-4">
            <div>
              <div className="text-[10px] uppercase text-[var(--ink-soft)] tracking-wider">
                Metric achieved
              </div>
              <div className="font-display text-lg text-[var(--ink)] font-medium mt-0.5">
                {p.metric}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-[var(--ink)]/20 flex items-center justify-center text-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-[var(--beige-light)] group-hover:rotate-45 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function PortfolioPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  const col1 = projects.filter((_, idx) => idx % 3 === 0);
  const col2 = projects.filter((_, idx) => idx % 3 === 1);
  const col3 = projects.filter((_, idx) => idx % 3 === 2);

  return (
    <>
      <section ref={ref} className="relative pt-28 md:pt-44 pb-16 px-6 overflow-hidden">
        {/* Adjusted background text position and size to prevent overlap */}
        <motion.div
          style={{ y }}
          aria-hidden
          className="absolute -top-24 left-0 right-0 text-center font-display text-[18vw] text-[var(--ink)]/[0.02] leading-[0.85] select-none pointer-events-none"
        >
          portfolio
        </motion.div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-6">
            ◆ Selected work · Brands & Crypto
          </div>
          <h1 className="font-display text-[clamp(2rem,9vw,9rem)] leading-[1.1] text-[var(--ink)] font-light">
            <CinematicTitle text="Digital Systems" />
            <br />
            <span className="">
              <CinematicTitle text="we've engineered." delay={0.25} />
            </span>
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-10 max-w-xl text-lg text-[var(--ink-soft)] leading-relaxed">
              A selection of innovative digital projects and partnerships we've built
              high-performance marketing and infrastructure for.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--beige)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            <ParallaxColumn offset={0}>
              {col1.map((p, i) => (
                <ProjectCard key={i} p={p} i={i * 3} />
              ))}
            </ParallaxColumn>
            <ParallaxColumn offset={40}>
              {col2.map((p, i) => (
                <ProjectCard key={i} p={p} i={i * 3 + 1} />
              ))}
            </ParallaxColumn>
            <ParallaxColumn offset={-40}>
              {col3.map((p, i) => (
                <ProjectCard key={i} p={p} i={i * 3 + 2} />
              ))}
            </ParallaxColumn>
          </div>
        </div>
      </section>
    </>
  );
}
