import { useSocket } from '@/context/SocketContext';
import { useCallback } from 'react';

export const usePlayerActions = () => {
  const { socket } = useSocket();
  const sendFrequencyUpdate = useCallback((frequency: number) => {
    if (socket) socket.emit('playerUpdate', { frequency });
  }, [socket]);
  return { sendFrequencyUpdate };
};