// 謎解きイベントの形式
export type EventFormat = 
  | 'ルーム型'
  | 'ホール型'
  | '周遊型'
  | '持ち帰り'
  | 'オンライン'
  | 'カフェ謎'
  | 'Web/LINE'
  | 'その他';

export interface MysteryEvent {
  id: string;
  participationDate: Date;  // 参加日
  title: string;           // タイトル
  organization: string;    // 団体
  format: EventFormat;     // 形式
  overview: string;        // 概要
  impression: string;      // 印象的なこと
  finalMystery: string;    // 最後の謎
  createdAt: Date;        // 入力日
  updatedAt: Date;        // 更新日
  published: boolean;     // 公開状態
  slug: string;           // URL用スラッグ
}

export interface CreateMysteryEventData {
  participationDate: Date;
  title: string;
  organization: string;
  format: EventFormat;
  overview: string;
  impression: string;
  finalMystery: string;
  published: boolean;
  slug: string;
}

export interface UpdateMysteryEventData {
  participationDate?: Date;
  title?: string;
  organization?: string;
  format?: EventFormat;
  overview?: string;
  impression?: string;
  finalMystery?: string;
  published?: boolean;
  slug?: string;
}

// 旧型定義との互換性のためのエイリアス
export type BlogPost = MysteryEvent;
export type CreateBlogPostData = CreateMysteryEventData;
export type UpdateBlogPostData = UpdateMysteryEventData;
