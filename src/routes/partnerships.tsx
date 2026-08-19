import { createFileRoute } from "@tanstack/react-router";
import { useRef, type MouseEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Globe, Layers } from "lucide-react";
import { Reveal, RevealText, CinematicTitle } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";

export const Route = createFileRoute("/partnerships")({
  head: () => ({
    meta: [
      { title: "Partnerships & Alliances · AutoDigiX" },
      {
        name: "description",
        content:
          "Collaborative growth ecosystems. Discover how AutoDigiX partners with Zyra Digitals and industry leaders to deliver growth and automation.",
      },
      { property: "og:title", content: "Partnerships & Alliances · AutoDigiX" },
      {
        property: "og:description",
        content:
          "Collaborative growth ecosystems. Discover how AutoDigiX partners with Zyra Digitals and industry leaders to deliver growth and automation.",
      },
      { property: "og:url", content: "https://autodigix.in/partnerships" },
    ],
    links: [{ rel: "canonical", href: "https://autodigix.in/partnerships" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Partnerships & Alliances",
          description: "Collaborative growth ecosystems. Discover how AutoDigiX partners with Zyra Digitals and industry leaders to deliver growth and automation.",
          url: "https://autodigix.in/partnerships"
        }),
      }
    ],
  }),
  component: PartnershipsPage,
});

const partners = [
  {
    name: "Zyra Digitals",
    role: "Core Software & Performance Partner",
    desc: "Zyra Digitals collaborates closely with AutoDigiX to engineer enterprise-grade web applications, dynamic database integrations, and high-performance lead acquisition tools.",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
    website: "https://zyradigitals.com",
    active: true,
  },

];

function PartnerCard({ partner, i }: { partner: (typeof partners)[number]; i: number }) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target, clientX, clientY } = e;
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Reveal delay={i * 0.1}>
      <div
        onMouseMove={handleMouseMove}
        data-cursor={partner.active ? "view" : undefined}
        className="glow-container group relative bg-[var(--beige-light)] rounded-[2rem] border border-[var(--ink)]/5 overflow-hidden shadow-soft flex flex-col h-full"
      >
        <div className="glow-card-border" />

        {/* Partner Card Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--beige)]">
          <img
            src={partner.img}
            alt={partner.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {!partner.active && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
              <span className="text-white text-xs uppercase tracking-[0.2em] font-medium px-4 py-2 border border-white/20 rounded-full bg-black/20">
                Coming Soon
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-8 flex flex-col flex-grow relative z-10">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)]/60 mb-2 font-medium">
            {partner.role}
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light mb-4">
            {partner.name}
          </h3>
          <p className="text-[var(--ink-soft)] text-sm leading-relaxed mb-8 flex-grow">
            {partner.desc}
          </p>

          {partner.active && partner.website && (
            <div className="mt-auto">
              <MagneticButton
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                className="w-fit text-sm"
              >
                Visit Partner <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </MagneticButton>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function PartnershipsPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <>
      <section
        ref={ref}
        className="relative pt-40 pb-20 px-6 overflow-hidden bg-[var(--beige)] bg-grid-pattern"
      >
        {/* Background parallax visual text */}
        <motion.div
          style={{ y }}
          aria-hidden
          className="absolute -top-10 left-0 right-0 text-center font-display text-[20vw] text-[var(--ink)]/[0.02] leading-[0.85] select-none pointer-events-none"
        >
          alliances
        </motion.div>

        {/* Ambient Gold glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 gold-accent-glow" />

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-6 font-medium">
            ◆ Strategic Ecosystem
          </div>
          <h1 className="font-display text-[clamp(2rem,8vw,8rem)] leading-[1.1] text-[var(--ink)] font-light mb-8">
            <CinematicTitle text="Partnerships" />
            <br />
            <span className="font-normal">
              <CinematicTitle text="& Alliances." delay={0.25} />
            </span>
          </h1>

          <Reveal delay={0.4}>
            <p className="max-w-2xl text-lg text-[var(--ink-soft)] leading-relaxed">
              We leverage collaborative networks to expand service capacity. Meet our integrated
              partnerships helping us deliver high-performance marketing and scalable technical
              infrastructure.
            </p>
          </Reveal>

          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-10 md:mt-20">
            {partners.map((partner, idx) => (
              <PartnerCard key={idx} partner={partner} i={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
