"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  HeartPulse,
  Leaf,
  Theater,
  Trophy,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HighlightText } from "@/components/HighlightText";
import type { CardItem, IconName } from "@/types/site";
import { cardVariants } from "@/components/motion";

const iconComponents: Record<IconName, React.ElementType> = {
  education: GraduationCap,
  culture: Theater,
  sport: Trophy,
  health: HeartPulse,
  environment: Leaf,
  solidarity: HeartHandshake,
  diaspora: Globe2,
  community: HandHeart,
};

const programGradients: Record<string, string> = {
  education:   "linear-gradient(135deg, #6A0DAD 0%, #9333EA 100%)",
  culture:     "linear-gradient(135deg, #4338CA 0%, #6A0DAD 100%)",
  sport:       "linear-gradient(135deg, #16A34A 0%, #166534 100%)",
  health:      "linear-gradient(135deg, #0D9488 0%, #16A34A 100%)",
  environment: "linear-gradient(135deg, #166534 0%, #15803D 100%)",
  solidarity:  "linear-gradient(135deg, #7C3AED 0%, #6A0DAD 100%)",
  diaspora:    "linear-gradient(135deg, #1D4ED8 0%, #4338CA 100%)",
};

type ProgramCardProps = {
  item: CardItem;
  learnMoreHref?: string;
  learnMoreLabel?: string;
};

export function ProgramCard({
  item,
  learnMoreHref,
  learnMoreLabel = "En savoir plus",
}: ProgramCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const visibleItems = item.items?.slice(0, 3) ?? [];
  const hiddenItemCount = item.items ? Math.max(item.items.length - visibleItems.length, 0) : 0;
  const gradient =
    (item.icon ? programGradients[item.icon] : undefined) ??
    "linear-gradient(135deg, #6A0DAD 0%, #9333EA 100%)";

  const Icon = item.icon ? (iconComponents[item.icon] ?? null) : null;

  return (
    <motion.article
      variants={shouldReduceMotion ? undefined : cardVariants}
      whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-[#F8F6FC]">
        {item.image ? (
          <motion.div
            className="absolute inset-0 will-change-transform"
            animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            />
          </motion.div>
        ) : (
          <motion.div
            className="flex h-full items-center justify-center"
            style={{ background: gradient }}
            animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.18)_0%,transparent_65%)]" />
            <div className="absolute h-44 w-44 rounded-full bg-white/10" />
            {Icon ? <Icon aria-hidden className="relative z-10 h-20 w-20 text-white" /> : null}
          </motion.div>
        )}
      </div>

      <div className="relative -mt-5 flex flex-1 flex-col rounded-t-2xl bg-white p-6 shadow-[0_-12px_30px_rgba(31,41,55,0.08)]">
        <div className="mb-4 flex items-center gap-3">
          {Icon ? (
            <span
              className="flex h-12 w-12 flex-none items-center justify-center rounded-full text-white shadow-lg"
              style={{ background: gradient }}
            >
              <Icon aria-hidden className="h-5 w-5" />
            </span>
          ) : null}
          <h2 className="text-xl font-extrabold leading-snug tracking-tight text-ajPurple">
            {item.title}
          </h2>
        </div>

        {item.description && (
          <p className="text-[15px] leading-[1.75] text-slate-600">
            <HighlightText text={item.description} />
          </p>
        )}

        {visibleItems.length > 0 ? (
          <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
            {visibleItems.map((entry) => (
              <li
                key={entry}
                className="flex items-start gap-2.5 text-[14px] leading-snug text-slate-600"
              >
                <span className="mt-[5px] h-1.5 w-1.5 flex-none rounded-full bg-ajGreen" />
                <HighlightText text={entry} />
              </li>
            ))}
            {hiddenItemCount > 0 ? (
              <li className="text-[13px] font-bold text-ajPurple">
                + {hiddenItemCount} autre{hiddenItemCount > 1 ? "s" : ""} action
                {hiddenItemCount > 1 ? "s" : ""}
              </li>
            ) : null}
          </ul>
        ) : null}

        {learnMoreHref ? (
          <Link
            href={learnMoreHref}
            className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-extrabold text-ajPurple transition-colors duration-300 hover:text-ajGreen"
          >
            <span>{learnMoreLabel}</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
            />
          </Link>
        ) : null}
      </div>
    </motion.article>
  );
}
