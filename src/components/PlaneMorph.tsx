"use client";
import { useEffect, useRef } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { PLANE_FRAME_COUNT } from "@/lib/constants";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function PlaneMorph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { frames, loaded } = useImagePreloader("/sequence-2/", PLANE_FRAME_COUNT);
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
    const zoom = 1.1; // 10% overbleed to push baked-in rendering edge lines completely off-screen
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height) * zoom;
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }

  const specsOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8, 0.95], [0, 1, 1, 0]);
  const specsY = useTransform(scrollYProgress, [0.3, 0.5], [30, 0]);

  return (
    <div ref={containerRef} id="fleet" className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        {/* Ultra-soft edge gradients to seamlessly blend the bright canvas into the dark surroundings without harsh lines */}
        <div className="absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-[#050505] via-[#050505]/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent pointer-events-none" />
        
        <motion.div
          style={{ opacity: specsOpacity, y: specsY }}
          className="absolute bottom-16 left-12 right-12 flex justify-between items-end"
        >
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-dm-sans mb-3">
              Fleet Designation
            </p>
            <p className="font-cormorant text-white text-5xl font-light">
              Phantom Ultra
            </p>
            <p className="text-white/50 text-sm tracking-wider font-dm-sans mt-2">
              Ultra Long-Range &middot; 19 Passengers
            </p>
          </div>
          <div className="text-right flex flex-col gap-6">
            {[
              ["Range", "8,000 NM"],
              ["Max Altitude", "51,000 ft"],
              ["Cruise Speed", "Mach 0.92"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-white/30 text-[10px] tracking-widest uppercase font-dm-sans mb-1">
                  {label}
                </p>
                <p className="font-cormorant text-white text-2xl font-light">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
