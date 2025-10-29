import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';
import { BookOpen, History } from 'lucide-react';
import ThoughtHistory from './ThoughtHistory';
import type { ThoughtRecord } from '@/types';

const ThoughtRecordForm: React.FC = () => {
  const { dispatch } = useApp();
  const [situation, setSituation] = useState('');
  const [emotion, setEmotion] = useState('');
  const [emotionBefore, setEmotionBefore] = useState(50);
  const [automaticThought, setAutomaticThought] = useState('');
  const [evidenceFor, setEvidenceFor] = useState('');
  const [evidenceAgainst, setEvidenceAgainst] = useState('');
  const [balancedThought, setBalancedThought] = useState('');
  const [emotionAfter, setEmotionAfter] = useState(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!situation || !emotion || !automaticThought) {
      alert('请填写必填项');
      return;
    }

    const record: ThoughtRecord = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0],
      situation,
      emotion,
      emotionBefore,
      automaticThought,
      evidenceFor,
      evidenceAgainst,
      balancedThought,
      emotionAfter,
    };

    dispatch({ type: 'ADD_THOUGHT', payload: record });

    // Reset form
    setSituation('');
    setEmotion('');
    setEmotionBefore(50);
    setAutomaticThought('');
    setEvidenceFor('');
    setEvidenceAgainst('');
    setBalancedThought('');
    setEmotionAfter(50);

    alert('思维记录已保存!');
  };

  const improvement = emotionBefore - emotionAfter;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>七栏思维记录</CardTitle>
        </CardHeader>
        <p className="text-sm text-gray-600 mb-6">
          识别和挑战负面自动化思维，建立更加平衡理性的想法
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Situation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              1. 情境 <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">描述触发情绪的具体事件</p>
            <Textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="例如: 老板在会议上批评了我的方案"
              rows={2}
              required
            />
          </div>

          {/* 2. Emotion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2. 情绪 <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
              placeholder="例如: 羞愧、焦虑"
              rows={1}
              required
            />
            <div className="mt-3">
              <label className="block text-xs text-gray-600 mb-2">
                情绪强度(之前): {emotionBefore}%
              </label>
              <Slider
                min={0}
                max={100}
                step={5}
                value={[emotionBefore]}
                onValueChange={(value) => setEmotionBefore(value[0])}
              />
            </div>
          </div>

          {/* 3. Automatic Thought */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              3. 自动化思维 <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">脑海中闪过的第一反应</p>
            <Textarea
              value={automaticThought}
              onChange={(e) => setAutomaticThought(e.target.value)}
              placeholder="例如: 我太失败了，老板一定觉得我很无能"
              rows={2}
              required
            />
          </div>

          {/* 4. Evidence For */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              4. 支持证据
            </label>
            <p className="text-xs text-gray-500 mb-2">哪些事实支持这个想法？</p>
            <Textarea
              value={evidenceFor}
              onChange={(e) => setEvidenceFor(e.target.value)}
              placeholder="例如: 老板确实批评了我，语气很严厉"
              rows={2}
            />
          </div>

          {/* 5. Evidence Against */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              5. 反对证据
            </label>
            <p className="text-xs text-gray-500 mb-2">哪些事实不支持这个想法？</p>
            <Textarea
              value={evidenceAgainst}
              onChange={(e) => setEvidenceAgainst(e.target.value)}
              placeholder="例如: 上个月老板还表扬过我，只是这个方案有问题"
              rows={2}
            />
          </div>

          {/* 6. Balanced Thought */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              6. 平衡思维
            </label>
            <p className="text-xs text-gray-500 mb-2">综合所有证据后的合理想法</p>
            <Textarea
              value={balancedThought}
              onChange={(e) => setBalancedThought(e.target.value)}
              placeholder="例如: 老板批评的是这个方案，不是我这个人。这是一个学习改进的机会"
              rows={3}
            />
          </div>

          {/* 7. Emotion After */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              7. 情绪强度(之后): {emotionAfter}%
            </label>
            <Slider
              min={0}
              max={100}
              step={5}
              value={[emotionAfter]}
              onValueChange={(value) => setEmotionAfter(value[0])}
            />
            {improvement > 0 && (
              <p className="text-sm text-green-600 mt-2">
                情绪改善了 {improvement}%
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            保存思维记录
          </Button>
        </form>
      </Card>
    </div>
  );
};

const ThoughtRecordComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'record' | 'history'>('record');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tab Navigation */}
      <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
        <button
          onClick={() => setActiveTab('record')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-md transition-colors ${
            activeTab === 'record'
              ? 'bg-purple-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="font-medium">记录思维</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-md transition-colors ${
            activeTab === 'history'
              ? 'bg-purple-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <History className="w-4 h-4" />
          <span className="font-medium">历史记录</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'record' ? <ThoughtRecordForm /> : <ThoughtHistory />}
    </div>
  );
};

export default ThoughtRecordComponent;
