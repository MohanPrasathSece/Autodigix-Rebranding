import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealText, CinematicTitle } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Digital Marketing & Web Development Courses · AutoDigiX" },
      {
        name: "description",
        content:
          "Master Digital Marketing, Performance Marketing, and AI-Assisted Web Development with our 30-day intensive practical courses. Get certified.",
      },
      { property: "og:title", content: "Digital Marketing & Web Development Courses · AutoDigiX" },
      {
        property: "og:description",
        content:
          "Master Digital Marketing, Performance Marketing, and AI-Assisted Web Development with our 30-day intensive practical courses. Get certified.",
      },
      { property: "og:url", content: "https://autodigix.in/courses" },
      { tagName: "link", rel: "canonical", href: "https://autodigix.in/courses" },
    ],
  }),
  component: CoursesPage,
});

const courses = [
  {
    title: "AI Automation",
    price: "₹5,999",
    subtitle: "No-Code & Low-Code Workflow Automation",
    duration: "30 Days",
    bullets: [
      "Make.com (Integromat) & Zapier Pipelines",
      "AI Chatbots & Voice Agent Integration",
      "OpenAI, Anthropic & Claude API Tools",
      "Database Integration (Airtable, Notion, Sheets)",
      "CRM & Lead Response Automation",
      "Real-World Business Project Scenarios",
      "Professional Certificate & Placement Support",
    ],
  },
  {
    title: "Web Development",
    price: "₹4,999",
    subtitle: "Frontend Development & AI Assisted Coding",
    duration: "30 Days",
    bullets: [
      "HTML5, CSS3, Flexbox & CSS Grid",
      "JavaScript Core & Dynamic DOM Logic",
      "React & Modern Responsive Web Layouts",
      "AI Development & Copilot Tools",
      "Deployment, Git, Vercel & Web Hosting",
      "Building Production-Ready Portfolio Sites",
      "Internship Support & Certification",
    ],
  },
  {
    title: "Digital Marketing",
    price: "₹3,499",
    subtitle: "Performance Marketing & Growth Hacking",
    duration: "30 Days",
    bullets: [
      "Meta Ads (Facebook & Instagram Campaigns)",
      "Google Search, Display & YouTube Ads",
      "SEO Optimizations & Organic Search Traffic",
      "High-Converting Funnel & Copywriting Design",
      "Analytics, Pixel Tracking & Reporting",
      "Live Client Campaign Budgets",
      "Placement Support & Certification",
    ],
  },
];

function CoursesPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <>
      <section ref={ref} className="relative pt-40 pb-16 px-6 overflow-hidden">
        <motion.div
          style={{ y }}
          aria-hidden
          className="absolute -top-10 left-0 right-0 text-center font-display  text-[22vw] text-[var(--ink)]/[0.04] leading-[0.85] select-none pointer-events-none"
        >
          courses
        </motion.div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-6">
            ◆ Industry-Focused AI Programs
          </div>
          <h1 className="font-display text-[clamp(3rem,9vw,9rem)] leading-[0.9] text-[var(--ink)] font-light">
            <CinematicTitle text="Transform Your" />
            <br />
            <span className="">
              <CinematicTitle text="Career Today." delay={0.25} />
            </span>
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-10 max-w-xl text-lg text-[var(--ink-soft)] leading-relaxed">
              30 Days Live Training • Real Projects • Recordings Access • Doubt Support •
              Career-Focused Practical Learning
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton href="#programs-section">Explore Programs</MagneticButton>
              <MagneticButton
                href="https://wa.me/918639191907?text=Hello%20AutoDigiX,%20I'd%20like%20to%20talk%20to%20an%20advisor%20about%20your%20courses!"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                Talk to Advisor
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="programs-section" className="py-20 px-6 bg-[var(--beige)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, i) => {
            const isFeatured = i === 0;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  onMouseMove={handleMouseMove}
                  data-cursor="info"
                  className={`glow-container relative rounded-[2rem] p-8 md:p-10 border flex flex-col justify-between h-full transition-all duration-300 ${
                    isFeatured
                      ? "bg-[var(--ink)] text-[var(--beige-light)] border-[var(--ink)] shadow-gold"
                      : "bg-[var(--beige-light)] text-[var(--ink)] border-[var(--ink)]/5 shadow-soft"
                  }`}
                >
                  <div className="glow-card-border" />
                  {isFeatured && (
                    <div className="absolute -top-3.5 right-6 text-[9px] uppercase tracking-widest bg-[var(--gold)] text-[var(--ink)] font-bold px-3 py-1.5 rounded-full z-10">
                      Best Value
                    </div>
                  )}
                  <div>
                    <div
                      className={`text-[10px] uppercase tracking-[0.2em] mb-4 ${isFeatured ? "text-[var(--gold)]" : "text-[var(--ink-soft)]"}`}
                    >
                      {course.duration} Certification
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-light leading-tight mb-2">
                      {course.title}
                    </h3>
                    <p
                      className={`text-sm mb-8 leading-relaxed ${isFeatured ? "text-[var(--beige-light)]/75" : "text-[var(--ink-soft)]"}`}
                    >
                      {course.subtitle}
                    </p>
                    <div className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-8">
                      {course.price}
                    </div>

                    <div
                      className={`w-full h-px mb-8 ${isFeatured ? "bg-[var(--beige-light)]/15" : "bg-[var(--ink)]/10"}`}
                    />

                    <ul className="space-y-4 mb-10 text-sm">
                      <li className="flex items-start gap-2.5">
                        <span
                          className={`text-xs ${isFeatured ? "text-[var(--gold)]" : "text-[var(--gold)]"}`}
                        >
                          —
                        </span>
                        <span
                          className={
                            isFeatured ? "text-[var(--beige-light)]/90" : "text-[var(--ink)]/90"
                          }
                        >
                          Live Classes + Daily Recordings
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span
                          className={`text-xs ${isFeatured ? "text-[var(--gold)]" : "text-[var(--gold)]"}`}
                        >
                          —
                        </span>
                        <span
                          className={
                            isFeatured ? "text-[var(--beige-light)]/90" : "text-[var(--ink)]/90"
                          }
                        >
                          1-on-1 Interaction Support
                        </span>
                      </li>
                      {course.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span
                            className={`text-xs ${isFeatured ? "text-[var(--gold)]" : "text-[var(--gold)]"}`}
                          >
                            —
                          </span>
                          <span
                            className={
                              isFeatured ? "text-[var(--beige-light)]/90" : "text-[var(--ink)]/90"
                            }
                          >
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/918639191907?text=Hello%20AutoDigiX,%20I'd%20like%20to%20enroll%20in%20the%20${encodeURIComponent(course.title)}%20program!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center w-full py-3.5 rounded-full text-sm font-medium transition-all duration-300 relative z-10 ${
                      isFeatured
                        ? "bg-[var(--gold)] text-[var(--ink)] hover:shadow-glow"
                        : "bg-[var(--ink)] text-[var(--beige-light)] hover:shadow-glow"
                    }`}
                  >
                    Enroll In Program
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="py-32 px-6 bg-[var(--beige-light)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-12 text-center">
              ◆ Why Choose AutoDigiX Courses?
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                t: "Real-Time Practical Training",
                d: "Learn by working on real projects, live campaigns, and hands-on implementations — not just theory.",
              },
              {
                t: "AI-Integrated Learning",
                d: "We teach modern AI tools and workflows that professionals actually use in marketing and development today.",
              },
              {
                t: "Live Doubt & 1-on-1 Support",
                d: "Direct mentor interaction, live doubt sessions, and personal guidance throughout the program.",
              },
              {
                t: "Industry Recognized Certificate",
                d: "Receive a completion certificate that strengthens your resume and professional credibility.",
              },
              {
                t: "Career-Focused Skill Development",
                d: "Skills aligned with real industry demand to help you become job-ready or freelance-ready.",
              },
              {
                t: "Lifetime Recordings Access",
                d: "Revisit recorded sessions anytime for revision, practice, and long-term mastery.",
              },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-[2rem] bg-[var(--beige)] border border-[var(--ink)]/5 h-full">
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
