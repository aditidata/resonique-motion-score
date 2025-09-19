import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trophy, Users, Medal, Crown } from 'lucide-react';

const Leaderboard = () => {
  // Mock leaderboard data
  const topPlayers = [
    { rank: 1, name: 'Alex Chen', score: 2450, streak: 12 },
    { rank: 2, name: 'Maya Patel', score: 2380, streak: 8 },
    { rank: 3, name: 'Jordan Kim', score: 2290, streak: 15 },
    { rank: 4, name: 'Sam Rodriguez', score: 2150, streak: 6 },
    { rank: 5, name: 'Riley Thompson', score: 2080, streak: 9 },
    { rank: 6, name: 'Casey Liu', score: 1950, streak: 4 },
    { rank: 7, name: 'Morgan Brown', score: 1890, streak: 7 },
    { rank: 8, name: 'Taylor Davis', score: 1820, streak: 3 },
    { rank: 9, name: 'Avery Johnson', score: 1750, streak: 5 },
    { rank: 10, name: 'Quinn Wilson', score: 1680, streak: 2 },
  ];

  const liveParticipants = [
    { name: 'Elena Martinez', score: 1420, status: 'playing' },
    { name: 'Ryan Foster', score: 980, status: 'syncing' },
    { name: 'Zoe Campbell', score: 750, status: 'playing' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-4 h-4 text-warning" />;
      case 2:
        return <Medal className="w-4 h-4 text-muted-foreground" />;
      case 3:
        return <Medal className="w-4 h-4 text-amber-600" />;
      default:
        return <span className="w-4 h-4 text-center text-sm font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'playing':
        return 'text-success';
      case 'syncing':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      {/* Top 10 Leaderboard */}
      <Card className="card-glass">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Trophy className="w-5 h-5 text-primary" />
            <span>Top 10 Leaderboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            <div className="space-y-2">
              {topPlayers.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-card-hover ${
                    player.rank <= 3 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-muted/5 border-border/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {getRankIcon(player.rank)}
                    <div>
                      <div className="font-medium text-sm text-card-foreground">
                        {player.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {player.streak} streak
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">
                      {player.score}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      pts
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Live Participants */}
      <Card className="card-glass">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Users className="w-5 h-5 text-secondary" />
            <span>Live Players</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {liveParticipants.map((participant, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/5 border border-border/30 hover:bg-card-hover transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    participant.status === 'playing' ? 'bg-success' : 'bg-warning'
                  }`} />
                  <div>
                    <div className="font-medium text-sm text-card-foreground">
                      {participant.name}
                    </div>
                    <div className={`text-xs capitalize ${getStatusColor(participant.status)}`}>
                      {participant.status}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-secondary">
                    {participant.score}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;