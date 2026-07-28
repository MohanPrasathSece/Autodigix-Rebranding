import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  href?: string;
};

export function MagneticButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  href,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setPos({ x: x * 0.25, y: y * 0.4 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    "relative inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-shadow duration-300 cursor-pointer overflow-hidden group";
  const styles =
    variant === "primary"
      ? "bg-[var(--ink)] text-[var(--beige-light)] shadow-soft hover:shadow-gold"
      : "border border-[var(--ink)]/40 text-[var(--ink)] hover:bg-[var(--beige-light)]";

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.3 }}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--beige-light)]/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </motion.div>
  );

  if (href) {
    if (href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a href={href} className="inline-block">
          {content}
        </a>
      );
    }
    return (
      <Link to={href as any} className="inline-block">
        {content}
      </Link>
    );
  }
  return content;
}
