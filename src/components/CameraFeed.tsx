import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const MIN_FREQ = 400;
const MAX_FREQ = 2000;

const CameraFeed = ({
  markerPosition,
  showTargetMarker,
  showUserMarker,
  onUserFrequencyChange,
}: {
  markerPosition: number;
  showTargetMarker: boolean;
  showUserMarker: boolean;
  onUserFrequencyChange: (freq: number) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userMarker, setUserMarker] = useState(50);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    let pose: any;
    let animationId: number;

    async function setupPose() {
      if (!videoRef.current) return;

      pose = new (window as any).Pose({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 0,
        enableSegmentation: false,
        smoothLandmarks: true,
      });

      pose.onResults((results: any) => {
        if (results.poseLandmarks?.length) {
          const lHip = results.poseLandmarks[23];
          const rHip = results.poseLandmarks[24];
          if (lHip && rHip) {
            const centerX = (lHip.x + rHip.x) / 2;
            const now = performance.now();
            if (now - lastUpdateRef.current > 100) {
              lastUpdateRef.current = now;
              const markerPercent = centerX * 100;
              setUserMarker(markerPercent);
              const freq = centerX * (MAX_FREQ - MIN_FREQ) + MIN_FREQ;
              onUserFrequencyChange(freq);
            }
          }
        }
      });

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      function animate() {
        if (videoRef.current) {
          pose.send({ image: videoRef.current });
        }
        animationId = requestAnimationFrame(animate);
      }
      animate();
    }

    setupPose();

    return () => {
      cancelAnimationFrame(animationId);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((t) => t.stop());
      }
    };
  }, [onUserFrequencyChange]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-700">
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }} // flip video horizontally
          />
          {showTargetMarker && (
            <div
              className="absolute top-1/2 w-1 h-32 rounded-full bg-cyan-400 shadow-[0_0_15px_3px_rgba(0,255,255,0.7)] transition-all duration-500 ease-out"
              style={{
                left: `${markerPosition}%`,
                transform: 'translateX(-50%) translateY(-50%)',
              }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs font-medium rounded border border-cyan-400/50">
                Target
              </div>
            </div>
          )}
          {showUserMarker && (
            <div
              className="absolute top-1/2 w-2 h-32 rounded-full bg-pink-500 shadow-[0_0_15px_3px_rgba(255,0,255,0.7)] transition-all duration-500 ease-out"
              style={{
                left: `${100 - userMarker}%`, // flipped to match video
                transform: 'translateX(-50%) translateY(-50%)',
              }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs font-bold rounded border border-pink-400/50">
                You
              </div>
            </div>
          )}
          <div className="absolute top-4 left-4 bg-red-600 text-white rounded-full px-3 py-1 text-sm font-medium">● LIVE</div>
          <div className="absolute bottom-4 left-4 text-xs text-gray-400">Low Freq</div>
          <div className="absolute bottom-4 right-4 text-xs text-gray-400">High Freq</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CameraFeed;
