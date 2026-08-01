import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealText } from "../components/Reveal";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal · AutoDigiX" },
      {
        name: "description",
        content: "Field notes on outbound, AI automation and the craft of revenue engineering.",
      },
      { property: "og:title", content: "Journal · AutoDigiX" },
      { property: "og:description", content: "Field notes from a boutique revenue studio." },
    ],
  }),
  component: JournalPage,
});

const posts = [
  {
    cat: "Outbound",
    title: "Why we deleted 80% of our cold email templates",
    date: "March 2025",
    read: "6 min",
  },
  {
    cat: "AI",
    title: "Building a CRM enrichment agent in a weekend",
    date: "February 2025",
    read: "9 min",
  },
  {
    cat: "Strategy",
    title: "The hidden cost of vanity meetings",
    date: "January 2025",
    read: "5 min",
  },
  {
    cat: "Craft",
    title: "Anatomy of a 14% reply-rate sequence",
    date: "December 2024",
    read: "12 min",
  },
  {
    cat: "Operations",
    title: "How we run a distributed SDR pod",
    date: "November 2024",
    read: "7 min",
  },
  {
    cat: "Outbound",
    title: "Inbox warm-up: a love letter to deliverability",
    date: "October 2024",
    read: "8 min",
  },
];

function PostCard({ p, i }: { p: (typeof posts)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  return (
    <motion.article
      ref={ref}
      style={{ y: i % 2 === 0 ? y : 0 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.05 }}
      className="group cursor-pointer"
    >
      <div className="aspect-[4/5] bg-[var(--beige-light)] rounded-2xl overflow-hidden mb-5 relative border border-[var(--ink)]/10">
        <div className="absolute inset-0 noise-bg opacity-[0.06]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display  text-9xl text-[var(--ink)]/15 group-hover:scale-110 transition-transform duration-700">
            {String(i + 1).padStart(2, "0")}
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)] bg-[var(--beige)] px-3 py-1.5 rounded-full">
            {p.cat}
          </span>
          <span className="text-[10px] text-[var(--ink-soft)]">{p.read}</span>
        </div>
      </div>
      <div className="font-display text-2xl md:text-3xl text-[var(--ink)] leading-tight font-light  transition-all">
        {p.title}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.25em] text-[var(--ink-soft)]">
        {p.date}
      </div>
    </motion.article>
  );
}

function JournalPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <>
      <section ref={ref} className="relative pt-40 pb-16 px-6 overflow-hidden">
        <motion.div
          style={{ y }}
          aria-hidden
          className="absolute -top-10 left-0 right-0 text-center font-display  text-[20vw] text-[var(--ink)]/[0.04] leading-[0.85] select-none pointer-events-none"
        >
          journal
        </motion.div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-6">
            ◆ Field notes · Est. 2022
          </div>
          <h1 className="font-display text-[clamp(2rem,9vw,9rem)] leading-[1.1] text-[var(--ink)] font-light">
            <RevealText text="Notes from" />
            <br />
            <span className="">
              <RevealText text="the studio." />
            </span>
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-10 max-w-xl text-lg text-[var(--ink-soft)] leading-relaxed">
              Tactical write-ups, frameworks and opinions from our team. No listicles. No hype. Just
              things we've learned the hard way.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--beige)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((p, i) => (
            <PostCard key={i} p={p} i={i} />
          ))}
        </div>
      </section>
    </>
  );
}
