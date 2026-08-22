import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Plus, 
  Minus, 
  Clock, 
  Calendar, 
  Laptop, 
  Ticket, 
  AlertCircle,
  Target,
  Sparkles,
  MessageCircle,
  BookOpen,
  Share2,
  Search,
  Zap,
  Award,
  Cpu,
  Briefcase,
  GraduationCap,
  UserCheck,
  Building2,
  Code2,
  Video,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Layers
} from "lucide-react";
import logo from "../assets/logo.png";

export const Route = createFileRoute("/webinar")({
  head: () => ({
    meta: [
      { title: "Digital Marketing Webinar | AutoDigiX" },
      { name: "description", content: "Learn Digital Marketing + AI with practical strategies, tools, and real-world insights. Webinar Fee: ₹39 ONLY. Limited Seats." },
      { name: "robots", content: "noindex, nofollow" },
    ],
    // ── Meta Pixel — webinar page ONLY ──────────────────────────────────
    scripts: [
      {
        // noscript fallback is rendered inline in the component
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1794680704409333');fbq('track','PageView');`,
      },
    ],
  }),
  component: WebinarPage,
});

const PAYMENT_LINK = "https://rzp.io/rzp/UxboVht";
const WHATSAPP_LINK = "https://wa.me/918639191907?text=Hello%20AutoDigiX%2C%20I%20have%20a%20question%20about%20the%20Digital%20Marketing%20Webinar";

// ─── Shared Components ──────────────────────────────────────────────────────

function Button({ children, href, variant = "primary", className = "" }: { children: React.ReactNode; href: string; variant?: "primary" | "secondary" | "outline"; className?: string }) {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-8 py-4 max-md:px-6 max-md:py-3.5 rounded-full font-sans text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg uppercase text-center";
  let variantClasses = "";
  if (variant === "primary") variantClasses = "bg-[var(--ink)] text-[var(--beige-light)] hover:bg-[var(--ink)]/90";
  else if (variant === "secondary") variantClasses = "bg-[var(--beige-light)] text-[var(--ink)] hover:bg-white";
  else if (variant === "outline") variantClasses = "border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </motion.a>
  );
}

// ─── Header & Footer ────────────────────────────────────────────────────────

function WebinarHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--beige-light)]/90 backdrop-blur-md border-b border-[var(--ink)]/5">
      <div className="max-w-7xl mx-auto px-6 max-md:px-4 h-24 max-md:h-18 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="AutoDigiX Logo" className="h-14 md:h-16 max-md:h-10 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-4 max-md:gap-2">
          <span className="inline-flex items-center gap-2 text-xs max-md:text-[10px] font-semibold tracking-widest text-[var(--ink-soft)] max-md:hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Live Session
          </span>
          <a 
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs max-md:text-[10px] font-semibold px-5 py-2.5 max-md:px-4 max-md:py-2 bg-[var(--ink)] text-[var(--beige-light)] hover:bg-[var(--gold)] hover:text-[var(--ink)] rounded-full border border-[var(--ink)]/10 transition-colors tracking-wider whitespace-nowrap shadow-sm"
          >
            Register <span className="max-md:hidden">— ₹39</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function WebinarFooter() {
  return (
    <footer className="bg-[var(--ink)] text-white py-12 px-6 border-t border-white/5 relative z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 max-md:gap-6">
        <div className="flex flex-col items-center md:items-start gap-4 max-md:gap-3">
          <img src={logo} alt="AutoDigiX Logo" className="h-14 md:h-16 max-md:h-10 w-auto object-contain brightness-0 invert" />
          <p className="text-white/50 text-xs">
            Helping you understand, learn, and leverage the digital world.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 max-md:gap-4 text-white/50 text-xs tracking-widest font-medium">
          <a href="tel:8639191907" className="hover:text-white transition-colors">Call: 8639191907</a>
          <a href="https://autodigix.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Website: autodigix.com</a>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 max-md:mt-8 pt-8 max-md:pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[10px] text-white/30 tracking-widest gap-4">
        <div>© {new Date().getFullYear()} AutoDigiX. All rights reserved.</div>
        <div>Digital Marketing • AI • Automation • Growth</div>
      </div>
    </footer>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────

const sections = [
  {
    num: "01",
    title: "Fundamentals",
    tagline: "Foundation",
    topics: ["Core Marketing", "Canva Design", "Copywriting", "Web Pages"],
  },
  {
    num: "02",
    title: "Social Media",
    tagline: "Reach & Growth",
    topics: ["Meta & Insta", "LinkedIn Reach", "Post Systems"],
  },
  {
    num: "03",
    title: "SEO & Ads",
    tagline: "Search & Paid",
    topics: ["Keyword SEO", "Google PPC", "Ad Funnels"],
  },
  {
    num: "04",
    title: "Automations",
    tagline: "CRM & Systems",
    topics: ["Zapier & Make", "CRM Pipeline", "Analytics"],
  },
  {
    num: "05",
    title: "Career & Brand",
    tagline: "Profile & Value",
    topics: ["Brand Strategy", "Portfolio Setup", "Pitch Prep"],
  },
  {
    num: "06",
    title: "AI Mastery",
    tagline: "Scale with AI",
    topics: ["AI Content", "AI Copywriting", "AI Agents"],
  },
  {
    num: "07",
    title: "Agency Scale",
    tagline: "Clients & Growth",
    topics: ["Freelancing", "Client Closing", "Agency SOPs"],
  },
];

// ─── FAQ Data ───────────────────────────────────────────────────────────────

const faqItems = [
  {
    q: "Who is this webinar for?",
    a: "Anyone who wants to understand digital marketing — students, professionals, business owners, freelancers, creators, or career switchers. No prior experience required.",
  },
  {
    q: "Is this a recorded session or a live webinar?",
    a: "This is a live online webinar. You'll be able to interact, ask questions, and get real-time clarity from the session.",
  },
  {
    q: "Why is it only ₹39?",
    a: "We believe clarity shouldn't cost a fortune. ₹39 is a commitment fee to ensure serious attendees join, while keeping it accessible to everyone.",
  },
  {
    q: "What will I learn in this webinar?",
    a: "You'll get a complete overview of the digital marketing landscape — SEO, Social Media, Paid Ads, Email Marketing, Content Strategy, and how AI is transforming it all. By the end, you'll know exactly where to focus and what steps to take next.",
  },
  {
    q: "How do I register?",
    a: "Click any 'Register' button on this page to complete your registration via our secure Razorpay gateway and confirm your seat instantly.",
  },
  {
    q: "What happens after I register?",
    a: "You'll receive all session details (link, timing, instructions) via WhatsApp/Email before the webinar date.",
  },
];

function RoadmapSection() {
  const icons = [BookOpen, Share2, Search, Zap, Award, Cpu, Briefcase];

  return (
    <section className="py-20 max-md:py-16 px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16 bg-[var(--beige)] border-y border-[var(--ink)]/5 z-10 relative overflow-hidden">
      <div className="max-w-[1680px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-[var(--ink-soft)] uppercase mb-3 bg-white/80 border border-[var(--ink)]/10 px-3.5 py-1.5 rounded-full shadow-sm">
            <Layers className="w-3.5 h-3.5 text-[var(--gold)]" /> 7-Stage Curriculum
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-[var(--ink)] font-light leading-tight">
            The Digital Marketing <span className="italic font-normal text-[var(--ink)]">Roadmap.</span>
          </h2>
        </div>

        {/* 7 Cards in One Screen (Expanded Wide Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 lg:gap-3.5 xl:gap-4">
          {sections.map((section, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="bg-white rounded-2xl p-4 sm:p-5 lg:p-4 xl:p-5 border border-[var(--ink)]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] uppercase font-bold tracking-wider bg-[var(--ink)] text-[var(--beige-light)] px-2.5 py-0.5 rounded-full">
                      {section.num}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-[var(--beige)] border border-[var(--ink)]/10 flex items-center justify-center group-hover:bg-[var(--ink)] group-hover:text-[var(--beige-light)] transition-colors duration-300">
                      <Icon className="w-4 h-4 text-[var(--ink)] group-hover:text-[var(--beige-light)] transition-colors" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mb-3.5">
                    <h3 className="font-display text-sm xl:text-base font-bold text-[var(--ink)] leading-snug truncate">
                      {section.title}
                    </h3>
                    <p className="text-[9px] xl:text-[10px] uppercase tracking-wider font-semibold text-[var(--gold)] truncate">
                      {section.tagline}
                    </p>
                  </div>

                  {/* Topics List */}
                  <ul className="space-y-1.5 mb-3.5 bg-[var(--beige-light)]/60 rounded-xl p-3 border border-[var(--ink)]/5">
                    {section.topics.map((topic, ti) => (
                      <li key={ti} className="flex items-center gap-1.5 text-xs font-medium text-[var(--ink)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                        <span className="truncate whitespace-nowrap">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="pt-2.5 border-t border-[var(--ink)]/5 text-center text-[9px] uppercase tracking-widest font-semibold text-[var(--ink-soft)]/60">
                  Step {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Destination Row */}
        <div className="mt-10 pt-6 border-t border-[var(--ink)]/10 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="text-xs font-bold tracking-widest text-[var(--ink-soft)] uppercase">
            Roadmap Outcomes:
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["High-Income Career", "Freelance Clients", "Business Growth", "Digital Agency"].map((path, pi) => (
              <span
                key={pi}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-[var(--ink)]/10 text-[var(--ink)] shadow-sm"
              >
                {path}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

function WebinarPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div ref={containerRef} className="bg-[var(--beige-light)] min-h-screen text-[var(--ink)] font-sans pt-20 max-md:pt-16">
      <WebinarHeader />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 bg-[var(--beige)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center -mt-10 max-md:-mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-[var(--ink-soft)] mb-6 bg-white border border-[var(--ink)]/10 px-4 py-2 rounded-full shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" /> LIVE WEBINAR — ₹39/-
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl lg:text-6xl max-md:text-4xl leading-[1.1] font-light mb-6 text-[var(--ink)] max-w-3xl mx-auto"
          >
            Your competitors are already using <br className="hidden md:block" />
            <span className="italic text-[var(--gold)]">AI + Digital Marketing.</span>
            <br />
            Are you still figuring out where to start?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base max-md:text-sm text-[var(--ink-soft)] max-w-lg mx-auto mb-4 max-md:mb-3 leading-relaxed max-md:px-4"
          >
            Learn Digital Marketing + AI with practical strategies, tools, and real-world insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-wrap justify-center items-center gap-3 max-md:gap-2 mb-8 max-md:mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--beige-light)] text-xs font-bold tracking-widest px-4 py-2 rounded-full shadow">
              🎯 Webinar Fee: ₹39 ONLY
            </span>
            <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-bold tracking-widest px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              Limited Seats • Register Now!
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-row max-md:flex-col items-center gap-4 max-md:w-full max-md:px-4"
          >
            <Button href={PAYMENT_LINK} variant="primary" className="max-md:w-full">
              SAVE MY SEAT →
            </Button>
            <div className="text-xs font-bold text-red-600 tracking-widest max-md:mt-2 animate-pulse mt-3 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span> ONLY A FEW SEATS LEFT!
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WARNING BANNER ─────────────────────────────────────────────── */}
      <section className="py-24 max-md:py-16 px-6 max-md:px-4 bg-[var(--ink)] text-[var(--beige-light)] relative overflow-hidden z-10 shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-[var(--gold)] max-md:w-8 max-md:h-8" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-3xl lg:text-4xl max-md:text-2xl leading-tight font-light mb-8 max-md:mb-6 text-white tracking-wide">
            Digital Marketing is changing.<br className="hidden md:block" /> AI is changing it faster.
          </h2>
          <p className="text-white/70 text-lg max-md:text-base leading-relaxed max-w-3xl mx-auto font-light mb-12 max-md:mb-10">
            Most people waste months learning random tools and still don't understand how it all fits together.<br />
            This webinar fixes that.<br />
            In 60 minutes, you'll see the full picture — without the confusion.
          </p>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-md:p-6 max-w-2xl mx-auto text-left">
            <div className="text-xs max-md:text-[10px] tracking-widest text-white/50 mb-6 font-semibold">What You'll Learn:</div>
            <ul className="space-y-4 text-sm max-md:text-base text-white/80">
              {[
                "What digital marketing actually is",
                "How SEO, Google Ads & Social Media drive growth",
                "How content + websites generate real business",
                "How automation saves hours every week",
                "How AI is reshaping marketing right now",
                "Which skills companies actually pay for",
                "Career, freelance & business opportunities",
                "Your personal learning roadmap"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--gold)] shrink-0" strokeWidth={1.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ────────────────────────────────────────────── */}
      <section className="py-24 max-md:py-16 px-6 max-md:px-4 bg-[var(--beige-light)] z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[10px] tracking-[0.2em] text-[var(--ink-soft)] font-semibold mb-4">Live Online Webinar</div>
          <h2 className="font-display text-5xl max-md:text-3xl leading-tight font-light mb-6 text-[var(--ink)]">
            Digital Marketing:<br />From Beginner to Industry-Ready
          </h2>
          <p className="text-[var(--ink-soft)] text-lg max-md:text-base mb-12 max-md:mb-10 max-w-2xl mx-auto font-light">
            Learn the fundamentals, tools, strategies, AI applications, career opportunities, and real-world skills you need to understand the digital marketing industry.
          </p>

          <div className="bg-white border border-[var(--ink)]/10 shadow-lg rounded-3xl p-10 max-md:p-8 max-w-md mx-auto mb-8 max-md:mx-4 sm:max-md:mx-auto">
            <div className="text-xs max-md:text-[10px] tracking-widest text-[var(--gold)] font-bold mb-4">Special Webinar Price</div>
            <div className="flex justify-center items-end gap-3 mb-2">
              <span className="text-2xl max-md:text-xl text-[var(--ink-soft)] line-through mb-1">₹599</span>
              <span className="font-display text-7xl max-md:text-5xl font-light text-[var(--ink)]">₹39/-</span>
            </div>
            <div className="text-sm max-md:text-xs text-red-500 font-bold mb-8 animate-pulse">Registration Closing Soon!</div>
            <Button href={PAYMENT_LINK} variant="primary" className="w-full">
              RESERVE MY SEAT FOR ₹39 →
            </Button>
          </div>

          <div className="flex flex-row max-md:flex-col justify-center items-center gap-6 max-md:gap-4 text-sm max-md:text-xs text-[var(--ink-soft)] font-medium">
            <div className="flex gap-1 text-[var(--gold)] font-bold">⭐ 4.9/5</div>
            <div className="max-md:hidden">•</div>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Beginner-Friendly</span>
              <span className="flex items-center gap-1.5"><Laptop className="w-4 h-4" /> Live Online</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Expert-Led</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── URGENCY / FAST ACTION ──────────────────────────────────────── */}
      <section className="py-20 max-md:py-16 px-6 max-md:px-4 bg-[var(--beige)] border-y border-[var(--ink)]/5 z-10 relative">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-display text-5xl max-md:text-3xl leading-tight font-medium mb-8 text-[var(--ink)]">
            One small investment. A bigger understanding of your digital future.
          </h2>
          <Button href={PAYMENT_LINK} variant="primary" className="max-md:w-full">
            <Sparkles className="w-4 h-4 shrink-0" /> SECURE MY SEAT FOR ₹39 →
          </Button>
        </div>
      </section>

      {/* ── FOMO SECTION ───────────────────────────────────────────────── */}
      <section className="py-24 max-md:py-16 px-6 max-md:px-4 bg-[var(--ink)] text-center z-10 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs max-md:text-[10px] tracking-[0.3em] text-[var(--gold)] font-bold mb-6">The digital shift won't wait.</div>
          <h2 className="font-display text-5xl max-md:text-2xl leading-tight font-light text-white mb-6">
            Don't be the person who starts learning digital marketing after everyone else has already moved ahead.
          </h2>
          <p className="font-display text-2xl max-md:text-xl text-[var(--gold)] mb-10 max-md:mb-8 italic max-md:px-4">
            Get ahead. Don't get left behind.
          </p>
          <Button href={PAYMENT_LINK} variant="secondary" className="max-md:w-full">
            YES, I'M READY — JOIN FOR ₹39 →
          </Button>
        </div>
      </section>

      {/* ── WEBINAR PROMISE ────────────────────────────────────────────── */}
      <section className="py-24 max-md:py-16 px-6 max-md:px-4 bg-[var(--beige-light)] z-10 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 max-md:mb-12">
            <div className="text-[10px] tracking-[0.2em] text-[var(--ink-soft)] font-semibold mb-4">WEBINAR PROMISE</div>
            <h2 className="font-display text-5xl max-md:text-2xl leading-tight font-light text-[var(--ink)] mb-6 max-md:mb-4">
              What if you could see the entire digital marketing landscape in one session?
            </h2>
            <p className="text-[var(--ink-soft)] text-lg max-md:text-base mb-2">Instead of learning random tools one by one...</p>
            <p className="text-[var(--ink)] text-xl max-md:text-lg font-medium">We'll help you understand the bigger picture.</p>
          </div>

          <div className="bg-[var(--beige)] border border-[var(--ink)]/5 rounded-3xl p-12 max-md:p-6">
            <div className="text-xs max-md:text-[10px] tracking-[0.2em] text-[var(--ink-soft)] font-semibold mb-8 max-md:mb-6 text-center">In this webinar, you'll discover:</div>
            
            <div className="grid md:grid-cols-2 max-md:grid-cols-1 gap-x-12 gap-y-4 mb-12 max-md:mb-8">
              {[
                "What digital marketing actually is",
                "How businesses use digital channels to grow",
                "The major areas of digital marketing",
                "Which skills are worth learning",
                "How SEO and Google Ads work",
                "How social media marketing works",
                "How content and video fit into marketing",
                "How websites and landing pages generate conversions",
                "How automation can save time and improve lead flow",
                "How AI is changing marketing",
                "What career and business opportunities exist",
                "What a complete learning roadmap looks like"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-[var(--ink)] font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center border-t border-[var(--ink)]/10 pt-8 max-md:pt-6">
              <p className="text-[var(--ink-soft)] text-sm max-md:text-xs mb-2 tracking-widest">And most importantly...</p>
              <p className="font-display text-2xl max-md:text-xl text-[var(--ink)]">You'll understand <span className="font-semibold">what</span> to learn — and <span className="font-semibold">why</span> you need to learn it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE AUTODIGIX DIGITAL MARKETING ROADMAP ──────────────────── */}
      <RoadmapSection />





{/* ── WHO IS THIS FOR ────────────────────────────────────────────── */}
      <section className="py-24 max-md:py-20 px-6 max-md:px-4 bg-[var(--beige-light)] z-10 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 max-md:mb-12">
            <div className="text-[10px] tracking-[0.2em] text-[var(--ink-soft)] font-semibold mb-4">Who Should Attend?</div>
            <h2 className="font-display text-5xl max-md:text-2xl leading-tight font-light text-[var(--ink)] mb-6 max-md:mb-4">
              No prior experience needed.
            </h2>
          </div>

          <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6 max-md:gap-4">
            {[
              { Icon: GraduationCap, t: "Students", d: "Explore digital careers." },
              { Icon: UserCheck, t: "Professionals", d: "Stay relevant at work." },
              { Icon: Building2, t: "Business Owners", d: "Grow online & generate leads." },
              { Icon: Code2, t: "Freelancers", d: "Offer high-demand services." },
              { Icon: Video, t: "Creators", d: "Build audience & brand." },
              { Icon: RefreshCw, t: "Career Switchers", d: "Understand the industry before switching." }
            ].map(({ Icon, t, d }, i) => (
              <div key={i} className="bg-white border border-[var(--ink)]/5 p-8 max-md:p-6 rounded-2xl shadow-sm group hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[var(--beige)] border border-[var(--ink)]/8 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[var(--ink-soft)]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl max-md:text-lg text-[var(--ink)] mb-2 max-md:mb-1">{t}</h3>
                <p className="text-[var(--ink-soft)] text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY LEARN NOW ──────────────────────────────────────────────── */}
      <section className="py-24 max-md:py-20 px-6 max-md:px-4 bg-[var(--beige)] z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[10px] tracking-[0.2em] text-[var(--ink-soft)] font-semibold mb-4">Why learn digital marketing now?</div>
          <h2 className="font-display text-5xl max-md:text-2xl leading-tight font-light text-[var(--ink)] mb-6">
            The marketing landscape is changing fast.
          </h2>
          <p className="text-[var(--ink-soft)] text-lg max-md:text-base mb-12 max-md:mb-10">Traditional marketing alone is no longer enough. Today's marketer needs to understand:</p>

          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 text-left mb-12 max-md:mb-10">
            {[
              { t: "Content", d: "What should we say?" },
              { t: "Social Media", d: "Where should we distribute it?" },
              { t: "SEO", d: "How do people find us?" },
              { t: "Paid Ads", d: "How do we reach the right audience faster?" },
              { t: "Data", d: "What's actually working?" },
              { t: "Automation", d: "What can be systemized?" },
              { t: "AI", d: "How can we create, analyze, personalize, and scale faster?" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 max-md:p-5 rounded-xl border border-[var(--ink)]/5">
                <div className="text-xs max-md:text-[10px] tracking-widest text-[var(--gold)] font-bold mb-2">{item.t}</div>
                <div className="text-[var(--ink)] font-medium text-sm">{item.d}</div>
              </div>
            ))}
          </div>
          
          <div className="font-display text-2xl max-md:text-xl text-[var(--ink)] italic max-md:px-4">The future belongs to marketers who understand the entire system.</div>
        </div>
      </section>

      {/* ── OUTCOMES & APPROACH ────────────────────────────────────────── */}
      <section className="py-24 max-md:py-20 px-6 max-md:px-4 bg-[var(--beige-light)] z-10 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-16 max-md:gap-12">
            <div>
              <div className="text-[10px] tracking-[0.2em] text-[var(--ink-soft)] font-semibold mb-4">What You Walk Away With</div>
              <h2 className="font-display text-4xl max-md:text-2xl leading-tight font-light text-[var(--ink)] mb-6">Leave with clarity.</h2>
              <ul className="space-y-4">
                {[
                  "The digital marketing ecosystem — finally clear",
                  "The skills worth learning (and which to skip)",
                  "Where AI fits into your work",
                  "Career, freelance & business paths",
                  "A practical roadmap to move forward"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 max-md:gap-3 items-start">
                    <span className="font-display text-[var(--ink)]/20 text-xl max-md:text-lg leading-none pt-1">0{i+1}</span>
                    <span className="text-[var(--ink)] font-medium text-sm max-md:text-xs">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[var(--ink)] text-white p-10 max-md:p-8 rounded-3xl flex flex-col justify-center">
              <div className="text-[10px] tracking-[0.2em] text-[var(--gold)] font-bold mb-4">Why AutoDigix?</div>
              <h2 className="font-display text-3xl max-md:text-2xl leading-tight font-light mb-6">
                No random tools.<br />No overwhelm. Just clarity.
              </h2>
              <p className="text-white/70 italic mb-10 max-md:mb-8 max-md:text-sm">AutoDigix teaches you the system — so you make smarter career and business decisions, not just memorize tools.</p>
              
              <div className="bg-white/10 p-6 max-md:p-5 rounded-2xl border border-white/10">
                <div className="text-xs max-md:text-[10px] tracking-widest text-white/50 mb-2">Here's the difference...</div>
                <div className="text-white/70 text-sm max-md:text-xs mb-4">Most beginners ask: <span className="text-white font-medium">"Which tool should I learn?"</span></div>
                <div className="text-xs max-md:text-[10px] tracking-widest text-[var(--gold)] mb-2 font-bold">We ask:</div>
                <div className="text-white font-display text-xl max-md:text-lg">"What problem do you want to solve?"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Webinar Details & COST COMPARISON ──────────────────────────── */}
      <section className="py-24 max-md:py-20 px-6 max-md:px-4 bg-[var(--beige)] z-10 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 max-md:mb-12">
            <div className="text-[10px] tracking-[0.2em] text-[var(--ink-soft)] font-semibold mb-4">Webinar Details</div>
            <h2 className="font-display text-5xl max-md:text-3xl leading-tight font-light text-[var(--ink)]">
              Your first step into the digital marketing world.
            </h2>
          </div>

          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 items-center">
            <div className="bg-[var(--ink)] text-white p-10 max-md:p-8 rounded-3xl text-center">
              <div className="text-[10px] tracking-[0.2em] text-white/50 font-semibold mb-2">Live Online Webinar</div>
              <h3 className="font-display text-2xl max-md:text-xl text-[var(--gold)] mb-8 max-md:mb-6">Digital Marketing + AI</h3>
              
              <div className="grid grid-cols-2 gap-4 max-md:gap-3 mb-8 text-left">
                <div className="bg-white/5 p-4 max-md:p-3 rounded-xl border border-white/5"><Calendar className="w-5 h-5 max-md:w-4 max-md:h-4 mb-2 text-white/50"/><div className="text-sm max-md:text-xs font-semibold">29 AUGUST 2026</div></div>
                <div className="bg-white/5 p-4 max-md:p-3 rounded-xl border border-white/5"><Clock className="w-5 h-5 max-md:w-4 max-md:h-4 mb-2 text-white/50"/><div className="text-sm max-md:text-xs font-semibold">6:00 PM</div></div>
                <div className="bg-white/5 p-4 max-md:p-3 rounded-xl border border-white/5"><Laptop className="w-5 h-5 max-md:w-4 max-md:h-4 mb-2 text-white/50"/><div className="text-sm max-md:text-xs font-semibold">LIVE ONLINE</div></div>
                <div className="bg-white/5 p-4 max-md:p-3 rounded-xl border border-white/5"><Ticket className="w-5 h-5 max-md:w-4 max-md:h-4 mb-2 text-white/50"/><div className="text-sm max-md:text-xs font-semibold">LIMITED SEATS</div></div>
              </div>

              <div className="mb-8">
                <div className="text-xs max-md:text-[10px] tracking-widest text-white/50 mb-2">Special Webinar Access</div>
                <div className="flex justify-center items-end gap-3 mb-2">
                  <span className="text-xl max-md:text-lg text-white/40 line-through">₹599</span>
                  <span className="font-display text-5xl max-md:text-4xl font-light">₹39/-</span>
                </div>
                <div className="text-xs max-md:text-[10px] text-[var(--gold)] tracking-widest">Just ₹39 to reserve your seat.</div>
              </div>

              <Button href={PAYMENT_LINK} variant="secondary" className="w-full">
                YES, I WANT TO JOIN FOR ₹39 →
              </Button>
            </div>

            <div className="p-8 max-md:p-4">
              <h3 className="font-display text-2xl max-md:text-xl text-[var(--ink)] mb-6 max-md:mb-4">
                Why just ₹39?
              </h3>
              <p className="text-[var(--ink-soft)] max-md:text-sm mb-6 max-md:mb-4">Because clarity shouldn't cost a fortune.</p>
              
              <p className="text-[var(--ink-soft)] max-md:text-sm mb-6 max-md:mb-4">For less than a cup of coffee, you get a structured introduction to the digital economy — and know exactly what to learn next.</p>
              <p className="italic text-[var(--ink-soft)] max-md:text-sm mb-6 max-md:mb-4">Your digital future is worth ₹39.</p>
              
              <div className="mt-8">
                <Button href={PAYMENT_LINK} variant="primary" className="w-full">
                  🔥 SECURE MY SEAT →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL PITCH ────────────────────────────────────────────────── */}
      <section className="py-24 max-md:py-20 px-6 max-md:px-4 bg-[var(--beige-light)] text-center z-10 relative">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-5xl max-md:text-2xl leading-tight font-light text-[var(--ink)] mb-8 max-md:mb-6">
            Don't just watch the digital world change. Learn how it works.
          </h2>
          <p className="text-[var(--ink-soft)] text-lg max-md:text-base mb-10 max-md:mb-8 leading-relaxed max-md:text-left max-md:px-2">
            The webinar is live and seats are limited.<br/><br/>
            If you've been thinking about learning digital marketing...<br/>
            If you've been considering a career change...<br/>
            If you want to grow your business...<br/>
            If you want to explore freelancing...<br/>
            Or if you simply want to understand what everyone is talking about when they say AI + Digital Marketing...<br/><br/>
            <strong className="text-[var(--ink)] font-display text-2xl max-md:text-xl block max-md:text-center mt-4">This is a great place to start.</strong>
          </p>
          <Button href={PAYMENT_LINK} variant="primary" className="max-md:w-full">
            RESERVE MY SEAT FOR ₹39 →
          </Button>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-24 max-md:py-20 px-6 max-md:px-4 bg-[var(--beige)] z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 max-md:mb-12">
            <h2 className="font-display text-5xl max-md:text-3xl font-light text-[var(--ink)]">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div 
                key={i} 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openFaq === i ? "bg-white border-[var(--ink)]/20 shadow-sm" : "bg-white/50 border-[var(--ink)]/10 hover:bg-white"}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 max-md:px-5 max-md:py-4 flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="font-display text-lg max-md:text-sm text-[var(--ink)] font-normal pr-4 leading-snug">{item.q}</span>
                  <div className={`flex-shrink-0 w-8 h-8 max-md:w-6 max-md:h-6 rounded-full border border-[var(--ink)]/10 flex items-center justify-center text-[var(--ink)] transition-transform ${openFaq === i ? "bg-[var(--ink)] text-white" : ""}`}>
                    {openFaq === i ? <Minus className="w-4 h-4 max-md:w-3 max-md:h-3" /> : <Plus className="w-4 h-4 max-md:w-3 max-md:h-3" />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 max-md:px-5 max-md:pb-5 text-[var(--ink-soft)] text-base max-md:text-xs leading-relaxed border-t border-[var(--ink)]/5 pt-4 max-md:pt-3">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 max-md:py-20 px-6 max-md:px-4 bg-[var(--ink)] text-white text-center z-10 relative shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-5xl max-md:text-3xl leading-tight font-light mb-8">
            Don't just watch the digital world change. Learn how it works.
          </h2>
          
          <p className="text-white/70 text-lg max-md:text-base mb-8 leading-relaxed">
            Digital Marketing + AI is the new career currency.<br/><br/>
            Understand the skills.<br/>
            See the opportunities.<br/>
            Choose your next step.
          </p>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 max-md:p-6 max-w-2xl mx-auto mb-8 max-md:mx-4 sm:max-md:mx-auto">
            <div className="text-xs max-md:text-[10px] tracking-widest text-white/50 mb-6 font-semibold">AutoDigix Digital Marketing + AI Webinar</div>
            <div className="flex flex-row max-md:flex-col justify-center items-center gap-4 max-md:gap-2 text-sm max-md:text-xs font-semibold tracking-widest mb-8 max-md:mb-6 text-[var(--gold)]">
              <span>29 AUGUST 2026</span> <span className="max-md:hidden">•</span> <span>6:00 PM</span> <span className="max-md:hidden">•</span> <span>LIVE ONLINE</span>
            </div>
            <div className="font-display text-6xl max-md:text-5xl font-light mb-8 max-md:mb-6">₹39/- ONLY</div>
            <Button href={PAYMENT_LINK} variant="secondary" className="max-md:w-full">
              YES, I WANT TO JOIN FOR ₹39 →
            </Button>
          </div>
          
          <div className="text-xs max-md:text-[10px] text-white/40 tracking-widest font-semibold flex flex-row max-md:flex-col justify-center gap-3 max-md:gap-2">
            <span>Limited Seats</span> <span className="max-md:hidden">•</span> <span>Live Online</span> <span className="max-md:hidden">•</span> <span>Expert-Led</span>
          </div>
        </div>
      </section>

      <WebinarFooter />

      {/* ── STICKY WHATSAPP (LEFT) ─────────────────────────────────────── */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-8 left-8 max-md:left-6 z-50 flex items-center justify-center bg-[#25D366] text-white p-4 max-md:p-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <MessageCircle className="w-7 h-7 max-md:w-6 max-md:h-6 fill-current" />
      </motion.a>
    </div>
  );
}
