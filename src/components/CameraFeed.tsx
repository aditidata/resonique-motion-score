import { Card, CardContent } from '@/components/ui/card';

const CameraFeed = ({ markerPosition }: { markerPosition: number }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
          <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">● LIVE</div>
          <div 
            className="absolute top-1/2 w-1 h-32 bg-cyan-400 shadow-[0_0_15px_3px_rgba(0,255,255,0.7)] transform transition-all duration-500 ease-out rounded-full"
            style={{ 
              left: `${markerPosition}%`,
              transform: `translateX(-50%) translateY(-50%)`,
            }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs font-medium rounded border border-cyan-400/50">Target</div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs text-gray-400">Low Freq</div>
          <div className="absolute bottom-4 right-4 text-xs text-gray-400">High Freq</div>
        </div>
      </CardContent>
    </Card>
  );
};
export default CameraFeed;