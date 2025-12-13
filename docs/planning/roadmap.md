# 24bitColors - Strategic Roadmap

復元ソース: roadmap.md-

## 全体戦略

「世界最大の色嗜好データベースプラットフォーム」を目指す。

| Phase         | Version | テーマ                                                                   | 状態    |
| :------------ | :------ | :----------------------------------------------------------------------- | :------ |
| **Phase 1**   | v1.0.0  | **Acquisition (MVP)**: 診断機能、PWA、シェア機能                         | ✅ 完了 |
| **Phase 1.5** | v1.1.0~ | **UX Optimization**: Dark Mode (Museum Theme), URL シェア, データ構造 v2 | ✅ 完了 |
| **Phase 2**   | v2.0.0~ | **Activation (Anonymous)**: My Palette, コレクション共有 (No-Auth)       | 🚧 次期 |
| **Phase 2.5** | v2.5.0~ | **Retention (Account)**: 複数端末同期, バックアップ (Optional Login)     | 予定    |
| **Phase 3**   | v1.2.0  | **Global Expansion**: 多言語化対応 (i18n), 地域別メタデータ              | ✅ 完了 |
| **Phase 3.5** | v1.2.1  | **Refinements**: Mobile UX (Sticky CTA), AdSense, SEO, UI Polish         | ✅ 完了 |
| **Phase 4**   | v3.0.0~ | **Data Ecosystem**: API 公開、オープンデータ化                           | 予定    |
| **Phase 5**   | v5.0.0~ | **AI Personalization**: 感性分析、レコメンド                             | 予定    |

## 直近のタスク (Next Steps)

- [ ] **診断結果ページの強化**
  - "Why this color?" の解説コンテンツ
  - 統計データの可視化（「上位 X%の人が選びました」）
- [x] **没入感の向上 (Sensory UX)**
  - Android 限定ハプティクス (Web Vibration API) の実装
  - ※iOS は視覚的明快さを優先し、振動なしとする方針に決定
- [ ] **堅牢性の向上 (Robustness)** - _Based on Tech Review_
  - 診断結果保存のフォールバック処理 (Offline Support)
  - エラー時の再試行ロジック (Retry Policy)
- [ ] **コレクション機能の強化 (Anonymous-First)** - _Based on User Review_
  - ログイン不要の「My Palette」実装 (Cookie ベース)
  - コレクションの公開・シェア機能 (ReadOnly Snapshot)
- [ ] **アカウントシステムの導入 (Optional Upgrade)** - _Phase 2.5_
  - 複数端末同期・バックアップ機能 (Graduate Login)

**最終更新**: 2025 年 12 月 12 日
