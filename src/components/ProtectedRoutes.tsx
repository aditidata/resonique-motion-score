import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { token, isLoading } = useAuth();
  if (isLoading) return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
};
export default ProtectedRoute;