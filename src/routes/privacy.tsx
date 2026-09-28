import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  UserCheck, 
  Cookie, 
  Cpu, 
  Globe, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  Database
} from "lucide-react";
import { Reveal, RevealText } from "../components/Reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | AutoDigiX — AI Automation & Digital Marketing" },
      {
        name: "description",
        content:
          "Read the official AutoDigiX Privacy Policy. Learn how we collect, use, protect, and handle client data, cookies, and AI automation processes transparently.",
      },
      {
        name: "keywords",
        content:
          "AutoDigiX privacy policy, data protection, GDPR compliance, DPDP Act India, digital marketing agency privacy, client data security",
      },
      { property: "og:title", content: "Privacy Policy | AutoDigiX" },
      {
        property: "og:description",
        content: "Transparent information on how AutoDigiX safeguards your personal and business data.",
      },
      { property: "og:url", content: "https://autodigix.in/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://autodigix.in/privacy" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy · AutoDigiX",
          description: "Privacy policy and data governance practices of AutoDigiX.",
          url: "https://autodigix.in/privacy",
          publisher: {
            "@type": "Organization",
            name: "AutoDigiX",
            url: "https://autodigix.in",
            logo: "https://autodigix.in/logo.png",
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://autodigix.in/" },
              { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://autodigix.in/privacy" },
            ],
          },
        }),
      },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  { id: "overview", label: "1. Overview & Commitment", icon: ShieldCheck },
  { id: "collection", label: "2. Information We Collect", icon: Database },
  { id: "usage", label: "3. How We Use Data", icon: FileText },
  { id: "ai-privacy", label: "4. AI & Automation Privacy", icon: Cpu },
  { id: "cookies", label: "5. Cookies & Tracking", icon: Cookie },
  { id: "sharing", label: "6. Third-Party Sharing", icon: Globe },
  { id: "security", label: "7. Security & Storage", icon: Lock },
  { id: "rights", label: "8. Your Data Rights", icon: UserCheck },
  { id: "contact", label: "9. Contact Information", icon: Mail },
];

