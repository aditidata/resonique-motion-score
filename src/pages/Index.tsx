import Header from '@/components/Header';
import GameArea from '@/components/GameArea';
import Leaderboard from '@/components/Leaderboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-6">
        <div className="flex gap-6 h-full">
          {/* Main Game Area - 70% width */}
          <div className="flex-[7] min-h-0">
            <GameArea />
          </div>
          
          {/* Leaderboard - 30% width */}
          <div className="flex-[3] min-h-0">
            <Leaderboard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;