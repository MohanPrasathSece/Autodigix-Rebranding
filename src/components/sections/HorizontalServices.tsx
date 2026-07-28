import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { Target, Mail, Linkedin, Calendar, Globe, Bot, ArrowUpRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { Link } from "@tanstack/react-router";

const services = [
  {
    icon: Target,
    title: "All Digital Marketing",
    desc: "Data-driven marketing and professional video editing.",
  },
  {
    icon: Bot,
    title: "AI Automations",
    desc: "Automated workflows using N8N and Make that eliminate operational overhead.",
  },
  {
    icon: Globe,
    title: "Software Development",
    desc: "High-performance websites and digital applications.",
  },
  {
    icon: Calendar,
    title: "SEO Optimization",
    desc: "Improve organic rankings, traffic, and inbound searches.",
  },
  {
    icon: Linkedin,
    title: "Google & Meta Ads",
    desc: "Paid traffic campaigns optimized for conversions and ROI.",
  },
  {
    icon: Mail,
    title: "Lead Generation",
    desc: "Structured outbound pipelines to acquire high-value clients.",
  },
];

function MobileCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  return (
    <div className="relative mb-6 w-full md:hidden">
      <Link
        to="/services"
        search={{ service: s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") } as any}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--beige-light)] rounded-2xl p-6 shadow-soft border border-[var(--ink)]/10 flex items-center justify-between gap-4"
        >
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]/60 mb-1">
              0{i + 1}
            </div>
            <h3 className="font-display text-xl text-[var(--ink)] mb-1">{s.title}</h3>
            <p className="text-[var(--ink-soft)] text-xs line-clamp-1">{s.desc}</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-[var(--ink)]/20 flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-4 h-4 text-[var(--ink)]" />
          </div>
        </motion.div>
      </Link>
    </div>
  );
}

function Row({ s, i }: { s: (typeof services)[number]; i: number }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  if (isMobile) return null;

  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [arrowHover, setArrowHover] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 30 });
  const y = useSpring(my, { stiffness: 250, damping: 30 });

  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
      className="hidden md:block relative group border-t border-[var(--ink)]/15 last:border-b py-10 md:py-12 overflow-hidden"
    >
      {/* sliding hover wash */}
      <motion.div
        initial={false}
        animate={{ scaleY: hover ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 bg-[var(--beige-light)] origin-bottom -z-10"
      />
      {/* magnetic floating icon - disabled on mobile */}
      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hover && !arrowHover ? 1 : 0, scale: hover && !arrowHover ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex pointer-events-none absolute top-0 left-0 w-24 h-24 rounded-full bg-[var(--ink)] text-[var(--beige-light)] items-center justify-center z-20"
      >
        <s.icon className="w-8 h-8" />
      </motion.div>

      <div className="relative grid grid-cols-12 gap-4 md:gap-6 items-center px-6 md:px-12 pointer-events-none">
        <div className="col-span-2 md:col-span-1 font-display text-lg md:text-2xl text-[var(--ink-soft)] ">
          {String(i + 1).padStart(2, "0")}
        </div>
        <div className="col-span-10 md:col-span-5">
          <h3 className="font-display text-2xl md:text-6xl text-[var(--ink)] leading-[1.1] md:leading-[1] tracking-tight group-hover:-translate-y-1 transition-transform duration-500">
            {s.title}
          </h3>
        </div>
        <div className="col-span-12 md:col-span-5 text-[var(--ink-soft)] text-sm md:text-lg leading-relaxed mt-2 md:mt-0">
          {s.desc}
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 md:relative md:right-0 md:top-0 md:translate-y-0 md:col-span-1 flex justify-end pointer-events-auto">
          <Link
            to="/services"
            search={{ service: s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") } as any}
            onMouseEnter={() => setArrowHover(true)}
            onMouseLeave={() => setArrowHover(false)}
          >
            <motion.div
              animate={{ rotate: hover ? 45 : 0 }}
              transition={{ duration: 0.4 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--ink)]/40 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--beige-light)] transition-colors duration-300"
            >
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function HorizontalServices() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const labelY = useTransform(scrollYProgress, [0, 1], [isMobile ? 0 : 60, isMobile ? 0 : -60]);

  return (
    <section ref={ref} className="relative pt-32 pb-20 md:py-32 px-6 bg-[var(--beige)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 md:mb-24">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-4">
              ◆ Capabilities
            </div>
            <h2 className="font-display text-4xl md:text-8xl text-[var(--ink)] leading-[0.95] font-light mt-12 md:mt-0">
              Our Core <br />
              <span className="">Services.</span>
            </h2>
            <p className="mt-8 text-[var(--ink-soft)] max-w-2xl text-lg leading-relaxed">
              Data-driven marketing strategies designed to scale brands and businesses.
            </p>
          </Reveal>
          <motion.div
            style={{ y: labelY, willChange: "transform" }}
            className="hidden md:block text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] writing-vertical"
          >
            06 core services
          </motion.div>
        </div>

        <div className="relative">
          {services.map((s, i) => (
            <div key={i}>
              <Row s={s} i={i} />
              <MobileCard s={s} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
