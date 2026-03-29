"use client";
import { useEffect, useRef } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { HERO_FRAME_COUNT } from "@/lib/constants";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function HeroScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { frames, loaded } = useImagePreloader("/sequence-1/", HERO_FRAME_COUNT);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    mass: 0.5,
  });

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    
    // Initial draw
    if (frames.length > 0) {
      drawImage(ctx, canvas, frames[0]);
    }

    const unsubscribe = smoothProgress.on("change", (progress) => {
      const idx = Math.min(
        Math.floor(progress * (frames.length - 1)),
        frames.length - 1
      );
      const img = frames[idx];
      if (!img) return;
      drawImage(ctx, canvas, img);
    });

    return () => unsubscribe();
  }, [loaded, frames, smoothProgress]);

  function drawImage(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const zoom = 1.01; // 1% overbleed to hide fractional pixel anti-aliasing edges
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height) * zoom;
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }

  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {!loaded && (
        <div className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center">
          <span className="text-white/40 text-xs tracking-widest uppercase font-dm-sans">
            Preparing your journey...
          </span>
        </div>
      )}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <p className="text-white font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,1)] text-[12px] tracking-[0.4em] uppercase font-dm-sans mb-6">
            Private Aviation Redefined
          </p>
          <h1 className="font-cormorant text-white text-[clamp(3rem,8vw,8rem)] font-light leading-none drop-shadow-2xl">
            Luxury Above Everything
          </h1>
          <p className="mt-8 text-white/80 drop-shadow-md font-medium text-sm tracking-widest font-dm-sans max-w-md">
            Scroll to begin the journey
          </p>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/40" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
