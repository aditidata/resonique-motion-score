import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/Index';
import EnterPage from './pages/Login';
import ProtectedRoute from './components/ProtectedRoutes';
import { Toaster as Sonner } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Sonner />
      <Routes>
        <Route path="/login" element={<EnterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<GamePage />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;