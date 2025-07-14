'use client';

import { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ローカルストレージから認証状態を確認
    const authenticatedData = localStorage.getItem('blog_authenticated');
    const loginTime = localStorage.getItem('blog_login_time');
    
    if (authenticatedData === 'true' && loginTime) {
      const currentTime = new Date().getTime();
      const savedTime = parseInt(loginTime);
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; // 30日間
      
      // 30日以内であれば自動ログイン
      if (currentTime - savedTime < thirtyDaysInMs) {
        setIsAuthenticated(true);
      } else {
        // 期限切れの場合は認証情報をクリア
        localStorage.removeItem('blog_authenticated');
        localStorage.removeItem('blog_login_time');
      }
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        const currentTime = new Date().getTime().toString();
        localStorage.setItem('blog_authenticated', 'true');
        localStorage.setItem('blog_login_time', currentTime);
        setPassword('');
      } else {
        setError('パスワードが正しくありません');
      }
    } catch (err) {
      setError('認証エラーが発生しました');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('blog_authenticated');
    localStorage.removeItem('blog_login_time');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              ブログにアクセス
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              パスワードを入力してください
            </p>
            <p className="mt-1 text-xs text-gray-500">
              ログイン状態は30日間保持されます
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  パスワード
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-72 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    placeholder="パスワードを入力"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-2 flex items-center hover:bg-gray-50 rounded-r-md"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                    ) : (
                      <EyeIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-72 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  ログイン
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ログアウトボタンを右上に追加 */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-lg"
          title="ログアウト（次回も自動ログインを無効にします）"
        >
          ログアウト
        </button>
      </div>
      {children}
    </div>
  );
}
