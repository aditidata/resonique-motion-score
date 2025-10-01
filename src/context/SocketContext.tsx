import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface ISocketContext {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({ socket: null, isConnected: false });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);
    newSocket.on('connect', () => setIsConnected(true));
    newSocket.on('disconnect', () => setIsConnected(false));
    return () => {
      newSocket.off('connect');
      newSocket.off('disconnect');
      newSocket.close();
    };
  }, []);

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};