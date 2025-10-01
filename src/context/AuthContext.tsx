import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { api } from '../api';

interface Player { id: string; name: string; score: number; }
interface AuthContextType {
  player: Player | null;
  token: string | null;
  enterGame: (name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedPlayer = localStorage.getItem('authPlayer');
    if (token && storedPlayer) {
      setPlayer(JSON.parse(storedPlayer));
    }
    setIsLoading(false);
  }, [token]);

  const enterGame = async (name: string) => {
    const { data } = await api.post('/enter', { name });
    const { token, player } = data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('authPlayer', JSON.stringify(player));
    setToken(token);
    setPlayer(player);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authPlayer');
    setToken(null);
    setPlayer(null);
  };

  const value = { player, token, enterGame, logout, isLoading };
  
  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};