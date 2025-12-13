"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getNearestPoeticName } from "@/lib/colorNaming";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoryItem {
  id: string;
  hex: string;
  created_at: string;
  poeticName?: string;
  groupSlug?: string;
}

export default function HistoryPage() {
  const t = useTranslations("Common");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const anonymousId = localStorage.getItem("anonymous_id");
    if (!anonymousId) {
      // Defer state update to avoid synchronous render warning
      const timer = setTimeout(() => setIsLoading(false), 0);
      return () => clearTimeout(timer);
    }

    fetch(`/api/history?id=${anonymousId}&limit=100`)
      .then((res) => res.json())
      .then((data) => {
        if (data.history) {
          const enriched = data.history.map((item: HistoryItem) => {
            const info = getNearestPoeticName(item.hex);
            return {
              ...item,
              poeticName: info.fullTitle,
              groupSlug: info.groupSlug,
            };
          });
          setHistory(enriched);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-space-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-serif">{t("history")}</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((item) => (
            <Link
              key={item.id}
              href={`/result/${item.groupSlug}?hex=${item.hex.replace(
                "#",
                ""
              )}`}
              className="group relative overflow-hidden rounded-xl border border-border/20 bg-card hover:bg-accent/5 transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="flex items-center p-4 gap-4">
                <div
                  className="w-16 h-16 rounded-full shadow-inner border border-white/10 shrink-0"
                  style={{ backgroundColor: item.hex }}
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-serif text-lg font-medium truncate group-hover:text-primary transition-colors">
                    {item.poeticName}
                  </span>
                  <span className="text-sm font-mono text-muted-foreground uppercase opacity-70">
                    {item.hex}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p>{t("noHistory")}</p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/diagnosis">{t("startDiagnosis")}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
