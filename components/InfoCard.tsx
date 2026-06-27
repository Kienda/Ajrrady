"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HighlightText } from "@/components/HighlightText";
import { IconBadge } from "@/components/IconBadge";
import type { CardItem } from "@/types/site";
import { cardVariants } from "@/components/motion";

type InfoCardProps = {
  item: CardItem;
};

export function InfoCard({ item }: InfoCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={shouldReduceMotion ? undefined : cardVariants}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group h-full rounded-xl border border-slate-200 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-xl"
    >
      {item.image ? (
        <div className="mb-6 overflow-hidden rounded-3xl bg-slate-100">
          <Image
            src={item.image}
            alt={item.title}
            width={540}
            height={340}
            className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      {item.icon ? <IconBadge name={item.icon} className="mb-5" /> : null}
      <h2 className="text-xl font-bold leading-snug tracking-tight text-ajPurple">
        <HighlightText text={item.title} />
      </h2>
      {item.description ? (
        <p className="mt-3 text-[15px] leading-[1.75] text-slate-600">
          <HighlightText text={item.description} />
        </p>
      ) : null}
      {item.items ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-[1.75] text-slate-600">
          {item.items.map((entry) => (
            <li key={entry}>
              <HighlightText text={entry} />
            </li>
          ))}
        </ul>
      ) : null}
    </motion.article>
  );
}
