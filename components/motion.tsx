"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const heroVariants = {
  headline: {
    hidden: { opacity: 0, x: -36 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: easeOut },
    },
  },
  subtitle: {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  },
  pop: {
    hidden: { opacity: 0, y: 12, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: easeOut },
    },
  },
  fadeUp: fadeUpVariants,
} satisfies Record<string, Variants>;

type MotionProps = {
  children: ReactNode;
  className?: string;
};

export function MotionPage({ children, className }: MotionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
}: MotionProps & {
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "show"}
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

export function StaggerItem({ children, className }: MotionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : cardVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeUp({
  children,
  className,
  delay = 0,
}: MotionProps & {
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "show"}
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: fadeUpVariants.hidden,
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: easeOut, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({
  children,
  className,
  from = "left",
  delay = 0,
}: MotionProps & {
  from?: "left" | "right";
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const distance = from === "left" ? -32 : 32;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, x: distance }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: easeOut, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AlternatingItem({
  children,
  className,
  index,
}: MotionProps & {
  index: number;
}) {
  return (
    <SlideIn from={index % 2 === 0 ? "left" : "right"} className={className}>
      {children}
    </SlideIn>
  );
}

export function HeroContainer({ children, className }: MotionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      animate={shouldReduceMotion ? undefined : "show"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.16, delayChildren: 0.12 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({
  children,
  className,
  variant = "fadeUp",
}: MotionProps & {
  variant?: keyof typeof heroVariants;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : heroVariants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FloatingElement({
  children,
  className,
  distance = 8,
  duration = 6,
  delay = 0,
}: MotionProps & {
  distance?: number;
  duration?: number;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduceMotion ? undefined : { y: [0, -distance, 0] }}
      transition={{ duration, ease: "easeInOut", repeat: Infinity, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FloatingDecorations({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const shapeMotion = shouldReduceMotion
    ? undefined
    : {
        y: [0, -12, 0],
        x: [0, 8, 0],
      };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.span
        className="absolute -left-10 top-16 h-28 w-28 rounded-full border border-ajPurple/10 bg-ajPurple/5"
        animate={shapeMotion}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute right-[8%] top-24 h-16 w-16 rounded-full border border-ajGreen/10 bg-ajGreen/5"
        animate={shouldReduceMotion ? undefined : { y: [0, 10, 0], x: [0, -6, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute bottom-8 right-[-2rem] h-36 w-36 rounded-full border border-ajPurple/10 bg-ajPurple/5"
        animate={shouldReduceMotion ? undefined : { y: [0, -10, 0], x: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
