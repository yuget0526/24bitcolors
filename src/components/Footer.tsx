import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="w-full py-space-6 text-center text-[length:var(--text-micro)] text-[var(--muted-foreground)]">
      <div className="mb-space-4 flex justify-center gap-space-4">
        <Link
          href="/about"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          {t("about")}
        </Link>
        <Link
          href="/terms"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          {t("terms")}
        </Link>
        <Link
          href="/privacy"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          {t("privacy")}
        </Link>
        <Link
          href="/contact"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          {t("contact")}
        </Link>
      </div>
      <p>{t("copyright")}</p>
    </footer>
  );
}
