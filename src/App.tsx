import { Routes, Route } from 'react-router-dom';
import { Toaster as Sonner } from '@/components/ui/sonner';
import GamePage from './pages/Index';
import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <>
      <Sonner />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<GamePage />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;