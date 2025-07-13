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
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link
            href={`/posts/${event.slug}`}
            className="hover:text-purple-600 transition-colors"
          >
            {event.title}
          </Link>
        </h2>

        {/* 概要 */}
        <p className="text-gray-600 mb-4 line-clamp-3">{event.overview}</p>

        {/* メタ情報 */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 flex-shrink-0" />
            <span>
              {format(event.participationDate, 'yyyy年MM月dd日', {
                locale: ja,
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <BuildingOfficeIcon className="h-4 w-4 flex-shrink-0" />
            <span>{event.organization}</span>
          </div>
        </div>

        {/* 形式 */}
        <div className="flex items-center gap-2">
          <PuzzlePieceIcon className="h-4 w-4 text-purple-400 flex-shrink-0" />
          <span className="inline-block px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
            {event.format}
          </span>
        </div>
      </div>
    </article>
  );
}

// 後方互換性のためのエイリアス
export { MysteryEventCard as BlogCard };
export { MysteryEventCard };
