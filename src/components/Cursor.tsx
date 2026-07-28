import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [hidden, setHidden] = useState(true);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "info">("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const sx = useSpring(x, { stiffness: 450, damping: 32, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 450, damping: 32, mass: 0.35 });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile || window.matchMedia("(pointer: coarse)").matches) return;

    setHidden(false);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [data-cursor]");

      if (!interactiveEl) {
        setCursorType("default");
        return;
      }

      const cursorAttr = interactiveEl.getAttribute("data-cursor");
      if (cursorAttr === "view") {
        setCursorType("view");
      } else if (cursorAttr === "info") {
        setCursorType("info");
      } else {
        setCursorType("hover");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [x, y]);

  if (hidden) return null;

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderColor: "oklch(0.2 0.08 220 / 0.25)",
      mixBlendMode: "multiply" as const,
    },
    hover: {
      width: 44,
      height: 44,
      backgroundColor: "oklch(0.2 0.08 220 / 0.05)",
      borderColor: "oklch(0.2 0.08 220 / 0.15)",
      mixBlendMode: "multiply" as const,
    },
    view: {
      width: 72,
      height: 72,
      backgroundColor: "var(--ink)",
      borderColor: "var(--ink)",
      mixBlendMode: "normal" as const,
    },
    info: {
      width: 72,
      height: 72,
      backgroundColor: "var(--ink)",
      borderColor: "var(--ink)",
      mixBlendMode: "normal" as const,
    },
  };

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      variants={variants}
      animate={cursorType}
      transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.5 }}
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none z-[150] flex items-center justify-center overflow-hidden"
    >
      {(cursorType === "view" || cursorType === "info") && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-[9px] text-[var(--beige-light)] font-medium tracking-[0.25em] uppercase font-sans"
        >
          {cursorType === "view" ? "View" : "Syllabus"}
        </motion.span>
      )}
    </motion.div>
  );
}
