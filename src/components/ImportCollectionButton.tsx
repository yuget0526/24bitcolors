"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function ImportCollectionButton({ shareId }: { shareId: string }) {
  const t = useTranslations("Share");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleImport = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shareId }),
      });

      if (!res.ok) throw new Error("Import failed");

      setIsSaved(true);
      router.refresh(); // Refresh to potentially show updated state if we were on a page that cared?

      // Optional: Redirect to collection page after short delay
      setTimeout(() => {
        router.push("/collection");
      }, 1000);
    } catch (e) {
      console.error(e);
      alert(t("failed"));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSaved) {
    return (
      <Button
        variant="outline"
        className="mt-4 rounded-full px-6 gap-2 text-green-600 border-green-200 bg-green-50"
        disabled
      >
        <Check className="w-4 h-4" />
        {t("saved")}
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      className="mt-4 rounded-full px-6 gap-2"
      onClick={handleImport}
      disabled={isLoading}
    >
      <Download className="w-4 h-4" />
      {isLoading ? "Saving..." : t("saveToMyPalette")}
    </Button>
  );
}
