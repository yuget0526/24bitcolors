# 24bitColors - Strategic Roadmap

復元ソース: roadmap.md-

## 全体戦略

「世界最大の色嗜好データベースプラットフォーム」を目指す。

| Phase         | Version | テーマ                                                                   | 状態     |
| :------------ | :------ | :----------------------------------------------------------------------- | :------- |
| **Phase 1**   | v1.0.0  | **Acquisition (MVP)**: 診断機能、PWA、シェア機能                         | ✅ 完了  |
| **Phase 1.5** | v1.1.0~ | **UX Optimization**: Dark Mode (Museum Theme), URL シェア, データ構造 v2 | ✅ 完了  |
| **Phase 2**   | v2.0.0~ | **Activation (Anonymous)**: My Palette, コレクション共有 (No-Auth)       | ✅ 完了  |
| **Phase 2.5** | v2.5.0~ | **Retention (Account)**: 複数端末同期, バックアップ (Optional Login)     | ⛔️ 凍結 |
| **Phase 3**   | v1.2.0  | **Global Expansion**: 多言語化対応 (i18n), 地域別メタデータ              | ✅ 完了  |
| **Phase 3.5** | v1.2.1  | **Refinements**: Mobile UX (Sticky CTA), AdSense, SEO, UI Polish         | ✅ 完了  |
| **Phase 3.6** | v1.2.2  | **Performance**: Core Web Vitals (LCP), A11y, Mobile Optimization        | ✅ 完了  |
| **Phase 4**   | v3.0.0~ | **Data Ecosystem**: API 公開、オープンデータ化                           | 予定     |
| **Phase 5**   | v5.0.0~ | **AI Personalization**: 感性分析、レコメンド                             | 予定     |

## 直近のタスク (Next Steps)

### ✅ 完了 (v2.0.0 Activation)

- [x] **コレクション機能の強化 (Anonymous-First)**
  - ログイン不要の「My Palette」実装 (Cookie ベース)
  - コレクションの公開・シェア機能 (ReadOnly Snapshot)

### ✅ 完了 (v1.2.2 Performance Patch)

- [x] **Core Web Vitals 改善 (LCP / Speed Index)**
  - モバイル LCP 対策: 重い背景エフェクト (Aurora Gradient) の削除
  - レンダリングブロック解除: SmoothScroll (JS) の廃止
  - フォントロード最適化 (`display: swap` 対応)
- [x] **アクセシビリティ (A11y)**
  - コントラスト比の改善 (`muted-foreground` の視認性向上)
  - スクリーンリーダー対応 (アイコンリンクへの `aria-label` 追加)

### ✅ 完了 (v1.2.1 Refinements)

- [x] **没入感の向上 (Sensory UX)**
  - Android 限定ハプティクス (Web Vibration API) の実装
  - ※iOS は視覚的明快さを優先し、振動なしとする方針に決定

### 📋 予定 (Upcoming)

- [ ] **診断結果ページの強化**
  - "Why this color?" の解説コンテンツ
  - 統計データの可視化（「上位 X%の人が選びました」）
- [ ] **堅牢性の向上 (Robustness)** - _Based on Tech Review_
  - エラー監視の強化 (Error Monitoring): DB 保存失敗を GA4 イベントとして計測
  - (なし) ※再試行ロジックは削除済み
- [ ] **Data Ecosystem (API 公開)** - _Phase 4_
  - カラーパレットデータの JSON 形式ダウンローダー実装
  - 外部開発者向け API の設計

### 🧊 凍結 (Frozen / Considering)

- [ ] **堅牢性の向上 (Offline Support)**
  - 診断結果保存のフォールバック処理 (Service Worker)
  - 理由: 開発コストとキャッシュ事故リスクを考慮し、現時点では見送り。
- [ ] **アカウントシステムの導入 (Optional Upgrade)** - _Phase 2.5_
  - 理由: ログインへの抵抗感がメリットを上回るため、完全匿名性(Privacy-First)を優先。

**最終更新**: 2025 年 12 月 15 日
