'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getPostById, updatePost } from '@/lib/posts';
import { UpdateMysteryEventData, MysteryEvent, EventFormat } from '@/types/blog';

const EVENT_FORMATS: EventFormat[] = [
  'ルーム型',
  'ホール型',
  '周遊型',
  '持ち帰り',
  'オンライン',
  'カフェ謎',
  'Web/LINE',
  'その他'
];

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  const [event, setEvent] = useState<MysteryEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    participationDate: '',
    title: '',
    organization: '',
    format: 'ルーム型' as EventFormat,
    overview: '',
    impression: '',
    finalMystery: '',
    published: false,
  });

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const eventData = await getPostById(eventId);
      if (eventData) {
        setEvent(eventData);
        setFormData({
          participationDate: eventData.participationDate.toISOString().split('T')[0],
          title: eventData.title,
          organization: eventData.organization,
          format: eventData.format,
          overview: eventData.overview,
          impression: eventData.impression,
          finalMystery: eventData.finalMystery,
          published: eventData.published,
        });
      } else {
        setError('謎解きイベントが見つかりません。');
      }
    } catch (err) {
      setError('謎解きイベントの取得に失敗しました。');
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.organization || !formData.overview) {
      alert('すべての必須項目を入力してください。');
      return;
    }

    try {
      setSaving(true);
      
      const updateData: UpdateMysteryEventData = {
        participationDate: new Date(formData.participationDate),
        title: formData.title,
        organization: formData.organization,
        format: formData.format,
        overview: formData.overview,
        impression: formData.impression,
        finalMystery: formData.finalMystery,
        published: formData.published,
        slug: event!.slug, // 既存のスラッグを保持
      };

      const success = await updatePost(eventId, updateData);
      
      if (success) {
        alert('謎解きイベントが正常に更新されました！');
        router.push('/admin');
      } else {
        alert('謎解きイベントの更新に失敗しました。');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('謎解きイベントの更新に失敗しました。');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadingSpinner size="lg" className="py-20" />
        <p className="text-center text-gray-600 mt-4">謎解きイベントを読み込み中...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <p className="text-red-600 text-lg">{error || '謎解きイベントが見つかりません。'}</p>
          <Link
            href="/admin"
            className="mt-4 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            管理画面に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヘッダー */}
      <div className="flex items-center mb-8">
        <Link
          href="/admin"
          className="flex items-center text-purple-600 hover:text-purple-800 mr-4 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          管理画面に戻る
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">謎解きイベント編集</h1>
      </div>

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          {/* 参加日 */}
          <div className="mb-6">
            <label htmlFor="participationDate" className="block text-sm font-medium text-gray-700 mb-2">
              参加日 *
            </label>
            <input
              type="date"
              id="participationDate"
              name="participationDate"
              value={formData.participationDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* タイトル */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              タイトル *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="謎解きイベントのタイトルを入力してください"
            />
          </div>

          {/* 団体 */}
          <div className="mb-6">
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
              団体 *
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="主催団体名を入力してください"
            />
          </div>

          {/* 形式 */}
          <div className="mb-6">
            <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
              形式 *
            </label>
            <select
              id="format"
              name="format"
              value={formData.format}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {EVENT_FORMATS.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>

          {/* 概要 */}
          <div className="mb-6">
            <label htmlFor="overview" className="block text-sm font-medium text-gray-700 mb-2">
              概要 *
            </label>
            <textarea
              id="overview"
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="謎解きイベントの概要を入力してください"
            />
          </div>

          {/* 印象的なこと */}
          <div className="mb-6">
            <label htmlFor="impression" className="block text-sm font-medium text-gray-700 mb-2">
              印象的なこと
            </label>
            <textarea
              id="impression"
              name="impression"
              value={formData.impression}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="印象に残ったポイントを入力してください"
            />
          </div>

          {/* 最後の謎 */}
          <div className="mb-6">
            <label htmlFor="finalMystery" className="block text-sm font-medium text-gray-700 mb-2">
              最後の謎
            </label>
            <textarea
              id="finalMystery"
              name="finalMystery"
              value={formData.finalMystery}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="最後の謎の内容を入力してください"
            />
          </div>

          {/* 公開設定 */}
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                公開する
              </label>
            </div>
          </div>

          {/* ボタン */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/admin"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  更新中...
                </>
              ) : (
                <>
                  <CheckIcon className="h-4 w-4 mr-2" />
                  更新
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
