"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease }}
      className={`mb-10 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ajGreen">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[2rem] font-bold leading-[1.15] tracking-tight text-ajPurple md:text-[2.6rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-[1.8] text-slate-600">{description}</p>
      ) : null}
    </motion.div>
  );
}
