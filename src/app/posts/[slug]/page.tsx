import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { CalendarIcon, TagIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { getPostBySlug } from '@/lib/posts';
import { MysteryEvent } from '@/types/blog';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  let event: MysteryEvent | null = null;
  
  try {
    event = await getPostBySlug(slug);
    if (!event || !event.published) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching event:', error);
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 戻るボタン */}
      <Link
        href="/"
        className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8 transition-colors"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        イベント一覧に戻る
      </Link>

      {/* イベントヘッダー */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {event.title}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 flex-shrink-0" />
            <span>
              {format(event.participationDate, 'yyyy年MM月dd日', {
                locale: ja,
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <UserIcon className="h-4 w-4 flex-shrink-0" />
            <span>{event.organization}</span>
          </div>
          <div className="flex items-center gap-1">
            <TagIcon className="h-4 w-4 flex-shrink-0" />
            <span>{event.format}</span>
          </div>
        </div>
      </header>

      {/* イベント内容 */}
      <article className="prose prose-lg max-w-none">
        {/* 概要 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">概要</h2>
          <div className="bg-purple-50 p-6 rounded-lg">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {event.overview}
            </p>
          </div>
        </section>

        {/* 印象的なこと */}
        {event.impression && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">印象的なこと</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {event.impression}
              </p>
            </div>
          </section>
        )}

        {/* 最後の謎 */}
        {event.finalMystery && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">最後の謎</h2>
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {event.finalMystery}
              </p>
            </div>
          </section>
        )}
      </article>

      {/* フッター */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            他のイベントを見る
          </Link>
        </div>
      </footer>
    </div>
  );
}
