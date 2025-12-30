"use client";

import { useEffect, useState } from "react";
import { ColorInsight } from "@/lib/gemini";
import { ColorInsightSection } from "@/components/ColorInsightSection";

interface ColorInsightFetcherProps {
  hex: string;
  colorName: string;
  locale: string;
}

export function ColorInsightFetcher({
  hex,
  colorName,
  locale,
}: ColorInsightFetcherProps) {
  const [insight, setInsight] = useState<ColorInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchInsight = async () => {
      try {
        const params = new URLSearchParams({
          hex: hex.replace("#", ""),
          name: colorName,
          locale,
        });

        const res = await fetch(`/api/gemini?${params.toString()}`);

        if (!res.ok) {
          throw new Error("API response not ok");
        }

        const data = await res.json();
        if (isMounted) {
          setInsight(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch insight:", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchInsight();

    return () => {
      isMounted = false;
    };
  }, [hex, colorName, locale]);

  if (error) return null; // Hide silently on error

  if (loading) {
    return (
      <div className="w-full max-w-5xl px-6 py-24 flex justify-center opacity-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-0.5 w-12 bg-foreground/20"></div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
            Analyzing Color Resonance...
          </span>
        </div>
      </div>
    );
  }

  if (!insight) return null;

  return (
    <div className="w-full max-w-5xl px-6 animate-in fade-in duration-1000">
      <ColorInsightSection insight={insight} colorName={colorName} />
    </div>
  );
}
