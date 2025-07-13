'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { createPost } from '@/lib/posts';
import { CreateMysteryEventData, EventFormat } from '@/types/blog';

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

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    participationDate: new Date().toISOString().split('T')[0], // 今日の日付をデフォルト
    title: '',
    organization: '',
    format: 'ルーム型' as EventFormat,
    overview: '',
    impression: '',
    finalMystery: '',
    published: false,
  });

  // ランダムなスラッグを生成
  const generateRandomSlug = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.organization || !formData.overview) {
      alert('すべての必須項目を入力してください。');
      return;
    }

    console.log('送信開始:', formData);
    
    try {
      setLoading(true);
      
      const eventData: CreateMysteryEventData = {
        participationDate: new Date(formData.participationDate),
        title: formData.title,
        organization: formData.organization,
        format: formData.format,
        overview: formData.overview,
        impression: formData.impression,
        finalMystery: formData.finalMystery,
        published: formData.published,
        slug: generateRandomSlug(),
      };

      console.log('送信データ:', eventData);
      
      const eventId = await createPost(eventData);
      console.log('作成されたイベントID:', eventId);
      
      if (eventId) {
        alert('謎解きイベントが正常に作成されました！');
        console.log('リダイレクト開始');
        router.push('/admin');
        console.log('リダイレクト完了');
      } else {
        console.error('イベントIDが取得できませんでした');
        alert('謎解きイベントの作成に失敗しました。');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert(`謎解きイベントの作成に失敗しました: ${error}`);
    } finally {
      console.log('ローディング終了');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

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
        <h1 className="text-3xl font-bold text-gray-900">新規謎解きイベント作成</h1>
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
                すぐに公開する
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
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  保存中...
                </>
              ) : (
                <>
                  <CheckIcon className="h-4 w-4 mr-2" />
                  保存
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
