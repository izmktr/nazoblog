import Link from 'next/link';
import { PencilIcon, PuzzlePieceIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 min-w-0">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <PuzzlePieceIcon className="h-6 w-6 text-purple-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">謎解きログ</span>
          </Link>

          {/* ナビゲーション */}
          <nav className="flex items-center space-x-3 sm:space-x-6 flex-shrink-0">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              ホーム
            </Link>
            <Link
              href="/admin"
              className="flex items-center space-x-1 bg-purple-600 text-white px-2 sm:px-3 py-2 rounded-md hover:bg-purple-700 transition-colors whitespace-nowrap"
            >
              <PencilIcon className="h-4 w-4" />
              <span className="hidden sm:inline">管理</span>
              <span className="sm:hidden">管理</span>
            </Link>
            <Link
              href="/admin/create"
              className="flex items-center space-x-1 bg-green-600 text-white px-2 sm:px-3 py-2 rounded-md hover:bg-green-700 transition-colors whitespace-nowrap"
            >
              <PlusIcon className="h-4 w-4" />
              <span className="hidden sm:inline">新規登録</span>
              <span className="sm:hidden">新規</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
