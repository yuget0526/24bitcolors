"use client";

import { useState, useEffect } from "react";

interface ShareActionsProps {
  url: string;
  colors: {
    name: string;
    code: string;
  };
}

export function ShareActions({ url, colors }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    // Check if navigator.share exists (using 'any' to bypass TS 'always defined' check if needed)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      // eslint-disable-next-line
      setCanShare(true);
    }
  }, []);

  const cleanHex = colors.code.replace("#", "");
  const text = `美しい色を見つけました。\n\nPigment No. ${cleanHex}\n\n#24bitColors`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: "24bitColors",
        text: text,
        url: url,
      });
    } catch (err) {
      console.log("Share canceled or failed:", err);
    }
  };

  return (
    <div className="flex w-full items-center justify-center gap-space-4 py-space-5">
      {/* リンクコピー */}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-foreground bg-card transition-all hover:bg-foreground hover:text-background"
          aria-label="リンクをコピー"
        >
          {copied ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground group-hover:text-background"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-muted-foreground transition-colors group-hover:text-background"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          {copied && (
            <span className="absolute -top-10 whitespace-nowrap bg-foreground px-2 py-1 text-[length:var(--text-micro)] text-background opacity-0 transition-opacity animate-fade-in-up">
              Copied!
            </span>
          )}
        </button>
      </div>

      {/* Web Share API (Mobile Native Share) */}
      {canShare ? (
        <button
          onClick={handleNativeShare}
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-foreground bg-card transition-all hover:bg-foreground hover:text-background"
          aria-label="シェア"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground transition-colors group-hover:text-background"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      ) : (
        <>
          {/* X (Twitter) */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              text
            )}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-foreground bg-card transition-all hover:bg-foreground hover:text-background"
            aria-label="X (Twitter)でシェア"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-muted-foreground transition-colors group-hover:text-background"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* LINE */}
          <a
            href={`https://line.me/R/msg/text/?${encodeURIComponent(
              text + "\n" + url
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-foreground bg-card transition-all hover:bg-foreground hover:text-background"
            aria-label="LINEでシェア"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-muted-foreground transition-colors group-hover:text-background"
            >
              <path d="M19.365 9.863c.049.285.12.565.12.858 0 3.597-3.323 6.517-7.42 6.517-.665 0-1.308-.09-1.928-.218-1.07.564-2.887 1.346-3.15.346-.03-.113.196-.693.385-1.082.022-.045.022-.045.01-.064C4.85 14.62 3.29 12.39 3.29 9.864c0-3.597 3.323-6.517 7.42-6.517 4.096 0 7.42 2.92 7.42 6.517H19.365z" />
            </svg>
          </a>

          {/* Instagram (Fallback / Visual) */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-foreground bg-card transition-all hover:bg-foreground hover:text-background"
            aria-label="Instagramを開く"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-muted-foreground transition-colors group-hover:text-background"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </>
      )}
    </div>
  );
}
