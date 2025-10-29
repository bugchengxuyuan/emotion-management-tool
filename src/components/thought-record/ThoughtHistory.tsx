import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatDate, formatTime } from '@/lib/utils';
import { Trash2, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

const ThoughtHistory: React.FC = () => {
  const { state, dispatch } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // 按时间排序
  const sortedThoughts = [...state.thoughts].sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`).getTime();
    const dateTimeB = new Date(`${b.date} ${b.time}`).getTime();
    return dateTimeB - dateTimeA;
  });

  // 统计数据
  const stats = {
    total: state.thoughts.length,
    avgImprovement: state.thoughts.length > 0
      ? Math.round(
          state.thoughts.reduce((sum, t) => sum + (t.emotionBefore - t.emotionAfter), 0) /
          state.thoughts.length
        )
      : 0,
    successfulThoughts: state.thoughts.filter(t => t.emotionAfter < t.emotionBefore).length,
    avgEmotionBefore: state.thoughts.length > 0
      ? Math.round(state.thoughts.reduce((sum, t) => sum + t.emotionBefore, 0) / state.thoughts.length)
      : 0,
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这条思维记录吗？')) {
      const newThoughts = state.thoughts.filter(t => t.id !== id);
      dispatch({ type: 'SET_THOUGHTS', payload: newThoughts });
    }
  };

  if (state.thoughts.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="text-6xl mb-4">🧠</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">还没有思维记录</h3>
        <p className="text-gray-600 mb-6">开始记录你的想法，挑战负面思维</p>
        <Button onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'thought-record' })}>
          去做思维记录
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
          <div className="text-sm text-gray-600">平均改善</div>
          <div className="text-2xl font-bold text-green-600">{stats.avgImprovement}%</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">有效次数</div>
          <div className="text-2xl font-bold text-blue-600">{stats.successfulThoughts}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">初始强度</div>
          <div className="text-2xl font-bold text-orange-600">{stats.avgEmotionBefore}%</div>
        </Card>
      </div>

      {/* 成功率提示 */}
      {stats.total >= 3 && (
        <Card className="bg-green-50 border-green-200 p-4">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-800">
              <strong>很好！</strong> 你的思维记录有{' '}
              {Math.round((stats.successfulThoughts / stats.total) * 100)}%
              的成功率，继续使用这个技能来挑战负面思维。
            </div>
          </div>
        </Card>
      )}

      {/* 记录列表 */}
      <div className="space-y-4">
        {sortedThoughts.map(thought => {
          const isExpanded = expandedId === thought.id;
          const improvement = thought.emotionBefore - thought.emotionAfter;
          const isImproved = improvement > 0;

          return (
            <Card
              key={thought.id}
              className="p-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? null : thought.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* 头部信息 */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{thought.emotion}</div>
                      <div className="text-sm text-gray-500">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {formatDate(thought.date)} {formatTime(thought.time)}
                      </div>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${
                      isImproved ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isImproved ? (
                        <>
                          <TrendingDown className="w-4 h-4" />
                          <span className="font-semibold">-{improvement}%</span>
                        </>
                      ) : improvement < 0 ? (
                        <>
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-semibold">+{Math.abs(improvement)}%</span>
                        </>
                      ) : (
                        <span className="font-semibold">无变化</span>
                      )}
                    </div>
                  </div>

                  {/* 情绪强度对比 */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="text-gray-600">之前: </span>
                        <span className="font-semibold text-red-600">{thought.emotionBefore}%</span>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div>
                        <span className="text-gray-600">之后: </span>
                        <span className="font-semibold text-blue-600">{thought.emotionAfter}%</span>
                      </div>
                    </div>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"
                        style={{ width: `${thought.emotionBefore}%` }}
                      />
                    </div>
                  </div>

                  {/* 情境预览 */}
                  <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded mb-2">
                    <strong>情境:</strong> {thought.situation.substring(0, 100)}
                    {thought.situation.length > 100 && '...'}
                  </div>

                  {/* 展开的详细内容 */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t space-y-4 animate-slide-up">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          自动化思维
                        </div>
                        <div className="text-sm text-gray-600 bg-red-50 p-3 rounded">
                          {thought.automaticThought}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          支持证据
                        </div>
                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {thought.evidenceFor || '(未填写)'}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          反对证据
                        </div>
                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {thought.evidenceAgainst || '(未填写)'}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          平衡思维
                        </div>
                        <div className="text-sm text-gray-600 bg-green-50 p-3 rounded border border-green-200">
                          {thought.balancedThought || '(未填写)'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(thought.id);
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-3"
                  title="删除记录"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {!isExpanded && (
                <div className="text-xs text-gray-500 mt-3 text-center">
                  点击查看完整内容
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ThoughtHistory;
