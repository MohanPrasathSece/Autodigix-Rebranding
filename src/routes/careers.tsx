import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle2,
  Briefcase,
  ArrowUpRight,
  ChevronDown,
  UploadCloud,
  FileText,
  X,
  Paperclip,
} from "lucide-react";
import { Reveal, CinematicTitle } from "../components/Reveal";

// =========================================================================
// 💼 ROLES DROPDOWN LIST:
// When you have new openings, simply add or edit roles in this list below!
// =========================================================================
export const availableRoles = [
  "General Application / Future Opportunities",
  "AI Automation Engineer",
  "Performance Marketing Specialist (Meta & Google Ads)",
  "Full Stack / Frontend Developer",
  "SEO & Growth Content Specialist",
  "Video Editor & Motion Designer",
  "Business Development Executive",
] as const;

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers · AutoDigiX" },
      {
        name: "description",
        content:
          "Careers at AutoDigiX. We currently do not have active openings, but we are always eager to connect with talented builders and marketers.",
      },
      { property: "og:title", content: "Careers · AutoDigiX" },
      {
        property: "og:description",
        content: "Explore career opportunities and connect with the AutoDigiX team.",
      },
      { property: "og:url", content: "https://autodigix.in/careers" },
    ],
    links: [{ rel: "canonical", href: "https://autodigix.in/careers" }],
  }),
  component: CareersPage,
});

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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit to 4MB for reliable email attachment delivery
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
    setIsSubmitting(true);
    setErrorMsg("");

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
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Failed to submit. Please email us directly.");
      }
    } catch {
      setErrorMsg("Something went wrong while sending. Please reach out via email or WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--beige)] pt-40 pb-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--ink)]/5 text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)] font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            Careers at AutoDigiX
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-[var(--ink)] leading-[1.1] mb-6">
            <CinematicTitle text="Build With Us." />
          </h1>

          <p className="max-w-xl mx-auto text-[var(--ink-soft)] text-base md:text-lg leading-relaxed">
            We are always excited to connect with passionate growth marketers, AI automation builders, and developers.
          </p>
        </div>

        {/* Current Status Banner */}
        <Reveal delay={0.15}>
          <div className="p-8 md:p-10 rounded-[2rem] bg-[var(--beige-light)] border border-[var(--ink)]/5 shadow-soft mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 text-center md:text-left">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink)]">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs uppercase tracking-wider font-medium text-[var(--ink-soft)]">
                    Current Status
                  </span>
                </div>
                <h2 className="font-display text-2xl text-[var(--ink)] font-light">
                  No Active Openings Right Now
                </h2>
                <p className="text-sm text-[var(--ink-soft)] mt-1">
                  Our current team is full, but we regularly review talent pool submissions for upcoming client projects.
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/918639191907?text=Hello%20AutoDigiX,%20I'd%20like%20to%20share%20my%20profile%20for%20future%20career%20opportunities!"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--ink)] text-[var(--beige-light)] text-sm font-medium hover:shadow-gold transition-all duration-300"
            >
              Chat on WhatsApp <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>

        {/* Talent Pool Drop Form */}
        <Reveal delay={0.25}>
          <div className="p-8 md:p-12 rounded-[2rem] bg-[var(--beige-light)] border border-[var(--ink)]/5 shadow-soft">
            <div className="mb-8">
              <h3 className="font-display text-2xl md:text-3xl font-light text-[var(--ink)] mb-2">
                Join Our Talent Pool
              </h3>
              <p className="text-sm text-[var(--ink-soft)]">
                Upload your resume document (PDF or DOCX) and submit your details. It will be emailed directly to our administrative team as an attachment.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-10 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display text-xl text-[var(--ink)] font-light mb-1">
                  Application Received!
                </h4>
                <p className="text-sm text-[var(--ink-soft)] max-w-md mx-auto">
                  Thank you! Your resume document and details have been delivered to our administrative email. We will reach out when a relevant opportunity arises.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs">
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
                      className="w-full bg-[var(--beige)] rounded-xl px-4 py-3.5 text-sm text-[var(--ink)] placeholder-[var(--ink-soft)]/50 border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--ink)] transition-colors"
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
                      className="w-full bg-[var(--beige)] rounded-xl px-4 py-3.5 text-sm text-[var(--ink)] placeholder-[var(--ink-soft)]/50 border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--ink)] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[var(--beige)] rounded-xl px-4 py-3.5 text-sm text-[var(--ink)] placeholder-[var(--ink-soft)]/50 border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--ink)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium mb-2">
                      Role / Position *
                    </label>
                    <div className="relative">
                      <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full appearance-none bg-[var(--beige)] rounded-xl px-4 py-3.5 pr-10 text-sm text-[var(--ink)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--ink)] transition-colors cursor-pointer"
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
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to attach
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-1.5 rounded-full hover:bg-[var(--ink)]/10 text-[var(--ink-soft)] hover:text-red-500 transition-colors ml-2"
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
                      <p className="text-sm font-medium text-[var(--ink)]">
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
                    Portfolio / LinkedIn / Website Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={form.resumeUrl}
                    onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/... or Portfolio link"
                    className="w-full bg-[var(--beige)] rounded-xl px-4 py-3.5 text-sm text-[var(--ink)] placeholder-[var(--ink-soft)]/50 border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--ink)] transition-colors"
                  />
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium mb-2">
                    Brief Note (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us a little bit about your experience or what you're looking for..."
                    className="w-full bg-[var(--beige)] rounded-xl px-4 py-3 text-sm text-[var(--ink)] placeholder-[var(--ink-soft)]/50 border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--ink)] transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-[var(--ink-soft)] flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[var(--gold)]" />
                    Or email: <a href="mailto:officialautodigix@gmail.com" className="underline hover:text-[var(--ink)]">officialautodigix@gmail.com</a>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[var(--ink)] text-[var(--beige-light)] text-sm font-medium hover:shadow-gold transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Sending Application & Resume..."
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
  );
}
