import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';
import { EMOTIONS, BODY_FEELINGS, COPING_STRATEGIES } from '@/data/emotions';
import type { EmotionEntry } from '@/types';

const EmotionTracker: React.FC = () => {
  const { dispatch } = useApp();
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [trigger, setTrigger] = useState('');
  const [bodyFeeling, setBodyFeeling] = useState('');
  const [copingUsed, setCopingUsed] = useState('');
  const [effectiveness, setEffectiveness] = useState(5);

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

    // Reset form
    setSelectedEmotion('');
    setIntensity(5);
    setTrigger('');
    setBodyFeeling('');
    setCopingUsed('');
    setEffectiveness(5);

    alert('情绪记录已保存!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
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
    </div>
  );
};

export default EmotionTracker;
