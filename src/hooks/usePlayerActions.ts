import { useSocket } from '@/context/SocketContext';
import { useCallback } from 'react';

export const usePlayerActions = () => {
  const {socket} = useSocket();

  const sendFrequencyUpdate = useCallback((frequency: number) => {
    if (socket) {
      // ADD THIS LOG
      console.log(`FRONTEND: Sending frequency update --> ${frequency}`);
      socket.emit('playerUpdate', { frequency });
    }
  }, [socket]);

  return { sendFrequencyUpdate };
};