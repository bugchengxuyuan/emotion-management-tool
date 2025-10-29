import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import type { DearManPlan } from '@/types';

const DearManTool: React.FC = () => {
  const { dispatch } = useApp();
  const [scenario, setScenario] = useState('');
  const [describe, setDescribe] = useState('');
  const [express, setExpress] = useState('');
  const [assertValue, setAssertValue] = useState('');
  const [reinforce, setReinforce] = useState('');
  const [mindful, setMindful] = useState('');
  const [appear, setAppear] = useState('');
  const [negotiate, setNegotiate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!scenario || !describe || !assertValue) {
      alert('请填写必填项');
      return;
    }

    const plan: DearManPlan = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      scenario,
      describe,
      express,
      assert: assertValue,
      reinforce,
      mindful,
      appear,
      negotiate,
    };

    dispatch({ type: 'ADD_DEAR_MAN_PLAN', payload: plan });

    // Reset form
    setScenario('');
    setDescribe('');
    setExpress('');
    setAssertValue('');
    setReinforce('');
    setMindful('');
    setAppear('');
    setNegotiate('');

    alert('DEAR MAN计划已保存!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">DEAR MAN人际效能技能</CardTitle>
        </CardHeader>
        <p className="text-sm text-blue-800">
          有效表达需求、设定边界和维护关系的沟通技巧。适合在重要对话前准备使用。
        </p>
      </Card>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Scenario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              场景描述 <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="例如: 向老板要求加薪"
              rows={2}
              required
            />
          </div>

          {/* Describe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              D - Describe (描述) <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">客观描述事实，不带评判</p>
            <Textarea
              value={describe}
              onChange={(e) => setDescribe(e.target.value)}
              placeholder="例如: 过去一年，我完成了3个重大项目，销售额增长了20%"
              rows={3}
              required
            />
          </div>

          {/* Express */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E - Express (表达)
            </label>
            <p className="text-xs text-gray-500 mb-2">表达你的感受和想法</p>
            <Textarea
              value={express}
              onChange={(e) => setExpress(e.target.value)}
              placeholder="例如: 我感到自己的贡献没有在薪资上得到体现，这让我缺乏动力"
              rows={2}
            />
          </div>

          {/* Assert */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              A - Assert (主张) <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">清晰说出你的需求或期望</p>
            <Textarea
              value={assertValue}
              onChange={(e) => setAssertValue(e.target.value)}
              placeholder="例如: 我希望能够加薪15%"
              rows={2}
              required
            />
          </div>

          {/* Reinforce */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              R - Reinforce (强化)
            </label>
            <p className="text-xs text-gray-500 mb-2">说明对方满足你需求的好处</p>
            <Textarea
              value={reinforce}
              onChange={(e) => setReinforce(e.target.value)}
              placeholder="例如: 合理的薪资会让我更有动力，继续为公司创造价值"
              rows={2}
            />
          </div>

          {/* Mindful */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              M - Mindful (保持专注)
            </label>
            <p className="text-xs text-gray-500 mb-2">如何应对话题转移</p>
            <Textarea
              value={mindful}
              onChange={(e) => setMindful(e.target.value)}
              placeholder="例如: 如果话题被转移，我会说'我理解，但我们先专注讨论薪资调整'"
              rows={2}
            />
          </div>

          {/* Appear */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              A - Appear (自信表现)
            </label>
            <p className="text-xs text-gray-500 mb-2">描述你的身体语言和态度</p>
            <Textarea
              value={appear}
              onChange={(e) => setAppear(e.target.value)}
              placeholder="例如: 保持眼神接触，声音平稳自信，坐姿端正"
              rows={2}
            />
          </div>

          {/* Negotiate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              N - Negotiate (协商)
            </label>
            <p className="text-xs text-gray-500 mb-2">你愿意做出的妥协</p>
            <Textarea
              value={negotiate}
              onChange={(e) => setNegotiate(e.target.value)}
              placeholder="例如: 如果15%不可行，我愿意接受10%加上培训机会"
              rows={2}
            />
          </div>

          <Button type="submit" className="w-full">
            保存DEAR MAN计划
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default DearManTool;
