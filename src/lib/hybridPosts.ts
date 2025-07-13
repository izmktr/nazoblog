import { MysteryEvent, CreateMysteryEventData, UpdateMysteryEventData } from '@/types/blog';

// Firebase実装をインポート
import * as firebasePosts from './firebasePosts';
// モック実装をインポート  
import * as mockPosts from './mockPosts';

// Firebase接続状態を確認する関数
const isFirebaseAvailable = async (): Promise<boolean> => {
  try {
    // より安全な接続テスト：単純なコレクション参照
    const { db } = await import('./firebase');
    const { collection, getDocs, limit, query } = await import('firebase/firestore');
    
    // 最小限のクエリでテスト
    const eventsRef = collection(db, 'mystery-events');
    const testQuery = query(eventsRef, limit(1));
    await getDocs(testQuery);
    
    console.log('Firebase接続成功');
    return true;
  } catch (error: any) {
    console.warn('Firebase接続失敗、モックデータを使用します:', {
      message: error.message,
      code: error.code
    });
    return false;
  }
};

// Firebase利用可能性をキャッシュ
let firebaseStatus: boolean | null = null;

const getDataSource = async () => {
  if (firebaseStatus === null) {
    firebaseStatus = await isFirebaseAvailable();
  }
  return firebaseStatus ? firebasePosts : mockPosts;
};

// 公開済みイベントを取得
export async function getPublishedPosts(): Promise<MysteryEvent[]> {
  const dataSource = await getDataSource();
  return dataSource.getPublishedPosts();
}

// 全てのイベントを取得
export async function getAllPosts(): Promise<MysteryEvent[]> {
  const dataSource = await getDataSource();
  return dataSource.getAllPosts();
}

// IDでイベントを取得
export async function getPostById(id: string): Promise<MysteryEvent | null> {
  const dataSource = await getDataSource();
  return dataSource.getPostById(id);
}

// スラッグでイベントを取得
export async function getPostBySlug(slug: string): Promise<MysteryEvent | null> {
  const dataSource = await getDataSource();
  return dataSource.getPostBySlug(slug);
}

// 新しいイベントを作成
export async function createPost(data: CreateMysteryEventData): Promise<string> {
  const dataSource = await getDataSource();
  return dataSource.createPost(data);
}

// イベントを更新
export async function updatePost(id: string, data: UpdateMysteryEventData): Promise<boolean> {
  const dataSource = await getDataSource();
  return dataSource.updatePost(id, data);
}

// イベントを削除
export async function deletePost(id: string): Promise<boolean> {
  const dataSource = await getDataSource();
  return dataSource.deletePost(id);
}
