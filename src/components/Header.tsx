import technicalClubLogo from '@/assets/technical-club-logo.png';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6 card-glass border-b border-border/50">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-glow-pulse">
          Resonique
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          Musical Technology Motion Challenge
        </p>
      </div>
      
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-card-hover border-2 border-primary/30 shadow-glow animate-float">
        <img 
          src={technicalClubLogo} 
          alt="Technical Club" 
          className="w-12 h-12 object-contain"
        />
      </div>
    </header>
  );
};

export default Header;