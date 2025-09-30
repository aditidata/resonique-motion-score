// src/hooks/useLeaderboard.ts
import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

interface Player {
  id: string;
  name: string;
  score: number;
}

export const useLeaderboard = () => {
 const {socket} = useSocket();
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [livePlayers, setLivePlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = ({ topPlayers, livePlayers }: { topPlayers: Player[], livePlayers: Player[] }) => {
      setTopPlayers(topPlayers);
      setLivePlayers(livePlayers);
    };

    socket.on('update-leaderboard', handleUpdate);

    return () => {
      socket.off('update-leaderboard', handleUpdate);
    };
  }, [socket]);

  return { topPlayers, livePlayers };
};