import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  if (isMobile) return null;
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] bg-[var(--ink)]"
    />
  );
}
