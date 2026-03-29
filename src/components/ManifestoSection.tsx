"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const WORDS = "We do not move people. We move perspectives.".split(" ");

export default function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative z-10 -mt-32 bg-gradient-to-b from-[rgba(42,70,92,0.85)] to-[#050505] backdrop-blur-[30px] border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.8)] py-40 px-8 flex flex-col items-center text-center">
      <motion.div
        className="w-24 h-px bg-white/20 mb-20"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <h2 className="font-cormorant text-white text-[clamp(2rem,5vw,5rem)] font-extralight max-w-4xl leading-tight">
        {WORDS.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 * i, duration: 0.8, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        ))}
      </h2>
      <motion.p
        className="mt-12 text-white/40 text-sm tracking-widest font-dm-sans max-w-lg leading-relaxed"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 1 }}
      >
        Founded on the principle that time is the ultimate luxury, The Jet Mafia
        operates a curated fleet across six continents &mdash; with zero
        compromise on discretion, comfort, or speed.
      </motion.p>
      <motion.div
        className="w-24 h-px bg-white/20 mt-20"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 1 }}
      />
    </section>
  );
}
