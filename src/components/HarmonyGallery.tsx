"use client";

import React, { useState } from "react";
import Link from "next/link";
import { parse, converter } from "culori";
import { HarmonyDetailModal } from "./HarmonyDetailModal";
import { ArrowsOut } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

interface HarmonyGalleryProps {
  hex: string;
  harmonies: {
    complementary: string;
    analogous: string[];
    rectangular: string[];
    analogousComplementary: string[];
    triadic: string[];
    tetradic: string[];
    splitComplementary: string[];
    pentadic: string[];
    hexadic: string[];
  };
}

const toOklch = converter("oklch");

export function HarmonyGallery({ hex, harmonies }: HarmonyGalleryProps) {
  const t = useTranslations("Harmonies");
  const [selectedHarmony, setSelectedHarmony] = useState<{
    name: string;
    sub: string;
    description?: string;
    colors: string[];
    angles: number[];
  } | null>(null);

  // Calculate Base Hue for geometry
  const c = parse(hex);
  const ok = c ? toOklch(c) : { h: 0 };
  const h = ok.h || 0;

  const schemes = [
    {
      name: t("complementary.name"),
      sub: t("complementary.sub"),
      description: t("complementary.desc"),
      colors: [hex, harmonies.complementary],
      angles: [h, (h + 180) % 360],
    },
    {
      name: t("analogous.name"),
      sub: t("analogous.sub"),
      description: t("analogous.desc"),
      colors: [harmonies.analogous[0], hex, harmonies.analogous[1]],
      angles: [(h - 30 + 360) % 360, h, (h + 30) % 360],
    },
    {
      name: t("rectangular.name"),
      sub: t("rectangular.sub"),
      description: t("rectangular.desc"),
      colors: [hex, ...harmonies.rectangular],
      angles: [h, (h + 60) % 360, (h + 180) % 360, (h + 240) % 360],
    },
    {
      name: t("analogousComplementary.name"),
      sub: t("analogousComplementary.sub"),
      description: t("analogousComplementary.desc"),
      colors: [
        harmonies.analogousComplementary[0],
        hex,
        harmonies.analogousComplementary[1],
        harmonies.analogousComplementary[2],
      ],
      angles: [(h - 30 + 360) % 360, h, (h + 30) % 360, (h + 180) % 360],
    },
    {
      name: t("triadic.name"),
      sub: t("triadic.sub"),
      description: t("triadic.desc"),
      colors: [hex, ...harmonies.triadic],
      angles: [h, (h + 120) % 360, (h + 240) % 360],
    },
    {
      name: t("splitComplementary.name"),
      sub: t("splitComplementary.sub"),
      description: t("splitComplementary.desc"),
      colors: [hex, ...harmonies.splitComplementary],
      angles: [h, (h + 150) % 360, (h + 210) % 360],
    },
    {
      name: t("tetradic.name"),
      sub: t("tetradic.sub"),
      description: t("tetradic.desc"),
      colors: [hex, ...harmonies.tetradic],
      angles: [h, (h + 90) % 360, (h + 180) % 360, (h + 270) % 360],
    },
    {
      name: t("pentadic.name"),
      sub: t("pentadic.sub"),
      description: t("pentadic.desc"),
      colors: [hex, ...harmonies.pentadic],
      angles: [
        h,
        (h + 72) % 360,
        (h + 144) % 360,
        (h + 216) % 360,
        (h + 288) % 360,
      ],
    },
    {
      name: t("hexadic.name"),
      sub: t("hexadic.sub"),
      description: t("hexadic.desc"),
      colors: [hex, ...harmonies.hexadic],
      angles: [
        h,
        (h + 60) % 360,
        (h + 120) % 360,
        (h + 180) % 360,
        (h + 240) % 360,
        (h + 300) % 360,
      ],
    },
  ];

  return (
    <section>
      <h2 className="mb-12 text-center font-serif text-2xl tracking-widest text-foreground">
        {t("title")}
        <span className="mt-2 block font-sans text-sm tracking-normal text-muted-foreground">
          {t("subtitle")}
        </span>
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme) => (
          <div key={scheme.sub} className="group flex flex-col space-y-6">
            {/* The Art (Palette) */}
            <div className="relative">
              <div className="flex aspect-[16/10] w-full overflow-hidden floating-shadow">
                {scheme.colors.map((c, i) => (
                  <Link
                    key={`${scheme.sub}-${c}-${i}`}
                    href={`/${c.replace("#", "")}`}
                    className="group/swatch relative flex flex-1 items-end justify-center pb-0 shadow-sm z-0"
                    style={{ backgroundColor: c }}
                    title={`${c}`}
                  >
                    <span className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-white py-2 font-mono text-[10px] tracking-wider text-black opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100">
                      {c}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Detail View Button (Overlay) */}
              <button
                onClick={() => setSelectedHarmony(scheme)}
                className="absolute top-2 right-2 p-2 rounded-full bg-black/20 hover:bg-black/50 text-white opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                title="色相環で見る"
              >
                <ArrowsOut weight="light" className="w-4 h-4" />
              </button>
            </div>

            {/* The Caption */}
            <div
              className="px-1 text-left cursor-pointer"
              onClick={() => setSelectedHarmony(scheme)}
            >
              <div className="flex items-center gap-2 group-hover:text-foreground/80 transition-colors">
                <h3 className="font-serif text-base text-foreground tracking-wider">
                  {scheme.name}
                </h3>
              </div>
              <p className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase border-t border-border/40 pt-2 inline-block min-w-[100px]">
                {scheme.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedHarmony && (
        <HarmonyDetailModal
          isOpen={!!selectedHarmony}
          onClose={() => setSelectedHarmony(null)}
          title={selectedHarmony.name}
          sub={selectedHarmony.sub}
          description={selectedHarmony.description}
          colors={selectedHarmony.colors}
          mainColor={hex}
          angles={selectedHarmony.angles}
        />
      )}
    </section>
  );
}
