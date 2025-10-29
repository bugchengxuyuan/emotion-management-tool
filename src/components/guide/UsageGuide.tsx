import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Heart, Brain, AlertCircle, MessageSquare } from 'lucide-react';

const UsageGuide: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>欢迎使用情绪管理工具箱</CardTitle>
        </CardHeader>
        <div className="prose max-w-none">
          <p className="text-gray-600">
            这是一个基于认知行为疗法(CBT)、辩证行为疗法(DBT)和接纳承诺疗法(ACT)的综合情绪管理工具。
            通过科学的方法帮助你更好地理解和管理情绪。
          </p>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-start space-x-4">
            <Heart className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">情绪追踪器</h3>
              <p className="text-sm text-gray-600">
                每天记录你的情绪状态、触发因素和身体感觉。持续追踪可以帮助你识别情绪模式，
                了解什么情况会引发特定情绪。建议每天至少记录3次。
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start space-x-4">
            <Brain className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">思维记录</h3>
              <p className="text-sm text-gray-600">
                使用七栏思维记录法识别和挑战负面自动化思维。通过寻找证据和建立平衡思维，
                可以有效减少负面情绪。适合在情绪强度超过6/10时使用。
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">危机工具(TIPP)</h3>
              <p className="text-sm text-gray-600">
                当情绪强度达到8-10/10时使用的急救技能。包括冷水刺激、剧烈运动、
                节奏呼吸和渐进式肌肉放松。这些技能可以快速降低情绪强度。
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start space-x-4">
            <MessageSquare className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">DEAR MAN沟通</h3>
              <p className="text-sm text-gray-600">
                DBT的人际效能技能，帮助你有效表达需求、设定边界和维护关系。
                适合在需要进行重要对话或协商时提前准备使用。
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">初学者建议</CardTitle>
        </CardHeader>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <span className="mr-2">📅</span>
            <span><strong>第1周:</strong> 每天使用情绪追踪器3次，建立觉察习惯</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔍</span>
            <span><strong>第2周:</strong> 开始识别情绪模式和常见触发因素</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🧘</span>
            <span><strong>第3周:</strong> 学习并练习TIPP技能中的深呼吸法</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✍️</span>
            <span><strong>第4周:</strong> 尝试完成第一个思维记录</span>
          </li>
        </ul>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-900">重要提示</CardTitle>
        </CardHeader>
        <div className="text-sm text-yellow-800 space-y-2">
          <p>⚠️ 本工具仅供个人情绪管理使用，不能替代专业心理咨询或治疗。</p>
          <p>🆘 如果你有自伤、自杀想法，或情绪问题严重影响生活，请立即寻求专业帮助。</p>
          <p>📞 心理危机热线: 400-161-9995 (24小时)</p>
        </div>
      </Card>
    </div>
  );
};

export default UsageGuide;
