"use client";

import { useState, useEffect } from "react";
import { OklchColor } from "@/lib/oklch";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { X } from "@phosphor-icons/react";
import { getNearestPoeticName } from "@/lib/colorNaming";
import { useTranslations } from "next-intl";

interface ShareCardProps {
  color: OklchColor;
  hex: string;
  onClose: () => void;
}

type CardTheme = "light" | "dark" | "color";

/**
 * ギャラリー風シェアカード生成関数
 * Canvas APIで直接描画（Instagram Story サイズ 1080x1920）
 */
/**
 * ギャラリー風シェアカード生成関数
 * Canvas APIで直接描画（Resolution 1080x1920）
 */
function generateGalleryShareCard(
  colorHex: string,
  oklchData: { l: number; c: number; h: number },
  theme: CardTheme
): string {
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = 1920;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Color Name lookup
  const { groupName } = getNearestPoeticName(colorHex);

  // Design System Colors
  const lightColors = {
    bg: "#F9F9F9", // Neutral-50
    frame: "#E5E5E5", // Neutral-100
    textMain: "#1A1A1A", // Neutral-800
    textHex: "#1A1A1A",
    textSub: "#808080", // Neutral-500
    accent: "#000000",
    shadow: "rgba(0, 0, 0, 0.15)",
    shadowBlur: 50,
  };

  const darkColors = {
    bg: "#080808", // Neutral-900 (Deep Ink)
    frame: "#2A2A2A", // Neutral-800
    textMain: "#E5E5E5", // Neutral-100
    textHex: "#E5E5E5",
    textSub: "#808080", // Neutral-500
    accent: "#FFFFFF",
    shadow: "rgba(255, 255, 255, 0.1)",
    shadowBlur: 60,
  };

  // Determine colors based on theme
  let colors;
  if (theme === "light") {
    colors = lightColors;
  } else if (theme === "dark") {
    colors = darkColors;
  } else {
    // Color mode
    const isBrightBackground = oklchData.l > 0.6;
    const textColor = isBrightBackground ? "#1A1A1A" : "#FFFFFF";
    const baseColors = isBrightBackground ? lightColors : darkColors;
    colors = {
      ...baseColors,
      bg: colorHex,
      shadow: isBrightBackground ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.6)",
      frame: isBrightBackground ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)",
      textMain: textColor,
      textHex: textColor,
      textSub: isBrightBackground ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)",
      accent: textColor,
    };
  }

  // 1. Fill Background
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, width, height);

  // 2. Add Noise Texture (Film Grain Effect)
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  // Light noise for texture
  const noiseIntensity = theme === "dark" ? 10 : 6;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * noiseIntensity;
    data[i] += noise;
    data[i + 1] += noise;
    data[i + 2] += noise;
  }
  ctx.putImageData(imageData, 0, 0);

  // 3. Layout Constants (Fibonacci-ish)
  const padding = 60; // Narrower padding
  const contentWidth = width - padding * 2;
  const circleRadius = 380; // Larger circle (Diameter 760)
  const circleY = 620; // Move up significantly

  // 4. Draw Frame (Museum Mat / Ticket Style)
  ctx.strokeStyle = colors.frame;
  ctx.lineWidth = 4; // Bolder frame
  // Outer Border
  ctx.strokeRect(padding, padding, contentWidth, height - padding * 2);

  // Cross marks at corners (Crop marks style)
  const markLen = 40; // Longer marks
  ctx.strokeStyle = colors.textSub;
  ctx.lineWidth = 2; // Bolder marks
  ctx.beginPath();
  // Top-Left
  ctx.moveTo(padding - markLen, padding);
  ctx.lineTo(padding + markLen, padding);
  ctx.moveTo(padding, padding - markLen);
  ctx.lineTo(padding, padding + markLen);
  // Top-Right
  ctx.moveTo(width - padding - markLen, padding);
  ctx.lineTo(width - padding + markLen, padding);
  ctx.moveTo(width - padding, padding - markLen);
  ctx.lineTo(width - padding, padding + markLen);
  // Bottom-Left
  ctx.moveTo(padding - markLen, height - padding);
  ctx.lineTo(padding + markLen, height - padding);
  ctx.moveTo(padding, height - padding - markLen);
  ctx.lineTo(padding, height - padding + markLen);
  // Bottom-Right
  ctx.moveTo(width - padding - markLen, height - padding);
  ctx.lineTo(width - padding + markLen, height - padding);
  ctx.moveTo(width - padding, height - padding - markLen);
  ctx.lineTo(width - padding, height - padding + markLen);
  ctx.stroke();

  // 5. Draw Color Circle (The Exhibit)
  ctx.save();
  ctx.shadowColor = colors.shadow;
  ctx.shadowBlur = colors.shadowBlur;
  ctx.shadowOffsetY = 60; // Deeper shadow

  ctx.beginPath();
  ctx.arc(width / 2, circleY, circleRadius, 0, Math.PI * 2);
  ctx.fillStyle = colorHex;
  ctx.fill();
  ctx.restore();

  // Circle Ring (Subtle border for integration)
  ctx.beginPath();
  ctx.arc(width / 2, circleY, circleRadius, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = colors.frame;
  ctx.stroke();

  // 6. Typography & Data
  ctx.textAlign = "center";

  // Group Name (Serif, Elegant)
  const titleY = circleY + circleRadius + 180;
  ctx.fillStyle = colors.textMain;
  ctx.font = '400 130px Georgia, "Times New Roman", serif'; // Much Larger
  ctx.fillText(groupName, width / 2, titleY);

  // Hex Code (Monospace, Precise)
  const hexY = titleY + 120;
  ctx.fillStyle = colors.textHex;
  ctx.font = '400 50px "SF Mono", "Courier New", monospace';
  ctx.letterSpacing = "0.2em"; // Wider tracking
  const spacedHex = colorHex.toUpperCase().split("").join(" ");
  ctx.fillText(spacedHex, width / 2, hexY);
  ctx.letterSpacing = "0px"; // Reset

  // Divider Line
  const lineY = hexY + 90;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 100, lineY); // Longer line
  ctx.lineTo(width / 2 + 100, lineY);
  ctx.strokeStyle = colors.textSub;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Data Block (OKLCH values)
  const dataY = lineY + 90;
  ctx.fillStyle = colors.textSub;
  ctx.font = '300 36px "SF Mono", monospace'; // Larger

  const l = Math.round(oklchData.l * 100);
  const c = oklchData.c.toFixed(3);
  const h = Math.round(oklchData.h);
  const dataText = `L: ${l}%   C: ${c}   H: ${h}°`;
  ctx.fillText(dataText, width / 2, dataY);

  // Date Stamp (Archival feel)
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0].replace(/-/g, ".");
  const dateY = dataY + 60;
  ctx.font = '300 28px "SF Mono", monospace';
  ctx.fillStyle = colors.textSub;
  ctx.globalAlpha = 0.6;
  ctx.fillText(`COLLECTED ON: ${dateStr}`, width / 2, dateY);
  ctx.globalAlpha = 1.0;

  // 7. Footer / Branding
  const footerY = height - padding - 50;

  // Left: Logo
  ctx.textAlign = "left";
  ctx.fillStyle = colors.textMain;
  ctx.font = 'bold 56px Georgia, "Times New Roman", serif';
  ctx.fillText("24bitColors", padding + 40, footerY);

  // Right: Tagline or URL
  ctx.textAlign = "right";
  ctx.fillStyle = colors.textSub;
  ctx.font = '300 36px "SF Mono", monospace';
  ctx.fillText("digital color museum", width - padding - 40, footerY);

  return canvas.toDataURL("image/png");
}

