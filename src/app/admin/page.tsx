import Link from 'next/link';
import { PlusIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { getAllPosts } from '@/lib/posts';
import { MysteryEvent } from '@/types/blog';
import AdminEventTable from '@/components/AdminEventTable';

export default async function AdminPage() {
  let events: MysteryEvent[] = [];
  let error = null;

  try {
    events = await getAllPosts();
  } catch (err) {
    error = 'イベントの取得に失敗しました。';
    console.error('Error fetching events:', err);
    events = [];
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <p className="text-red-600 text-lg">{error}</p>
          <p className="text-gray-500 mt-2">ページを再読み込みして再試行してください。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <PuzzlePieceIcon className="icons text-purple-600 mr-3" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">謎解きイベント管理</h1>
        </div>
        <Link
          href="/admin/create"
          className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors whitespace-nowrap"
        >
          <PlusIcon className="icons mr-2" />
          <span className="hidden sm:inline">新規作成</span>
          <span className="sm:hidden">新規</span>
        </Link>
      </div>

      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">総イベント数</h3>
          <p className="text-3xl font-bold text-gray-900">{events.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">公開済み</h3>
          <p className="text-3xl font-bold text-green-600">
            {events.filter(event => event.published).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">下書き</h3>
          <p className="text-3xl font-bold text-gray-600">
            {events.filter(event => !event.published).length}
          </p>
        </div>
      </div>

      {/* イベント一覧テーブル */}
      <AdminEventTable initialEvents={events} />
    </div>
  );
}
