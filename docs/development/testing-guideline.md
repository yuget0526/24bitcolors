# テストガイドライン

24bitColors プロジェクトのテスト方針と実行方法を定義します。

---

## テストの種類

| 種類           | ツール              | 対象                               |
| :------------- | :------------------ | :--------------------------------- |
| **単体テスト** | Vitest              | ユーティリティ関数、色計算ロジック |
| **API テスト** | Vitest + fetch mock | API Routes                         |
| **E2E テスト** | (将来) Playwright   | ユーザーフロー                     |

---

## セットアップ

```bash
# 依存関係のインストール
npm install -D vitest @testing-library/react jsdom

# package.json に追加
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

## ディレクトリ構成

```
src/
├── lib/
│   ├── color-diagnosis.ts
│   └── __tests__/           # ← 単体テスト
│       └── color-diagnosis.test.ts
├── app/
│   └── api/
│       └── diagnosis/
│           ├── route.ts
│           └── route.test.ts  # ← APIテスト
```

---

## テストの書き方

### 単体テスト例

```typescript
// src/lib/__tests__/color-diagnosis.test.ts
import { describe, it, expect } from "vitest";
import { createDiagnosisState, isDiagnosisComplete } from "../color-diagnosis";

describe("color-diagnosis", () => {
  it("初期状態を正しく作成する", () => {
    const state = createDiagnosisState();
    expect(state.currentQuestion).toBe(0);
    expect(state.totalQuestions).toBe(20);
  });

  it("20問で完了判定が true になる", () => {
    const state = { ...createDiagnosisState(), currentQuestion: 20 };
    expect(isDiagnosisComplete(state)).toBe(true);
  });
});
```

### API テスト例

```typescript
// src/app/api/diagnosis/route.test.ts
import { describe, it, expect, vi } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";

// Supabase をモック
vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from: () => ({
      insert: () => ({
        select: () => ({
          single: () =>
            Promise.resolve({ data: { id: "test-id" }, error: null }),
        }),
      }),
    }),
  }),
}));

describe("POST /api/diagnosis", () => {
  it("正常なリクエストで success を返す", async () => {
    const body = {
      hex: "#FF0000",
      hue: 29,
      lightness: 0.6,
      chroma: 0.25,
      anonymous_id: "test-user",
    };

    const request = new NextRequest("http://localhost/api/diagnosis", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.id).toBeDefined();
  });

  it("必須フィールドがない場合 400 を返す", async () => {
    const request = new NextRequest("http://localhost/api/diagnosis", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

---

## テスト実行

```bash
# 全テスト実行
npm test

# 単一ファイル
npm test -- src/lib/__tests__/color-diagnosis.test.ts

# ウォッチモード
npm test -- --watch

# カバレッジ
npm test -- --coverage
```

---

## CI/CD 統合

GitHub Actions で自動テスト:

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run test:run
```

---

## 注意事項

- **環境変数**: テストでは `.env.test` または `vi.mock` で Supabase をモック
- **DB テスト**: 本番 DB には接続しない。モックまたはテスト用 DB を使用
- **E2E テスト**: 将来的に Playwright で診断フロー全体をテスト

---

**最終更新**: 2025 年 12 月 10 日
