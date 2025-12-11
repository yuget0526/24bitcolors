"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { getNearestPoeticName } from "@/lib/colorNaming";

import { useTranslations } from "next-intl";

export function LastDiagnosisLink() {
  const t = useTranslations("Common");
  const [lastHex, setLastHex] = useState<string | null>(null);
  const [groupSlug, setGroupSlug] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadDiagnosisColor = () => {
      const storedJson = localStorage.getItem("lastDiagnosisResult");
      const storedHex = localStorage.getItem("lastDiagnosisHex");

      let hex: string | null = null;

      if (storedJson) {
        try {
          const parsed = JSON.parse(storedJson);
          if (parsed.hex) hex = parsed.hex;
        } catch (e) {
          console.error("Failed to parse lastDiagnosisResult", e);
        }
      }

      // Fallback or override
      if (!hex && storedHex) {
        hex = storedHex;
      }

      if (hex) {
        const { groupSlug } = getNearestPoeticName(hex);
        setLastHex(hex);
        setGroupSlug(groupSlug);
        setIsVisible(true);
      }
    };

    // Initial load
    loadDiagnosisColor();

    // Listen for storage changes (from other tabs or same tab updates)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "lastDiagnosisHex" || e.key === "lastDiagnosisResult") {
        loadDiagnosisColor();
      }
    };

    // Also refresh when navigating back to the page
    const handleFocus = () => loadDiagnosisColor();

    // Listen for same-tab updates via custom event
    const handleColorUpdate = () => loadDiagnosisColor();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("diagnosisColorUpdate", handleColorUpdate);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("diagnosisColorUpdate", handleColorUpdate);
    };
  }, []);

  if (!isVisible || !lastHex || !groupSlug) return null;

  const safeHex = lastHex.replace("#", "");

  return (
    <div className="flex items-center animate-in fade-in duration-500">
      <Link
        href={`/result/${groupSlug}?hex=${safeHex}`}
        className="group flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-muted/10"
        title={t("lastDiagnosisTooltip")}
      >
        <div
          className="h-5 w-5 rounded-full shadow-sm ring-1 ring-black/5 transition-transform group-hover:scale-110"
          style={{ backgroundColor: lastHex }}
        />
      </Link>
    </div>
  );
}
