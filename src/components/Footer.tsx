import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Linkedin, Twitter, Facebook } from "lucide-react";
import logo from "../assets/logo.png";

// Footer component sync'd with header branding
export function Footer() {
  return (
    <footer className="relative bg-[var(--ink)] text-[var(--beige-light)] overflow-hidden">
      <div className="absolute inset-0 noise-bg opacity-[0.04] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-start justify-between mb-10 md:mb-10 md:mb-20 gap-10">
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-3 group"
          >
            <div className="leading-[1.1]">
              <img src={logo} alt="AutoDigiX Logo" className="h-10 w-auto object-contain brightness-0 invert" />
            </div>
          </Link>
          <Link
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="md:hidden inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--beige-light)] text-[var(--ink)] font-medium text-sm"
          >
            Work with us <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-12 gap-8 md:gap-12 pb-16 border-b border-[var(--beige-light)]/15"
        >
          <div className="hidden md:block md:col-span-6">
            <h2 className="font-display text-4xl md:text-8xl leading-[1.1] text-[var(--beige-light)] font-light">
              Scale Your
              <br />
              <span className="">Business.</span>
            </h2>
            <p className="mt-6 text-[var(--beige-light)]/80 max-w-sm text-sm leading-relaxed">
              AutoDigiX is a modern AI Automation & Digital Marketing agency helping businesses
              scale with performance marketing, automation systems, and growth strategies.
            </p>
            <a
              href="https://wa.me/918639191907?text=Hello%20AutoDigiX,%20I'd%20like%20to%20get%20a%20consultation!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 px-7 py-4 rounded-full bg-[var(--beige-light)] text-[var(--ink)] font-medium hover:shadow-glow transition-shadow"
            >
              Get Consultation <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <div className="md:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-5">
              Quick Links
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/courses", label: "Courses" },
                { to: "/portfolio", label: "Portfolio" },
                { to: "/partnerships", label: "Partnerships" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => window.scrollTo(0, 0)}
                    className="hover:text-[var(--beige-light)] opacity-80 hover:opacity-100 transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-5">Services</div>
            <ul className="space-y-3 text-sm opacity-80">
              <li>
                <Link
                  to="/services"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-[var(--beige-light)] transition"
                >
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-[var(--beige-light)] transition"
                >
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-[var(--beige-light)] transition"
                >
                  AI Automation
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-[var(--beige-light)] transition"
                >
                  Google & Meta Ads
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-[var(--beige-light)] transition"
                >
                  Website Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-[var(--beige-light)] transition"
                >
                  Lead Generation
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-5">Contact</div>
            <ul className="space-y-3 text-sm opacity-80">
              <li>
                <span className="hover:text-[var(--beige-light)] transition">
                  Founder: Praveen Gorla
                </span>
              </li>
              <li>
                <a
                  href="mailto:officialautodigix@gmail.com"
                  className="hover:text-[var(--beige-light)] transition"
                >
                  officialautodigix@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@autodigix.in"
                  className="hover:text-[var(--beige-light)] transition"
                >
                  info@autodigix.in
                </a>
              </li>
              <li>
                <a href="tel:+918639191907" className="hover:text-[var(--beige-light)] transition">
                  +91 8639191907
                </a>
              </li>
            </ul>
            
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-4 mt-10">
              Follow Us
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[var(--beige-light)] transition hover:opacity-100 opacity-70">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[var(--beige-light)] transition hover:opacity-100 opacity-70">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[var(--beige-light)] transition hover:opacity-100 opacity-70">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[var(--beige-light)] transition hover:opacity-100 opacity-70">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-[11px] opacity-50">
          <div>© 2026 AutoDigiX. All rights reserved.</div>
          <div className="mt-3 md:mt-0">
            <span>Built for performance marketing and automation systems.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
