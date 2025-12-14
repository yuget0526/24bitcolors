# Project Conference & Context

## [Project Overview]
- **Name**: 24bitColors
- **Goal**: 1677万色からユーザーの「運命の色」を特定する、正確で美しい色彩診断および収集プラットフォームの構築。
- **Status**: Developing (Phase 4: Merge & Release)

## [Tech Stack]
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Infra**: Vercel
- **Tools**: Biome, Lefthook, next-intl

## [Key Decisions & Architecture Rules]
- **Rendering**: Server Components default. `"use client"` only when interactive.
- **Git Strategy**: `develop` branch is the base.
- **Micro-Interaction**: Haptic feedback (Android only) & smooth transitions.
- **Design System**: "Digital Museum" theme. Dark mode only, Serif fonts for headers, minimalistic UI.
- **SEO/OGP**:
  - Global metadata defined in `layout.tsx`.
  - Dynamic OGP generation via `/api/og` (using `next/og`).
  - Supports "Hex Mode" for color details and "Page Mode" for static pages.
  - OGP subtitles are localized via `messages/*.json`.

## [Current Status & Active Tasks]
- **Focus**: 本番リリースに向けた最終調整、OGP設定の完了、SEO強化。
- **Pending Issues**: 特になし。

## [Logs / Recent Context]
- **2025-12-14**: 全ページのOGP対応完了。/api/og を拡張し、ページタイトルとローカライズされたサブタイトル（`t('ogpSubtitle')`）を含む動的画像を生成するように実装。ビルドおよび表示確認済み。
- **2025-12-13**: シェア機能 (My Palette) のリファクタリングとUI改善完了。