export function ShareCard({ color, hex, onClose }: ShareCardProps) {
  const t = useTranslations("Share");
  const { theme: systemTheme } = useTheme();
  const isDark = systemTheme === "dark";

  // systemThemeは"light"または"dark"なので、CardThemeにキャスト
  const [cardTheme, setCardTheme] = useState<CardTheme>(systemTheme);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Header visibility control
  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      header.style.transition = "opacity 0.3s";
      header.style.opacity = "0";
      header.style.pointerEvents = "none";
    }
    return () => {
      if (header) {
        header.style.opacity = "1";
        header.style.pointerEvents = "auto";
      }
    };
  }, []);

  // レンダリングと再生成 (Restored)
  useEffect(() => {
    const dataUrl = generateGalleryShareCard(
      hex,
      {
        l: color.lightness,
        c: color.chroma,
        h: color.hue,
      },
      cardTheme
    );
    setImageDataUrl(dataUrl);
  }, [hex, color, cardTheme]);

  const handleDownload = () => {
    if (!imageDataUrl) return;
    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = `24bitcolors-${hex.replace("#", "")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!imageDataUrl) return;
    setIsGenerating(true);

    try {
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const safeHex = hex.replace("#", "").toUpperCase();
      const file = new File([blob], `24bitcolors-${safeHex}.png`, {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: t("shareTitle"),
          text: `${t("shareText", {
            name: getNearestPoeticName(hex).groupName,
            hex: hex,
          })}\n\n#24bitColors`,
        });
      } else {
        // Fallback if file share not supported but Web Share is (rare but possible) or just Desktop
        handleDownload();
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("シェアエラー:", error);
        handleDownload();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-space-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* 閉じるボタン */}
      <button
        onClick={onClose}
        className="absolute top-12 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-none border border-foreground text-foreground bg-transparent transition-all hover:bg-foreground hover:text-background"
        aria-label="Close"
      >
        <X weight="light" className="h-6 w-6" />
      </button>

      <div
        className="relative flex w-fit flex-col items-center pt-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* プレビューエリア */}
        <div className="relative mb-8 flex items-center justify-center">
          {imageDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageDataUrl}
              alt="Share Card"
              className="max-h-[50vh] w-auto border border-border/20 shadow-2xl transition-all duration-500 animate-fade-in"
            />
          ) : (
            <div
              className={`flex aspect-[9/16] h-[50vh] w-auto items-center justify-center shadow-2xl ${
                isDark ? "bg-[#1A1A1A]" : "bg-[#E8E8E8]"
              }`}
            >
              <span className="animate-pulse font-serif text-muted-foreground">
                {t("generating")}
              </span>
            </div>
          )}
        </div>

        {/* スタイル選択 */}
        <div className="mb-8 flex gap-4">
          {/* Light Code */}
          <button
            onClick={() => setCardTheme("light")}
            className={`h-8 w-8 border bg-[#f9f9f9] transition-all focus:outline-none rounded-none ${
              isDark ? "border-white/20" : "border-black/10 shadow-sm"
            } ${
              cardTheme === "light"
                ? `scale-110 ring-1 ring-offset-4 ${
                    isDark
                      ? "ring-white ring-offset-black"
                      : "ring-black ring-offset-white"
                  }`
                : "opacity-60 hover:opacity-100"
            }`}
            aria-label="Select Light Theme"
          />

          {/* Dark Code */}
          <button
            onClick={() => setCardTheme("dark")}
            className={`h-8 w-8 border bg-[#080808] transition-all focus:outline-none rounded-none ${
              isDark ? "border-white/20" : "border-black/10"
            } ${
              cardTheme === "dark"
                ? `scale-110 ring-1 ring-offset-4 ${
                    isDark
                      ? "ring-white ring-offset-black"
                      : "ring-black ring-offset-white"
                  }`
                : "opacity-60 hover:opacity-100"
            }`}
            aria-label="Select Dark Theme"
          />

          {/* Color Code */}
          <button
            onClick={() => setCardTheme("color")}
            className={`h-8 w-8 border transition-all focus:outline-none rounded-none ${
              isDark ? "border-white/20" : "border-black/10 shadow-sm"
            } ${
              cardTheme === "color"
                ? `scale-110 ring-1 ring-offset-4 ${
                    isDark
                      ? "ring-white ring-offset-black"
                      : "ring-black ring-offset-white"
                  }`
                : "opacity-60 hover:opacity-100"
            }`}
            style={{ backgroundColor: hex }}
            aria-label="Select Color Theme"
          />
        </div>

        {/* アクションボタン Vertical Stack */}
        <div className="flex flex-col gap-4 w-full">
          <Button
            onClick={handleShare}
            disabled={isGenerating || !imageDataUrl}
            className="h-12 w-full text-xs tracking-[0.2em] font-serif uppercase rounded-none bg-foreground text-background hover:bg-foreground/90 transition-all border border-foreground"
          >
            {isGenerating ? "..." : t("shareImage")}
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!imageDataUrl}
            variant="outline"
            className="h-12 w-full text-xs tracking-[0.2em] font-serif uppercase rounded-none border-foreground/20 hover:bg-foreground hover:text-background transition-all"
          >
            {t("saveImage")}
          </Button>
        </div>
      </div>
    </div>
  );
}
