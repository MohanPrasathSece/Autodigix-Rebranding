import { Link } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/courses", label: "Courses" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/partnerships", label: "Partnerships" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 30));

  useEffect(() => {
    const main = document.querySelector("main");
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      if (main) main.style.visibility = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "unset";
      if (main) main.style.visibility = "visible";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "unset";
      if (main) main.style.visibility = "visible";
    };
  }, [open]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.nav
      {...(!isMobile
        ? {
            initial: { y: -40, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 2.0 },
          }
        : {})}
      className={`fixed top-0 inset-x-0 z-50 transition-[padding] duration-500 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-full px-5 py-1.5 transition-[background-color,box-shadow] duration-500 ${
            scrolled ? "glass shadow-soft" : ""
          }`}
        >
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-3 group"
          >
            <div className="leading-[1.1]">
              <img src={logo} alt="AutoDigiX Logo" className="h-10 w-auto object-contain" />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => window.scrollTo(0, 0)}
                activeOptions={{ exact: true }}
                className="px-3.5 py-2 text-sm text-[var(--ink)]/75 hover:text-[var(--ink)] transition-colors relative group"
                activeProps={{ className: "text-[var(--ink)]" }}
              >
                {({ isActive }) => (
                  <>
                    <span>{l.label}</span>
                    <span
                      className={`absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-[var(--ink)] transition-transform origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </>
                )}
              </Link>
            ))}
          </div>

          <Link
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full bg-[var(--ink)] text-[var(--beige-light)] text-sm font-medium hover:shadow-gold transition-shadow"
          >
            Get Consultation
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-[var(--ink)]"
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 bg-[var(--beige)] lg:hidden flex flex-col items-start justify-center px-10 gap-8 will-change-transform"
              style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-8 right-6 text-[var(--ink)] p-2"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="flex flex-col gap-6 w-full">
                {links.map((l, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    key={l.to}
                  >
                    <Link
                      to={l.to}
                      activeOptions={{ exact: true }}
                      onClick={() => {
                        setOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className="group flex items-center gap-4"
                    >
                      {({ isActive }) => (
                        <>
                          <span className="font-display text-5xl text-[var(--ink)]">{l.label}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeDot"
                              className="w-2.5 h-2.5 rounded-full bg-[var(--ink)]"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                        </>
                      )}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + links.length * 0.1 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => {
                      setOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className="mt-4 inline-block px-8 py-4 rounded-full bg-[var(--ink)] text-[var(--beige-light)] font-medium text-lg shadow-soft"
                  >
                    Get Consultation
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
