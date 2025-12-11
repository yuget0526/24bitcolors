import { Metadata } from "next";
import { DiagnosisApp } from "@/components/DiagnosisApp";

export const metadata: Metadata = {
  title: "無料色彩診断テスト | 24bitColors",
  description:
    "あなたの色彩感覚を特定するために、直感的に心地よい色を選んでください。所要時間は3分以内。登録不要の無料診断で、1677万色から好みの色を見つけましょう。",
};

export default function DiagnosisPage() {
  return <DiagnosisApp />;
}
