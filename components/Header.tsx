"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { navItems, siteInfo } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 border-b border-slate-100 bg-white"
    >
      <div className="mx-auto flex min-h-[80px] w-[min(1160px,calc(100%-32px))] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex min-w-[230px] items-center gap-3"
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
              AJRRADY
            </span>
            <span className="block max-w-[170px] text-[9px] font-semibold leading-tight text-ajPurple/70">
              {siteInfo.fullName}
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
                className={`flex min-h-11 items-center rounded-lg px-3.5 text-[13.5px] font-semibold tracking-wide text-ajPurple transition-colors hover:text-ajGreen lg:min-h-[80px] lg:rounded-none lg:border-b-2 lg:border-transparent lg:px-2.5 lg:hover:border-ajGreen/40 lg:hover:text-ajGreen ${
                  active ? "text-ajGreen lg:border-ajGreen" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/adhesion"
            className="mt-2 flex min-h-11 items-center justify-center rounded-xl bg-ajGreen px-5 text-[13.5px] font-semibold tracking-wide text-white transition-colors hover:bg-ajPurple lg:ml-4 lg:mt-0"
            onClick={() => setOpen(false)}
          >
            Adhérer
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
