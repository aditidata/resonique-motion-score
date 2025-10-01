import { useEffect } from 'react';
import GameArea from '@/components/GameArea';
import Header from '@/components/Header';
import Leaderboard from '@/components/Leaderboard';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';

const GamePage = () => {
  const { player, isLoading } = useAuth();
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (isConnected && player) {
      socket!.emit('playerJoin', player.id);
    }
  }, [socket, player, isConnected]);

  if (isLoading || !player) {
    return <div className="flex items-center justify-center h-screen">Loading Game...</div>;
  }

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
        <GameArea />
        <Leaderboard />
      </main>
    </>
  );
};
export default GamePage;