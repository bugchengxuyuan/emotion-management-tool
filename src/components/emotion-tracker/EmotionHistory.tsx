import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatDate, formatTime, getEmotionColor } from '@/lib/utils';
import { Trash2, Calendar, TrendingUp, Filter, Download } from 'lucide-react';
import { EMOTIONS } from '@/data/emotions';

const EmotionHistory: React.FC = () => {
  const { state, dispatch } = useApp();
  const [selectedEmotion, setSelectedEmotion] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // 获取所有不重复的日期
  const uniqueDates = Array.from(new Set(state.emotions.map(e => e.date))).sort().reverse();

  // 筛选情绪记录
  const filteredEmotions = state.emotions
    .filter(e => selectedEmotion === 'all' || e.emotion === selectedEmotion)
    .filter(e => selectedDate === 'all' || e.date === selectedDate)
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.date} ${a.time}`).getTime();
      const dateTimeB = new Date(`${b.date} ${b.time}`).getTime();
      return dateTimeB - dateTimeA;
    });

  // 统计数据
  const stats = {
    total: state.emotions.length,
    avgIntensity: state.emotions.length > 0
      ? (state.emotions.reduce((sum, e) => sum + e.intensity, 0) / state.emotions.length).toFixed(1)
      : '0',
    mostCommon: (() => {
      const counts: Record<string, number> = {};
      state.emotions.forEach(e => {
        counts[e.emotion] = (counts[e.emotion] || 0) + 1;
      });
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      return sorted[0]?.[0] || '暂无';
    })(),
    highIntensityCount: state.emotions.filter(e => e.intensity >= 7).length,
  };

  // 最近7天趋势
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const trendData = last7Days.map(date => {
    const dayEmotions = state.emotions.filter(e => e.date === date);
    const avgIntensity = dayEmotions.length > 0
      ? dayEmotions.reduce((sum, e) => sum + e.intensity, 0) / dayEmotions.length
      : 0;
    return {
      date,
      avg: avgIntensity,
      count: dayEmotions.length,
    };
  });

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这条记录吗？')) {
      const newEmotions = state.emotions.filter(e => e.id !== id);
      dispatch({ type: 'SET_EMOTIONS', payload: newEmotions });
    }
  };

  const getEmotionEmoji = (emotionName: string) => {
    return EMOTIONS.find(e => e.name === emotionName)?.emoji || '😐';
  };

  const exportToMarkdown = () => {
    const exportDate = new Date().toLocaleString('zh-CN');
    const emotionsToExport = filteredEmotions.length > 0 ? filteredEmotions : state.emotions;

    let markdown = `# 情绪追踪记录\n\n`;
    markdown += `> 导出时间: ${exportDate}\n\n`;

    // 统计概览
    markdown += `## 📊 统计概览\n\n`;
    markdown += `- **总记录数**: ${stats.total}\n`;
    markdown += `- **平均情绪强度**: ${stats.avgIntensity}/10\n`;
    markdown += `- **最常见情绪**: ${stats.mostCommon}\n`;
    markdown += `- **高强度情绪次数** (≥7): ${stats.highIntensityCount}\n\n`;

    // 情绪分布统计
    const emotionCounts: Record<string, number> = {};
    emotionsToExport.forEach(e => {
      emotionCounts[e.emotion] = (emotionCounts[e.emotion] || 0) + 1;
    });
    markdown += `### 情绪分布\n\n`;
    Object.entries(emotionCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([emotion, count]) => {
        const emoji = getEmotionEmoji(emotion);
        const percentage = ((count / emotionsToExport.length) * 100).toFixed(1);
        markdown += `- ${emoji} **${emotion}**: ${count}次 (${percentage}%)\n`;
      });
    markdown += `\n`;

    // 详细记录
    markdown += `## 📝 详细记录\n\n`;
    markdown += `> 共 ${emotionsToExport.length} 条记录\n\n`;

    emotionsToExport.forEach((emotion, index) => {
      const emoji = getEmotionEmoji(emotion.emotion);
      markdown += `### ${index + 1}. ${emoji} ${emotion.emotion}\n\n`;
      markdown += `**日期时间**: ${formatDate(emotion.date)} ${formatTime(emotion.time)}\n\n`;
      markdown += `**情绪强度**: ${emotion.intensity}/10\n\n`;

      if (emotion.trigger) {
        markdown += `**触发事件**:\n${emotion.trigger}\n\n`;
      }

      if (emotion.bodyFeeling) {
        markdown += `**身体感觉**:\n${emotion.bodyFeeling}\n\n`;
      }

      if (emotion.copingUsed) {
        markdown += `**应对技能**:\n${emotion.copingUsed}\n\n`;
      }

      if (emotion.effectiveness !== undefined) {
        markdown += `**应对效果**: ${emotion.effectiveness}/10\n\n`;
      }

      markdown += `---\n\n`;
    });

    // 创建下载
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `情绪追踪记录_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (state.emotions.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">还没有情绪记录</h3>
        <p className="text-gray-600 mb-6">开始记录你的情绪，建立觉察习惯</p>
        <Button onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'tracker' })}>
          去记录情绪
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600">总记录数</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">平均强度</div>
          <div className="text-2xl font-bold text-blue-600">{stats.avgIntensity}/10</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">最常见</div>
          <div className="text-2xl">{getEmotionEmoji(stats.mostCommon)} {stats.mostCommon}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">高强度次数</div>
          <div className="text-2xl font-bold text-red-600">{stats.highIntensityCount}</div>
        </Card>
      </div>

      {/* 7天趋势 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          最近7天情绪强度趋势
        </h3>
        <div className="flex items-end justify-between h-40 gap-2">
          {trendData.map((day) => {
            const height = day.avg > 0 ? (day.avg / 10) * 100 : 0;
            const dateObj = new Date(day.date);
            const dayLabel = ['日', '一', '二', '三', '四', '五', '六'][dateObj.getDay()];

            return (
              <div key={day.date} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-32 mb-2">
                  {day.count > 0 && (
                    <div
                      className={`w-full rounded-t transition-all ${
                        day.avg >= 7 ? 'bg-red-500' :
                        day.avg >= 5 ? 'bg-yellow-500' :
                        day.avg >= 3 ? 'bg-blue-500' :
                        'bg-green-500'
                      }`}
                      style={{ height: `${height}%` }}
                      title={`${day.date}: 平均${day.avg.toFixed(1)}分 (${day.count}条)`}
                    >
                      <div className="text-xs text-white text-center pt-1">
                        {day.avg.toFixed(1)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-600">{dayLabel}</div>
                <div className="text-xs text-gray-400">{day.count}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 筛选器和导出 */}
      <Card className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4 flex-1">
            <Filter className="w-5 h-5 text-gray-600" />
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedEmotion}
                onChange={(e) => setSelectedEmotion(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">所有情绪</option>
                {EMOTIONS.map(emotion => (
                  <option key={emotion.name} value={emotion.name}>
                    {emotion.emoji} {emotion.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">所有日期</option>
                {uniqueDates.map(date => (
                  <option key={date} value={date}>
                    {formatDate(date)}
                  </option>
                ))}
              </select>
              {(selectedEmotion !== 'all' || selectedDate !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedEmotion('all');
                    setSelectedDate('all');
                  }}
                >
                  清除筛选
                </Button>
              )}
            </div>
          </div>

          {/* 导出按钮 */}
          <Button
            onClick={exportToMarkdown}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>导出为 Markdown</span>
          </Button>
        </div>
      </Card>

      {/* 记录列表 */}
      <div className="space-y-3">
        {filteredEmotions.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            没有符合条件的记录
          </Card>
        ) : (
          filteredEmotions.map(emotion => {
            const isExpanded = expandedId === emotion.id;

            return (
              <Card
                key={emotion.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : emotion.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-3xl">{getEmotionEmoji(emotion.emotion)}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{emotion.emotion}</div>
                        <div className="text-sm text-gray-500">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {formatDate(emotion.date)} {formatTime(emotion.time)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getEmotionColor(emotion.intensity)}`}>
                        强度: {emotion.intensity}/10
                      </div>
                      {emotion.copingUsed && (
                        <div className="text-sm text-gray-600">
                          应对: {emotion.copingUsed.split(',')[0]}
                          {emotion.copingUsed.split(',').length > 1 && ` +${emotion.copingUsed.split(',').length - 1}`}
                        </div>
                      )}
                      {emotion.effectiveness !== undefined && (
                        <div className="text-sm text-green-600">
                          效果: {emotion.effectiveness}/10
                        </div>
                      )}
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t space-y-3 animate-slide-up">
                        {emotion.trigger && (
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">触发事件</div>
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                              {emotion.trigger}
                            </div>
                          </div>
                        )}
                        {emotion.bodyFeeling && (
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">身体感觉</div>
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                              {emotion.bodyFeeling}
                            </div>
                          </div>
                        )}
                        {emotion.copingUsed && (
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">使用的应对技能</div>
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                              {emotion.copingUsed}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(emotion.id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="删除记录"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {filteredEmotions.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          显示 {filteredEmotions.length} / {state.emotions.length} 条记录
        </div>
      )}
    </div>
  );
};

export default EmotionHistory;
