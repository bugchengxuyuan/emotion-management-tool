import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { BookOpen, LayoutDashboard, Heart, Brain, AlertCircle, MessageSquare, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { id: 'guide', label: '使用指南', icon: BookOpen },
  { id: 'dashboard', label: '仪表板', icon: LayoutDashboard },
  { id: 'tracker', label: '情绪追踪', icon: Heart },
  { id: 'thought-record', label: '思维记录', icon: Brain },
  { id: 'crisis', label: '危机工具', icon: AlertCircle },
  { id: 'communication', label: 'DEAR MAN', icon: MessageSquare },
  { id: 'progress', label: '进展分析', icon: TrendingUp },
];

const Navigation: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleTabChange = (tabId: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tabId });
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = state.activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
