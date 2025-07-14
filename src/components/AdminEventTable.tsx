'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { 
  PencilIcon, 
  TrashIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  PuzzlePieceIcon 
} from '@heroicons/react/24/outline';
import { deletePost } from '@/lib/posts';
import { MysteryEvent } from '@/types/blog';

interface AdminEventTableProps {
  initialEvents: MysteryEvent[];
}

export default function AdminEventTable({ initialEvents }: AdminEventTableProps) {
  const [events, setEvents] = useState<MysteryEvent[]>(initialEvents);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (eventId: string, eventTitle: string) => {
    if (!confirm(`「${eventTitle}」を削除してもよろしいですか？この操作は取り消せません。`)) {
      return;
    }

    try {
      setDeleting(eventId);
      const success = await deletePost(eventId);
      
      if (success) {
        setEvents(events.filter(event => event.id !== eventId));
        alert('謎解きイベントが削除されました。');
      } else {
        alert('謎解きイベントの削除に失敗しました。');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('謎解きイベントの削除に失敗しました。');
    } finally {
      setDeleting(null);
    }
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <PuzzlePieceIcon className="icons text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg mb-4">まだ謎解きイベントがありません。</p>
        <Link
          href="/admin/create"
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          <PuzzlePieceIcon className="icons mr-2" />
          最初のイベントを作成
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                タイトル
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                参加日
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                団体
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                形式
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {event.title}
                  </div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {event.overview}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="icons mr-1 flex-shrink-0" />
                    {format(event.participationDate, 'yyyy/MM/dd', { locale: ja })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-600">
                    <BuildingOfficeIcon className="icons mr-1 flex-shrink-0" />
                    {event.organization}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                    {event.format}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    event.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {event.published ? '公開中' : '下書き'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/edit/${event.id}`}
                      className="text-purple-600 hover:text-purple-900 transition-colors"
                    >
                      <PencilIcon className="icons" />
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id, event.title)}
                      disabled={deleting === event.id}
                      className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50"
                    >
                      <TrashIcon className="icons" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
