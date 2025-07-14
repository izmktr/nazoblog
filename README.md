# NazoBlog

Firebase + Next.js で構築されたモダンな個人ブログアプリケーション

## 特徴

- **プライベート認証**: パスワード認証による個人用アクセス制限
- **モダンなUI**: Tailwind CSSによる美しいレスポンシブデザイン
- **リアルタイムデータベース**: Firestore を使用したクラウドデータベース
- **記事管理**: 作成、編集、削除機能付き管理画面
- **TypeScript**: 型安全な開発環境
- **Next.js 15**: 最新のApp Routerを使用

## 技術スタック

- **フロントエンド**: Next.js 15, React, TypeScript
- **スタイリング**: Tailwind CSS
- **バックエンド**: Firebase (Firestore)
- **認証**: 環境変数ベースのパスワード認証
- **アイコン**: Heroicons, Lucide React
- **日付処理**: date-fns

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

1. `.env.local.example` を `.env.local` にコピー：

```bash
cp .env.local.example .env.local
```

2. `.env.local` ファイルを編集し、以下の設定を追加：

```env
# Firebase設定
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# ブログアクセス用パスワード（お好みのパスワードに変更してください）
BLOG_PASSWORD=your_secure_password_here
```

### 3. Firebase設定

1. [Firebase Console](https://console.firebase.google.com/) でプロジェクトを作成
2. Firestoreデータベースを有効化
3. 上記の環境変数にFirebase設定値を追加

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 使用方法

### ブログ記事の作成

1. 管理画面（/admin）にアクセス
2. 「新規記事作成」ボタンをクリック
3. 記事情報を入力して保存

### 記事の管理

- **表示**: ホームページで公開済み記事を確認
- **編集**: 管理画面から既存記事を編集
- **削除**: 管理画面から不要な記事を削除

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # 管理画面
│   ├── posts/[slug]/      # 記事詳細ページ
│   ├── layout.tsx         # 共通レイアウト
│   └── page.tsx           # ホームページ
├── components/            # 再利用可能なコンポーネント
│   ├── BlogCard.tsx       # 記事カードコンポーネント
│   ├── Header.tsx         # ヘッダーコンポーネント
│   ├── Footer.tsx         # フッターコンポーネント
│   └── LoadingSpinner.tsx # ローディングスピナー
├── lib/                   # ユーティリティとAPIラッパー
│   ├── firebase.ts        # Firebase設定
│   └── posts.ts           # ブログ投稿API
└── types/                 # TypeScript型定義
    └── blog.ts            # ブログ関連の型
```

## デプロイメント

### おすすめのホスティングサービス

1. **Vercel** (推奨)
   - Next.js に最適化されたプラットフォーム
   - Gitと連携した自動デプロイ
   - 無料プランあり

2. **Netlify**
   - 静的サイトホスティング
   - 継続的デプロイメント
   - 無料プランあり

3. **Firebase Hosting**
   - Firebase と同じプラットフォーム
   - 高速なCDN
   - 無料プランあり

### Vercelでのデプロイ手順

1. [Vercel](https://vercel.com) にアカウント作成
2. GitHubリポジトリを接続
3. 環境変数を設定（Firebase設定値）
4. デプロイ実行

## 開発

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start

# リンター実行
npm run lint
```

### コード品質

- ESLint によるコード検証
- TypeScript による型チェック
- Tailwind CSS による一貫したスタイリング

## ライセンス

MIT License

## 作者

NazoBlog Team
