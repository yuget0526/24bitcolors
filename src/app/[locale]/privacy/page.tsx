import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return {
    title: t("title"),
    description: t("section1Body").substring(0, 100), // simplified
  };
}

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  return (
    <div className="container mx-auto max-w-3xl px-space-5 py-space-6 font-serif">
      <h1 className="mb-space-5 text-[length:var(--text-large)] font-medium tracking-wide text-foreground">
        {t("title")}
      </h1>
      <div className="space-y-space-5 text-[length:var(--text-base)] leading-8 text-foreground">
        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-foreground">
            {t("section1Title")}
          </h2>
          <p>{t("section1Body")}</p>
        </section>

        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-foreground">
            {t("section2Title")}
          </h2>
          <p>{t("section2Body1")}</p>
          <p className="mt-2">
            {t("section2Body2")}
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-1 underline-offset-4 hover:text-muted-foreground"
            >
              {t("section2Link")}
            </a>
            {t("section2Body3")}
          </p>
        </section>

        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-foreground">
            {t("section3Title")}
          </h2>
          <p>{t("section3Body")}</p>
        </section>

        <div className="mt-space-6 text-right text-[length:var(--text-micro)] text-muted-foreground">
          {t("date")}
        </div>
      </div>
    </div>
  );
}
