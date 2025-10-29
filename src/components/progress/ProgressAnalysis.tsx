import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ProgressAnalysis: React.FC = () => {
  const { state } = useApp();

  const getAverageIntensity = () => {
    if (state.emotions.length === 0) return '0.0';
    const sum = state.emotions.reduce((acc, e) => acc + e.intensity, 0);
    return (sum / state.emotions.length).toFixed(1);
  };

  const getMostCommonEmotion = () => {
    if (state.emotions.length === 0) return '暂无数据';
    const emotionCounts: Record<string, number> = {};
    state.emotions.forEach((e) => {
      emotionCounts[e.emotion] = (emotionCounts[e.emotion] || 0) + 1;
    });
    return Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '暂无数据';
  };

  const getAverageImprovement = () => {
    if (state.thoughts.length === 0) return '0.0';
    const improvements = state.thoughts.map((t) => t.emotionBefore - t.emotionAfter);
    const avg = improvements.reduce((a, b) => a + b, 0) / improvements.length;
    return avg.toFixed(1);
  };

  const avgIntensity = parseFloat(getAverageIntensity());

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">进展分析</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">平均情绪强度</CardTitle>
          </CardHeader>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">{getAverageIntensity()}/10</span>
            {avgIntensity < 5 ? (
              <TrendingDown className="w-8 h-8 text-green-500" />
            ) : avgIntensity > 7 ? (
              <TrendingUp className="w-8 h-8 text-red-500" />
            ) : (
              <Minus className="w-8 h-8 text-yellow-500" />
            )}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">最常见情绪</CardTitle>
          </CardHeader>
          <div className="text-2xl font-bold text-primary-600">{getMostCommonEmotion()}</div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">思维记录平均改善</CardTitle>
          </CardHeader>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-green-600">{getAverageImprovement()}%</span>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>数据总结</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">情绪记录总数</span>
            <span className="font-bold text-lg">{state.emotions.length}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">思维记录总数</span>
            <span className="font-bold text-lg">{state.thoughts.length}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">DEAR MAN计划</span>
            <span className="font-bold text-lg">{state.dearManPlans.length}</span>
          </div>
        </div>
      </Card>

      {state.emotions.length === 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <div className="text-center py-8">
            <p className="text-blue-900 font-medium">开始记录情绪，积累数据</p>
            <p className="text-sm text-blue-700 mt-2">
              持续记录2周以上，就能看到有意义的情绪模式和趋势分析
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProgressAnalysis;
