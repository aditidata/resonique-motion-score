import React from 'react';

const FrequencyVisualizer = ({ frequency }: { frequency: number }) => {
  const bars = React.useMemo(() => {
    const barData = [];
    for (let i = 0; i < 32; i++) {
      const barFreq = 50 + (i * 25);
      const distance = Math.abs(barFreq - frequency);
      const intensity = Math.max(0, 1 - (distance / 300));
      const height = 20 + (intensity * 60);
      barData.push(
        <div
          key={i}
          className="bg-primary/60 w-3 rounded-t-sm"
          style={{ height: `${height}%` }}
        />
      );
    }
    return barData;
  }, [frequency]);

  return <div className="flex items-end justify-center space-x-1 h-24">{bars}</div>;
};
export default FrequencyVisualizer;