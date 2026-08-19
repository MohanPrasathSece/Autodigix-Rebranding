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
  MessageCircle
} from "lucide-react";
import logo from "../assets/logo.png";

export const Route = createFileRoute("/webinar")({
  head: () => ({
    meta: [
      { title: "Digital Marketing Webinar | AutoDigiX" },
      { name: "description", content: "Master the digital ecosystem. Live online session." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: WebinarPage,
});

const WHATSAPP_LINK = "https://wa.me/918639191907?text=Hello%20AutoDigiX%2C%20I%20want%20to%20register%20for%20the%20Digital%20Marketing%20Webinar";

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
      <div className="max-w-7xl mx-auto px-6 max-md:px-4 h-20 max-md:h-16 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="AutoDigiX Logo" className="h-10 max-md:h-7 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-4 max-md:gap-2">
          <span className="inline-flex items-center gap-2 text-xs max-md:text-[10px] font-semibold tracking-widest text-[var(--ink-soft)] max-md:hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Live Session
          </span>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs max-md:text-[10px] font-semibold px-5 py-2.5 max-md:px-4 max-md:py-2 bg-[var(--beige)] text-[var(--ink)] rounded-full border border-[var(--ink)]/10 hover:bg-[var(--ink)] hover:text-[var(--beige-light)] transition-colors tracking-wider whitespace-nowrap"
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
          <img src={logo} alt="AutoDigiX Logo" className="h-8 max-md:h-6 w-auto object-contain brightness-0 invert" />
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
    tagline: "Build Your Digital Marketing Foundation.",
    desc: "Before running campaigns, you need to understand the fundamentals.",
    topics: [
      { name: "Intro to Digital Marketing", detail: "Understand the digital marketing ecosystem and how different channels work together." },
      { name: "Canva & Graphic Design", detail: "Create professional visual content for digital platforms." },
      { name: "Video Editing & Reels", detail: "Learn the basics of short-form video and engaging social content." },
      { name: "Content & Copywriting", detail: "Understand how words influence attention, engagement, and action." },
      { name: "Website & Landing Pages", detail: "Learn how websites and landing pages turn traffic into leads and customers." },
    ],
  },
  {
    num: "02",
    title: "Social Media Marketing",
    tagline: "Turn Attention Into Engagement.",
    desc: "Social media isn't simply about posting. It's about understanding audiences, content, algorithms, distribution, and conversion.",
    topics: [
      { name: "Facebook & Instagram", detail: "" },
      { name: "LinkedIn & YouTube", detail: "" },
      { name: "Twitter & Snapchat", detail: "" },
      { name: "Content Automation", detail: "" },
      { name: "Social Media SEO", detail: "Understand how brands use social platforms to build awareness, communities, and business opportunities." },
    ],
  },
  {
    num: "03",
    title: "SEO & Google Ads",
    tagline: "Get Found When People Are Searching.",
    desc: "Search is one of the most powerful ways businesses reach people who already have intent.",
    topics: [
      { name: "Keyword Research & On-Page SEO", detail: "" },
      { name: "Technical & Off-Page SEO", detail: "" },
      { name: "International & Local SEO", detail: "" },
      { name: "AEO & GEO", detail: "Answer Engine & Generative Engine Optimization." },
      { name: "Google Search, Display & Shopping Ads", detail: "From organic visibility to paid traffic, understand how businesses compete." },
    ],
  },
  {
    num: "04",
    title: "Industry Expert",
    tagline: "Build Systems. Not Just Campaigns.",
    desc: "Modern marketers don't work in isolation. They work with data, CRM systems, automation, communication tools, and customer journeys.",
    topics: [
      { name: "Zapier Automation", detail: "" },
      { name: "CRM & Lead Flow Setup", detail: "" },
      { name: "WhatsApp Automation & Chatbots", detail: "" },
      { name: "Analytics & Google Tag Manager", detail: "" },
      { name: "Email Marketing", detail: "Learn how marketing moves from manual processes to connected systems." },
    ],
  },
  {
    num: "05",
    title: "Personal Growth & Career",
    tagline: "Turn Skills Into Opportunities.",
    desc: "Learning marketing is only one part. You also need to know how to present yourself and create opportunities.",
    topics: [
      { name: "Influencer & Affiliate Marketing", detail: "" },
      { name: "Personal Branding", detail: "" },
      { name: "Career Pathway & Portfolio", detail: "" },
      { name: "Soft Skills & Aptitude", detail: "" },
      { name: "Resume Building & Mock Interviews", detail: "Don't just learn skills. Learn how to showcase them." },
    ],
  },
  {
    num: "06",
    title: "A.I. Mastery",
    tagline: "The Next Generation Of Marketing Is AI-Powered.",
    desc: "AI is changing how marketers research, create, analyze, automate, and communicate.",
    topics: [
      { name: "AI-Powered Content Creation", detail: "" },
      { name: "AI for SEO & Paid Ads", detail: "" },
      { name: "AI Agents & Chat Marketing", detail: "" },
      { name: "AI for Email & Personalization", detail: "" },
      { name: "Ethical AI & Future Trends", detail: "Combine MARKETING THINKING + AI POWER to work faster and smarter." },
    ],
  },
  {
    num: "07",
    title: "Industry Leader",
    tagline: "Go From Marketer To Growth Builder.",
    desc: "For those who want to move beyond individual skills and understand the business side of marketing.",
    topics: [
      { name: "Funnel Building & Media Buying", detail: "" },
      { name: "Freelancing & Client Acquisition", detail: "" },
      { name: "Agency Setup", detail: "" },
      { name: "Team & SOPs", detail: "Learn how systems become the foundation for freelancing and agency growth." },
    ],
  },
];

const faqItems = [
  { q: "Is this webinar suitable for beginners?", a: "Yes. You don't need prior digital marketing experience. The session is designed to introduce the digital marketing ecosystem in a simple and structured way." },
  { q: "Do I need a marketing background?", a: "No. The webinar is suitable for students, professionals, business owners, freelancers, creators, and beginners." },
  { q: "Is the webinar online?", a: "Yes. The webinar is conducted live online." },
  { q: "How much does the webinar cost?", a: "The special registration price is ₹39/-." },
  { q: "What will I learn?", a: "You'll get an overview of digital marketing, its major components, important skills, AI applications, career opportunities, and the complete learning roadmap." },
  { q: "Will I learn SEO and Google Ads?", a: "You'll understand what SEO, Google Ads, social media marketing, content marketing, automation, analytics, and other major areas involve, and where they fit within the broader ecosystem." },
  { q: "Will AI be covered?", a: "Yes. You'll get an introduction to how AI is transforming content creation, SEO, paid advertising, automation, chat marketing, email marketing, and personalization." },
  { q: "Who should attend?", a: "Students, professionals, business owners, freelancers, creators, career switchers, and anyone interested in understanding digital marketing." }
];

// ─── Main Page ──────────────────────────────────────────────────────────────

function WebinarPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div ref={containerRef} className="bg-[var(--beige-light)] min-h-screen text-[var(--ink)] font-sans pt-20 max-md:pt-16">
      <WebinarHeader />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 max-md:pt-24 max-md:pb-16 bg-[var(--beige)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center -mt-32 max-md:-mt-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-[var(--ink-soft)] mb-8 max-md:mb-6 bg-white border border-[var(--ink)]/10 px-4 py-2 rounded-full shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" /> LIVE WEBINAR — ₹39/-
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-6xl lg:text-7xl max-md:text-4xl leading-[1.1] font-light mb-6 text-[var(--ink)] max-w-4xl mx-auto"
          >
            Your competition is learning <br className="hidden md:block" />
            <span className="italic text-[var(--gold)]">AI &amp; Digital Marketing.</span>
            <br />
            What are you waiting for?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg max-md:text-base text-[var(--ink-soft)] max-w-xl mx-auto mb-10 max-md:mb-8 leading-relaxed max-md:px-4"
          >
            Discover the skills shaping careers, businesses, and opportunities in the modern digital economy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-row max-md:flex-col items-center gap-4 max-md:w-full max-md:px-4"
          >
            <Button href={WHATSAPP_LINK} variant="primary" className="max-md:w-full">
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
            Don't wait until you need the skill<br className="hidden md:block" /> to start learning it.
          </h2>
          <p className="text-white/70 text-lg max-md:text-base leading-relaxed max-w-3xl mx-auto font-light mb-12 max-md:mb-10">
            If you are a student, professional, business owner, freelancer, creator, or career switcher, understanding digital marketing could become one of the most valuable advantages you build for the digital economy.
          </p>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-md:p-6 max-w-2xl mx-auto text-left">
            <div className="text-xs max-md:text-[10px] tracking-widest text-white/50 mb-6 font-semibold">In this LIVE webinar, discover:</div>
            <ul className="space-y-4 text-sm max-md:text-base text-white/80">
              {[
                "What Digital Marketing really involves",
                "Which skills businesses are looking for",
                "How AI is transforming marketing",
                "How SEO, Ads, Social Media, Content & Automation work together",
                "And which path could be right for you"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-[var(--gold)] shrink-0" strokeWidth={1.5} />
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
            <Button href={WHATSAPP_LINK} variant="primary" className="w-full">
              RESERVE MY SEAT FOR ₹39 →
            </Button>
          </div>

          <div className="flex flex-row max-md:flex-col justify-center items-center gap-6 max-md:gap-4 text-sm max-md:text-xs text-[var(--ink-soft)] font-medium">
            <div className="flex gap-1 text-[var(--gold)]">
              ★★★★★
            </div>
            <div className="max-md:hidden">•</div>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="flex items-center gap-1.5"><Ticket className="w-4 h-4" /> Limited Seats</span>
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
          <Button href={WHATSAPP_LINK} variant="primary" className="max-md:w-full">
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
          <Button href={WHATSAPP_LINK} variant="secondary" className="max-md:w-full">
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

      {/* ── 7 SECTION ROADMAP (SCROLL STACK ANIMATIONS) ──────────────── */}
      <section className="bg-[var(--beige)] py-32 max-md:py-20 px-6 max-md:px-4 relative z-10">
        <div className="max-w-4xl mx-auto mb-20 max-md:mb-16 text-center">
          <div className="text-[10px] tracking-[0.2em] text-[var(--ink-soft)] font-semibold mb-4">The 7-Section Roadmap</div>
          <h2 className="font-display text-5xl max-md:text-3xl leading-tight font-light text-[var(--ink)] mb-6">
            A curriculum that mirrors a real marketing career
          </h2>
          <p className="text-[var(--ink-soft)] text-lg max-md:text-base max-w-2xl mx-auto mb-8">
            Digital marketing isn't one skill. It's an ecosystem of interconnected skills. 
            Our learning roadmap takes you from the fundamentals to advanced AI-powered marketing, career development, freelancing, and agency systems.
          </p>
          <div className="font-display text-2xl max-md:text-xl text-[var(--ink)]">7 guided sections.<br />One complete digital marketing roadmap.</div>
        </div>

        <div className="max-w-5xl mx-auto relative space-y-0 max-md:space-y-8">
          {sections.map((section, index) => (
            <motion.div 
              key={section.num}
              className={`relative pt-10 pb-10 max-md:pt-8 max-md:pb-8 flex flex-row max-md:flex-col gap-16 max-md:gap-6 border-t border-[var(--ink)]/10 bg-[var(--beige)] section-stack-wrapper-${index}`}
              style={{ zIndex: 10 + index } as React.CSSProperties}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px", once: true }}
              transition={{ duration: 0.6 }}
            >
              <style dangerouslySetInnerHTML={{__html: `
                @media (min-width: 768px) {
                  .section-stack-wrapper-${index} {
                    position: sticky !important;
                    top: ${80 + index * 10}px;
                  }
                }
              `}} />
              
              <div className="w-full flex flex-row max-md:flex-col gap-16 max-md:gap-6">
                <div className="w-1/3 max-md:w-full">
                  <div className="font-display text-6xl max-md:text-5xl text-[var(--ink)]/10 mb-2">Section {section.num}</div>
                  <h3 className="font-display text-2xl max-md:text-xl text-[var(--ink)] mb-2 ">{section.title}</h3>
                  <div className="text-xs max-md:text-[10px] font-semibold text-[var(--gold)] tracking-widest mb-4 max-md:mb-3">{section.tagline}</div>
                  <p className="text-[var(--ink-soft)] text-sm leading-relaxed mb-6 max-md:mb-4">{section.desc}</p>
                  {index === 0 && <div className="text-xs max-md:text-[10px] tracking-widest text-[var(--ink)] font-bold mb-4">You'll explore:</div>}
                </div>
                <div className="w-2/3 max-md:w-full bg-white p-8 max-md:p-6 rounded-3xl shadow-sm border border-[var(--ink)]/5">
                  <ul className="space-y-6 max-md:space-y-4">
                    {section.topics.map((topic, i) => (
                      <li key={i} className="flex gap-4 max-md:gap-3">
                        <div className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full mt-2 shrink-0" />
                        <div>
                          <div className="font-semibold text-[var(--ink)] text-sm tracking-wide mb-1">{topic.name}</div>
                          {topic.detail && <div className="text-[var(--ink-soft)] text-sm max-md:text-xs">{topic.detail}</div>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── THE BIG PICTURE (MULTIPLE PATHS) ───────────────────────────── */}
      <section className="py-32 max-md:py-20 px-6 max-md:px-4 bg-[var(--ink)] text-white relative z-20 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 max-md:mb-16">
            <div className="text-[10px] tracking-[0.2em] text-[var(--gold)] font-bold mb-4">07. The Big Picture</div>
            <h2 className="font-display text-5xl max-md:text-3xl leading-tight font-light mb-6">
              One course. Multiple digital marketing paths.
            </h2>
            <p className="text-white/60 text-lg max-md:text-base max-w-2xl mx-auto">
              By understanding the complete ecosystem, you can explore different directions based on your interests and goals.
            </p>
          </div>

          <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6">
            {[
              { title: "Career", items: ["Digital Marketing Executive", "SEO Specialist", "Social Media Marketer", "Performance Marketer", "Content Marketer", "Paid Ads Specialist", "Marketing Automation Specialist", "AI Marketing Specialist"] },
              { title: "Freelancing", items: ["SEO Services", "Social Media Management", "Content Creation", "Paid Advertising", "Website & Landing Pages", "Marketing Automation", "AI Marketing Services"] },
              { title: "Business", items: ["Lead Generation", "Customer Acquisition", "Personal Branding", "Marketing Automation", "Conversion Optimization"] },
              { title: "Agency", items: ["Client Acquisition", "Service Delivery", "Team Building", "SOPs", "Campaign Management", "Scaling"] },
            ].map((path, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 max-md:p-6 rounded-3xl backdrop-blur-sm">
                <h3 className="font-display text-2xl max-md:text-xl text-[var(--gold)] mb-6 max-md:mb-4 text-center">{path.title}</h3>
                <ul className="space-y-3">
                  {path.items.map((item, j) => (
                    <li key={j} className="text-white/70 text-sm max-md:text-xs flex items-start gap-2">
                      <span className="text-white/30 text-xs max-md:text-[10px] mt-0.5">✦</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ────────────────────────────────────────────── */}
      <section className="py-24 max-md:py-20 px-6 max-md:px-4 bg-[var(--beige-light)] z-10 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 max-md:mb-12">
            <div className="text-[10px] tracking-[0.2em] text-[var(--ink-soft)] font-semibold mb-4">Who is this webinar for?</div>
            <h2 className="font-display text-5xl max-md:text-2xl leading-tight font-light text-[var(--ink)] mb-6 max-md:mb-4">
              You don't need to be a marketing expert.
            </h2>
            <p className="text-[var(--ink-soft)] text-lg max-md:text-base">This webinar is designed for anyone who wants to understand the digital marketing world.</p>
          </div>

          <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6 max-md:gap-4">
            {[
              { t: "Students", d: "Want to explore a modern, high-demand skill set and understand possible career paths." },
              { t: "Working Professionals", d: "Want to add digital skills to your existing career and stay relevant in a changing workplace." },
              { t: "Business Owners", d: "Want to understand how digital marketing can help generate visibility, leads, and customers." },
              { t: "Freelancers", d: "Want to explore digital marketing as a service and create additional income opportunities." },
              { t: "Creators", d: "Want to build an audience, personal brand, and digital presence." },
              { t: "Career Switchers", d: "Want to understand the industry before making the move into digital marketing." }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[var(--ink)]/5 p-8 max-md:p-6 rounded-2xl shadow-sm">
                <h3 className="font-display text-xl max-md:text-lg text-[var(--ink)] mb-3 max-md:mb-2">{item.t}</h3>
                <p className="text-[var(--ink-soft)] text-sm leading-relaxed">{item.d}</p>
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
              <div className="text-[10px] tracking-[0.2em] text-[var(--ink-soft)] font-semibold mb-4">What you'll walk away with</div>
              <h2 className="font-display text-4xl max-md:text-2xl leading-tight font-light text-[var(--ink)] mb-6">Leave with clarity.</h2>
              <p className="text-[var(--ink-soft)] mb-8 max-md:mb-6 max-md:text-sm">After the webinar, you should have a clearer understanding of:</p>
              <ul className="space-y-4">
                {[
                  "What Digital Marketing really means",
                  "Which major skills and channels exist",
                  "How SEO, social media, ads, content and websites connect",
                  "Where automation and AI fit into modern marketing",
                  "Which skills you should consider learning first",
                  "What career, freelancing and business paths are available",
                  "What a complete digital marketing learning roadmap looks like"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 max-md:gap-3 items-start">
                    <span className="font-display text-[var(--ink)]/20 text-xl max-md:text-lg leading-none pt-1">0{i+1}</span>
                    <span className="text-[var(--ink)] font-medium text-sm max-md:text-xs">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[var(--ink)] text-white p-10 max-md:p-8 rounded-3xl flex flex-col justify-center">
              <div className="text-[10px] tracking-[0.2em] text-[var(--gold)] font-bold mb-4">The Autodigix Approach</div>
              <h2 className="font-display text-3xl max-md:text-2xl leading-tight font-light mb-6">
                Don't just learn tools.<br />Learn how the pieces connect.
              </h2>
              <p className="text-white/70 italic mb-10 max-md:mb-8 max-md:text-sm">A tool is only useful when you know what problem you're solving.</p>
              
              <div className="bg-white/10 p-6 max-md:p-5 rounded-2xl border border-white/10">
                <div className="text-xs max-md:text-[10px] tracking-widest text-white/50 mb-2">Here's what most beginners get wrong...</div>
                <div className="text-white/70 text-sm max-md:text-xs mb-4">They start with: <span className="text-white font-medium">"Which tool should I learn?"</span></div>
                <div className="text-xs max-md:text-[10px] tracking-widest text-[var(--gold)] mb-2 font-bold">But the better question is:</div>
                <div className="text-white font-display text-xl max-md:text-lg">"Which problem am I trying to solve?"</div>
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

              <Button href={WHATSAPP_LINK} variant="secondary" className="w-full">
                YES, I WANT TO JOIN FOR ₹39 →
              </Button>
            </div>

            <div className="p-8 max-md:p-4">
              <h3 className="font-display text-2xl max-md:text-xl text-[var(--ink)] mb-6 max-md:mb-4">
                How much would it cost to figure all this out on your own?
              </h3>
              <p className="text-[var(--ink-soft)] max-md:text-sm mb-6 max-md:mb-4">You could spend weeks jumping between:</p>
              <ul className="space-y-2 text-[var(--ink)] max-md:text-sm font-medium mb-6">
                <li>• YouTube videos.</li>
                <li>• Random blogs.</li>
                <li>• Instagram reels.</li>
                <li>• Different courses.</li>
                <li>• Different tools.</li>
                <li>• Different opinions.</li>
              </ul>
              <p className="italic text-[var(--ink-soft)] max-md:text-sm mb-6 max-md:mb-4">And still wonder: "Where do I actually start?"</p>
              <p className="text-[var(--ink-soft)] max-md:text-sm mb-8 max-md:mb-6">This webinar gives you a structured overview of the digital marketing ecosystem so you can understand the bigger picture before deciding your next step.</p>
              
              <div className="bg-white border border-[var(--ink)]/10 p-6 max-md:p-5 rounded-2xl text-center">
                <div className="text-xs max-md:text-[10px] tracking-[0.2em] text-[var(--ink-soft)] font-semibold mb-2">Your investment today:</div>
                <div className="font-display text-4xl max-md:text-3xl text-[var(--ink)] mb-2">₹39</div>
                <div className="text-[var(--ink-soft)] text-sm max-md:text-xs">That's it.</div>
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
          <Button href={WHATSAPP_LINK} variant="primary" className="max-md:w-full">
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
          <div className="text-[10px] tracking-[0.2em] text-[var(--gold)] font-bold mb-4">YOUR DIGITAL FUTURE WON'T WAIT.</div>
          <p className="text-white/70 text-lg max-md:text-base mb-8 leading-relaxed">
            The world is already digital.<br/>
            Businesses are already competing for attention online.<br/>
            AI is already changing how marketing works.<br/><br/>
            <span className="font-display text-2xl max-md:text-xl text-white">The opportunity is not just to watch it happen.<br className="hidden sm:block" /> IT'S TO UNDERSTAND IT.</span>
          </p>
          <p className="text-white/60 max-md:text-sm mb-12 max-md:mb-10 max-w-xl mx-auto">
            Start with the basics. Understand the ecosystem. Discover the skills. See where you fit. And decide your next move.
          </p>
          
          <h2 className="font-display text-6xl max-md:text-3xl leading-tight font-light mb-8">
            THE WORLD IS GOING DIGITAL.<br/>ARE YOU KEEPING UP?
          </h2>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 max-md:p-6 max-w-2xl mx-auto mb-8 max-md:mx-4 sm:max-md:mx-auto">
            <div className="text-xs max-md:text-[10px] tracking-widest text-white/50 mb-6 font-semibold">JOIN THE AUTODIGIX DIGITAL MARKETING WEBINAR</div>
            <div className="flex flex-row max-md:flex-col justify-center items-center gap-4 max-md:gap-2 text-sm max-md:text-xs font-semibold tracking-widest mb-8 max-md:mb-6 text-[var(--gold)]">
              <span>LIVE ONLINE</span> <span className="max-md:hidden">•</span> <span>29 AUGUST 2026</span> <span className="max-md:hidden">•</span> <span>6:00 PM</span>
            </div>
            <div className="font-display text-6xl max-md:text-5xl font-light mb-8 max-md:mb-6">₹39/-</div>
            <Button href={WHATSAPP_LINK} variant="secondary" className="max-md:w-full">
              REGISTER NOW →
            </Button>
          </div>
          
          <div className="text-xs max-md:text-[10px] text-white/40 tracking-widest font-semibold flex flex-row max-md:flex-col justify-center gap-3 max-md:gap-2">
            <span>Limited Seats</span> <span className="max-md:hidden">|</span> <span>Live Online</span> <span className="max-md:hidden">|</span> <span>Expert-Led Webinar</span>
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
