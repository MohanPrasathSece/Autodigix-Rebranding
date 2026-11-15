import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle2,
  ChevronDown,
  UploadCloud,
  FileText,
  X,
  Bot,
  TrendingUp,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Check,
} from "lucide-react";
import { Reveal, CinematicTitle } from "../components/Reveal";

// =========================================================================
// 💼 CURRENT OPENINGS (DROPDOWN OPTIONS)
// =========================================================================
export const availableRoles = [
  "Digital Marketing Intern",
  "AI Automation Intern",
] as const;

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers · Join Our Team | AutoDigiX" },
      {
        name: "description",
        content:
          "Join AutoDigiX as a Digital Marketing Intern or AI Automation Intern (2025 Batch). We value real skills over degree. Apply with your resume today.",
      },
      { property: "og:title", content: "Careers · Join Our Team | AutoDigiX" },
      {
        property: "og:description",
        content:
          "Hiring 2025 graduates for Digital Marketing & AI Automation Internships. We value pure skills and strong communication.",
      },
      { property: "og:url", content: "https://autodigix.in/careers" },
    ],
    links: [{ rel: "canonical", href: "https://autodigix.in/careers" }],
  }),
  component: CareersPage,
});

const openingsData = [
  {
    id: "digital-marketing-intern",
    roleName: "Digital Marketing Intern" as const,
    badge: "Immediate Opening",
    icon: TrendingUp,
    type: "3 Months Internship (Leading to Full-Time)",
    duration: "3 Months",
    batch: "2025 Graduates (Any Degree)",
    location: "Remote",
    overview:
      "Work directly on live client acquisition funnels, Meta & Google Ads campaigns, SEO optimization, and data-driven growth strategies.",
    highlights: [
      "Duration: 3 Months Internship (Leading to Full-Time Conversion)",
      "Location: 100% Remote (Work from Anywhere)",
      "Graduation Year: 2025 Batch (Passing out in 2025)",
      "Degree: Open to ALL degrees (B.Tech, B.E., B.Sc, BCA, BBA, B.Com, etc.) - We value real skills over college brand or degree branch",
      "Communication: Strong English verbal and written communication with the confidence for client discussions",
      "Key Skills: Understanding of Meta Ads Manager, Google Ads, SEO fundamentals, and analytical reporting",
      "Perks: Practical client exposure, mentorship by senior marketers, and full-time conversion opportunities",
    ],
  },
  {
    id: "ai-automation-intern",
    roleName: "AI Automation Intern" as const,
    badge: "Immediate Opening",
    icon: Bot,
    type: "3 Months Internship (Leading to Full-Time)",
    duration: "3 Months",
    batch: "2025 Graduates (Any Degree)",
    location: "Remote",
    overview:
      "Build real-world automation pipelines, webhook integrations, and AI agent workflows using N8N, Zapier, Make.com, and LLM APIs.",
    highlights: [
      "Duration: 3 Months Internship (Leading to Full-Time Conversion)",
      "Location: 100% Remote (Work from Anywhere)",
      "Graduation Year: 2025 Batch (Passing out in 2025)",
      "Degree: Open to ALL degrees (B.Tech, B.E., B.Sc, BCA, BBA, B.Com, etc.) - Skills, curiosity and execution power are what count",
      "Communication: Clear English articulation and client communication to understand business bottlenecks",
      "Key Skills: Hands-on curiosity with Zapier, N8N, Make.com, REST APIs, Webhooks, and AI tools (OpenAI / Claude APIs)",
      "Perks: Work with cutting-edge AI agent systems, fast-paced learning, and full-time placement potential",
    ],
  },
];

function CareersPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: availableRoles[0] as string,
    resumeUrl: "",
    message: "",
  });

  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: number;
    type: string;
    base64: string;
  } | null>(null);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSelectRoleFromCard = (role: (typeof availableRoles)[number]) => {
    setForm((prev) => ({ ...prev, role }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setErrorMsg("Resume file size exceeds 4MB. Please upload a smaller file or provide a link below.");
      return;
    }

    setErrorMsg("");
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFile({
        name: file.name,
        size: file.size,
        type: file.type || "application/pdf",
        base64: reader.result as string,
      });
    };
    reader.onerror = () => {
      setErrorMsg("Failed to read the file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!agreedToTerms) {
      setErrorMsg("Please agree to the terms and conditions before submitting your application.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: `[CAREER APPLICATION] Role: ${form.role} | Phone: ${form.phone}`,
        role: form.role,
        resumeUrl: form.resumeUrl,
        message: form.message || `Application for ${form.role}${selectedFile ? ` (Attached Resume: ${selectedFile.name})` : ""}`,
        type: "career",
        file: selectedFile
          ? {
              name: selectedFile.name,
              type: selectedFile.type,
              base64: selectedFile.base64,
            }
          : null,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          role: availableRoles[0],
          resumeUrl: "",
          message: "",
        });
        setSelectedFile(null);
        setAgreedToTerms(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Failed to submit. Please email us directly at info@autodigix.com.");
      }
    } catch {
      setErrorMsg("Something went wrong while sending. Please reach out via email at info@autodigix.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--beige)] pt-40 pb-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--ink)]/5 text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)] font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            Careers at AutoDigiX
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-[var(--ink)] leading-[1.1] mb-6">
            <CinematicTitle text="Join Our Team." />
          </h1>

          <p className="max-w-2xl mx-auto text-[var(--ink-soft)] text-base md:text-lg leading-relaxed">
            We are looking for ambitious, skill-first builders and growth minds to join our innovation team.
            We prioritize real execution and strong communication over degrees or college tiers.
          </p>
        </div>

        {/* Core Hiring Philosophy Callout */}
        <Reveal delay={0.1}>
          <div className="mb-14 p-6 md:p-8 rounded-2xl bg-[var(--beige-light)] border border-[var(--ink)]/5 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-lg md:text-xl text-[var(--ink)] font-light">
                  Skill-First Hiring - Batch of 2025
                </h3>
                <p className="text-sm md:text-[15px] text-[var(--ink-soft)] mt-1 leading-relaxed">
                  B.Tech, B.E., B.Sc, BCA, BBA, B.Com - all educational backgrounds are welcome. Your problem-solving and client communication are what set you apart.
                </p>
              </div>
            </div>
            <span className="shrink-0 text-xs uppercase tracking-wider font-semibold px-3.5 py-1.5 rounded-full bg-[var(--ink)] text-[var(--beige-light)]">
              2 Active Openings
            </span>
          </div>
        </Reveal>

        {/* Open Positions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {openingsData.map((opening, idx) => {
            const Icon = opening.icon;
            return (
              <Reveal key={opening.id} delay={0.15 + idx * 0.1}>
                <div className="p-8 md:p-10 rounded-[2rem] bg-[var(--beige-light)] border border-[var(--ink)]/5 shadow-soft flex flex-col justify-between h-full hover:shadow-gold transition-all duration-300">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink)]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3.5 py-1 rounded-full text-[11px] uppercase tracking-widest font-semibold bg-emerald-500/10 text-emerald-700">
                        {opening.badge}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light mb-2">
                      {opening.roleName}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-[var(--ink-soft)]/80 mb-5">
                      <span className="flex items-center gap-1 font-medium text-[var(--gold)]">
                        <Clock className="w-4 h-4" /> {opening.type}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {opening.location}
                      </span>
                    </div>

                    <p className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed mb-6">
                      {opening.overview}
                    </p>

                    {/* Requirements checklist with increased legible text size */}
                    <div className="space-y-3.5 pt-4 border-t border-[var(--ink)]/5 mb-8">
                      {opening.highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm md:text-[14.5px] text-[var(--ink-soft)] leading-relaxed">
                          <Check className="w-4 h-4 text-[var(--gold)] shrink-0 mt-1" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectRoleFromCard(opening.roleName)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--ink)] text-[var(--beige-light)] text-sm font-medium hover:shadow-gold transition-all duration-300 cursor-pointer"
                  >
                    Apply for this Role <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Application Form Section */}
        <div ref={formRef} id="application-form">
          <Reveal delay={0.25}>
            <div className="p-8 md:p-12 rounded-[2rem] bg-[var(--beige-light)] border border-[var(--ink)]/5 shadow-soft">
              <div className="mb-8">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] font-medium mb-1">
                  Online Application
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light text-[var(--ink)] mb-2">
                  Submit Your Application
                </h3>
                <p className="text-sm md:text-base text-[var(--ink-soft)]">
                  Select your role, attach your resume (PDF or DOCX), and our leadership team will review your application.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-2xl text-[var(--ink)] font-light mb-2">
                    Application Successfully Submitted!
                  </h4>
                  <p className="text-sm md:text-base text-[var(--ink-soft)] max-w-md mx-auto leading-relaxed">
                    Thank you! Your resume document and application have been sent to our talent team at <strong>info@autodigix.com</strong>. We will review your profile and contact you for the next round.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-[var(--beige)] rounded-xl px-4 py-3.5 text-sm md:text-base text-[var(--ink)] placeholder-[var(--ink-soft)]/50 border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--ink)] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. rahul@example.com"
                        className="w-full bg-[var(--beige)] rounded-xl px-4 py-3.5 text-sm md:text-base text-[var(--ink)] placeholder-[var(--ink-soft)]/50 border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--ink)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-[var(--beige)] rounded-xl px-4 py-3.5 text-sm md:text-base text-[var(--ink)] placeholder-[var(--ink-soft)]/50 border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--ink)] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium mb-2">
                        Select Opening *
                      </label>
                      <div className="relative">
                        <select
                          value={form.role}
                          onChange={(e) => setForm({ ...form, role: e.target.value })}
                          className="w-full appearance-none bg-[var(--beige)] rounded-xl px-4 py-3.5 pr-10 text-sm md:text-base text-[var(--ink)] font-medium border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--ink)] transition-colors cursor-pointer"
                        >
                          {availableRoles.map((roleName) => (
                            <option key={roleName} value={roleName}>
                              {roleName}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[var(--ink-soft)] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Resume Document Upload */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium mb-2">
                      Upload Resume Document (PDF, DOC, DOCX - Max 4MB) *
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-file-input"
                    />

                    {selectedFile ? (
                      <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--beige)] border border-emerald-500/30 text-sm">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="truncate">
                            <p className="font-medium text-[var(--ink)] truncate">{selectedFile.name}</p>
                            <p className="text-xs text-[var(--ink-soft)]">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Document ready to attach
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="p-1.5 rounded-full hover:bg-[var(--ink)]/10 text-[var(--ink-soft)] hover:text-red-500 transition-colors ml-2 cursor-pointer"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="resume-file-input"
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[var(--ink)]/15 rounded-xl bg-[var(--beige)] hover:border-[var(--ink)]/30 hover:bg-[var(--beige)]/80 transition-all cursor-pointer text-center group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink-soft)] group-hover:text-[var(--ink)] group-hover:scale-105 transition-all mb-2">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <p className="text-sm md:text-base font-medium text-[var(--ink)]">
                          Click to select resume document
                        </p>
                        <p className="text-xs text-[var(--ink-soft)] mt-1">
                          Supported: PDF, DOC, DOCX (Up to 4MB)
                        </p>
                      </label>
                    )}
                  </div>

                  {/* Optional Portfolio Link */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium mb-2">
                      Portfolio / GitHub / LinkedIn Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={form.resumeUrl}
                      onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/... or Portfolio link"
                      className="w-full bg-[var(--beige)] rounded-xl px-4 py-3.5 text-sm md:text-base text-[var(--ink)] placeholder-[var(--ink-soft)]/50 border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--ink)] transition-colors"
                    />
                  </div>

                  {/* Optional Note */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium mb-2">
                      Brief Note / Why You're a Great Fit (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your projects, skills, or what drives you..."
                      className="w-full bg-[var(--beige)] rounded-xl px-4 py-3 text-sm md:text-base text-[var(--ink)] placeholder-[var(--ink-soft)]/50 border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--ink)] transition-colors resize-none"
                    />
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--beige)]/80 border border-[var(--ink)]/10">
                    <input
                      id="career-terms"
                      type="checkbox"
                      required
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-[var(--ink)]/20 text-[var(--ink)] focus:ring-[var(--gold)] accent-[var(--ink)] cursor-pointer shrink-0"
                    />
                    <label htmlFor="career-terms" className="text-xs md:text-sm text-[var(--ink-soft)] leading-relaxed cursor-pointer select-none">
                      I confirm that the information provided is accurate and truthful. I agree to the processing of my application details and attached resume in accordance with AutoDigiX hiring policies and{" "}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline font-medium text-[var(--ink)] hover:text-[var(--gold)]">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="text-xs md:text-sm text-[var(--ink-soft)] flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[var(--gold)]" />
                      Inquiries: <a href="mailto:info@autodigix.com" className="underline hover:text-[var(--ink)]">info@autodigix.com</a>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[var(--ink)] text-[var(--beige-light)] text-sm md:text-base font-medium hover:shadow-gold transition-all duration-300 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        "Sending Application..."
                      ) : (
                        <>
                          Submit Application <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
