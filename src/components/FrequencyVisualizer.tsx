interface FrequencyVisualizerProps {
  frequency: number;
}

const FrequencyVisualizer = ({ frequency }: FrequencyVisualizerProps) => {
  // Generate frequency bars based on current frequency
  const generateBars = () => {
    const bars = [];
    const baseFreq = frequency;
    
    for (let i = 0; i < 32; i++) {
      const barFreq = 50 + (i * 25); // 50Hz to 800Hz range
      const distance = Math.abs(barFreq - baseFreq);
      const intensity = Math.max(0, 1 - (distance / 300));
      const height = 20 + (intensity * 60); // 20% to 80% height
      
      bars.push(
        <div
          key={i}
          className="frequency-bar w-3 rounded-t-sm"
          style={{ 
            height: `${height}%`,
            animationDelay: `${i * 0.05}s`,
            opacity: 0.6 + (intensity * 0.4)
          }}
        />
      );
    }
    
    return bars;
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          Frequency Spectrum
        </h3>
        <p className="text-sm text-muted-foreground">
          Align your position with the frequency marker
        </p>
      </div>
      
      {/* Frequency Bars */}
      <div className="flex items-end justify-center space-x-1 h-24 bg-muted/10 rounded-lg p-4 border border-border/30">
        {generateBars()}
      </div>
      
      {/* Frequency Labels */}
      <div className="flex justify-between text-xs text-muted-foreground px-4">
        <span>50Hz</span>
        <span>200Hz</span>
        <span>400Hz</span>
        <span>600Hz</span>
        <span>800Hz</span>
      </div>
    </div>
  );
};

export default FrequencyVisualizer;