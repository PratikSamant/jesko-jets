import { useEffect, useRef, useState } from "react";

export function useImagePreloader(
  folder: string,
  count: number,
  padLength = 3
): { frames: HTMLImageElement[]; loaded: boolean; progress: number } {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const framesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let completed = 0;
    const images: (HTMLImageElement | null)[] = new Array(count).fill(null);

    for (let i = 1; i <= count; i++) {
      const img = new Image();
      const padded = String(i).padStart(padLength, "0");
      img.src = `${folder}ezgif-frame-${padded}.jpg`;

      const checkComplete = () => {
        completed++;
        setProgress(Math.round((completed / count) * 100));
        if (completed === count) {
          framesRef.current = images.filter((img): img is HTMLImageElement => img !== null);
          setLoaded(true);
        }
      };

      img.onload = () => {
        images[i - 1] = img;
        checkComplete();
      };
      
      img.onerror = () => {
        checkComplete();
      };
    }
  }, [folder, count, padLength]);

  return { frames: framesRef.current, loaded, progress };
}
