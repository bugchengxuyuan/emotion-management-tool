import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CRISIS_STATEMENTS } from '@/data/crisis-statements';
import { Snowflake, Activity, Wind, Zap } from 'lucide-react';

const CrisisTools: React.FC = () => {
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    let interval: number;
    if (activeTimer && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setActiveTimer(null);
            alert('计时完成!');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer, timeRemaining]);

  const startTimer = (type: string, duration: number) => {
    setActiveTimer(type);
    setTimeRemaining(duration);
  };

  const stopTimer = () => {
    setActiveTimer(null);
    setTimeRemaining(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-900">TIPP危机干预技能</CardTitle>
        </CardHeader>
        <p className="text-sm text-orange-800">
          当情绪强度达到8-10/10时使用这些技能快速降低情绪强度
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Temperature */}
        <Card>
          <div className="flex items-start space-x-4">
            <Snowflake className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Temperature (温度)</h3>
              <p className="text-sm text-gray-600 mb-4">
                用冷水洗脸或冰袋敷脸15-30秒，激活哺乳动物潜水反射，快速降低心率
              </p>
              <Button
                onClick={() => startTimer('temperature', 30)}
                disabled={activeTimer !== null}
                size="sm"
              >
                开始30秒计时
              </Button>
            </div>
          </div>
        </Card>

        {/* Intense Exercise */}
        <Card>
          <div className="flex items-start space-x-4">
            <Activity className="w-8 h-8 text-green-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Intense Exercise (剧烈运动)</h3>
              <p className="text-sm text-gray-600 mb-4">
                剧烈运动10-15分钟(跑步、开合跳、爬楼梯)，释放压力荷尔蒙
              </p>
              <Button
                onClick={() => startTimer('exercise', 600)}
                disabled={activeTimer !== null}
                size="sm"
                variant="secondary"
              >
                开始10分钟计时
              </Button>
            </div>
          </div>
        </Card>

        {/* Paced Breathing */}
        <Card>
          <div className="flex items-start space-x-4">
            <Wind className="w-8 h-8 text-purple-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Paced Breathing (节奏呼吸)</h3>
              <p className="text-sm text-gray-600 mb-4">
                4-2-6呼吸法: 吸气4秒-保持2秒-呼气6秒，激活副交感神经
              </p>
              <Button
                onClick={() => startTimer('breathing', 300)}
                disabled={activeTimer !== null}
                size="sm"
                variant="outline"
              >
                开始5分钟练习
              </Button>
            </div>
          </div>
        </Card>

        {/* Paired Muscle Relaxation */}
        <Card>
          <div className="flex items-start space-x-4">
            <Zap className="w-8 h-8 text-yellow-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Paired Muscle (渐进式放松)</h3>
              <p className="text-sm text-gray-600 mb-4">
                紧张肌肉5秒然后完全放松，通过对比让身体深度放松
              </p>
              <Button
                onClick={() => startTimer('muscle', 600)}
                disabled={activeTimer !== null}
                size="sm"
                variant="ghost"
              >
                开始10分钟练习
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Timer Display */}
      {activeTimer && (
        <Card className="bg-primary-50 border-primary-300">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">正在进行: {activeTimer}</p>
            <p className="text-4xl font-bold text-primary-600 mb-4">{formatTime(timeRemaining)}</p>
            <Button onClick={stopTimer} variant="danger" size="sm">
              停止计时
            </Button>
          </div>
        </Card>
      )}

      {/* Coping Statements */}
      <Card>
        <CardHeader>
          <CardTitle>应对声明</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          {CRISIS_STATEMENTS.map((category) => (
            <div key={category.category}>
              <h4 className="font-semibold text-gray-900 mb-2">{category.category}</h4>
              <div className="space-y-2">
                {category.statements.map((statement, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700"
                  >
                    {statement}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CrisisTools;
