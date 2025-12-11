"use client";

import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

/**
 * Theme Toggle with Phosphor Icons
 */
import { useTranslations } from "next-intl";

/**
 * Theme Toggle with Phosphor Icons
 */
export function ThemeToggle() {
  const t = useTranslations("Common");
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-6 w-6" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? t("toggleThemeLight") : t("toggleThemeDark")}
      aria-label={t("toggleThemeLabel")}
      className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 hover:bg-black/10 dark:hover:bg-white/10 text-foreground"
    >
      {isDark ? (
        <Moon
          weight="light"
          className="h-5 w-5 animate-in zoom-in spin-in-90 duration-300"
        />
      ) : (
        <Sun
          weight="light"
          className="h-5 w-5 animate-in zoom-in spin-in-90 duration-300"
        />
      )}
    </button>
  );
}
