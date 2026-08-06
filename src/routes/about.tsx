import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, RevealText } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";
import founderImage from "../assets/founder.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AutoDigiX · AI Automation & Digital Marketing" },
      {
        name: "description",
        content:
          "Learn about AutoDigiX, founded by Praveen Gorla. We are a premier agency combining data-driven digital marketing with AI automation to scale your business.",
      },
      { property: "og:title", content: "About AutoDigiX · AI Automation & Digital Marketing" },
      {
        property: "og:description",
        content:
          "Learn about AutoDigiX, founded by Praveen Gorla. We are a premier agency combining data-driven digital marketing with AI automation to scale your business.",
      },
      { property: "og:url", content: "https://autodigix.in/about" },
      { tagName: "link", rel: "canonical", href: "https://autodigix.in/about" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About AutoDigiX",
          description: "Learn about AutoDigiX, founded by Praveen Gorla. We are a premier agency combining data-driven digital marketing with AI automation to scale your business.",
          url: "https://autodigix.in/about"
        }),
      }
    ],
  }),
  component: AboutPage,
});

const timeline = [
  {
    year: "1",
    title: "Data-Driven Marketing",
    text: "Targeted performance campaigns across Google, Meta, and organic search channels.",
  },
  {
    year: "2",
    title: "Analytics & ROI",
    text: "Continuous conversion tracking and optimization to maximize return on ad spend.",
  },
  {
    year: "3",
    title: "AI Workflows",
    text: "Streamlined operational systems automating lead capture and business processes.",
  },
];

const values = [
  {
    t: "Measurable Results",
    d: "Focusing strictly on conversion optimization and revenue-driven performance metrics.",
  },
  {
    t: "Strategic Creativity",
    d: "Blending analytical precision with clean, high-converting content and design.",
  },
  {
    t: "Global Footprint",
    d: "Active campaign execution across 7 countries including the UAE, USA, UK, and Europe.",
  },
  {
    t: "Predictable Growth",
    d: "Empowering brands with modern digital marketing and robust automation frameworks.",
  },
];

function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  return (
    <section ref={ref} className="relative pt-40 pb-32 px-6">
      <motion.div
        style={{ y: y2 }}
        aria-hidden
        className="absolute top-10 right-10 font-display  text-[18vw] md:text-[16vw] text-ink opacity-5 leading-[1.1] select-none pointer-events-none"
      >
        about
      </motion.div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-6">
          ◆ About AutoDigiX
        </div>
        <h1 className="font-display text-[clamp(2rem,9vw,9rem)] leading-[1.1] text-[var(--ink)] font-light">
          <RevealText text="AI Automation &" />
          <br />
          <span className="">
            <RevealText text="Performance Marketing" />
          </span>
        </h1>
        <motion.div style={{ y: y1 }} className="mt-12 grid md:grid-cols-12 gap-12">
          <Reveal delay={0.4} className="md:col-span-8 md:col-start-5">
            <p className="text-lg text-[var(--ink-soft)] leading-relaxed">
              AutoDigiX is a performance-focused AI Automation and Digital Marketing agency
              dedicated to helping businesses scale intelligently in today’s competitive digital
              landscape. We combine strategic marketing frameworks with automation systems that
              eliminate inefficiencies and maximize revenue potential.
            </p>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}

function ParallaxQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  return (
    <section
      ref={ref}
      className="py-16 md:py-32 px-6 overflow-hidden bg-[var(--ink)] text-[var(--beige-light)] relative"
    >
      <div className="absolute inset-0 noise-bg opacity-[0.05]" />
      <div className="relative max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-4 flex justify-center">
          <motion.div
            style={{ y }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border border-[var(--beige-light)]/10 shadow-soft"
          >
            <img
              src={founderImage}
              alt="Praveen Gorla - Founder"
              className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
        <div className="md:col-span-8 text-left">
          <div className="text-[10px] uppercase tracking-[0.35em] opacity-50 mb-6">
            ◆ Founder – Praveen Gorla
          </div>
          <p className="font-display text-2xl md:text-4xl leading-[1.2] font-light">
            Praveen Gorla is the founder of AutoDigiX, a performance marketing strategist with an
            international footprint spanning 7 countries — including the UAE, USA, UK, and Europe —
            driven by a clear mission to scale businesses through data and automation.
          </p>
        </div>
      </div>
    </section>
  );
}

