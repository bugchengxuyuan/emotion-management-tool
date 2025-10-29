import React from 'react';
import Header from './Header';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>情绪管理工具箱 - 你的心理健康助手</p>
          <p className="mt-1 text-xs text-gray-500">
            本工具仅供个人情绪管理使用，不能替代专业心理咨询
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
