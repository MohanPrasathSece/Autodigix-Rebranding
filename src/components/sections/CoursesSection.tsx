import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../Reveal";
import { Link } from "@tanstack/react-router";

const courses = [
  {
    title: "AI Automation",
    price: "₹5,999",
    subtitle: "N8N, Make & Low-Code Workflow Automation",
    duration: "30 Days",
    bullets: [
      "N8N, Make.com (Integromat) & Zapier Pipelines",
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

export function CoursesSection() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section ref={ref} className="py-32 px-6 bg-[var(--beige-light)]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-4">
            ◆ Training
          </div>
          <h2 className="font-display text-4xl md:text-8xl text-[var(--ink)] max-w-4xl leading-[0.95] font-light">
            Our Professional <span className="">Courses.</span>
          </h2>
          <p className="mt-8 text-[var(--ink-soft)] max-w-2xl text-lg leading-relaxed mb-16">
            Transform Your Career with Industry-Focused AI Programs.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                onMouseMove={handleMouseMove}
                data-cursor="info"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="glow-container bg-[var(--beige-light)] rounded-[2.5rem] p-8 md:p-10 border border-[var(--ink)]/5 shadow-soft hover:shadow-xl h-full flex flex-col justify-between group cursor-pointer hover:border-[var(--ink)]/10 relative overflow-hidden"
              >
                <div className="glow-card-border" />
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3.5 py-1.5 bg-[var(--ink)]/[0.04] text-[var(--ink)] text-[10px] uppercase tracking-[0.2em] rounded-full font-medium">
                      {course.duration} Program
                    </span>
                    <span className="px-3.5 py-1.5 bg-[var(--gold)]/10 text-[var(--ink)] text-[10px] uppercase tracking-[0.2em] rounded-full font-medium">
                      Certificate
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-normal mb-2 leading-tight transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-8">
                    {course.subtitle}
                  </p>
                </div>

                <div>
                  <Link
                    to="/courses"
                    onClick={() => window.scrollTo(0, 0)}
                    className="block text-center w-full py-3.5 rounded-full bg-[var(--ink)] text-[var(--beige-light)] text-sm font-medium hover:bg-[var(--ink-soft)] transition-colors relative z-10 shadow-sm"
                  >
                    View Syllabus & Enroll
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
