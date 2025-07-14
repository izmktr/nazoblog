# Firebase セットアップガイド（個人ブログ用）

## 1. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例：nazoblog）
4. プロジェクトの設定を完了

## 2. Firestore Database の有効化

1. Firebase Console でプロジェクトを選択
2. 左メニューから「Firestore Database」を選択
3. 「データベースの作成」をクリック
4. **本番モード**で開始（セキュリティを強化）
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

3. Firebase Console の設定から以下の値をコピーし、**ブログアクセス用パスワードも設定**：

```env
# Firebase設定
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# ブログアクセス用パスワード（強力なパスワードに変更してください）
BLOG_PASSWORD=your_secure_password_here
```

## 5. Firestore セキュリティルール設定（重要）

個人ブログとして使用するため、厳格なセキュリティルールを設定します：

1. Firebase Console で「Firestore Database」を選択
2. 「ルール」タブをクリック
3. 以下のルールを設定：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 個人ブログ用の厳格なルール
    match /mystery-events/{document} {
      // 読み取り・書き込みを完全に禁止
      // アプリケーション側で認証を実装済み
      allow read, write: if false;
    }
    
    // 将来的にFirebase Authenticationを使用する場合の例：
    // match /mystery-events/{document} {
    //   allow read, write: if request.auth != null && request.auth.uid == 'your-user-id';
    // }
  }
}
```

**重要**: このルール設定により、Firestoreへの直接アクセスを完全に禁止します。アプリケーション側の認証を通過したユーザーのみがアクセス可能になります。

4. 「公開」をクリックして適用

## 6. セキュリティ設定の確認

### アプリケーション層でのセキュリティ
- パスワード認証によるアクセス制御
- ローカルストレージでの認証状態管理
- 環境変数によるパスワード管理

### Firestore層でのセキュリティ  
- 厳格なセキュリティルールで直接アクセスを禁止
- 本番モードでのデータベース作成

### 追加のセキュリティ対策（推奨）
1. `.env.local` ファイルが `.gitignore` に含まれていることを確認
2. 強力なパスワードを設定（英数字＋記号、12文字以上推奨）
3. 定期的なパスワード変更
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
