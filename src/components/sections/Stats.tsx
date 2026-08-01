import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../Reveal";
import { Counter } from "../Counter";
import { GlobeInteractive } from "../ui/cobe-globe-interactive";

const metrics = [
  {
    v: 5,
    s: "+",
    k: "Years Experience",
    note: "Years of professional experience in digital marketing and automation.",
  },
  { v: 50, s: "+", k: "Happy Clients", note: "Businesses we've helped scale globally." },
  {
    v: 7,
    s: "",
    k: "Countries Covered",
    note: "Active client footprints in UAE, USA, UK, Europe, and beyond.",
  },
  {
    v: 1000,
    s: "+",
    k: "Students Trained",
    note: "Professionals and developers trained in our courses.",
  },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "-30%"]);

  return (
    <section ref={ref} className="relative py-20 md:py-16 md:py-32 bg-[var(--beige-light)]">
      {/* huge parallax word - removed */}
      <motion.div
        style={{ display: "none" }}
        aria-hidden
        className="pointer-events-none absolute top-6 left-6 font-display  text-[12vw] md:text-[10vw] leading-[0.85] text-ink opacity-5 whitespace-nowrap select-none"
      >
        compounding
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-4">
                ◆ Track Record
              </div>
              <h2 className="font-display text-4xl md:text-7xl text-[var(--ink)] max-w-3xl leading-[1.1] font-light">
                Numbers we've earned <span className="">through execution.</span>
              </h2>
            </Reveal>

            <div className="mt-12 md:mt-24 grid grid-cols-2 gap-x-6 gap-y-12 md:gap-x-12 md:gap-y-20">
              {metrics.map((m, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="group">
                    <div className="flex items-baseline gap-2 md:gap-4 border-b border-[var(--ink)]/20 pb-4 md:pb-6">
                      <div className="font-display text-5xl md:text-8xl text-gold leading-[1.1] font-medium drop-shadow-sm">
                        <Counter to={m.v} suffix={m.s} />
                      </div>
                      <div className="ml-auto text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">
                        0{i + 1}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-6">
                      <div className="font-display text-base md:text-2xl text-[var(--ink)]">
                        {m.k}
                      </div>
                      <div className="text-xs md:text-sm text-[var(--ink-soft)] max-w-xs md:text-right">
                        {m.note}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative lg:translate-x-12 lg:translate-y-40 mt-16 lg:mt-0">
            <GlobeInteractive className="w-full max-w-[500px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
