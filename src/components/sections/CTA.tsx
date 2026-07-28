import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../Reveal";
import { MagneticButton } from "../MagneticButton";
import { useLocation } from "@tanstack/react-router";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", isMobile ? "-20%" : "20%"]);

  let content = {
    top: "◆ Ready to Scale Your Business?",
    heading1: "Build a predictable",
    heading2: "growth system.",
    description:
      "Book a free strategy call to see how our performance marketing and automation systems can scale your business.",
    btn1: "Get Free Consultation",
    btn2: "Explore Services",
  };

  if (location.pathname === "/about") {
    content = {
      top: "◆ Scale Your Business",
      heading1: "Ready to Scale",
      heading2: "Your Business?",
      description:
        "AutoDigiX helps businesses scale with performance marketing and automation systems.",
      btn1: "Get Free Consultation",
      btn2: "Contact Us",
    };
  } else if (location.pathname === "/services") {
    content = {
      top: "◆ Predictable Growth",
      heading1: "Ready to Build a",
      heading2: "Predictable Growth System?",
      description:
        "We design structured revenue engines using data-driven campaigns and AI automation.",
      btn1: "Book Free Strategy Call",
      btn2: "Contact Us",
    };
  } else if (location.pathname === "/contact") {
    content = {
      top: "◆ Let’s Build Your System",
      heading1: "Transform Your",
      heading2: "Career Today.",
      description: "Join our industry-focused AI programs and learn by working on real projects.",
      btn1: "Talk to Advisor",
      btn2: "Explore Programs",
    };
  }

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 bg-[var(--beige-light)] border-t border-[var(--ink)]/5"
    >
      <motion.div
        style={{ y }}
        aria-hidden
        className="absolute top-16 md:top-0 left-8 font-display  text-[14vw] md:text-[12vw] text-ink opacity-5 leading-none select-none pointer-events-none"
      >
        scale
      </motion.div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-6">
            {content.top}
          </div>
          <h2 className="font-display text-5xl md:text-8xl leading-[0.95] text-[var(--ink)] font-light mb-8">
            {content.heading1} <br />
            <span className="">{content.heading2}</span>
          </h2>
          <p className="mt-6 text-[var(--ink-soft)] text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            {content.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton
              href="https://wa.me/918639191907?text=Hello%20AutoDigiX,%20I'd%20like%20to%20schedule%20a%20consultation!"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.btn1}
            </MagneticButton>
            <MagneticButton href="/contact" variant="ghost">
              {content.btn2}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
