"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "@phosphor-icons/react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Switch Language">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={20}
        className="w-[144px] md:w-[160px]"
      >
        <DropdownMenuItem
          onClick={() => handleLocaleChange("ja")}
          disabled={locale === "ja"}
          className="font-serif tracking-widest min-w-[124px] justify-center"
        >
          日本語
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLocaleChange("en")}
          disabled={locale === "en"}
          className="font-serif tracking-widest min-w-[124px] justify-center"
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
