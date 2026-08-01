import { motion, type Variants } from "framer-motion";
import { type ReactNode, useEffect, useState, useRef } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 40, className }: Props) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
    },
  };
  return (
    <motion.div
      {...(!isMobile
        ? {
            initial: "hidden",
            whileInView: "show",
            viewport: { once: true, margin: "-80px" },
            variants: variants,
          }
        : {})}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block align-bottom mr-[0.25em]">
          <motion.span
            {...(!isMobile
              ? {
                  initial: { y: 20, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true, margin: "-50px" },
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.04,
                  },
                }
              : {})}
            style={{ willChange: "transform, opacity" }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function ScrambleText({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const [triggered, setTriggered] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|;:,.<>?";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-50px" },
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;

    let timer: NodeJS.Timeout;
    const startScramble = () => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join(""),
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 25);

      return () => clearInterval(interval);
    };

    timer = setTimeout(startScramble, delay * 1000);
    return () => clearTimeout(timer);
  }, [triggered, text, delay]);

  return (
    <span ref={containerRef} className={className}>
      {displayText || text}
    </span>
  );
}

export function CinematicTitle({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  if (isMobile) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`} style={{ perspective: "1000px" }}>
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-block mr-[0.25em] whitespace-nowrap overflow-hidden py-[0.2em] -my-[0.2em] align-bottom"
        >
          {word.split("").map((letter, letterIdx) => (
            <motion.span
              key={letterIdx}
              initial={{ y: "120%", rotateX: 85, opacity: 0 }}
              animate={{ y: "0%", rotateX: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + wordIdx * 0.08 + letterIdx * 0.02,
              }}
              style={{ originY: 1, willChange: "transform, opacity" }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
