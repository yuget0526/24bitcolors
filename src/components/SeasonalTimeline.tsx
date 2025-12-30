"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface HistoryItem {
  id: string;
  hex: string;
  created_at: string;
}

interface SeasonalTimelineProps {
  history: HistoryItem[];
}

export function SeasonalTimeline({ history }: SeasonalTimelineProps) {
  const t = useTranslations("CollectionPage");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayCount, setDisplayCount] = useState(20); // Default to PC limit

  // Update display count based on screen width
  useEffect(() => {
    const handleResize = () => {
      // Mobile breakpoint (md: 768px)
      if (window.innerWidth < 768) {
        setDisplayCount(10);
      } else {
        setDisplayCount(20);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 2) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      // Setup canvas size
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // 1. Filter and sort history
      // Take recent items based on displayCount, then reverse to show Oldest -> Newest (Left -> Right)
      const visibleData = [...history].slice(0, displayCount).reverse();

      if (visibleData.length < 2) return;

      // 2. Create Gradient
      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      visibleData.forEach((item, index) => {
        const offset = index / (visibleData.length - 1);
        gradient.addColorStop(offset, item.hex);
      });

      // 3. Draw Wave
      ctx.fillStyle = gradient;
      ctx.beginPath();

      // Start point (Bottom-Left)
      ctx.moveTo(0, h);

      // Points for wave top
      const points = visibleData.map((item, index) => {
        const x = (index / (visibleData.length - 1)) * w;

        // Calculate Y based on Time of Day
        // 12:00 (Noon) -> Highest (0% of height)
        // 0:00 / 24:00 (Midnight) -> Lowest (100% of height)
        const date = new Date(item.created_at);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const totalMinutes = hours * 60 + minutes;

        // Peak at 12:00 (720 min), Trough at 0:00 (0 min) & 24:00 (1440 min)
        // Distance from noon in minutes (0 to 720)
        const distFromNoon = Math.abs(totalMinutes - 720);

        // Normalize 0-1 (0 = Noon/High, 1 = Midnight/Low)
        const normalizedTime = distFromNoon / 720;

        // Map to Canvas Height
        // Keep within 10% to 90% range to avoid touching edges too much
        const y = h * (0.1 + normalizedTime * 0.8);

        return { x, y };
      });

      // Draw first point
      ctx.lineTo(points[0].x, points[0].y);

      // Bezier Curve through points
      for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];

        // Control points for smooth curve (midpoint logic)
        const xc = (current.x + next.x) / 2;
        const yc = (current.y + next.y) / 2;

        // For the first segment, just draw quadratic to midpoint
        if (i === 0) {
          ctx.lineTo(xc, yc);
        } else {
          ctx.quadraticCurveTo(current.x, current.y, xc, yc);
        }
      }

      // Connect to last point
      const last = points[points.length - 1];
      ctx.lineTo(last.x, last.y);

      // Close path to bottom-right and back to start
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();

      ctx.fill();

      // 4. Subtle Time Guides (Optional)
      // Noon (High) / Midnight (Low) indicators could be added here
    };

    // Initial draw
    draw();

    // Handle Resize redrawing
    const handleResize = () => {
      requestAnimationFrame(draw);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [history, displayCount]);

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif tracking-tight text-foreground">
            {t("seasonalTitle")}
          </h2>
          <p className="text-muted-foreground font-serif italic text-sm mt-2 opacity-70">
            {t("seasonalDescription")}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-muted-foreground uppercase opacity-50">
          <span>Past</span>
          <div className="w-12 h-px bg-border" />
          <span>Present</span>
        </div>
      </div>

      <div className="relative w-full h-48 md:h-64 bg-card/30 border border-border/40 overflow-hidden group">
        <canvas
          ref={canvasRef}
          className="w-full h-full transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
        />

        {/* Overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-transparent pointer-events-none" />

        {/* Time Labels (Subtle) */}
        <div className="absolute left-2 top-2 text-[9px] font-mono text-muted-foreground/30 pointer-events-none">
          NOON
        </div>
        <div className="absolute left-2 bottom-2 text-[9px] font-mono text-muted-foreground/30 pointer-events-none">
          MIDNIGHT
        </div>
      </div>
    </div>
  );
}
