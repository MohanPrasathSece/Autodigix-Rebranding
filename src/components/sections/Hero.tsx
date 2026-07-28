import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { RevealText } from "../Reveal";
import { MagneticButton } from "../MagneticButton";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const targetY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 180]);
  const targetOpacity = useTransform(scrollYProgress, [0, 0.85], [1, isMobile ? 1 : 0]);
  const targetBgY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "30%"]);

  const y = useSpring(targetY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const opacity = useSpring(targetOpacity, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const bgY = targetBgY; // Background doesn't need spring as much, but can be added if needed

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center p-2 md:p-4 overflow-hidden bg-[var(--beige)]"
    >
      <motion.div
        initial={{
          width: "100vw",
          height: "100vh",
          borderRadius: "0rem",
        }}
        animate={{
          width: isMobile ? "100%" : "calc(100% - 1rem)",
          height: isMobile ? "100%" : "calc(100vh - 2rem)",
          borderRadius: isMobile ? "1.5rem" : "3rem",
        }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="relative w-full h-full min-h-[calc(100vh-2rem)] flex items-center overflow-hidden bg-[var(--beige-light)] border border-[var(--ink)]/5 shadow-soft bg-grid-pattern"
      >
        <motion.div
          style={{ y: bgY, willChange: "transform" }}
          className="pointer-events-none absolute inset-0"
        >
          <img
            src={`https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=${isMobile ? 800 : 1600}&auto=format&fit=crop`}
            alt=""
            className="w-full h-full object-cover opacity-30 md:opacity-40"
          />
          {/* Additional mobile white overlay for better readability */}
          <div className="absolute inset-0 bg-white/40 md:hidden pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/50 to-transparent md:hidden pointer-events-none" />
        </motion.div>

        <div className="absolute inset-0 grain pointer-events-none" />

        {/* horizon line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 1.6, ease: [0.76, 0, 0.24, 1] }}
          className="absolute left-6 right-6 top-32 h-px bg-[var(--ink)]/20 origin-left z-10 hidden md:block"
        />

        <motion.div
          style={{ y, opacity, willChange: "transform, opacity" }}
          className="relative max-w-7xl mx-auto px-6 md:px-16 w-full z-20"
        >
          <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-8">
            ◆ Performance Marketing • Lead Generation • Automation Systems • Growth Strategy
          </div>

          <h1 className="font-display text-[clamp(2.5rem,10vw,10rem)] leading-[0.9] text-[var(--ink)] font-light">
            <RevealText text="AI Automation &" />
            <br />
            <span className="font-normal">
              <RevealText text="Digital Marketing" />
            </span>
          </h1>

          <div className="mt-12 grid md:grid-cols-12 gap-10 items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="md:col-span-5 text-base md:text-lg text-[var(--ink-soft)] leading-relaxed max-w-md"
            >
              That Scales Your Business Professionally
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.9 }}
              className="md:col-span-7 flex flex-wrap items-center gap-4 md:justify-end"
            >
              <MagneticButton
                href="https://wa.me/918639191907?text=Hello%20AutoDigiX,%20I'd%20like%20to%20get%20a%20free%20consultation%20to%20scale%20our%20business!"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Free Consultation
              </MagneticButton>
              <MagneticButton href="/services" variant="ghost">
                Explore Services
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
