import { Metadata } from "next";
import { DiagnosisApp } from "@/components/DiagnosisApp";

export const metadata: Metadata = {
  title: "診断中...",
  description: "20の質問に答えて、あなたの運命の色を見つけましょう。",
  robots: {
    index: false, // 診断中のページは検索結果に出さないのが一般的（重複コンテンツ防止）
  },
};

export default function DiagnosisPage() {
  return <DiagnosisApp />;
}
