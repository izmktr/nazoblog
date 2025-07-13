import Link from 'next/link';
import { PencilIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2">
            <PuzzlePieceIcon className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">謎解きログ</span>
          </Link>

          {/* ナビゲーション */}
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ホーム
            </Link>
            <Link
              href="/admin"
              className="flex items-center space-x-1 bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              <PencilIcon className="h-4 w-4" />
              <span>管理</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
