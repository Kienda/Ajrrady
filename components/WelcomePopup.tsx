"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { homeDomains } from "@/data/site";

const LS_KEY = "ajrrady_welcome_seen";

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Show after 1 s only once (guarded by localStorage)
  useEffect(() => {
    try {
      if (localStorage.getItem(LS_KEY)) return;
    } catch {
      return; // localStorage unavailable (SSR, private mode, blocked cookies)
    }
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key + focus trap
  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, a[href], [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleClose() {
    try {
      localStorage.setItem(LS_KEY, "1");
    } catch { /* noop */ }
    setIsOpen(false);
  }

  function handleNavigate(href: string) {
    handleClose();
    router.push(href);
  }

  const fade = prefersReduced ? { duration: 0 } : { duration: 0.22 };
  const spring = prefersReduced
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 340, damping: 28 } as const);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="wp-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            key="wp-modal"
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={spring}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wp-heading"
            className="relative w-full max-w-[700px] max-h-[88vh] overflow-y-auto rounded-[24px] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.28)]"
          >
            {/* ── Header ─────────────────────────────────────────── */}
            <div
              className="sticky top-0 z-10 flex flex-col items-center px-6 pb-5 pt-7 text-center"
              style={{
                background: "linear-gradient(135deg, #6A0DAD 0%, #16A34A 100%)",
              }}
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white/20 shadow-lg ring-2 ring-white/25">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Favicon.png"
                  alt=""
                  aria-hidden
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </div>

              <h2
                id="wp-heading"
                className="text-[1.55rem] font-extrabold tracking-tight text-white sm:text-3xl"
              >
                Bienvenue sur AJRRADY
              </h2>
              <p className="mt-1.5 max-w-[400px] text-[14px] leading-snug text-white/80">
                Choisissez un secteur pour découvrir nos actions communautaires.
              </p>

              <button
                onClick={handleClose}
                aria-label="Fermer la fenêtre de bienvenue"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/35 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>

            {/* ── Sector cards ──────────────────────────────────── */}
            <div className="p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {homeDomains.map((domain, i) => (
                  <motion.button
                    key={domain.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : { delay: 0.1 + i * 0.045, duration: 0.26, ease: "easeOut" }
                    }
                    onClick={() => handleNavigate("/nos-actions")}
                    className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#6A0DAD]/20 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] motion-reduce:hover:translate-y-0"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-[68px] w-[68px] flex-none overflow-hidden rounded-xl bg-[#F8F6FC]">
                      {domain.image ? (
                        <Image
                          src={domain.image}
                          alt={domain.title}
                          fill
                          sizes="68px"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.08]"
                        />
                      ) : null}
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="font-extrabold leading-tight text-[#6A0DAD]">
                        {domain.title}
                      </p>
                      <p className="mt-0.5 text-[12.5px] leading-snug text-slate-500">
                        {domain.description}
                      </p>
                      <span className="mt-1.5 inline-block text-[12px] font-bold text-[#16A34A]">
                        Découvrir →
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* ── CTA buttons ───────────────────────────────────── */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => handleNavigate("/nos-actions")}
                  className="rounded-full bg-[#6A0DAD] px-8 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#5c0b99] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:ring-offset-2"
                >
                  Découvrir nos actions
                </button>
                <button
                  onClick={() => handleNavigate("/adhesion")}
                  className="rounded-full border-2 border-[#16A34A] px-8 py-3 text-sm font-bold text-[#16A34A] transition-all hover:bg-[#16A34A] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:ring-offset-2"
                >
                  Adhérer à AJRRADY
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
