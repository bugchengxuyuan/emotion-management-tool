import React from 'react';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">情绪管理工具箱</h1>
            <p className="text-sm text-blue-100">基于CBT + DBT + ACT的科学方法</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
