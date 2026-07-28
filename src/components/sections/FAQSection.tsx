import { useState, useRef, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "../Reveal";

const faqs = [
  {
    q: "How fast can we see results from performance marketing?",
    a: "We launch initial campaigns within 10 to 14 business days after discovery. Because we focus on targeted search and database activation (Meta, Google, and email networks), you start capturing qualified leads within the first week of activation.",
  },
  {
    q: "What platforms and systems do you support for AI Automation?",
    a: "We construct custom automations using Make.com, Zapier, and custom scripts. We integrate popular tools like HubSpot, Slack, WhatsApp Business, Gmail, and AI model APIs (OpenAI, Anthropic Claude, and custom LLMs) to automate lead responses and administrative overhead.",
  },
  {
    q: "What is included in your courses, and are they certified?",
    a: "Our courses are intensive 30-day practical programs combining live mentor sessions, real client campaign budgets, and web projects. They include professional certification, joint portfolio listings, and internship support to ensure you are job-ready.",
  },
  {
    q: "Do you build custom web applications and landing pages?",
    a: "Yes, we engineer high-performance web applications and landing pages using modern frontend stacks (React, Vite, Next.js). Every layout is built from scratch, optimized for maximum speed, responsiveness, and conversion marketing.",
  },
  {
    q: "How is pricing structured for agency projects?",
    a: "We structure pricing on project-based milestones or transparent monthly retention models tailored to the scope of your lead generation and automation goals. Connect with us on WhatsApp to map out a custom blueprint.",
  },
];

function FAQCard({
  q,
  a,
  isOpen,
  onClick,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target, clientX, clientY } = e;
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`glow-container relative rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "bg-[var(--beige-light)] border-[var(--ink)]/20 shadow-soft"
          : "bg-[var(--beige-light)]/40 border-[var(--ink)]/5 hover:border-[var(--ink)]/15"
      }`}
    >
      <div className="glow-card-border" />
      <button
        onClick={onClick}
        className="w-full p-6 md:p-8 flex justify-between items-center text-left focus:outline-none relative z-10"
      >
        <span className="font-display text-lg md:text-xl text-[var(--ink)] font-normal pr-4">
          {q}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full border border-[var(--ink)]/10 flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-[var(--ink)] text-[var(--beige-light)]"
              : "bg-transparent text-[var(--ink)]"
          }`}
        >
          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden relative z-10"
          >
            <p className="px-6 pb-6 md:px-8 md:pb-8 text-[var(--ink-soft)] text-sm md:text-base leading-relaxed max-w-3xl border-t border-[var(--ink)]/5 pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 px-6 bg-[var(--beige)] bg-grid-pattern relative overflow-hidden">
      {/* Soft background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gold-accent-glow" />

      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-32 h-fit">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-4">
              ◆ Questions & Answers
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-[var(--ink)] leading-[0.95] font-light">
              Frequently Asked <br />
              <span>Questions.</span>
            </h2>
            <p className="mt-6 text-[var(--ink-soft)] text-base max-w-md leading-relaxed">
              Have questions about how we scale brands, automate workflows, or manage client
              placements? Explore answers here, or reach out to us on WhatsApp.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7 space-y-4">
          {faqs.map((faq, idx) => (
            <FAQCard
              key={idx}
              q={faq.q}
              a={faq.a}
              isOpen={openIdx === idx}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
