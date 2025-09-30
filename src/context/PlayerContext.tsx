// src/context/PlayerContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useSocket } from './SocketContext';

// Define the shape of our player object for type safety
interface Player {
  id: string;
  name: string;
  score: number;
}

interface PlayerContextType {
  player: Player | null;
  joinGame: (name: string) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within a PlayerProvider');
  return context;
};

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const {socket} = useSocket();
  const [player, setPlayer] = useState<Player | null>(null);

  const joinGame = async (name: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error('Server responded with an error');
      
      const playerData: Player = await response.json();
      setPlayer(playerData);

      // After successfully creating/fetching the player, emit the join event
      if (socket) {
        socket.emit('player-join', { playerId: playerData.id });
      } else {
        console.error("Socket not available to join game.");
      }

    } catch (error) {
      console.error('Failed to join game:', error);
    }
  };

  return (
    <PlayerContext.Provider value={{ player, joinGame }}>
      {children}
    </PlayerContext.Provider>
  );
};