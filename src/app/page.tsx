import { MysteryEventCard } from '@/components/BlogCard';
import { getPublishedPosts } from '@/lib/posts';
import { MysteryEvent } from '@/types/blog';

export default async function HomePage() {
  let events: MysteryEvent[] = [];
  let error = null;

  try {
    events = await getPublishedPosts();
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
      {/* ヒーローセクション */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          謎解きログ へようこそ
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          謎解きイベントの参加記録を管理するアプリケーション
        </p>
      </div>

      {/* イベント一覧 */}
      {events.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">まだ謎解きイベントの記録がありません。</p>
          <p className="text-gray-500 mt-2">最初のイベント記録を管理画面から作成してみましょう！</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <MysteryEventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
