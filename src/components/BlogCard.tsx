import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { CalendarIcon, BuildingOfficeIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { MysteryEvent } from '@/types/blog';

interface MysteryEventCardProps {
  event: MysteryEvent;
}

export default function MysteryEventCard({ event }: MysteryEventCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="p-6">
        {/* タイトル */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          <Link
            href={`/posts/${event.slug}`}
            className="hover:text-purple-600 transition-colors"
          >
            {event.title} / {event.organization}
          </Link>
        </h2>

        {/* メイン情報を横に並べて表示 */}
        <div className="grid grid-cols-1 gap-3">
          {/* 参加日、団体、形式を横並びで表示 */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {/* 参加日 */}
            <div className="flex items-center gap-1">
              <CalendarIcon className="icons text-gray-400 flex-shrink-0" />
              <span className="text-gray-700 font-medium">
                {format(event.participationDate, 'yyyy年MM月dd日', {
                  locale: ja,
                })}
              </span>
            </div>

            {/* 形式 */}
            <div className="flex items-center gap-1">
              <PuzzlePieceIcon className="icons text-purple-400 flex-shrink-0" />
              <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full font-medium">
                {event.format}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// 後方互換性のためのエイリアス
export { MysteryEventCard as BlogCard };
export { MysteryEventCard };
