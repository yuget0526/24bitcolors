# バックエンド移行計画

現在の Next.js API Routes から将来的に Go (Gin) バックエンドへの移行を想定した設計指針。

---

## 現在のアーキテクチャ

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js       │────▶│   API Routes    │────▶│   Supabase      │
│   Frontend      │     │   (/api/*)      │     │   PostgreSQL    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 将来のアーキテクチャ（Go/Gin 移行後）

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js       │────▶│   Go/Gin API    │────▶│   PostgreSQL    │
│   Frontend      │     │   (別サービス)   │     │   (Supabase)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## API エンドポイント仕様

移行時にも互換性を保つための API 契約。

### POST /api/diagnosis

**リクエスト:**

```json
{
  "hex": "#FF0000",
  "hue": 29.2,
  "lightness": 0.627,
  "chroma": 0.258,
  "theme": "light",
  "duration_seconds": 45,
  "algorithm_version": "v1.0.0",
  "locale": "ja-JP",
  "anonymous_id": "uuid-string"
}
```

**レスポンス (成功):**

```json
{
  "success": true,
  "id": "uuid-of-inserted-record"
}
```

**レスポンス (エラー):**

```json
{
  "success": false,
  "error": "Error message"
}
```

**ステータスコード:**

- `200`: 成功
- `400`: バリデーションエラー
- `500`: サーバーエラー

### POST /api/feedback

**リクエスト:**

```json
{
  "diagnosis_id": "uuid-or-null",
  "rating": 5,
  "hex": "#FF0000",
  "agreement_score": 4,
  "expected_color": "#FF5555"
}
```

**レスポンス:**

```json
{
  "success": true
}
```

---

## 移行時の考慮事項

### 1. 環境変数

| 変数             | 説明                  |
| :--------------- | :-------------------- |
| `DATABASE_URL`   | PostgreSQL 接続文字列 |
| `API_SECRET_KEY` | (将来) API 認証キー   |

### 2. CORS 設定

Go バックエンドでは CORS を明示的に設定:

```go
// Gin CORS middleware
r.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"https://24bitcolors.com"},
    AllowMethods:     []string{"POST", "OPTIONS"},
    AllowHeaders:     []string{"Content-Type"},
    AllowCredentials: true,
}))
```

### 3. Supabase → 直接 PostgreSQL

Go 移行時は Supabase SDK の代わりに `database/sql` + `lib/pq` または `pgx` を使用。

```go
// Go での DB 接続例
import (
    "database/sql"
    _ "github.com/lib/pq"
)

db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
```

---

## 移行手順（将来）

1. **Go API サーバーを構築**

   - Gin フレームワーク
   - 同じエンドポイント仕様

2. **フロントエンドの API ベース URL を環境変数化**

   ```typescript
   const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';
   fetch(`${API_BASE}/diagnosis`, { ... });
   ```

3. **段階的移行**

   - `/api/diagnosis` → Go
   - `/api/feedback` → Go
   - 他のエンドポイント → 順次

4. **Next.js API Routes を削除**

---

## Go 実装サンプル

```go
// cmd/api/main.go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

type DiagnosisRequest struct {
    Hex              string  `json:"hex" binding:"required"`
    Hue              float64 `json:"hue"`
    Lightness        float64 `json:"lightness"`
    Chroma           float64 `json:"chroma"`
    Theme            string  `json:"theme"`
    DurationSeconds  int     `json:"duration_seconds"`
    AlgorithmVersion string  `json:"algorithm_version"`
    Locale           string  `json:"locale"`
    AnonymousID      string  `json:"anonymous_id" binding:"required"`
}

func main() {
    r := gin.Default()

    r.POST("/api/diagnosis", func(c *gin.Context) {
        var req DiagnosisRequest
        if err := c.ShouldBindJSON(&req); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "success": false,
                "error":   err.Error(),
            })
            return
        }

        // DB Insert
        id, err := insertDiagnosis(req)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "success": false,
                "error":   err.Error(),
            })
            return
        }

        c.JSON(http.StatusOK, gin.H{
            "success": true,
            "id":      id,
        })
    })

    r.Run(":8080")
}
```

---

**最終更新**: 2025 年 12 月 10 日
