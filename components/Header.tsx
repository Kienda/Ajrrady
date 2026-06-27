"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HighlightText } from "@/components/HighlightText";
import { navItems, siteInfo } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-white/70 bg-white/90 shadow-soft backdrop-blur-xl"
          : "border-slate-100 bg-white"
      }`}
    >
      <div
        className={`mx-auto flex min-h-[80px] w-[min(1160px,calc(100%-32px))] items-center justify-between gap-6 transition-transform duration-300 motion-reduce:transform-none ${
          scrolled ? "scale-[0.985]" : "scale-100"
        }`}
      >
        <Link
          href="/"
          className="flex min-w-[230px] origin-left items-center gap-3 transition-transform duration-300 hover:scale-105 motion-reduce:hover:scale-100"
          aria-label="AJRRADY accueil"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/LOGO.png"
            alt="Logo AJRRADY"
            width={58}
            height={58}
            priority
            className="h-14 w-14 object-contain"
          />
          <span className="leading-none">
            <span className="block text-[26px] font-extrabold tracking-tight text-ajPurple">
              <HighlightText text="AJRRADY" />
            </span>
            <span className="block max-w-[170px] text-[9px] font-semibold leading-tight text-ajPurple/70">
              <HighlightText text={siteInfo.fullName} />
            </span>
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-ajPurple lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav
          className={`absolute left-4 right-4 top-full rounded-xl border border-slate-100 bg-white p-3 shadow-soft lg:static lg:flex lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
            open ? "block" : "hidden lg:flex"
          }`}
          aria-label="Navigation principale"
        >
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex min-h-11 items-center rounded-lg px-3.5 text-[13.5px] font-semibold tracking-wide text-ajPurple transition-colors duration-300 hover:text-ajGreen lg:min-h-[80px] lg:rounded-none lg:px-2.5 ${
                  active ? "text-ajGreen" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-1 left-3.5 right-3.5 h-0.5 origin-left rounded-full bg-ajGreen transition-transform duration-300 lg:bottom-0 lg:left-2.5 lg:right-2.5 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/adhesion"
            className="mt-2 flex min-h-11 items-center justify-center rounded-xl bg-ajGreen px-5 text-[13.5px] font-semibold tracking-wide text-white shadow-sm transition-[background-color,box-shadow,transform] duration-300 hover:scale-[1.03] hover:bg-ajPurple hover:shadow-lg active:scale-[0.99] motion-reduce:hover:scale-100 lg:ml-4 lg:mt-0"
            onClick={() => setOpen(false)}
          >
            Adhérer
          </Link>
        </nav>
      </div>
    </header>
  );
}