function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -120;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[var(--beige)] min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 px-6 overflow-hidden border-b border-[var(--ink)]/5">
        <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--ink-soft)]/70 mb-4">
            <Link to="/" className="hover:text-[var(--ink)] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="text-[var(--ink)] font-semibold">Privacy Policy</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--ink)]/5 border border-[var(--ink)]/10 text-xs text-[var(--ink)] mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Effective Date: March 2026 · Version 2.1
          </div>

          <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.1] text-[var(--ink)] font-light max-w-4xl">
            <RevealText text="Privacy & Data Governance Policy" />
          </h1>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-[var(--ink-soft)] leading-relaxed">
              At AutoDigiX, protecting your personal privacy and client confidentiality is fundamental to how we engineer digital marketing solutions, AI automations, and growth systems.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Quick Table of Contents Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-[var(--beige-light)] p-6 md:p-8 rounded-3xl border border-[var(--ink)]/10 shadow-soft">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[var(--ink)] font-semibold mb-6">
                <FileText className="w-4 h-4 text-gold" />
                Table of Contents
              </div>
              <nav className="space-y-1.5">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[var(--ink)] text-[var(--beige-light)] shadow-sm"
                          : "text-[var(--ink-soft)] hover:bg-[var(--beige)] hover:text-[var(--ink)]"
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[var(--beige-light)]" : "text-gold"}`} />
                      <span className="truncate">{sec.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-[var(--ink)]/10">
                <div className="text-xs font-semibold text-[var(--ink)] mb-2">Have privacy questions?</div>
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed mb-4">
                  Our Data Protection team is available to assist with any access or deletion requests.
                </p>
                <a
                  href="mailto:info@autodigix.in?subject=Privacy%20Inquiry"
                  className="inline-flex items-center gap-2 text-xs font-medium text-[var(--ink)] hover:text-gold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-gold" /> info@autodigix.in
                </a>
              </div>
            </div>
          </aside>

          {/* Policy Detail Sections */}
          <main className="lg:col-span-8 space-y-12">

            {/* 1. Overview */}
            <article id="overview" className="bg-[var(--beige-light)] p-8 md:p-10 rounded-3xl border border-[var(--ink)]/10 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink)]">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light">
                  1. Overview & Commitment
                </h2>
              </div>
              <div className="space-y-4 text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                <p>
                  AutoDigiX (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), founded by Praveen Gorla, operates as an AI Automation and Digital Marketing agency offering performance marketing, search engine optimization (SEO), paid media advertising (Google Ads, Meta Ads), custom web development, and revenue operations infrastructure.
                </p>
                <p>
                  This Privacy Policy outlines the types of personal and business information we collect when you browse <strong className="text-[var(--ink)]">https://autodigix.in</strong>, engage our consulting services, enroll in our courses or webinars, or interact with our automated systems.
                </p>
                <div className="p-4 rounded-2xl bg-[var(--beige)] border border-[var(--ink)]/5 mt-4">
                  <p className="text-xs md:text-sm text-[var(--ink)] font-medium flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>
                      We adhere to global privacy principles and applicable data protection regulations including the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong> (India), <strong>General Data Protection Regulation (GDPR)</strong> (EU/UK), and fair information practices.
                    </span>
                  </p>
                </div>
              </div>
            </article>

            {/* 2. Information We Collect */}
            <article id="collection" className="bg-[var(--beige-light)] p-8 md:p-10 rounded-3xl border border-[var(--ink)]/10 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink)]">
                  <Database className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light">
                  2. Information We Collect
                </h2>
              </div>
              <div className="space-y-4 text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                <p>We collect information in three primary ways:</p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div className="p-5 rounded-2xl bg-[var(--beige)] border border-[var(--ink)]/5">
                    <h3 className="font-display text-base text-[var(--ink)] font-medium mb-2">Direct Submissions</h3>
                    <ul className="text-xs md:text-sm space-y-1.5 list-disc pl-4 text-[var(--ink-soft)]">
                      <li>Full name and job title</li>
                      <li>Business email address</li>
                      <li>Phone number / WhatsApp contact</li>
                      <li>Company name and website URL</li>
                      <li>Marketing budget, goals, and project briefs</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[var(--beige)] border border-[var(--ink)]/5">
                    <h3 className="font-display text-base text-[var(--ink)] font-medium mb-2">Automated & Technical Data</h3>
                    <ul className="text-xs md:text-sm space-y-1.5 list-disc pl-4 text-[var(--ink-soft)]">
                      <li>IP address and approximate geographic location</li>
                      <li>Browser type, operating system, and device specs</li>
                      <li>Referring URL and navigation pathways</li>
                      <li>Session duration and interaction timestamps</li>
                    </ul>
                  </div>
                </div>

                <p className="pt-2">
                  When you engage AutoDigiX for managed marketing campaigns, you may provide access tokens or delegated manager permissions to your ad accounts (e.g., Google Ads Manager, Meta Business Suite, Google Analytics 4, CRM platforms). We treat all client business data as strictly confidential.
                </p>
              </div>
            </article>

            {/* 3. How We Use Data */}
            <article id="usage" className="bg-[var(--beige-light)] p-8 md:p-10 rounded-3xl border border-[var(--ink)]/10 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink)]">
                  <FileText className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light">
                  3. How We Use Your Information
                </h2>
              </div>
              <div className="space-y-4 text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                <p>We process your data for legitimate business purposes, including:</p>
                <ul className="space-y-2.5">
                  {[
                    "Delivering custom performance marketing, PPC ad management, and SEO strategies tailored to your target audience.",
                    "Configuring custom AI automated workflows, CRM enrichments, and multi-channel lead pipelines.",
                    "Responding to consultation requests, service inquiries, and client support messages.",
                    "Generating transparent monthly ROI reports, campaign audits, and analytics dashboards.",
                    "Sending transactional notifications, webinar invites, course updates, and periodic growth insights (you may opt out at any time).",
                    "Preventing fraud, safeguarding network security, and complying with legal obligations.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* 4. AI & Automation Privacy */}
            <article id="ai-privacy" className="bg-[var(--beige-light)] p-8 md:p-10 rounded-3xl border border-[var(--ink)]/10 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink)]">
                  <Cpu className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light">
                  4. AI & Automation Workflow Privacy
                </h2>
              </div>
              <div className="space-y-4 text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                <p>
                  As an agency specializing in Artificial Intelligence and automated revenue operations, we uphold strict guidelines regarding how AI models and automation webhooks interact with your data:
                </p>
                <div className="grid gap-3">
                  <div className="p-4 rounded-2xl bg-[var(--beige)] border border-[var(--ink)]/5">
                    <strong className="text-[var(--ink)] block mb-1">No Model Training on Client Proprietary Data:</strong>
                    <span className="text-xs md:text-sm">We ensure that proprietary customer lists, lead databases, and proprietary business materials are never used to train public commercial AI models without explicit written authorization.</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--beige)] border border-[var(--ink)]/5">
                    <strong className="text-[var(--ink)] block mb-1">Secure API Integrations:</strong>
                    <span className="text-xs md:text-sm">All AI automations (e.g. OpenAI, Anthropic, Make.com, Zapier, custom Python agents) utilize enterprise-grade API tiers with zero-data-retention or encryption agreements where available.</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--beige)] border border-[var(--ink)]/5">
                    <strong className="text-[var(--ink)] block mb-1">Human-in-the-Loop Oversight:</strong>
                    <span className="text-xs md:text-sm">Critical campaign decisions, outbound communications, and ad budgets undergo rigorous human review by our strategic directors.</span>
                  </div>
                </div>
              </div>
            </article>

            {/* 5. Cookies & Tracking */}
            <article id="cookies" className="bg-[var(--beige-light)] p-8 md:p-10 rounded-3xl border border-[var(--ink)]/10 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink)]">
                  <Cookie className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light">
                  5. Cookies & Tracking Technologies
                </h2>
              </div>
              <div className="space-y-4 text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                <p>
                  We use cookies, web beacons, and local storage tokens to recognize returning visitors, analyze website engagement trends, and optimize user experience.
                </p>
                <div className="space-y-2 text-xs md:text-sm">
                  <p><strong>Essential Cookies:</strong> Required for site navigation, security, and asset delivery.</p>
                  <p><strong>Analytics Cookies:</strong> Google Analytics 4 tracks aggregated visitor volume, top-performing pages, and device types.</p>
                  <p><strong>Marketing Pixels:</strong> Meta Pixel / Google Ads conversion tracking cookies help us evaluate the efficiency of our promotional campaigns.</p>
                </div>
                <p className="text-xs md:text-sm text-[var(--ink-soft)]/80">
                  You can modify your browser preferences to reject non-essential cookies or notify you whenever a cookie is placed.
                </p>
              </div>
            </article>

            {/* 6. Third-Party Sharing */}
            <article id="sharing" className="bg-[var(--beige-light)] p-8 md:p-10 rounded-3xl border border-[var(--ink)]/10 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink)]">
                  <Globe className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light">
                  6. Third-Party Disclosures & Sub-Processors
                </h2>
              </div>
              <div className="space-y-4 text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                <p>
                  <strong className="text-[var(--ink)]">We do NOT sell, rent, or trade your personal or business data to third-party data brokers under any circumstances.</strong>
                </p>
                <p>
                  We may share limited data with trusted infrastructure providers and sub-processors who assist us in operating our business under contractual data confidentiality terms:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 text-xs md:text-sm pt-2">
                  <li className="p-3 bg-[var(--beige)] rounded-xl border border-[var(--ink)]/5">Cloud Hosting: Vercel & Cloudflare</li>
                  <li className="p-3 bg-[var(--beige)] rounded-xl border border-[var(--ink)]/5">Analytics: Google Analytics 4</li>
                  <li className="p-3 bg-[var(--beige)] rounded-xl border border-[var(--ink)]/5">Email & Communications: Nodemailer / Google Workspace</li>
                  <li className="p-3 bg-[var(--beige)] rounded-xl border border-[var(--ink)]/5">Advertising Networks: Google Ads & Meta Ads</li>
                </ul>
              </div>
            </article>

            {/* 7. Security & Storage */}
            <article id="security" className="bg-[var(--beige-light)] p-8 md:p-10 rounded-3xl border border-[var(--ink)]/10 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink)]">
                  <Lock className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light">
                  7. Data Security & Retention
                </h2>
              </div>
              <div className="space-y-4 text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                <p>
                  AutoDigiX implements modern technical and organizational measures to protect personal information against unauthorized access, destruction, loss, or alteration. These measures include:
                </p>
                <ul className="space-y-2 text-xs md:text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>SSL/TLS 256-bit encryption for all data in transit across our web applications.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Strict least-privilege role-based access for agency employees and contractor pods.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Periodic security hygiene audits and automated backup processes.</span>
                  </li>
                </ul>
                <p className="text-xs md:text-sm text-[var(--ink-soft)]/80">
                  We retain data only as long as necessary to fulfill the operational purposes for which it was gathered or as mandated by regulatory, accounting, and legal requirements.
                </p>
              </div>
            </article>

            {/* 8. Your Data Rights */}
            <article id="rights" className="bg-[var(--beige-light)] p-8 md:p-10 rounded-3xl border border-[var(--ink)]/10 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink)]">
                  <UserCheck className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light">
                  8. Your Rights & Choices
                </h2>
              </div>
              <div className="space-y-4 text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                <p>Depending on your jurisdiction, you have specific legal rights concerning your personal information:</p>
                <div className="grid md:grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="p-3.5 bg-[var(--beige)] rounded-xl border border-[var(--ink)]/5">
                    <strong>Right to Access:</strong> Request a copy of the personal information we hold about you.
                  </div>
                  <div className="p-3.5 bg-[var(--beige)] rounded-xl border border-[var(--ink)]/5">
                    <strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete records.
                  </div>
                  <div className="p-3.5 bg-[var(--beige)] rounded-xl border border-[var(--ink)]/5">
                    <strong>Right to Erasure:</strong> Request permanent deletion of your contact records (&quot;Right to be Forgotten&quot;).
                  </div>
                  <div className="p-3.5 bg-[var(--beige)] rounded-xl border border-[var(--ink)]/5">
                    <strong>Right to Opt-Out:</strong> Unsubscribe from marketing communications at any moment.
                  </div>
                </div>
                <p className="text-xs md:text-sm">
                  To exercise any of these rights, email us at <a href="mailto:info@autodigix.in" className="text-gold font-medium hover:underline">info@autodigix.in</a> with the subject line <em>&quot;Privacy Rights Request&quot;</em>.
                </p>
              </div>
            </article>

            {/* 9. Contact Information */}
            <article id="contact" className="bg-[var(--beige-light)] p-8 md:p-10 rounded-3xl border border-[var(--ink)]/10 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink)]">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light">
                  9. Contact & Data Governance Office
                </h2>
              </div>
              <div className="space-y-4 text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                <p>
                  If you have questions, comments, or concerns about this Privacy Policy or AutoDigiX data handling standards, please reach out to our team:
                </p>
                
                <div className="p-6 rounded-2xl bg-[var(--beige)] border border-[var(--ink)]/10 space-y-3">
                  <div className="font-display text-lg text-[var(--ink)] font-medium">AutoDigiX Data Privacy Office</div>
                  <div className="text-xs md:text-sm space-y-1.5 text-[var(--ink-soft)]">
                    <p><strong>Founder & CEO:</strong> Praveen Gorla</p>
                    <p><strong>Official Email:</strong> <a href="mailto:officialautodigix@gmail.com" className="text-[var(--ink)] hover:text-gold transition">officialautodigix@gmail.com</a></p>
                    <p><strong>Inquiries & Support:</strong> <a href="mailto:info@autodigix.in" className="text-[var(--ink)] hover:text-gold transition">info@autodigix.in</a></p>
                    <p><strong>Direct Helpline:</strong> <a href="tel:+918639191907" className="text-[var(--ink)] hover:text-gold transition">+91 8639191907</a></p>
                    <p><strong>Headquarters:</strong> India · Serving Global Clients (USA, UAE, UK, Europe)</p>
                  </div>
                </div>
              </div>
            </article>

          </main>
        </div>
      </section>
    </div>
  );
}
