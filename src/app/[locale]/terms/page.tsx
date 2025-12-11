import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });

  return {
    title: t("title"),
    description: t("intro").substring(0, 100),
  };
}

export default function TermsPage() {
  const t = useTranslations("Terms");

  return (
    <div className="container mx-auto max-w-3xl px-space-5 py-space-6 font-serif">
      <h1 className="mb-space-5 text-[length:var(--text-large)] font-medium tracking-wide text-foreground">
        {t("title")}
      </h1>
      <div className="space-y-space-4 text-[length:var(--text-base)] leading-8 text-foreground">
        <p>{t("intro")}</p>

        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-foreground">
            {t("article1Title")}
          </h2>
          <p>{t("article1Body")}</p>
        </section>

        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-foreground">
            {t("article2Title")}
          </h2>
          <p>{t("article2Body")}</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>{t("article2List1")}</li>
            <li>{t("article2List2")}</li>
            <li>{t("article2List3")}</li>
            <li>{t("article2List4")}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-foreground">
            {t("article3Title")}
          </h2>
          <p>{t("article3Body1")}</p>
          <p className="mt-2">{t("article3Body2")}</p>
        </section>

        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-foreground">
            {t("article4Title")}
          </h2>
          <p>{t("article4Body")}</p>
        </section>

        <div className="mt-space-6 text-right text-[length:var(--text-micro)] text-muted-foreground">
          {t("date")}
        </div>
      </div>
    </div>
  );
}
