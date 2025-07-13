import { MysteryEvent, CreateMysteryEventData, UpdateMysteryEventData } from '@/types/blog';

// 開発用のインメモリデータストア
let mockEvents: MysteryEvent[] = [];

// サンプルデータ
const sampleEvents: MysteryEvent[] = [
  {
    id: 'sample-1',
    participationDate: new Date('2024-12-15'),
    title: 'リアル脱出ゲーム×名探偵コナン',
    organization: 'SCRAP',
    format: 'ルーム型',
    overview: '名探偵コナンとコラボした謎解きイベント。黒の組織の陰謀を阻止せよ！',
    impression: 'コナンの世界観が完璧に再現されていて、ファンとしては大満足でした。',
    finalMystery: '最後は工藤新一として正体を明かすシーンがあり、感動的でした。',
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
    published: true,
    slug: 'conan-escape-game-2024',
  },
  {
    id: 'sample-2',
    participationDate: new Date('2024-11-20'),
    title: '東京駅周遊型謎解き',
    organization: '謎解き東京',
    format: '周遊型',
    overview: '東京駅の歴史を学びながら進む周遊型の謎解きイベント。',
    impression: '東京駅の隠された歴史を知ることができて、とても勉強になりました。',
    finalMystery: '最後は東京駅の秘密の部屋で、駅長の謎が明かされました。',
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-11-15'),
    published: true,
    slug: 'tokyo-station-mystery-2024',
  },
  {
    id: 'sample-3',
    participationDate: new Date('2024-12-10'),
    title: 'ホテルの密室謎解き',
    organization: 'ホテルミステリー',
    format: 'ルーム型',
    overview: 'ホテルの一室で起こった事件の真相を解明する密室謎解き。',
    impression: '本格的な密室トリックが仕掛けられていて、推理小説の世界に入り込んだような体験でした。',
    finalMystery: '犯人は意外な人物で、最後のどんでん返しに驚きました。',
    createdAt: new Date('2024-12-05'),
    updatedAt: new Date('2024-12-05'),
    published: true,
    slug: 'hotel-mystery-room-2024',
  }
];

// 初期化
if (mockEvents.length === 0) {
  mockEvents = [...sampleEvents];
}

// IDを生成する関数
const generateId = () => {
  return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// 全ての謎解きイベントを取得
export async function getAllPosts(): Promise<MysteryEvent[]> {
  // 少し遅延を追加してリアルなAPI感を演出
  await new Promise(resolve => setTimeout(resolve, 100));
  return [...mockEvents].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// 公開済みの謎解きイベントを取得
export async function getPublishedPosts(): Promise<MysteryEvent[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockEvents
    .filter(event => event.published)
    .sort((a, b) => b.participationDate.getTime() - a.participationDate.getTime());
}

// スラッグで謎解きイベントを取得
export async function getPostBySlug(slug: string): Promise<MysteryEvent | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockEvents.find(event => event.slug === slug) || null;
}

// IDで謎解きイベントを取得
export async function getPostById(id: string): Promise<MysteryEvent | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockEvents.find(event => event.id === id) || null;
}

// 新しい謎解きイベントを作成
export async function createPost(data: CreateMysteryEventData): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const id = generateId();
  const now = new Date();
  
  const newEvent: MysteryEvent = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  
  mockEvents.push(newEvent);
  return id;
}

// 謎解きイベントを更新
export async function updatePost(id: string, data: UpdateMysteryEventData): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = mockEvents.findIndex(event => event.id === id);
  if (index === -1) {
    return false;
  }
  
  mockEvents[index] = {
    ...mockEvents[index],
    ...data,
    updatedAt: new Date(),
  };
  
  return true;
}

// 謎解きイベントを削除
export async function deletePost(id: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = mockEvents.findIndex(event => event.id === id);
  if (index === -1) {
    return false;
  }
  
  mockEvents.splice(index, 1);
  return true;
}
