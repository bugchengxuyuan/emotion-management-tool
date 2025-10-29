import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';
import { EMOTIONS, BODY_FEELINGS, COPING_STRATEGIES } from '@/data/emotions';
import type { EmotionEntry } from '@/types';
import { AlertCircle, Brain, MessageSquare, TrendingUp, PlusCircle, History, Calendar, ChevronRight } from 'lucide-react';
import { formatDate, formatTime, getEmotionColor } from '@/lib/utils';
import EmotionHistory from './EmotionHistory';

const EmotionTracker: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'record' | 'history'>('record');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [trigger, setTrigger] = useState('');
  const [bodyFeeling, setBodyFeeling] = useState('');
  const [copingUsed, setCopingUsed] = useState('');
  const [effectiveness, setEffectiveness] = useState(5);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [lastEntry, setLastEntry] = useState<EmotionEntry | null>(null);

  // 获取最近的5条记录
  const recentEmotions = [...state.emotions]
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.date} ${a.time}`).getTime();
      const dateTimeB = new Date(`${b.date} ${b.time}`).getTime();
      return dateTimeB - dateTimeA;
    })
    .slice(0, 5);

  const getEmotionEmoji = (emotionName: string) => {
    return EMOTIONS.find(e => e.name === emotionName)?.emoji || '😐';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEmotion) {
      alert('请选择一种情绪');
      return;
    }

    const entry: EmotionEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0],
      emotion: selectedEmotion,
      intensity,
      trigger,
      bodyFeeling,
      copingUsed,
      effectiveness: copingUsed ? effectiveness : undefined,
    };

    dispatch({ type: 'ADD_EMOTION', payload: entry });
    setLastEntry(entry);
    setShowRecommendation(true);

    // Reset form
    setSelectedEmotion('');
    setIntensity(5);
    setTrigger('');
    setBodyFeeling('');
    setCopingUsed('');
    setEffectiveness(5);

    // Scroll to recommendation
    setTimeout(() => {
      document.getElementById('recommendation')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navigateTo = (tab: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  const getRecommendation = () => {
    if (!lastEntry) return null;

    const negativeEmotions = ['焦虑', '愤怒', '悲伤', '恐惧', '羞愧', '内疚', '嫉妒', '孤独', '失望'];
    const isNegative = negativeEmotions.includes(lastEntry.emotion);

    if (lastEntry.intensity >= 8) {
      return (
        <Card className="bg-red-50 border-red-200 p-6" id="recommendation">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-10 h-10 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900 mb-2">
                🚨 情绪强度很高！建议立即使用危机技能
              </h3>
              <p className="text-red-800 mb-3">
                你记录的{lastEntry.emotion}强度为{lastEntry.intensity}/10，这个强度下很难进行深入思考。
                建议先使用TIPP技能降低情绪强度：
              </p>
              <ul className="space-y-1 text-red-800 mb-4 text-sm">
                <li>• 冷水洗脸 - 30秒快速降低强度</li>
                <li>• 剧烈运动 - 10分钟释放压力</li>
                <li>• 深呼吸 - 4-2-6呼吸法</li>
              </ul>
              <div className="flex space-x-3">
                <Button onClick={() => navigateTo('crisis')} variant="danger">
                  使用TIPP技能
                </Button>
                <Button onClick={() => setActiveTab('history')} variant="outline">
                  查看历史记录
                </Button>
                <Button onClick={() => setShowRecommendation(false)} variant="ghost">
                  继续记录
                </Button>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    if (lastEntry.intensity >= 5 && isNegative) {
      return (
        <Card className="bg-purple-50 border-purple-200 p-6" id="recommendation">
          <div className="flex items-start space-x-4">
            <Brain className="w-10 h-10 text-purple-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-purple-900 mb-2">
                💭 建议做思维记录
              </h3>
              <p className="text-purple-800 mb-3">
                {lastEntry.emotion}强度为{lastEntry.intensity}/10，这种中等强度的负面情绪通常与负面思维有关。
                建议使用思维记录来识别和挑战这些想法。
              </p>
              <div className="bg-white rounded p-3 mb-4 text-sm">
                <div className="font-semibold text-purple-900 mb-1">触发事件：</div>
                <div className="text-gray-700">{lastEntry.trigger || '(未记录)'}</div>
              </div>
              <div className="flex space-x-3">
                <Button onClick={() => navigateTo('thought-record')} variant="primary">
                  做思维记录
                </Button>
                <Button onClick={() => setActiveTab('history')} variant="outline">
                  查看历史记录
                </Button>
                <Button onClick={() => setShowRecommendation(false)} variant="ghost">
                  继续记录
                </Button>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    if (lastEntry.trigger && lastEntry.trigger.includes('人')) {
      return (
        <Card className="bg-blue-50 border-blue-200 p-6" id="recommendation">
          <div className="flex items-start space-x-4">
            <MessageSquare className="w-10 h-10 text-blue-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                💬 涉及人际互动？考虑准备沟通
              </h3>
              <p className="text-blue-800 mb-3">
                你的触发事件似乎涉及人际互动。如果需要表达需求或解决冲突，
                可以使用DEAR MAN工具提前准备。
              </p>
              <div className="flex space-x-3">
                <Button onClick={() => navigateTo('communication')} variant="primary">
                  准备DEAR MAN
                </Button>
                <Button onClick={() => setActiveTab('history')} variant="outline">
                  查看历史记录
                </Button>
                <Button onClick={() => setShowRecommendation(false)} variant="ghost">
                  继续记录
                </Button>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card className="bg-green-50 border-green-200 p-6" id="recommendation">
        <div className="flex items-start space-x-4">
          <TrendingUp className="w-10 h-10 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-green-900 mb-2">
              ✅ 记录完成！
            </h3>
            <p className="text-green-800 mb-3">
              你的{lastEntry.emotion}强度为{lastEntry.intensity}/10。
              {isNegative ? '持续记录可以帮助识别模式。' : '记录积极情绪同样重要！'}
            </p>
            <div className="flex space-x-3">
              <Button onClick={() => setActiveTab('history')} variant="primary">
                查看历史记录
              </Button>
              <Button onClick={() => navigateTo('progress')} variant="secondary">
                查看进展分析
              </Button>
              <Button onClick={() => setShowRecommendation(false)} variant="ghost">
                继续记录
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tab 导航 */}
      <div className="flex space-x-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('record')}
          className={`flex items-center space-x-2 px-4 py-3 font-medium transition-colors border-b-2 ${
            activeTab === 'record'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <PlusCircle className="w-5 h-5" />
          <span>记录情绪</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center space-x-2 px-4 py-3 font-medium transition-colors border-b-2 ${
            activeTab === 'history'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <History className="w-5 h-5" />
          <span>历史记录</span>
        </button>
      </div>

      {/* 内容区域 */}
      {activeTab === 'record' ? (
        <>
          <Card>
        <CardHeader>
          <CardTitle>记录当前情绪</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emotion Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              选择主要情绪 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {EMOTIONS.map((emotion) => (
                <button
                  key={emotion.name}
                  type="button"
                  onClick={() => setSelectedEmotion(emotion.name)}
                  className={`p-3 rounded-lg text-center transition-all ${
                    selectedEmotion === emotion.name
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{emotion.emoji}</div>
                  <div className="text-xs font-medium">{emotion.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Intensity Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              情绪强度: <span className="text-lg font-bold text-blue-600">{intensity}</span>
            </label>
            <Slider
              min={0}
              max={10}
              step={1}
              value={[intensity]}
              onValueChange={(value) => setIntensity(value[0])}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 (几乎没有)</span>
              <span>5 (中等)</span>
              <span>10 (极其强烈)</span>
            </div>
          </div>

          {/* Trigger */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              触发事件
            </label>
            <Textarea
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              placeholder="什么事情引发了这个情绪?"
              rows={2}
            />
          </div>

          {/* Body Feelings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              身体感觉
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {BODY_FEELINGS.slice(0, 8).map((feeling) => (
                <button
                  key={feeling}
                  type="button"
                  onClick={() => {
                    const current = bodyFeeling;
                    const newValue = current.includes(feeling)
                      ? current.replace(feeling + ', ', '').replace(feeling, '')
                      : current ? current + ', ' + feeling : feeling;
                    setBodyFeeling(newValue);
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    bodyFeeling.includes(feeling)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {feeling}
                </button>
              ))}
            </div>
            <Textarea
              value={bodyFeeling}
              onChange={(e) => setBodyFeeling(e.target.value)}
              placeholder="点击上方按钮或输入其他身体感觉"
              rows={2}
            />
          </div>

          {/* Coping Strategies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              使用的应对技能
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {COPING_STRATEGIES.slice(0, 8).map((strategy) => (
                <button
                  key={strategy}
                  type="button"
                  onClick={() => {
                    const current = copingUsed;
                    const newValue = current.includes(strategy)
                      ? current.replace(strategy + ', ', '').replace(strategy, '')
                      : current ? current + ', ' + strategy : strategy;
                    setCopingUsed(newValue);
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    copingUsed.includes(strategy)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {strategy}
                </button>
              ))}
            </div>
            <Textarea
              value={copingUsed}
              onChange={(e) => setCopingUsed(e.target.value)}
              placeholder="点击上方按钮或输入其他应对方法"
              rows={2}
            />
          </div>

          {/* Effectiveness Rating */}
          {copingUsed && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                技能效果: <span className="text-lg font-bold text-green-600">{effectiveness}</span>
              </label>
              <Slider
                min={0}
                max={10}
                step={1}
                value={[effectiveness]}
                onValueChange={(value) => setEffectiveness(value[0])}
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            保存记录
          </Button>
        </form>
      </Card>

          {/* 智能推荐 */}
          {showRecommendation && getRecommendation()}

          {/* 最近的记录 */}
          {recentEmotions.length > 0 && (
            <Card className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  最近的记录 ({recentEmotions.length})
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('history')}
                  className="flex items-center space-x-1"
                >
                  <span>查看全部</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {recentEmotions.map((emotion) => (
                  <div
                    key={emotion.id}
                    className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start space-x-3 flex-1">
                      <span className="text-3xl">{getEmotionEmoji(emotion.emotion)}</span>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900">{emotion.emotion}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getEmotionColor(emotion.intensity)}`}>
                            {emotion.intensity}/10
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center space-x-2">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(emotion.date)} {formatTime(emotion.time)}</span>
                        </div>
                        {emotion.trigger && (
                          <div className="text-sm text-gray-700 mt-2 line-clamp-2">
                            {emotion.trigger}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {state.emotions.length > 5 && (
                <div className="mt-4 text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab('history')}
                    className="w-full"
                  >
                    查看全部 {state.emotions.length} 条记录
                  </Button>
                </div>
              )}
            </Card>
          )}
        </>
      ) : (
        <EmotionHistory />
      )}
    </div>
  );
};

export default EmotionTracker;
