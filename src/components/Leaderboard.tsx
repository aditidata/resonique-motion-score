import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trophy, Users, Medal, Crown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchTopPlayers } from '@/api';
import { useGameState } from '@/hooks/useGame';

const Leaderboard = () => {
  const { data: topPlayers, isLoading: isLoadingTop } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchTopPlayers,
    refetchInterval: 10000,
  });
  const { livePlayers } = useGameState();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-4 h-4 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-gray-400" />;
    if (rank === 3) return <Medal className="w-4 h-4 text-orange-400" />;
    return <span className="w-4 text-center font-bold text-sm">{rank}</span>;
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Trophy />Top 10 Leaderboard</CardTitle></CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            {isLoadingTop ? <p>Loading...</p> : topPlayers?.map((p: any, i: number) => (
              <div key={p.id} className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-3">{getRankIcon(i + 1)}<span>{p.name}</span></div>
                <span className="font-bold">{p.score}</span>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Users />Live Players</CardTitle></CardHeader>
        <CardContent>
          {livePlayers.length === 0 ? <p className="text-sm text-gray-500">No players currently live.</p> : livePlayers.map((p) => (
            <div key={p.id} className="flex justify-between items-center p-2 border-b">
              <span>{p.name}</span>
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${p.isMatched ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                <span className="font-bold">{p.score}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
export default Leaderboard;