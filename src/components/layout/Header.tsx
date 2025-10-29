import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTEuNWMtLjggMC0xLjUtLjctMS41LTEuNXYtMWMwLS44LjctMS41IDEuNS0xLjVIMzZ2NGgtLjV6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/20">
                <Heart className="w-8 h-8" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">情绪管理工具箱</h1>
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              </div>
              <p className="text-sm text-blue-100 mt-1 font-medium">
                CBT · DBT · ACT · 基于科学的心理健康助手
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">数据已加密存储</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
