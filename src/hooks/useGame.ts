import { useState, useEffect } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/context/AuthContext';

interface GamePlayer { id: string; name: string; score: number; streak: number; isMatched: boolean; }
interface ServerGameState { targetFrequency: number; players: Record<string, GamePlayer>; }

export const useGameState = () => {
  const { socket, isConnected } = useSocket();
  const { player } = useAuth();
  const [targetFrequency, setTargetFrequency] = useState(440);
  const [livePlayers, setLivePlayers] = useState<GamePlayer[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer | null>(null);

  useEffect(() => {
    if (!socket || !isConnected) return;
    
    const handleStateUpdate = (state: ServerGameState) => {
      setTargetFrequency(state.targetFrequency);
      const playersArray = Object.values(state.players);
      setLivePlayers(playersArray);

      if (player) {
        const myPlayerState = playersArray.find(p => p.id === player.id);
        setCurrentPlayer(myPlayerState || null);
      }
    };
    socket.on('gameStateUpdate', handleStateUpdate);
    return () => { socket.off('gameStateUpdate'); };
  }, [socket, isConnected, player]);

  const markerPosition = ((targetFrequency - 200) / 600) * 100;

  return {
    targetFrequency,
    markerPosition,
    livePlayers,
    isMatched: currentPlayer?.isMatched ?? false,
    score: currentPlayer?.score ?? player?.score ?? 0,
  };
};