"use client";

import { useState, useCallback } from "react";
import { QuestionScreen } from "@/components/QuestionScreen";
import { ResultScreen } from "@/components/ResultScreen";
import {
  DiagnosisState,
  DiagnosisResult,
  ColorPair,
  createDiagnosisState,
  selectOptimalColorPair,
  processChoice,
  getFinalResult,
  isDiagnosisComplete,
} from "@/lib/color-diagnosis";

type Screen = "question" | "result";

interface HistoryEntry {
  state: DiagnosisState;
  pair: ColorPair;
}

export function DiagnosisApp() {
  const [screen, setScreen] = useState<Screen>("question");

  // 初期化: ページロード時に同期的に診断を開始（Lazy initialization）
  const [initialData] = useState(() => {
    const state = createDiagnosisState();
    const pair = selectOptimalColorPair(state);
    return { state, pair };
  });

  const [diagnosisState, setDiagnosisState] = useState<DiagnosisState>(
    initialData.state
  );
  const [colorPair, setColorPair] = useState<ColorPair>(initialData.pair);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleSelect = useCallback(
    (choice: "A" | "B") => {
      if (!diagnosisState || !colorPair) return;

      // 現在の状態を履歴に追加
      setHistory((prev) => [
        ...prev,
        { state: diagnosisState, pair: colorPair },
      ]);

      const newState = processChoice(diagnosisState, choice, colorPair);
      setDiagnosisState(newState);

      if (isDiagnosisComplete(newState)) {
        const finalResult = getFinalResult(newState);
        setResult(finalResult);
        setScreen("result");
      } else {
        const newPair = selectOptimalColorPair(newState);
        setColorPair(newPair);
      }
    },
    [diagnosisState, colorPair]
  );

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;

    const lastEntry = history[history.length - 1];
    setDiagnosisState(lastEntry.state);
    setColorPair(lastEntry.pair);
    setHistory((prev) => prev.slice(0, -1));
  }, [history]);

  // まだロード中（useEffect前）の場合は何も表示しないか、ローディング出す
  if (!diagnosisState || !colorPair) {
    return null; // または <Loading />
  }

  return (
    <div className="flex w-full flex-grow items-center justify-center p-space-2">
      <main className="w-full max-w-md p-space-4">
        {screen === "question" && (
          <QuestionScreen
            questionNumber={diagnosisState.currentQuestion}
            totalQuestions={diagnosisState.totalQuestions}
            colorA={colorPair.colorA}
            colorB={colorPair.colorB}
            prediction={diagnosisState.currentPrediction}
            confidence={diagnosisState.confidence}
            onSelectA={() => handleSelect("A")}
            onSelectB={() => handleSelect("B")}
            onUndo={history.length > 0 ? handleUndo : undefined}
          />
        )}

        {screen === "result" && result && <ResultScreen result={result} />}
      </main>
    </div>
  );
}
