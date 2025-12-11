import { Link } from "@/i18n/routing";
import Script from "next/script";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/about",
    },
  };
}

// Structured Data for AboutPage (kept partly static/partly dynamic if needed, but for now we keep it simple or localize if strict)
// For simplicity, keeping JSON-LD static or minimally edited.
// Ideally JSON-LD should also be localized but it's often acceptable to keep main language.
// Let's keep it defined inside component or simplistic.

export default function AboutPage() {
  const t = useTranslations("About");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("jsonLdName"),
    description: t("jsonLdDescription"),
    url: "https://24bitcolors.com/about",
    mainEntity: {
      "@type": "Organization",
      name: "24bitColors",
      url: "https://24bitcolors.com",
      logo: "https://24bitcolors.com/icon.png",
      description: t("organizationDescription"),
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative flex min-h-screen w-full flex-col bg-background text-foreground">
        {/* Atmospheric Background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-foreground/[0.02] to-transparent blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-foreground/[0.03] to-transparent blur-3xl" />
        </div>

        {/* 
          HERO SECTION 
          Golden Ratio: 68px title, generous vertical rhythm
          Fibonacci spacing: 89px padding
        */}
        <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center px-6 pt-[89px]">
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Section Label */}
            <span
              className="mb-[34px] inline-block text-[10px] font-medium tracking-[0.5em] text-muted-foreground/60 uppercase"
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              {t("lblPhilosophy")}
            </span>

            {/* Main Title - Golden Ratio Large (68px) */}
            <h1
              className="mb-[34px] text-[42px] md:text-[68px] leading-[1.1] font-normal tracking-[-0.02em]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              <span className="block">{t("heroTitle1")}</span>
              <span className="block">{t("heroTitle2")}</span>
            </h1>

            {/* Decorative Line */}
            <div className="mb-[34px] h-[1px] w-[55px] bg-foreground/20" />

            {/* Subtitle */}
            <p
              className="text-[13px] md:text-[16px] tracking-[0.2em] text-muted-foreground/80 font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {t("heroSubtitle")}
            </p>
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-[55px] left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-3 opacity-40">
              <div className="h-[34px] w-[1px] bg-foreground/30" />
            </div>
          </div>
        </section>

        {/* 
          CONTENT SECTIONS
          Layout: Clean vertical flow with generous whitespace
          Typography: Golden Ratio (26px headers, 16px body)
          Spacing: Fibonacci (144px between sections)
        */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-8 space-y-[144px] pb-[144px]">
          {/* SECTION 1: THE CONCEPT */}
          <section className="relative">
            {/* Section Number */}
            <span
              className="block mb-[21px] text-[10px] tracking-[0.4em] text-muted-foreground/50 uppercase"
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              01
            </span>

            {/* Section Title - Golden Ratio Medium (26px) */}
            <h2
              className="mb-[34px] text-[26px] md:text-[32px] leading-[1.2] font-normal tracking-[-0.01em]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {t("conceptTitle")}
            </h2>

            {/* Decorative Line */}
            <div className="mb-[34px] h-[1px] w-[34px] bg-foreground/15" />

            {/* Body Text - Golden Ratio Base (16px) */}
            <div
              className="text-[15px] md:text-[16px] leading-[2] text-muted-foreground space-y-[21px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <p className="whitespace-pre-line">{t("conceptBody1")}</p>
              <p className="whitespace-pre-line">{t("conceptBody2")}</p>
            </div>
          </section>

          {/* SECTION 2: THE SCIENCE */}
          <section className="relative">
            <span
              className="block mb-[21px] text-[10px] tracking-[0.4em] text-muted-foreground/50 uppercase"
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              02
            </span>

            <h2
              className="mb-[34px] text-[26px] md:text-[32px] leading-[1.2] font-normal tracking-[-0.01em]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {t("scienceTitle")}
            </h2>

            <div className="mb-[34px] h-[1px] w-[34px] bg-foreground/15" />

            <div
              className="text-[15px] md:text-[16px] leading-[2] text-muted-foreground space-y-[21px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <p className="whitespace-pre-line">{t("scienceBody1")}</p>
              <p className="whitespace-pre-line">{t("scienceBody2")}</p>
            </div>

            {/* Internal Link to Logic Page */}
            <div className="mt-[34px]">
              <Link
                href="/diagnosis/logic"
                className="group inline-flex items-center gap-[8px] text-[12px] tracking-[0.2em] text-muted-foreground/70 hover:text-foreground transition-colors uppercase"
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                <span>{t("linkAlgorithm")}</span>
                <ArrowRight
                  weight="light"
                  className="h-3 w-3 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </section>

          {/* SECTION 3: THE VISION */}
          <section className="relative">
            <span
              className="block mb-[21px] text-[10px] tracking-[0.4em] text-muted-foreground/50 uppercase"
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              03
            </span>

            <h2
              className="mb-[34px] text-[26px] md:text-[32px] leading-[1.2] font-normal tracking-[-0.01em]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {t("visionTitle")}
            </h2>

            <div className="mb-[34px] h-[1px] w-[34px] bg-foreground/15" />

            <div
              className="text-[15px] md:text-[16px] leading-[2] text-muted-foreground space-y-[21px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <p className="whitespace-pre-line">{t("visionBody1")}</p>
              <p className="whitespace-pre-line">{t("visionBody2")}</p>
            </div>
          </section>
        </div>

        {/* CTA SECTION */}
        <section className="relative z-10 flex flex-col items-center gap-[34px] pb-[89px]">
          {/* Primary CTA - Start Diagnosis */}
          <Link
            href="/diagnosis"
            className="group inline-flex items-center gap-[13px] px-[55px] py-[21px] text-[11px] tracking-[0.3em] uppercase bg-foreground text-background transition-all duration-300 hover:opacity-90"
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }}
          >
            <span>{t("ctaStart")}</span>
            <ArrowRight
              weight="light"
              className="h-[13px] w-[13px] transition-transform duration-300 group-hover:translate-x-[5px]"
            />
          </Link>

          {/* Secondary - Back to Top */}
          <Link
            href="/"
            className="group inline-flex items-center gap-[13px] px-[34px] py-[13px] text-[10px] tracking-[0.3em] uppercase text-muted-foreground transition-all duration-300 hover:text-foreground"
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }}
          >
            <ArrowLeft
              weight="light"
              className="h-[13px] w-[13px] transition-transform duration-300 group-hover:-translate-x-[5px]"
            />
            <span>{t("ctaBack")}</span>
          </Link>
        </section>
      </div>
    </>
  );
}
