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

const projects = [
  {
    client: "Nirvana Projects",
    sector: "Web3 Yield Optimizer",
    metric: "$12.4M TVL Secured",
    year: "2024",
    color: "oklch(0.60 0.16 240)",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop",
    desc: "Developed automated DeFi yield farming smart contracts and custom staking frontends.",
  },
  {
    client: "Zyra Digitals",
    sector: "Crypto Marketing Partner",
    metric: "120k+ Community Grew",
    year: "2024",
    color: "oklch(0.60 0.16 240)",
    image:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=600&auto=format&fit=crop",
    desc: "Managed token pre-launches, social outreach campaigns, and viral community growth funnels.",
  },
  {
    client: "Solana Nexus",
    sector: "L2 Analytics Dashboard",
    metric: "40k+ Active Addresses",
    year: "2025",
    color: "oklch(0.60 0.16 240)",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=600&auto=format&fit=crop",
    desc: "Built a low-latency web interface tracking network congestion and volume flows.",
  },
  {
    client: "Aether Finance",
    sector: "Decentralized Lending",
    metric: "$8.5M Borrowing Vol",
    year: "2024",
    color: "oklch(0.60 0.16 240)",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=600&auto=format&fit=crop",
    desc: "Designed collateralized peer-to-peer lending web apps with high responsiveness.",
  },
  {
    client: "Krypton Security",
    sector: "Account Abstraction Wallet",
    metric: "50k+ Installs Achieved",
    year: "2025",
    color: "oklch(0.60 0.16 240)",
    image:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop",
    desc: "Created frictionless web onboarding flows and gasless smart wallet contract layers.",
  },
  {
    client: "Apex Marketplace",
    sector: "Digital NFT Launchpad",
    metric: "$3.2M Trading Volume",
    year: "2023",
    color: "oklch(0.60 0.16 240)",
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop",
    desc: "Engineered high-performance token listing boards, NFT filters, and search indexing.",
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
        data-cursor="view"
        className="glow-container relative group bg-[var(--beige-light)] rounded-[2rem] overflow-hidden border border-[var(--ink)]/5 shadow-soft h-[480px] flex flex-col cursor-pointer transition-all duration-300"
      >
        <div className="glow-card-border" />
        <div className="relative h-48 overflow-hidden z-10">
          <img
            src={p.image}
            alt={p.client}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--beige-light)] to-transparent opacity-80" />
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
      <section ref={ref} className="relative pt-44 pb-16 px-6 overflow-hidden">
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
            ◆ Selected work · Web3 & Crypto
          </div>
          <h1 className="font-display text-[clamp(3rem,9vw,9rem)] leading-[0.9] text-[var(--ink)] font-light">
            <CinematicTitle text="Crypto Systems" />
            <br />
            <span className="">
              <CinematicTitle text="we've engineered." delay={0.25} />
            </span>
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-10 max-w-xl text-lg text-[var(--ink-soft)] leading-relaxed">
              A selection of decentralized protocols and web3 partnerships we've built
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

      <section className="py-32 px-6 bg-[var(--beige-light)] text-center">
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl text-[var(--ink)] font-light max-w-3xl mx-auto leading-[0.95]">
            Want to be the next <span className="">case study?</span>
          </h2>
        </Reveal>
      </section>
    </>
  );
}
