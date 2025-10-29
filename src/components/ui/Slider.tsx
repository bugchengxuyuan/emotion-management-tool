import React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step,
  value,
  onValueChange,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange([parseFloat(e.target.value)]);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className={cn(
        'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider',
        className
      )}
    />
  );
};

export default Slider;
