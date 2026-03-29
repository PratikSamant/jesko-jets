"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-300 bg-transparent`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
    >
      <span className="font-cormorant text-white text-xl tracking-[0.3em] font-light">
        THE JET MAFIA
      </span>
      <div className="flex items-center gap-10">
        {["Fleet", "Experience", "Reserve"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-white/60 hover:text-white text-[11px] tracking-widest uppercase font-dm-sans transition-colors"
          >
            {item}
          </a>
        ))}
        <button className="border border-white/30 px-6 py-2 text-white text-[11px] tracking-widest uppercase font-dm-sans hover:bg-white hover:text-black transition-colors">
          Contact Us
        </button>
      </div>
    </motion.nav>
  );
}
