# リリース・デプロイガイドライン

24bitColors のデプロイ環境とリリースフローを定義します。

基本的な開発ルール（ブランチ戦略、コミット規約等）は [development_rules.md](./development_rules.md) を参照してください。

---

## 1. デプロイ環境

| 環境           | ブランチ  | URL                                | 用途       |
| :------------- | :-------- | :--------------------------------- | :--------- |
| **Production** | `main`    | https://24bitcolors.com            | 本番環境   |
| **Preview**    | `develop` | https://24bitcolors-xxx.vercel.app | 開発確認用 |

### 自動デプロイ

- `main` へのプッシュ → **Production 自動デプロイ**
- `develop` へのプッシュ → **Preview 自動デプロイ**

---

## 2. リリースフロー

### 2.1 通常リリース

```bash
# 1. develop で開発・テスト完了後

# 2. main にマージ
git checkout main
git pull origin main
git merge develop -m "Merge develop: vX.X.X"

# 3. 本番プッシュ
git push origin main

# 4. develop に戻る
git checkout develop
```

### 2.2 リリース前チェックリスト

- [ ] `npm run build` がエラーなく完了
- [ ] Vercel Preview で動作確認済み
- [ ] package.json のバージョン更新済み
- [ ] Git タグ作成済み

### 2.3 バージョンタグ作成

```bash
# package.json 更新後
git add package.json
git commit -m "vX.X.X: リリース内容"
git tag -a vX.X.X -m "vX.X.X: リリース内容"
git push origin develop --tags
```

---

## 3. ホットフィックス（緊急修正）

本番で重大なバグが発見された場合：

```bash
# 1. main から hotfix ブランチを作成
git checkout main
git checkout -b hotfix/バグ名

# 2. 修正・コミット
git commit -m "hotfix: 緊急修正内容"

# 3. main にマージ・プッシュ
git checkout main
git merge hotfix/バグ名
git push origin main

# 4. develop にも反映
git checkout develop
git merge main
git push origin develop
```

---

## 4. トラブルシューティング

### ビルドエラー

```bash
rm -rf .next node_modules
npm install
npm run build
```

### Vercel デプロイエラー

1. Vercel ダッシュボードでログ確認
2. ローカルでビルドが通るか確認
3. インフラ障害の場合は Redeploy

---

**最終更新**: 2025 年 12 月 10 日
