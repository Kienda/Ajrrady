"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroVideo() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.video
      aria-hidden="true"
      className="absolute inset-0 -z-30 h-full w-full origin-center object-cover brightness-[0.86] contrast-[1.12] saturate-[1.18] will-change-transform"
      initial={false}
      animate={shouldReduceMotion ? undefined : { scale: [1, 1.08] }}
      transition={{
        duration: 25,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/Landingpage.jpg"
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </motion.video>
  );
}
