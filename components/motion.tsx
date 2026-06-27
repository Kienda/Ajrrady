"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
};

// Stagger parent — triggers on scroll into view
export function StaggerContainer({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={false}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger child — wraps arbitrary content
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={cardVariants} className={className}>
      {children}
    </motion.div>
  );
}

// Viewport-triggered fade-up for standalone blocks
export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={false}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: fadeUpVariants.hidden,
        show: {
          ...(fadeUpVariants.show as object),
          transition: { duration: 0.55, ease, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide in from a side
export function SlideIn({
  children,
  className,
  from = "left",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: "left" | "right";
  delay?: number;
}) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hero stagger — plays on mount (not scroll)
export function HeroContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={false}
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.13, delayChildren: 0.1 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child of HeroContainer
export function HeroItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUpVariants} className={className}>
      {children}
    </motion.div>
  );
}
