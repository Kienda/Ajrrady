"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, siteInfo } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-slate-100 bg-white">
      <div className="mx-auto flex min-h-[74px] w-[min(1160px,calc(100%-32px))] items-center justify-between gap-6">
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
            <span className="block text-[28px] font-black text-ajPurple">
              AJRRADY
            </span>
            <span className="block max-w-[170px] text-[8px] font-bold leading-tight text-ajPurple">
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
          className={`absolute left-4 right-4 top-full rounded-lg border border-slate-100 bg-white p-2 shadow-soft lg:static lg:flex lg:items-center lg:gap-6 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
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
                className={`flex min-h-11 items-center rounded-md px-3 text-xs font-extrabold uppercase text-ajPurple transition hover:bg-ajLight hover:text-ajGreen lg:min-h-[74px] lg:border-b-[3px] lg:border-transparent lg:px-0 lg:hover:bg-transparent ${
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
            className="mt-2 flex min-h-11 items-center justify-center rounded-lg bg-ajGreen px-5 text-xs font-extrabold uppercase text-white transition hover:bg-ajPurple lg:mt-0"
            onClick={() => setOpen(false)}
          >
            Adhérer
          </Link>
        </nav>
      </div>
    </header>
  );
}