function StickyNarrative() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative py-16 md:py-32 px-6 bg-[var(--beige)]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-4">
              ◆ Why AutoDigiX
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-[var(--ink)] leading-[1.1] font-light">
              Drive Real <br />
              <span className="">Business</span>
              <br /> Growth.
            </h2>
            <motion.div style={{ y }} className="mt-12 hidden md:block">
              <div className="w-32 h-32 rounded-full bg-[var(--ink)] opacity-20" />
            </motion.div>
          </div>
        </div>
        <div className="md:col-span-7 space-y-20">
          {values.map((v, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-l-2 border-[var(--ink)]/30 pl-8">
                <div className="font-display text-3xl md:text-5xl text-[var(--ink)] font-light">
                  {v.t}
                </div>
                <p className="mt-4 text-[var(--ink-soft)] text-lg leading-relaxed">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <AboutHero />

      <section className="py-16 md:py-32 px-6 bg-[var(--beige-light)]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-4">
              ◆ Our Mission
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-[var(--ink)] mb-10 md:mb-20 font-light">
              Stronger Brand Authority & <br />
              <span className="">Sustainability.</span>
            </h2>
          </Reveal>
          <div className="space-y-0 relative border-l-2 border-[var(--ink)]/10 ml-4 md:ml-12 pl-8 md:pl-16">
            {timeline.map((t, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <motion.div
                  whileHover={{ x: 12 }}
                  transition={{ duration: 0.4 }}
                  className="relative py-12 group"
                >
                  <div className="absolute -left-[39px] md:-left-[71px] top-14 w-4 h-4 rounded-full bg-[var(--beige-light)] border-2 border-[var(--ink)] group-hover:bg-[var(--ink)] transition-colors duration-300" />
                  <div className="grid md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-3">
                      <div className="font-display text-4xl md:text-5xl text-gold  font-light">
                        {t.year}
                      </div>
                    </div>
                    <div className="md:col-span-9 bg-[var(--beige)]/50 p-8 rounded-3xl border border-[var(--ink)]/5 shadow-soft">
                      <div className="font-display text-2xl md:text-3xl text-[var(--ink)] font-medium mb-3">
                        {t.title}
                      </div>
                      <div className="text-[var(--ink-soft)] text-lg leading-relaxed">{t.text}</div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ParallaxQuote />

      <StickyNarrative />

      <section className="py-16 md:py-32 px-6 bg-[var(--beige-light)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-4">
                ◆ How We Work
              </div>
              <h2 className="font-display text-5xl md:text-7xl text-[var(--ink)] leading-[1.1] font-light">
                Modern digital <br />
                <span className="">infrastructure.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.2}>
              <p className="text-xl text-[var(--ink)] leading-relaxed">
                We use analytics, conversion tracking, and performance metrics to continuously
                optimize campaigns for better ROI.
              </p>
              <p className="mt-8 text-[var(--ink-soft)] text-lg leading-relaxed">
                With hands-on experience in Google Ads, Meta Ads, SEO, and AI-powered workflows, we
                work closely with brands to build scalable marketing engines.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 px-6 bg-[var(--beige)] border-t border-[var(--ink)]/5 text-center">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-8">
              ◆ Trusted By
            </div>
            <p className="text-lg md:text-2xl text-[var(--ink-soft)] leading-relaxed">
              AutoDigiX supports businesses looking to scale using predictable and
              performance-driven digital marketing and automation strategies.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
