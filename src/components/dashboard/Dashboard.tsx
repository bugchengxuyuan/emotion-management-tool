import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Heart, Brain, MessageSquare } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { state } = useApp();

  const stats = {
    totalEmotions: state.emotions.length,
    totalThoughts: state.thoughts.length,
    totalDearMan: state.dearManPlans.length,
    recentEmotions: state.emotions.slice(-7),
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">数据概览</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">情绪记录</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalEmotions}</p>
            </div>
            <Heart className="w-12 h-12 text-red-500 opacity-20" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">思维记录</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalThoughts}</p>
            </div>
            <Brain className="w-12 h-12 text-purple-500 opacity-20" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">沟通计划</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalDearMan}</p>
            </div>
            <MessageSquare className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>最近的情绪记录</CardTitle>
        </CardHeader>
        {stats.recentEmotions.length > 0 ? (
          <div className="space-y-3">
            {stats.recentEmotions.map((emotion) => (
              <div
                key={emotion.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <span className="font-semibold">{emotion.emotion}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    {emotion.date} {emotion.time.substring(0, 5)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">强度:</span>
                  <span className="font-bold text-primary-600">{emotion.intensity}/10</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>还没有情绪记录</p>
            <p className="text-sm mt-2">点击"情绪追踪"开始记录你的第一条情绪</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
