import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function PageIntro() {
  const [done, setDone] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, [isMobile]);

  if (isMobile) return null;
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-[var(--ink)] flex items-center justify-center overflow-hidden will-change-transform"
        >
          <div className="absolute inset-0 noise-bg opacity-[0.06] pointer-events-none" />
          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[10px] uppercase tracking-[0.4em] text-[var(--beige-light)]/60 mb-6"
            >
              AutoDigiX
            </motion.div>
            <motion.div className="overflow-hidden py-[0.4em] -my-[0.4em]">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
                className="font-display text-5xl md:text-8xl text-[var(--beige-light)] "
              >
                AutoDigiX
              </motion.h1>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="mt-6 mx-auto h-px w-48 bg-[var(--beige-light)]/40 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
