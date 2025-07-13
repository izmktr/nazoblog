# Firebase セットアップガイド

## 1. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例：nazoblog）
4. プロジェクトの設定を完了

## 2. Firestore Database の有効化

1. Firebase Console でプロジェクトを選択
2. 左メニューから「Firestore Database」を選択
3. 「データベースの作成」をクリック
4. テストモードで開始（後でルールを変更可能）
5. ロケーションを選択（asia-northeast1 推奨）

## 3. Web アプリの追加

1. Firebase Console のプロジェクト概要ページ
2. 「</>」（Web）アイコンをクリック
3. アプリのニックネームを入力
4. Firebase Hosting は後で設定可能（スキップOK）
5. 設定情報が表示される

## 4. 環境変数の設定

1. プロジェクトのルートに `.env.local` ファイルを作成
2. `.env.local.example` をコピーして実際の値を入力：

```bash
cp .env.local.example .env.local
```

3. Firebase Console の設定から以下の値をコピー：
   - API Key
   - Auth Domain
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID

## 5. Firestore セキュリティルール設定

1. Firebase Console で「Firestore Database」を選択
2. 「ルール」タブをクリック
3. 以下のルールを設定：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 謎解きイベントコレクション
    match /mystery-events/{document} {
      // 読み取りは全員可能（公開データのため）
      allow read: if true;
      // 書き込み・更新・削除は制限なし（開発用）
      // 本番環境では認証を追加することを推奨
      allow write: if true;
    }
  }
}
```

4. 「公開」をクリックして適用

## 6. 初期データの投入（オプション）

アプリケーション経由でデータを作成するか、Firebase Consoleから手動で追加可能

## 7. Firestore インデックス（自動作成）

アプリケーションは複合クエリを避けるよう設計されているため、手動でのインデックス作成は不要です。必要に応じてFirebaseが自動的にインデックスを提案します。

## 6. コレクション構造

```
mystery-events/
  ├── {documentId}/
  │   ├── participationDate: Timestamp
  │   ├── title: string
  │   ├── organization: string
  │   ├── format: string
  │   ├── overview: string
  │   ├── impression: string
  │   ├── finalMystery: string
  │   ├── published: boolean
  │   ├── slug: string
  │   ├── createdAt: Timestamp
  │   └── updatedAt: Timestamp
```

## トラブルシューティング

### PERMISSION_DENIED エラー
- Firestore Database が有効化されているか確認
- セキュリティルールが適切に設定されているか確認

### 環境変数が読み込まれない
- `.env.local` ファイルがプロジェクトルートにあるか確認
- 開発サーバーを再起動
- 環境変数名が `NEXT_PUBLIC_` で始まっているか確認

### 接続エラー
- Firebase設定値が正しいか確認
- インターネット接続を確認
- Firebaseプロジェクトが削除されていないか確認
