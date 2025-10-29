import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AlertCircle, Brain, Heart, MessageSquare, TrendingUp } from 'lucide-react';

// 情绪检查站 - 快速入口和智能引导
const EmotionCheckpoint: React.FC = () => {
  const { dispatch } = useApp();
  const [currentIntensity, setCurrentIntensity] = useState<number | null>(null);
  const [currentType, setCurrentType] = useState<'crisis' | 'negative' | 'neutral' | 'positive' | null>(null);

  const handleEmotionCheck = (intensity: number, type: 'crisis' | 'negative' | 'neutral' | 'positive') => {
    setCurrentIntensity(intensity);
    setCurrentType(type);
  };

  const navigateTo = (tab: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  // 根据情绪状态推荐工具
  const getRecommendations = () => {
    if (currentIntensity === null) return null;

    if (currentIntensity >= 8) {
      return (
        <Card className="bg-red-50 border-red-200 p-6 animate-slide-up">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-12 h-12 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900 mb-2">
                🚨 情绪强度很高 - 立即使用危机技能
              </h3>
              <p className="text-red-800 mb-4">
                当情绪强度达到8分以上时，首要任务是降低强度到可管理的范围。推荐使用TIPP技能：
              </p>
              <ul className="space-y-2 text-red-800 mb-4">
                <li>• <strong>冷水洗脸</strong> - 快速激活放松反应（30秒）</li>
                <li>• <strong>剧烈运动</strong> - 释放压力荷尔蒙（10分钟）</li>
                <li>• <strong>深呼吸</strong> - 4-2-6呼吸法（5分钟）</li>
              </ul>
              <div className="flex space-x-3">
                <Button
                  onClick={() => navigateTo('crisis')}
                  variant="danger"
                  className="flex-1"
                >
                  立即使用TIPP技能
                </Button>
                <Button
                  onClick={() => setCurrentIntensity(null)}
                  variant="outline"
                >
                  重新评估
                </Button>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    if (currentIntensity >= 5 && currentType === 'negative') {
      return (
        <Card className="bg-purple-50 border-purple-200 p-6 animate-slide-up">
          <div className="flex items-start space-x-4">
            <Brain className="w-12 h-12 text-purple-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-purple-900 mb-2">
                💭 负面情绪较强 - 检查你的想法
              </h3>
              <p className="text-purple-800 mb-4">
                中等强度的负面情绪往往与负面思维有关。建议流程：
              </p>
              <div className="bg-white rounded-lg p-4 mb-4">
                <ol className="space-y-2 text-purple-900">
                  <li><strong>1. 情绪追踪</strong> - 记录当前情绪和触发事件</li>
                  <li><strong>2. 思维记录</strong> - 识别和挑战负面自动化思维</li>
                  <li><strong>3. 应对技能</strong> - 使用深呼吸或其他放松技能</li>
                </ol>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={() => navigateTo('tracker')}
                  variant="primary"
                  className="flex-1"
                >
                  开始记录情绪
                </Button>
                <Button
                  onClick={() => navigateTo('thought-record')}
                  variant="secondary"
                  className="flex-1"
                >
                  直接做思维记录
                </Button>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    if (currentType === 'negative') {
      return (
        <Card className="bg-blue-50 border-blue-200 p-6 animate-slide-up">
          <div className="flex items-start space-x-4">
            <Heart className="w-12 h-12 text-blue-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                📝 轻度负面情绪 - 记录和觉察
              </h3>
              <p className="text-blue-800 mb-4">
                情绪强度不高，这是练习觉察和预防的好时机：
              </p>
              <ul className="space-y-2 text-blue-800 mb-4">
                <li>• 记录情绪和触发因素，建立模式识别</li>
                <li>• 如果涉及人际冲突，可以准备DEAR MAN</li>
                <li>• 定期查看进展，了解自己的情绪模式</li>
              </ul>
              <div className="flex space-x-3">
                <Button
                  onClick={() => navigateTo('tracker')}
                  variant="primary"
                >
                  记录情绪
                </Button>
                <Button
                  onClick={() => navigateTo('communication')}
                  variant="outline"
                >
                  准备沟通
                </Button>
                <Button
                  onClick={() => navigateTo('progress')}
                  variant="ghost"
                >
                  查看进展
                </Button>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card className="bg-green-50 border-green-200 p-6 animate-slide-up">
        <div className="flex items-start space-x-4">
          <TrendingUp className="w-12 h-12 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-green-900 mb-2">
              ✨ 情绪状态良好 - 巩固和预防
            </h3>
            <p className="text-green-800 mb-4">
              情绪平稳时是最好的学习时机：
            </p>
            <ul className="space-y-2 text-green-800 mb-4">
              <li>• 记录积极情绪，强化正面体验</li>
              <li>• 学习新的心理技能</li>
              <li>• 为未来可能的困难做准备</li>
              <li>• 查看进展，庆祝成长</li>
            </ul>
            <div className="flex space-x-3">
              <Button
                onClick={() => navigateTo('tracker')}
                variant="primary"
              >
                记录积极情绪
              </Button>
              <Button
                onClick={() => navigateTo('guide')}
                variant="secondary"
              >
                学习新技能
              </Button>
              <Button
                onClick={() => navigateTo('progress')}
                variant="outline"
              >
                查看成长
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
        <h1 className="text-3xl font-bold mb-2">情绪急救中心</h1>
        <p className="text-blue-100">
          先评估你的当前状态，我会推荐最适合你的工具和流程
        </p>
      </Card>

      {!currentIntensity ? (
        <>
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🤔 现在感觉如何？
            </h2>
            <p className="text-gray-600 mb-6">
              选择最符合你当前情绪强度的描述：
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleEmotionCheck(9, 'crisis')}
                className="w-full p-4 text-left rounded-lg border-2 border-red-200 hover:border-red-400 hover:bg-red-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-red-900 mb-1">
                      🚨 情绪非常强烈（8-10分）
                    </div>
                    <div className="text-sm text-red-700">
                      感觉快要失控、极度痛苦、无法思考、想要伤害自己或他人
                    </div>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0 ml-4" />
                </div>
              </button>

              <button
                onClick={() => handleEmotionCheck(6, 'negative')}
                className="w-full p-4 text-left rounded-lg border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-orange-900 mb-1">
                      😤 情绪比较强烈（5-7分）
                    </div>
                    <div className="text-sm text-orange-700">
                      明显不舒服、影响工作/学习、难以集中注意力、负面想法较多
                    </div>
                  </div>
                  <Brain className="w-8 h-8 text-orange-500 flex-shrink-0 ml-4" />
                </div>
              </button>

              <button
                onClick={() => handleEmotionCheck(3, 'negative')}
                className="w-full p-4 text-left rounded-lg border-2 border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-yellow-900 mb-1">
                      😕 有些不舒服（3-4分）
                    </div>
                    <div className="text-sm text-yellow-700">
                      轻微的负面情绪、可以正常活动但有些困扰、想要改善状态
                    </div>
                  </div>
                  <Heart className="w-8 h-8 text-yellow-500 flex-shrink-0 ml-4" />
                </div>
              </button>

              <button
                onClick={() => handleEmotionCheck(1, 'neutral')}
                className="w-full p-4 text-left rounded-lg border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-green-900 mb-1">
                      😊 状态还不错（0-2分）
                    </div>
                    <div className="text-sm text-green-700">
                      情绪平稳或积极、想要学习新技能、维护良好状态
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500 flex-shrink-0 ml-4" />
                </div>
              </button>
            </div>
          </Card>

          <Card className="bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">💡 快速跳转</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => navigateTo('tracker')}
                variant="outline"
                className="justify-start"
              >
                <Heart className="w-4 h-4 mr-2" />
                情绪追踪
              </Button>
              <Button
                onClick={() => navigateTo('crisis')}
                variant="outline"
                className="justify-start"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                危机工具
              </Button>
              <Button
                onClick={() => navigateTo('thought-record')}
                variant="outline"
                className="justify-start"
              >
                <Brain className="w-4 h-4 mr-2" />
                思维记录
              </Button>
              <Button
                onClick={() => navigateTo('communication')}
                variant="outline"
                className="justify-start"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                沟通工具
              </Button>
            </div>
          </Card>
        </>
      ) : (
        <>
          {getRecommendations()}

          <Card className="bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">📚 工具使用顺序建议</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-red-900 mb-2">危机时刻（8-10分）</div>
                <div className="text-sm text-gray-700">
                  TIPP技能 → 等待强度下降 → 情绪追踪 → 思维记录（可选）
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-orange-900 mb-2">中等强度（5-7分）</div>
                <div className="text-sm text-gray-700">
                  情绪追踪 → 思维记录 → 应对技能练习 → 再次评估
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-blue-900 mb-2">人际冲突</div>
                <div className="text-sm text-gray-700">
                  情绪追踪 → DEAR MAN准备 → 实践沟通 → 回顾总结
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-green-900 mb-2">平稳状态</div>
                <div className="text-sm text-gray-700">
                  学习新技能 → 查看进展 → 记录积极体验 → 预防性练习
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default EmotionCheckpoint;
