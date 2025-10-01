import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import CameraFeed from './CameraFeed';
import { usePlayerActions } from '@/hooks/usePlayerActions';
import { useDebounce } from '@/hooks/useDebounce';

const MIN_FREQ = 400;
const MAX_FREQ = 2000;

const frequencyToPosition = (freq: number) =>
  ((freq - MIN_FREQ) / (MAX_FREQ - MIN_FREQ)) * 100;

const GameArea = () => {
  const [targetFrequency, setTargetFrequency] = useState(440);
  const [showTargetMarker, setShowTargetMarker] = useState(true);
  const [showTargetFrequency, setShowTargetFrequency] = useState(true);
  const [showUserMarker, setShowUserMarker] = useState(true);
  const { sendFrequencyUpdate } = usePlayerActions();
  const [playerFrequency, setPlayerFrequency] = useState(440);
  const debouncedFrequency = useDebounce(playerFrequency, 300);

  const markerPosition = frequencyToPosition(targetFrequency);

  useEffect(() => {
    sendFrequencyUpdate(debouncedFrequency);
  }, [debouncedFrequency, sendFrequencyUpdate]);

  const changeTargetFrequency = () => {
    const randomFreq =
      Math.floor(Math.random() * (MAX_FREQ - MIN_FREQ + 1)) + MIN_FREQ;
    setTargetFrequency(randomFreq);
  };

  const handleUserFrequencyChange = (freq: number) => {
    setPlayerFrequency(freq);
  };

  return (
    <div className="flex-1 space-y-6">
      <CameraFeed
        markerPosition={markerPosition}
        showTargetMarker={showTargetMarker}
        showUserMarker={showUserMarker}
        onUserFrequencyChange={handleUserFrequencyChange}
      />

      <Card>
        <CardContent className="p-4 space-y-3">
          {showTargetFrequency && (
            <div className="flex items-center justify-between">
              <div className="text-sm">Target Frequency</div>
              <div className="text-2xl font-bold text-secondary">
                {Math.round(targetFrequency)} Hz
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">Your Frequency</div>
            <div className="text-2xl font-bold text-primary">
              {Math.round(playerFrequency)} Hz
            </div>
          </div>

          <div className="space-x-4 mt-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={changeTargetFrequency}
            >
              Change Target Frequency
            </button>

            <button
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              onClick={() =>
                setShowTargetMarker((prev) => !prev)
              }
            >
              {showTargetMarker ? 'Hide' : 'Show'} Target Marker
            </button>

            <button
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              onClick={() =>
                setShowTargetFrequency((prev) => !prev)
              }
            >
              {showTargetFrequency ? 'Hide' : 'Show'} Target Frequency
            </button>

            <button
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              onClick={() => setShowUserMarker((prev) => !prev)}
            >
              {showUserMarker ? 'Hide' : 'Show'} Your Marker
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameArea;
