"use client";

import React, { useMemo } from "react";
import { parse, converter, formatHex } from "culori";

interface ColorWheelProps {
  colors: string[];
  mainColor: string;
  size?: number;
  className?: string;
  angles?: number[]; // Optional ideal angles to force perfect shapes
}

const toOklch = converter("oklch");

export function ColorWheel({
  colors,
  mainColor,
  size = 300,
  className = "",
  angles,
}: ColorWheelProps) {
  const radius = size / 2;
  const center = size / 2;
  const wheelRadius = radius * 0.85; // Radius where dots are placed

  // Calculate positions for each color
  const colorPoints = useMemo(() => {
    return colors.map((hex, i) => {
      const c = parse(hex);
      // Fallback to 0 if parsing fails
      const ok = c ? toOklch(c) : { h: 0 };

      // Use provided ideal angle if available, otherwise use actual hex hue
      const hue = angles && angles[i] !== undefined ? angles[i] : ok.h || 0;

      // Convert polar to cartesian
      // adjust angle so 0 is at top (-90 degrees offset in standard trig)
      const angleRad = ((hue - 90) * Math.PI) / 180;

      const x = center + wheelRadius * Math.cos(angleRad);
      const y = center + wheelRadius * Math.sin(angleRad);

      return { hex, x, y, hue };
    });
  }, [colors, center, wheelRadius, angles]);

  // Generate SVG path connecting the points to show the shape
  const shapePath = useMemo(() => {
    if (colorPoints.length < 2) return "";
    // Sort points by hue to draw the polygon perimeter correctly?
    // Or strictly connect them in order? For harmonies like "Rectangular" defined as [base, +60, +180, +240], the logical connection is implied.
    // However, usually we want the polygon shape.
    // Let's sort by hue to draw the convex hull/perimeter shape cleanly.
    const sortedPoints = [...colorPoints].sort((a, b) => a.hue - b.hue);

    return (
      `M ${sortedPoints[0].x} ${sortedPoints[0].y} ` +
      sortedPoints
        .slice(1)
        .map((p) => `L ${p.x} ${p.y}`)
        .join(" ") +
      " Z"
    );
  }, [colorPoints]);

  // Calculate dynamic Lightness/Chroma based on mainColor to match the visual vibe
  // This resolves the "deviation" feeling when pastel dots are on a vibrant background.
  const gradientParams = useMemo(() => {
    const c = parse(mainColor);
    const ok = c ? toOklch(c) : { l: 0.7, c: 0.14 };

    // Fallbacks
    let l = ok.l || 0.7;
    let cVal = ok.c || 0.14;

    // Harmonize Logic:
    // If color is very dark/light, clamp L so the wheel remains visible.
    // L range: 0.3 (Dark) ~ 0.95 (Pastel). Avoid extremes.
    l = Math.max(0.4, Math.min(l, 0.9));

    // If color is achromatic (Gray), force some Chroma so we still see a hue wheel.
    // If valid chroma, use it but clamp to avoid super-neon unrenderable colors.
    if (cVal < 0.05) cVal = 0.14; // Default vibrancy for grays
    else cVal = Math.max(0.1, Math.min(cVal, 0.3));

    return { l, c: cVal };
  }, [mainColor]);

  // Create accurate OKLCH spectrum gradient
  const spectrumGradient = useMemo(() => {
    const stops = 36;
    const colors: string[] = [];
    for (let i = 0; i <= stops; i++) {
      const h = (i * 360) / stops;
      const hex = formatHex({
        mode: "oklch",
        l: gradientParams.l,
        c: gradientParams.c,
        h: h,
      });
      colors.push(hex);
    }
    return `conic-gradient(from 0deg, ${colors.join(", ")})`;
  }, [gradientParams]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Gradient Circle (Spectrum) */}
      <div
        className="rounded-full shadow-inner"
        style={{
          width: size,
          height: size,
          background: spectrumGradient,
        }}
      />

      {/* Overlay to dim the center (Donut style) or just let it be full circle? */}
      <div
        className="absolute rounded-full bg-background/90 backdrop-blur-sm"
        style={{ width: size * 0.6, height: size * 0.6 }}
      />

      {/* SVG Layer for lines and dots */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0 pointer-events-none"
        style={{ overflow: "visible" }}
      >
        {/* Connection Lines (The Shape) */}
        {colorPoints.length > 1 && (
          <path
            d={shapePath}
            className="fill-foreground/10 stroke-foreground/50 transition-colors duration-300"
            strokeWidth="1"
          />
        )}

        {/* Dots */}
        {colorPoints.map((p, i) => {
          const isMain =
            p.hex.toUpperCase() === mainColor.replace("#", "").toUpperCase() ||
            p.hex.toUpperCase() === mainColor.toUpperCase();
          return (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={isMain ? 8 : 5}
                fill={p.hex}
                stroke="white"
                strokeWidth="2"
                className="drop-shadow-md transition-all"
              />
              {isMain && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={12}
                  fill="none"
                  stroke={p.hex}
                  strokeWidth="1"
                  className="animate-pulse"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Center Label (Optional) */}
      <div className="absolute text-center">
        <span className="text-xs font-mono tracking-widest text-muted-foreground">
          OKLCH
        </span>
      </div>
    </div>
  );
}
