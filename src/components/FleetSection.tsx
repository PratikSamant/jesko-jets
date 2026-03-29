"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FLEET = [
  {
    name: "Phantom Ultra",
    subtitle: "Ultra Long-Range",
    range: "8,000 NM",
    pax: "19 Passengers",
    tagline: "From New York to Tokyo — without compromise.",
  },
  {
    name: "Eclipse S",
    subtitle: "Super Mid-Range",
    range: "4,200 NM",
    pax: "9 Passengers",
    tagline: "The ideal machine for transcontinental agility.",
  },
  {
    name: "Vesper Light",
    subtitle: "Light Jet",
    range: "1,800 NM",
    pax: "6 Passengers",
    tagline: "Swift, silent, and surgical.",
  },
];

export default function FleetSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="bg-[#050505] py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-white/30 text-[11px] tracking-[0.5em] uppercase font-dm-sans mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          Our Fleet
        </motion.p>
        <motion.h2
          className="font-cormorant text-white text-[clamp(2rem,4vw,4rem)] font-extralight max-w-2xl leading-none mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Three Tiers. One Standard.
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {FLEET.map((jet, i) => (
            <motion.div
              key={jet.name}
              className="bg-[#050505] p-10 group cursor-pointer hover:bg-white/5 transition-colors duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.4, duration: 0.9 }}
            >
              <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-dm-sans mb-4">
                {jet.subtitle}
              </p>
              <h3 className="font-cormorant text-white text-4xl font-light mb-6">
                {jet.name}
              </h3>
              <div className="w-12 h-px bg-white/20 mb-8 flex-shrink-0 group-hover:w-24 transition-all duration-500" />
              <p className="text-white/50 text-sm font-dm-sans leading-relaxed mb-12 h-16">
                {jet.tagline}
              </p>
              <div className="flex gap-8 border-t border-white/10 pt-6">
                <div>
                  <p className="text-white/30 text-[10px] tracking-widest uppercase font-dm-sans">
                    Range
                  </p>
                  <p className="text-white font-dm-sans text-sm mt-2">{jet.range}</p>
                </div>
                <div>
                  <p className="text-white/30 text-[10px] tracking-widest uppercase font-dm-sans">
                    Capacity
                  </p>
                  <p className="text-white font-dm-sans text-sm mt-2">{jet.pax}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
