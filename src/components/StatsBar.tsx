"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { number: "47", label: "Aircraft in Fleet", suffix: "+" },
  { number: "190", label: "Destinations", suffix: "+" },
  { number: "24", label: "Hour Availability", suffix: "/7" },
  { number: "12", label: "Years of Excellence", suffix: "" },
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="bg-[#0a0a0a] border-y border-white/10 py-20 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
          >
            <div className="font-cormorant text-white text-6xl font-extralight">
              {stat.number}
              <span className="text-3xl text-white/40">{stat.suffix}</span>
            </div>
            <p className="text-white/40 text-[11px] tracking-[0.3em] uppercase font-dm-sans mt-4">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
