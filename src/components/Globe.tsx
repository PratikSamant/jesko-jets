"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Globe() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative h-screen overflow-hidden bg-[#050505]"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        src="/globe-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <motion.p
          className="text-white/40 text-[11px] tracking-[0.5em] uppercase font-dm-sans mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          Wherever You Are
        </motion.p>
        <motion.h2
          className="font-cormorant text-white text-[clamp(2.5rem,6vw,6rem)] font-extralight text-center leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          The World<br />Awaits
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12"
        >
          <button className="border border-white/40 text-white text-[11px] tracking-widest uppercase px-8 py-3 hover:bg-white hover:text-black transition-colors">
            Request a Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}
