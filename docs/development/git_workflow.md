# Git Worktree Workflow Guide

このプロジェクトでは、複数のブランチを並行して効率的に開発するために `git worktree` を導入しています。
従来の `git checkout` によるブランチ切り替えではなく、ブランチごとに独立したディレクトリ（ワークツリー）を作成して作業を行います。

## ディレクトリ構造 (Bare Repository Configuration)

プロジェクトルートは Bare リポジトリ（Git の管理情報のみを持つディレクトリ）として機能し、実際の作業ディレクトリはその下に配置されます。

```
/Users/yuget/Products/24bitcolors/
├── .bare/            # Git Bare Repository (実際の .git ディレクトリ)
├── .git              # .bare への参照ファイル
├── develop/          # [MAIN WORKSPACE] 開発用ワークツリー (git checkout develop)
└── feature-i18n/     # [TEMPORARY] 機能開発用ワークツリー (git checkout feature/i18n)
```

## 開発フロー

### 1. 新しい作業を始める場合 (New Feature)

新しい機能開発や修正を行う場合は、新しいワークツリーを作成します。

```bash
# プロジェクトルートで実行
cd /Users/yuget/Products/24bitcolors

# develop から派生した新しいブランチを作成し、同名のディレクトリにチェックアウト
# git worktree add <ディレクトリ名> <ブランチ名>
git worktree add feature/new-feature -b feature/new-feature develop

# 作業ディレクトリへ移動
cd feature/new-feature
```

### 2. 作業中の切り替え

別の作業（例: develop での緊急バグ修正）に移る場合は、単にディレクトリを移動するだけです。
`git stash` や `git checkout` の待ち時間は発生しません。

```bash
cd ../develop
# ここは常に develop ブランチの状態
```

### 3. 作業の完了とマージ

作業が完了し、`develop` にマージされたら、不要になったワークツリーを削除します。

```bash
# ワークツリーの削除 (ディレクトリも消えます)
git worktree remove feature/new-feature
```

## 注意事項

- **依存関係の管理**: 各ワークツリーは独立しているため、新しいワークツリーを作成した直後は `npm install` が必要になる場合があります（`node_modules` は共有されません）。
- **ルートディレクトリ**: プロジェクトルートにはファイルを作成しないでください。必ず各ワークツリーディレクトリ内で作業を行ってください。
