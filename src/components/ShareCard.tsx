"use client";

import { useState, useEffect } from "react";
import { OklchColor } from "@/lib/oklch";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";

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
function generateGalleryShareCard(
  colorHex: string,
  oklchData: { l: number; c: number; h: number },
  theme: CardTheme
): string {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // ベース定義 (Design System: Museum Palette)
  const lightColors = {
    bg: "#f9f9f9", // --background
    frame: "#000000", // .color-frame
    textMain: "#1a1a1a", // --foreground
    textHex: "#1a1a1a",
    textSub: "#666666", // --muted-foreground
    textInfo: "#666666",
    shadow: "rgba(0, 0, 0, 0.15)",
    shadowBlur: 40,
  };

  const darkColors = {
    bg: "#080808", // --background (Deep Ink)
    frame: "#e5e5e5", // --foreground (Soft White)
    textMain: "#e5e5e5",
    textHex: "#e5e5e5",
    textSub: "#808080", // --muted-foreground
    textInfo: "#808080",
    shadow: "rgba(0, 0, 0, 0.5)",
    shadowBlur: 60,
  };

  // テーマ別カラー決定
  let colors;

  if (theme === "light") {
    colors = lightColors;
  } else if (theme === "dark") {
    colors = darkColors;
  } else {
    // Color mode: 背景は色。
    // 文字色・フレーム色は背景とのコントラスト確保のため、完全な単色（黒/白）に統一する。
    // グレー（濃淡）を使用すると背景色と混ざって別の色に見える場合があるため、これを回避する。
    const isBrightBackground = oklchData.l > 0.6;
    const textColor = isBrightBackground ? "#000000" : "#FFFFFF";
    const baseColors = isBrightBackground ? lightColors : darkColors;

    colors = {
      ...baseColors,
      bg: colorHex,
      // 背景色に応じた影の濃さ調整
      shadow: isBrightBackground ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.6)",

      // 全要素の色を統一
      frame: textColor,
      textMain: textColor,
      textHex: textColor,
      textSub: textColor,
      textInfo: textColor,
    };
  }

  // 背景
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, 1080, 1920);

  // アートワーク配置
  const artSize = 900;
  const artX = (1080 - artSize) / 2;
  const artY = 250;

  // シャドウ
  ctx.shadowColor = colors.shadow;
  ctx.shadowBlur = colors.shadowBlur;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 20;

  // フレーム
  const frameThickness = 24;
  ctx.fillStyle = colors.frame;
  ctx.fillRect(
    artX - frameThickness,
    artY - frameThickness,
    artSize + frameThickness * 2,
    artSize + frameThickness * 2
  );

  // 色の長方形
  ctx.fillStyle = colorHex;
  ctx.fillRect(artX, artY, artSize, artSize);

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  // ミュージアムラベル (テキストエリア)
  const labelX = artX - frameThickness;
  const labelBaseY = artY + artSize + frameThickness + 100;

  // 1. ブランド名 (Main)
  // テキスト位置は全テーマで labelX に統一
  ctx.fillStyle = colors.textMain;
  ctx.font = 'bold 80px Georgia, "Times New Roman", serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("24bitColors", labelX, labelBaseY);

  // 2. HEXコード
  ctx.font = '400 64px "SF Mono", "Courier New", Courier, monospace';
  ctx.fillStyle = colors.textHex;
  ctx.fillText(colorHex.toUpperCase(), labelX, labelBaseY + 110);

  // 3. サブタイトル
  ctx.font = "italic 40px Georgia, serif";
  ctx.fillStyle = colors.textSub;
  ctx.fillText("Your Personal Color", labelX, labelBaseY + 210);

  // 4. データ
  ctx.font = '300 36px "SF Mono", monospace';
  ctx.fillStyle = colors.textInfo;
  const oklchText = `L:${Math.round(oklchData.l * 100)}  C:${Math.round(
    oklchData.c * 100
  )}  H:${Math.round(oklchData.h)}°`;
  ctx.fillText(oklchText, labelX, labelBaseY + 280);

  return canvas.toDataURL("image/png");
}

export function ShareCard({ color, hex, onClose }: ShareCardProps) {
  const { theme: systemTheme } = useTheme();
  const isDark = systemTheme === "dark";

  // systemThemeは"light"または"dark"なので、CardThemeにキャスト
  const [cardTheme, setCardTheme] = useState<CardTheme>(systemTheme);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // レンダリングと再生成
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
    link.download = `my-color-${hex.replace("#", "")}-${cardTheme}.png`;
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
      const file = new File([blob], "my-color.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Favorite Color",
          text: `私の好きな色は ${hex} です! #24bitColors #YourColor`,
        });
      } else {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-space-4"
      style={{
        backgroundColor: isDark
          ? "rgba(0, 0, 0, 0.85)"
          : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      {/* 閉じるボタン (Fixed position) */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-none border border-foreground/10 bg-background/50 text-foreground backdrop-blur-md transition-all hover:bg-foreground hover:text-background"
        aria-label="閉じる"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div
        className="relative flex w-full max-w-md flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* プレビューエリア */}
        <div className="relative mb-space-5 flex w-full items-center justify-center">
          {imageDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageDataUrl}
              alt="Share Card"
              className="max-h-[50vh] w-auto transition-all duration-500 animate-fade-in floating-shadow"
            />
          ) : (
            <div
              className={`flex h-96 w-64 items-center justify-center ${
                isDark ? "bg-[#1A1A1A]" : "bg-[#E8E8E8]"
              }`}
            >
              <span
                className={isDark ? "text-[#888888]" : "text-[#666666]"}
                style={{ fontFamily: "Georgia, serif" }}
              >
                生成中...
              </span>
            </div>
          )}
        </div>

        {/* スタイル選択 (Spotify Style Chips - Pure Minimal) */}
        <div className="mb-space-6 flex flex-col items-center gap-4">
          <div className="flex gap-space-4">
            {/* Light Code */}
            <button
              onClick={() => setCardTheme("light")}
              className={`h-10 w-10 rounded-full border bg-[#f9f9f9] transition-all focus:outline-none ${
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
              className={`h-10 w-10 rounded-full border bg-[#080808] transition-all focus:outline-none ${
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
              className={`h-10 w-10 rounded-full border transition-all focus:outline-none ${
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

          {/* Selected Theme Label */}
          <p
            className={`text-sm tracking-widest ${
              isDark ? "text-[#E0E0E0]" : "text-[#1a1a1a]"
            }`}
            style={{ fontFamily: "Georgia, serif" }}
          >
            {cardTheme === "light" && "Gallery Light"}
            {cardTheme === "dark" && "Gallery Dark"}
            {cardTheme === "color" && "Personal Color"}
          </p>
        </div>

        {/* アクションボタン */}
        <div className="flex w-full gap-space-3">
          <Button
            onClick={handleShare}
            disabled={isGenerating || !imageDataUrl}
            className="h-auto flex-1 py-space-4 text-base shadow-lg"
          >
            {isGenerating ? "処理中..." : "シェア"}
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!imageDataUrl}
            variant="outline"
            className="h-auto flex-1 py-space-4 text-base shadow-lg"
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}
