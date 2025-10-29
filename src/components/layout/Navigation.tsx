import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { BookOpen, LayoutDashboard, Heart, Brain, AlertCircle, MessageSquare, TrendingUp, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { id: 'checkpoint', label: '情绪急救', icon: Home, color: 'text-red-600', bgColor: 'bg-red-50', hoverBg: 'hover:bg-red-100' },
  { id: 'tracker', label: '情绪追踪', icon: Heart, color: 'text-pink-600', bgColor: 'bg-pink-50', hoverBg: 'hover:bg-pink-100' },
  { id: 'thought-record', label: '思维记录', icon: Brain, color: 'text-purple-600', bgColor: 'bg-purple-50', hoverBg: 'hover:bg-purple-100' },
  { id: 'crisis', label: '危机工具', icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-50', hoverBg: 'hover:bg-orange-100' },
  { id: 'communication', label: 'DEAR MAN', icon: MessageSquare, color: 'text-blue-600', bgColor: 'bg-blue-50', hoverBg: 'hover:bg-blue-100' },
  { id: 'progress', label: '进展分析', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50', hoverBg: 'hover:bg-green-100' },
  { id: 'dashboard', label: '数据概览', icon: LayoutDashboard, color: 'text-indigo-600', bgColor: 'bg-indigo-50', hoverBg: 'hover:bg-indigo-100' },
  { id: 'guide', label: '使用指南', icon: BookOpen, color: 'text-gray-600', bgColor: 'bg-gray-50', hoverBg: 'hover:bg-gray-100' },
];

const Navigation: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleTabChange = (tabId: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tabId });
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-2 overflow-x-auto py-3 scrollbar-hide">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = state.activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap group relative',
                  isActive
                    ? `${item.color} ${item.bgColor} shadow-sm`
                    : `text-gray-600 ${item.hoverBg}`
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse rounded-xl"></div>
                )}
                <Icon className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  isActive && 'scale-110'
                )} />
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-current rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
