import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { Heart, Shield, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <Header />
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      <footer className="bg-white/60 backdrop-blur-md border-t border-gray-200/60 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">专业方法</h4>
                <p className="text-sm text-gray-600">
                  基于CBT、DBT、ACT认知行为疗法
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">隐私安全</h4>
                <p className="text-sm text-gray-600">
                  所有数据本地存储，完全保护隐私
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">使用建议</h4>
                <p className="text-sm text-gray-600">
                  仅供个人使用，不能替代专业咨询
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 text-center">
            <p className="text-sm text-gray-600">
              情绪管理工具箱 © 2025 · 你的心理健康助手
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Made with ❤️ for mental wellness
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
