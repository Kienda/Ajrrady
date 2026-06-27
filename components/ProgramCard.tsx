"use client";

import {
  Globe2,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  HeartPulse,
  Leaf,
  Theater,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
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
};

export function ProgramCard({ item }: ProgramCardProps) {
  const gradient =
    (item.icon ? programGradients[item.icon] : undefined) ??
    "linear-gradient(135deg, #6A0DAD 0%, #9333EA 100%)";

  const Icon = item.icon ? (iconComponents[item.icon] ?? null) : null;

  return (
    <motion.article
      variants={cardVariants}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-shadow duration-300 hover:shadow-soft"
    >
      {/* Gradient image header */}
      <div
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
        style={{ background: gradient }}
      >
        {/* Radial highlight for depth */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.18)_0%,transparent_65%)]" />

        {/* Decorative circle behind icon */}
        <div className="absolute h-44 w-44 rounded-full bg-white/10" />

        {/* Large SVG illustration – white-filtered for contrast */}
        {item.image && (
          <img
            src={item.image}
            alt=""
            aria-hidden
            width={120}
            height={120}
            className="relative z-10 h-[7.5rem] w-[7.5rem] opacity-90 transition-transform duration-500 group-hover:scale-110"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        )}

        {/* Small icon badge – bottom-right corner */}
        {Icon && (
          <div className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30 backdrop-blur-sm">
            <Icon aria-hidden className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-xl font-bold leading-snug tracking-tight text-ajPurple">
          {item.title}
        </h2>

        {item.description && (
          <p className="mt-3 text-[15px] leading-[1.75] text-slate-600">
            {item.description}
          </p>
        )}

        {item.items && (
          <ul className="mt-4 space-y-2">
            {item.items.map((entry) => (
              <li
                key={entry}
                className="flex items-start gap-2.5 text-[14px] leading-snug text-slate-600"
              >
                <span className="mt-[5px] h-1.5 w-1.5 flex-none rounded-full bg-ajGreen" />
                {entry}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
