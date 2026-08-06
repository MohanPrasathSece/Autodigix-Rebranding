import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, MapPin, Phone, Send, Check, Calendar, ArrowUpRight } from "lucide-react";
import { Reveal, RevealText } from "../components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us · AutoDigiX | Digital Marketing Agency" },
      {
        name: "description",
        content:
          "Get in touch with AutoDigiX to scale your business with performance marketing and AI automation. Book a free consultation with our experts today.",
      },
      { property: "og:title", content: "Contact Us · AutoDigiX | Digital Marketing Agency" },
      {
        property: "og:description",
        content:
          "Get in touch with AutoDigiX to scale your business with performance marketing and AI automation. Book a free consultation with our experts today.",
      },
      { property: "og:url", content: "https://autodigix.in/contact" },
      { tagName: "link", rel: "canonical", href: "https://autodigix.in/contact" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact AutoDigiX",
          description: "Get in touch with AutoDigiX to scale your business with performance marketing and AI automation. Book a free consultation with our experts today.",
          url: "https://autodigix.in/contact"
        }),
      }
    ],
  }),
  component: ContactPage,
});

function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  textarea,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  required?: boolean;
}) {
  const filled = value.length > 0;
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="peer w-full bg-transparent border-b border-[var(--ink)]/30 pt-7 pb-3 text-[var(--ink)] outline-none focus:border-[var(--ink)] transition-colors resize-none"
        />
      ) : (
        <input
          required={required}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="peer w-full bg-transparent border-b border-[var(--ink)]/30 pt-7 pb-3 text-[var(--ink)] outline-none focus:border-[var(--ink)] transition-colors"
        />
      )}
      <label
        className={`absolute left-0 transition-all pointer-events-none uppercase tracking-[0.25em] text-[10px] ${filled ? "top-0 text-[var(--ink-soft)]" : "top-7 text-[var(--ink-soft)]/60"} peer-focus:top-0 peer-focus:text-[var(--ink)]`}
      >
        {label}
      </label>
    </div>
  );
}

function ContactHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  return (
    <section ref={ref} className="relative pt-40 pb-16 px-6">
      <motion.div
        style={{ y }}
        aria-hidden
        className="absolute top-0 right-8 font-display  text-[16vw] md:text-[14vw] text-ink opacity-5 leading-[1.1] select-none pointer-events-none"
      >
        talk
      </motion.div>
      <div className="relative max-w-7xl mx-auto">
        <h1 className="font-display text-[clamp(2rem,9vw,9rem)] leading-[1.1] text-[var(--ink)] font-light">
          <RevealText text="Get In Touch" />
          <br />
          <span className="">
            <RevealText text="Send Us a Message" />
          </span>
        </h1>
      </div>
    </section>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);

        // Google Ads conversion tracking
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {'send_to': 'AW-18369902559/4hq9CO24jdwcEN_vubdE'});
        }

        setTimeout(() => {
          setSent(false);
          setForm({ name: "", email: "", company: "", budget: "", message: "" });
        }, 3000);
      } else {
        console.error("Failed to send message");
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ContactHero />

      <section className="pb-20 px-6 bg-[var(--beige)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          <Reveal className="lg:col-span-5">
            <div className="space-y-12 lg:sticky lg:top-32">
              <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-4">
                ◆ About AutoDigiX
              </div>
              <p className="text-[var(--ink-soft)] text-lg md:text-xl leading-relaxed max-w-md">
                We design structured marketing engines and AI automation workflows built to scale
                your business.
              </p>
              <div className="space-y-5">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "officialautodigix@gmail.com",
                    link: "mailto:officialautodigix@gmail.com",
                  },
                  {
                    icon: Mail,
                    label: "Support Email",
                    value: "info@autodigix.in",
                    link: "mailto:info@autodigix.in",
                  },
                  { icon: Phone, label: "Phone", value: "+91 8639191907", link: "tel:+918639191907" },
                ].map((c) => (
                  <motion.div
                    key={c.label}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-4 py-3 border-b border-[var(--ink)]/15"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--ink)] text-[var(--beige-light)] flex items-center justify-center shrink-0">
                      <c.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">
                        {c.label}
                      </div>
                      {c.link ? (
                        <a
                          href={c.link}
                          className="font-display text-xl text-[var(--ink)] mt-1 block hover:opacity-70 transition-opacity"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <div className="font-display text-xl text-[var(--ink)] mt-1">{c.value}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="bg-[var(--beige-light)] rounded-[2rem] p-8 md:p-12 shadow-soft border border-[var(--ink)]/10"
            >
              <div className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-10 font-light">
                {sent ? "Message Received." : "Send us a message"}
              </div>

              {!sent ? (
                <div className="space-y-8">
                  <FloatingInput
                    label="Your Name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    required
                  />
                  <div className="grid md:grid-cols-2 gap-8">
                    <FloatingInput
                      label="Your Email Address"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      required
                    />
                    <FloatingInput
                      label="Your Phone Number"
                      type="tel"
                      value={form.company}
                      onChange={(v) => setForm({ ...form, company: v })}
                    />
                  </div>
                  <FloatingInput
                    label="Message"
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                    textarea
                    required
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--ink)] text-[var(--beige-light)] font-medium hover:shadow-gold transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Submit"} <Send className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mb-6">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="font-display text-2xl text-[var(--ink)] mb-2">Thank You for Reaching Out</div>
                  <p className="text-[var(--ink-soft)] mt-2 max-w-xs text-center leading-relaxed">
                    Our team has received your message and will contact you shortly.
                  </p>
                </motion.div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-32 px-6 bg-[var(--beige)] border-t border-[var(--ink)]/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-16 text-center">
              ◆ Why AutoDigiX
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                t: "Measurable Results",
                d: "Data-driven marketing strategies designed to scale brands and businesses.",
              },
              {
                t: "Predictable Growth",
                d: "High-converting ad campaigns optimized for ROI and lead generation.",
              },
              {
                t: "Stronger Brand Authority",
                d: "Modern responsive websites built for performance and conversions.",
              },
              {
                t: "Long-Term Sustainability",
                d: "Automated systems that streamline operations and increase efficiency.",
              },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-[2rem] bg-[var(--beige-light)] border border-[var(--ink)]/5 h-full">
                  <div className="font-display text-2xl text-[var(--ink)] mb-4 leading-tight">
                    {p.t}
                  </div>
                  <p className="text-[var(--ink-soft)] text-sm leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
