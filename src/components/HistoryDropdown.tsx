"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getNearestPoeticName } from "@/lib/colorNaming";
import { History } from "lucide-react";

interface HistoryItem {
  id: string;
  hex: string;
  created_at: string;
  poeticName?: string;
}

export function HistoryDropdown() {
  const t = useTranslations("Common");
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [anonymousId, setAnonymousId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("anonymous_id");
      if (id) setAnonymousId(id);
    }
  }, []);

  useEffect(() => {
    if (isOpen && anonymousId) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/history?id=${anonymousId}&limit=5`); // Fetch a few more to see if "more" exists
          const data = await res.json();
          if (data.history) {
            const enrichedHistory = data.history.map((item: HistoryItem) => ({
              ...item,
              poeticName: getNearestPoeticName(item.hex).fullTitle,
            }));
            setHistory(enrichedHistory);
          }
        } catch (err) {
          console.error("Failed to fetch history", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [isOpen, anonymousId]);

  // Only show top 3 in the menu
  const displayHistory = history.slice(0, 3);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("history")}>
          <History className="h-5 w-5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={20}
        className="w-[144px] md:w-[160px]"
      >
        {isLoading ? (
          <div className="py-2 px-2 text-center text-xs text-muted-foreground font-serif tracking-widest min-w-[120px]">
            Loading...
          </div>
        ) : history.length > 0 ? (
          <>
            {displayHistory.map((item) => (
              <DropdownMenuItem key={item.id} asChild>
                <Link
                  href={`/result/${
                    getNearestPoeticName(item.hex).groupSlug
                  }?hex=${item.hex.replace("#", "")}`}
                  className="w-full flex items-center justify-between gap-4 cursor-pointer font-serif tracking-widest min-w-[124px]"
                >
                  <span className="truncate max-w-[100px]">
                    {item.poeticName}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full border border-white/20 shadow-sm shrink-0"
                    style={{ backgroundColor: item.hex }}
                  />
                </Link>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/history"
                className="w-full justify-center text-xs text-muted-foreground font-serif tracking-widest cursor-pointer"
              >
                {t("viewAll")}
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem
            disabled
            className="font-serif tracking-widest text-sm justify-center text-muted-foreground min-w-[124px]"
          >
            {t("noHistory")}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
