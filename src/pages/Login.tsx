import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const EnterPage = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { enterGame } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await enterGame(name);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to enter game');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Enter the Game</CardTitle>
          <CardDescription>Enter your player name to begin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Player Name" value={name} onChange={(e) => setName(e.target.value)} required />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">Play</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default EnterPage;