import { useEffect } from 'react';
import GameArea from '@/components/GameArea';
import Header from '@/components/Header';
import Leaderboard from '@/components/Leaderboard';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';

const GamePage = () => {
  const { user, isLoading } = useAuth();
  // Get both the socket and the new isConnected state
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    // The dependency array now correctly uses the isConnected state
    console.log('GamePage Effect | Is Connected:', isConnected, '| User has Player:', !!user?.player);

    if (isConnected && user?.player) {
      console.log(`✅ Emitting 'playerJoin' for ${user.player.name} with ID ${user.player.id}`);
      socket!.emit('playerJoin', user.player.id);
    }
  }, [socket, user, isConnected]); // Use isConnected here

  if (isLoading || !user?.player) {
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