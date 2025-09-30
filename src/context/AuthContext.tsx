import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { loginUser, registerUser, authApi } from '../api';

interface Player { id: string; name: string; score: number; }
interface UserProfile { id: string; email: string; role: string; player: Player | null; }
interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  login: (credentials: any) => Promise<void>;
  register: (details: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(true);

 // ... inside AuthProvider
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    const storedToken = localStorage.getItem('authToken');

    // Add this log to inspect the stored data
    console.log("AuthContext: Loading user from localStorage...", JSON.parse(storedUser || '{}'));

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []); // This effect runs once on page load
// ...

  const handleAuthSuccess = async (data: { token: string; user: UserProfile }) => {
    let { token, user } = data;
    localStorage.setItem('authToken', token);

    if (!user.player) {
      try {
        const defaultName = user.email.split('@')[0];
        const { data: newPlayer } = await authApi.post('/players', { name: defaultName });
        user = { ...user, player: newPlayer };
      } catch (error) {
        console.error("Failed to auto-create player profile:", error);
      }
    }
    
    localStorage.setItem('authUser', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const login = async (credentials: any) => {
    const { data } = await loginUser(credentials);
    await handleAuthSuccess(data);
  };

  const register = async (details: any) => {
    const { data } = await registerUser(details);
    await handleAuthSuccess(data);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, register, logout, isLoading };
  
  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};