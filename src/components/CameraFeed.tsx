import { Card, CardContent } from '@/components/ui/card';

interface CameraFeedProps {
  markerPosition: number; // 0-100 percentage
}

const CameraFeed = ({ markerPosition }: CameraFeedProps) => {
  return (
    <Card className="card-glass">
      <CardContent className="p-6">
        <div className="relative aspect-video bg-muted/20 rounded-lg overflow-hidden border border-border/50">
          {/* Mock Camera Feed Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted/10 via-primary/5 to-secondary/10">
            <div className="absolute inset-0 opacity-30">
              {/* Grid overlay for futuristic effect */}
              <div className="w-full h-full" 
                   style={{
                     backgroundImage: `
                       linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
                     `,
                     backgroundSize: '20px 20px'
                   }}>
              </div>
            </div>
          </div>
          
          {/* Live Camera Label */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-destructive/80 text-destructive-foreground text-sm font-medium rounded-full border border-destructive/30">
            ● LIVE
          </div>
          
          {/* Player Silhouette Mock */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-48 bg-gradient-to-t from-primary/40 to-transparent rounded-t-full opacity-60 animate-float">
          </div>
          
          {/* Dynamic Frequency Marker */}
          <div 
            className="absolute top-1/2 w-1 h-32 bg-gradient-frequency shadow-frequency transform -translate-y-1/2 transition-all duration-500 ease-out rounded-full"
            style={{ 
              left: `${markerPosition}%`,
              transform: `translateX(-50%) translateY(-50%)`,
              animation: 'glow-pulse 1s ease-in-out infinite'
            }}
          >
            {/* Marker Indicator */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-card text-xs font-medium rounded border border-primary/30 whitespace-nowrap">
              Target
            </div>
          </div>
          
          {/* Frequency Range Indicators */}
          <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
            Low Freq
          </div>
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
            High Freq
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CameraFeed;