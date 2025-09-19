import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FrequencyVisualizer from './FrequencyVisualizer';
import CameraFeed from './CameraFeed';

const GameArea = () => {
  const [currentFrequency, setCurrentFrequency] = useState(440); // A4 note
  const [isMatched, setIsMatched] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(50); // 0-100 percentage

  // Simulate frequency changes and player alignment
  useEffect(() => {
    const interval = setInterval(() => {
      const newFrequency = 200 + Math.random() * 600; // 200-800 Hz range
      setCurrentFrequency(newFrequency);
      
      // Calculate marker position based on frequency (low freq = left, high freq = right)
      const position = ((newFrequency - 200) / 600) * 100;
      setMarkerPosition(Math.max(0, Math.min(100, position)));
      
      // Simulate random matching
      setIsMatched(Math.random() > 0.6);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 space-y-6">
      {/* Camera Feed */}
      <CameraFeed markerPosition={markerPosition} />
      
      {/* Frequency Visualizer */}
      <Card className="card-glass">
        <CardContent className="p-6">
          <FrequencyVisualizer frequency={currentFrequency} />
        </CardContent>
      </Card>
      
      {/* Status Display */}
      <Card className="card-glass">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Current Frequency:
              </div>
              <div className="text-2xl font-bold text-primary glow-effect">
                {Math.round(currentFrequency)} Hz
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-sm text-muted-foreground">
                Alignment Status:
              </div>
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                isMatched 
                  ? 'bg-success/20 text-success border border-success/30' 
                  : 'bg-destructive/20 text-destructive border border-destructive/30'
              }`}>
                <span>{isMatched ? '✅ Matched' : '❌ Not Matched'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameArea;