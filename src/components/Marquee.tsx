import { motion } from "framer-motion";

const words = ["LEAD GEN", "OUTBOUND", "AI AUTOMATION", "WEB DESIGN", "REVOPS", "GROWTH", "SCALE"];
const list = [...words, ...words, ...words, ...words, ...words, ...words, ...words, ...words];

export function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-[var(--beige)] py-8 flex flex-nowrap whitespace-nowrap select-none">
      <motion.div
        className="flex gap-16 font-display text-4xl md:text-5xl text-[var(--ink)] tracking-[0.1em]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
      >
        {list.map((word, i) => (
          <div key={i} className="flex items-center gap-16">
            <span>{word}</span>
            <span className="text-[var(--ink)]/15">◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
