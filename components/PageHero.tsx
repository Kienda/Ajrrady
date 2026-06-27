"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="overflow-hidden bg-[#f1e5f7]">
      <div className="mx-auto grid min-h-[300px] w-[min(1160px,calc(100%-32px))] items-center gap-8 py-14 md:grid-cols-[1fr_200px] md:py-16">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ajGreen"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-ajPurple md:text-[4rem] lg:text-[5rem]"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-lg leading-[1.8] text-slate-600"
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.2 }}
        >
          <Image
            src="/SymboleAJRRADY.png"
            alt=""
            width={190}
            height={285}
            className="mx-auto max-h-[220px] w-auto object-contain md:ml-auto md:mr-0"
          />
        </motion.div>
      </div>
    </section>
  );
}
