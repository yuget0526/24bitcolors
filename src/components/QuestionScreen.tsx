"use client";

import { useTranslations } from "next-intl";
import { ColorButton } from "./ColorButton";
import { OklchColor, oklchToHex } from "@/lib/oklch";

interface QuestionScreenProps {
  questionNumber: number;
  totalQuestions: number;
  colorA: OklchColor;
  colorB: OklchColor;
  prediction: OklchColor | null;
  confidence: number;
  onSelectA: () => void;
  onSelectB: () => void;
  onUndo?: () => void;
}

export function QuestionScreen({
  questionNumber,
  totalQuestions,
  colorA,
  colorB,
  prediction,
  onSelectA,
  onSelectB,
  onUndo,
}: QuestionScreenProps) {
  const t = useTranslations("Diagnosis");
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="flex w-full flex-col items-center">
      {/* プログレスバー */}
      <div className="mb-space-2 h-px w-full bg-gray-300 dark:bg-gray-700">
        <div
          className="h-full bg-[var(--foreground)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 質問カウント + 戻るボタン */}
      <div className="mb-space-2 flex w-full items-center justify-between">
        <div className="w-16">
          {onUndo && (
            <button
              onClick={onUndo}
              className="text-[length:var(--text-base)] text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {t("back")}
            </button>
          )}
        </div>
        <p
          className="text-[length:var(--text-base)] tracking-wider text-[var(--muted-foreground)]"
          style={{ fontFamily: '"SF Mono", monospace' }}
        >
          {questionNumber + 1} / {totalQuestions}
        </p>
        <div className="w-16" />
      </div>

      {/* 質問テキスト */}
      <h2
        className="mb-space-5 text-[length:var(--text-medium)] font-normal text-[var(--foreground)]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {t("questionLabel")}
      </h2>

      {/* 色選択 */}
      <div className="mb-space-5 grid w-full max-w-md grid-cols-2 gap-space-5">
        <ColorButton color={colorA} onClick={onSelectA} />
        <ColorButton color={colorB} onClick={onSelectB} />
      </div>

      {/* 予測表示 (Floating Pill) */}
      <div className="mt-8 h-12 flex justify-center items-center">
        <div
          className={`flex items-center gap-3 rounded-full border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-md glow-shadow transition-all duration-700 ease-out ${
            prediction
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div
            className="h-4 w-4 rounded-full shadow-sm transition-colors duration-500"
            style={{
              backgroundColor: prediction
                ? oklchToHex(prediction)
                : "transparent",
            }}
          />
          <span
            className="text-xs font-medium tracking-wider text-muted-foreground transition-colors duration-500"
            style={{ fontFamily: '"SF Mono", monospace' }}
          >
            {prediction ? oklchToHex(prediction) : "#000000"}
          </span>
        </div>
      </div>
    </div>
  );
}
