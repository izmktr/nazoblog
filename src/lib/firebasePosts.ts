import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MysteryEvent, CreateMysteryEventData, UpdateMysteryEventData } from '@/types/blog';

const COLLECTION_NAME = 'mystery-events';

// Firestore Timestampを Dateに変換するヘルパー関数
const convertTimestampToDate = (timestamp: any): Date => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate();
  }
  return new Date(timestamp);
};

// Firestoreドキュメントを MysteryEvent型に変換
const convertDocToMysteryEvent = (docData: any, id: string): MysteryEvent => {
  return {
    id,
    participationDate: convertTimestampToDate(docData.participationDate),
    title: docData.title || '',
    organization: docData.organization || '',
    format: docData.format || 'その他',
    overview: docData.overview || '',
    impression: docData.impression || '',
    finalMystery: docData.finalMystery || '',
    createdAt: convertTimestampToDate(docData.createdAt),
    updatedAt: convertTimestampToDate(docData.updatedAt),
    published: docData.published || false,
    slug: docData.slug || '',
  };
};

// 全ての公開済みイベントを取得
export async function getPublishedPosts(): Promise<MysteryEvent[]> {
  try {
    const eventsRef = collection(db, COLLECTION_NAME);
    const q = query(eventsRef, where('published', '==', true));
    const snapshot = await getDocs(q);
    
    const events = snapshot.docs.map(doc => convertDocToMysteryEvent(doc.data(), doc.id));
    
    // クライアントサイドでソート
    return events.sort((a, b) => b.participationDate.getTime() - a.participationDate.getTime());
  } catch (error) {
    console.error('Error fetching published events:', error);
    throw error;
  }
}

// 全てのイベントを取得（管理画面用）
export async function getAllPosts(): Promise<MysteryEvent[]> {
  try {
    const eventsRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(eventsRef);
    
    const events = snapshot.docs.map(doc => convertDocToMysteryEvent(doc.data(), doc.id));
    
    // クライアントサイドでソート
    return events.sort((a, b) => b.participationDate.getTime() - a.participationDate.getTime());
  } catch (error) {
    console.error('Error fetching all events:', error);
    throw error;
  }
}

// IDでイベントを取得
export async function getPostById(id: string): Promise<MysteryEvent | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return convertDocToMysteryEvent(docSnap.data(), docSnap.id);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    throw error;
  }
}

// スラッグでイベントを取得
export async function getPostBySlug(slug: string): Promise<MysteryEvent | null> {
  try {
    const eventsRef = collection(db, COLLECTION_NAME);
    const q = query(eventsRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const docData = snapshot.docs[0];
      return convertDocToMysteryEvent(docData.data(), docData.id);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching event by slug:', error);
    throw error;
  }
}

// 新しいイベントを作成
export async function createPost(data: CreateMysteryEventData): Promise<string> {
  try {
    const now = Timestamp.now();
    const eventData = {
      ...data,
      participationDate: Timestamp.fromDate(data.participationDate),
      createdAt: now,
      updatedAt: now,
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), eventData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

// イベントを更新
export async function updatePost(id: string, data: UpdateMysteryEventData): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData: any = {
      ...data,
      updatedAt: Timestamp.now(),
    };
    
    // participationDateが存在する場合のみTimestampに変換
    if (data.participationDate) {
      updateData.participationDate = Timestamp.fromDate(data.participationDate);
    }
    
    await updateDoc(docRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating event:', error);
    return false;
  }
}

// イベントを削除
export async function deletePost(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    return false;
  }
}
