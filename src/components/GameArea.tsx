import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import FrequencyVisualizer from './FrequencyVisualizer';
import CameraFeed from './CameraFeed';
import { useGameState } from '@/hooks/useGame';
import { usePlayerActions } from '@/hooks/usePlayerActions';
import { useDebounce } from '@/hooks/useDebounce';

const GameArea = () => {
  const { markerPosition, isMatched, score } = useGameState();
  const { sendFrequencyUpdate } = usePlayerActions();
  const [playerFrequency, setPlayerFrequency] = useState(440);
  const debouncedFrequency = useDebounce(playerFrequency, 300);

  useEffect(() => {
    sendFrequencyUpdate(debouncedFrequency);
  }, [debouncedFrequency, sendFrequencyUpdate]);

  return (
    <div className="flex-1 space-y-6">
      <CameraFeed markerPosition={markerPosition} />
      <Card><CardContent className="p-6"><FrequencyVisualizer frequency={playerFrequency} /></CardContent></Card>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm">Your Frequency</div>
            <div className="text-2xl font-bold text-primary">{Math.round(playerFrequency)} Hz</div>
          </div>
          <Slider value={[playerFrequency]} onValueChange={(v) => setPlayerFrequency(v[0])} min={200} max={800} step={1} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
            <div>Your Score: <span className="font-bold text-xl">{score}</span></div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${isMatched ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {isMatched ? '✅ Matched' : '❌ Not Matched'}
            </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default GameArea;