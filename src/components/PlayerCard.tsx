import { cn } from "@/lib/utils";
import { Lightbulb, Star } from "lucide-react";

interface PlayerCardProps {
  playerNumber: 1 | 2;
  name: string;
  score: number;
  isActive: boolean;
  isWinner?: boolean;
  jokersLeft?: number;
  bonusScore?: number;
  isOnFire?: boolean;
  isLeading?: boolean;
}

export function PlayerCard({ playerNumber, name, score, isActive, isWinner, jokersLeft, bonusScore, isOnFire = false, isLeading = false }: PlayerCardProps) {
  const isPlayerOne = playerNumber === 1;
  
  return (
    <div
      className={cn(
        "relative p-2 md:p-4 rounded-lg md:rounded-xl border-2 transition-all duration-300 card-shadow overflow-hidden",
        isActive && isPlayerOne && "border-player-one glow-player-one scale-[1.02] md:scale-105",
        isActive && !isPlayerOne && "border-player-two glow-player-two scale-[1.02] md:scale-105",
        !isActive && "border-border bg-card/50 opacity-60",
        isWinner && "animate-success-pop",
        isOnFire && "animate-fire-effect border-orange-500",
        isLeading && "leading-border-glow"
      )}
      style={{
        background: isOnFire
          ? undefined // Let CSS animation handle the fire background
          : isActive
          ? isPlayerOne
            ? "linear-gradient(135deg, hsl(210 100% 50% / 0.15) 0%, hsl(200 100% 40% / 0.1) 100%)"
            : "linear-gradient(135deg, hsl(340 82% 55% / 0.15) 0%, hsl(320 80% 45% / 0.1) 100%)"
          : undefined,
        animation: isOnFire 
          ? "fire-effect 0.8s ease-in-out" 
          : isActive 
          ? "pulse-glow-slow 3s ease-in-out infinite" 
          : undefined
      }}
    >
      {isWinner && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold z-10">
          🏆 Gagnant !
        </div>
      )}
      
      {/* Leading border neon glow effect - single light spot following the contour */}
      {isLeading && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ borderRadius: 'inherit', overflow: 'visible' }}>
          <defs>
            <linearGradient id={`leading-gradient-${playerNumber}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isPlayerOne ? 'hsl(210 100% 60%)' : 'hsl(340 82% 60%)'} stopOpacity="0" />
              <stop offset="45%" stopColor={isPlayerOne ? 'hsl(210 100% 60%)' : 'hsl(340 82% 60%)'} stopOpacity="0" />
              <stop offset="50%" stopColor={isPlayerOne ? 'hsl(210 100% 75%)' : 'hsl(340 82% 75%)'} stopOpacity="1" />
              <stop offset="55%" stopColor={isPlayerOne ? 'hsl(210 100% 60%)' : 'hsl(340 82% 60%)'} stopOpacity="1" />
              <stop offset="60%" stopColor={isPlayerOne ? 'hsl(210 100% 75%)' : 'hsl(340 82% 75%)'} stopOpacity="1" />
              <stop offset="65%" stopColor={isPlayerOne ? 'hsl(210 100% 60%)' : 'hsl(340 82% 60%)'} stopOpacity="0" />
              <stop offset="100%" stopColor={isPlayerOne ? 'hsl(210 100% 60%)' : 'hsl(340 82% 60%)'} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            rx="0.5rem"
            fill="none"
            stroke={`url(#leading-gradient-${playerNumber})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            className="animate-leading-border-fill"
            style={{
              filter: 'drop-shadow(0 0 6px ' + (isPlayerOne ? 'hsl(210 100% 60%)' : 'hsl(340 82% 60%)') + ')',
            }}
          />
        </svg>
      )}
      
      <div className="relative z-10 flex items-center gap-2 md:gap-3">
        <div
          className={cn(
            "w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-lg font-bold flex-shrink-0",
            isPlayerOne ? "bg-player-one/20 text-player-one" : "bg-player-two/20 text-player-two"
          )}
        >
          {playerNumber}
        </div>
        
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className={cn(
            "text-xs md:text-base font-bold truncate",
            isPlayerOne ? "text-player-one" : "text-player-two"
          )}>
            {name}
          </h3>
          <p className="text-muted-foreground text-xs hidden md:block truncate">
            {isActive ? "À ton tour !" : "En attente..."}
          </p>
          
          {/* Jokers indicator - mobile friendly */}
          {jokersLeft !== undefined && jokersLeft > 0 && (
            <div className="flex items-center gap-1 mt-0.5 animate-fade-in">
              <div className="relative">
                <Lightbulb className="w-3 h-3 text-primary" />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full"></span>
                )}
              </div>
              <span className="text-xs text-primary font-semibold">{jokersLeft}</span>
            </div>
          )}
        </div>
        
        <div className="text-right flex-shrink-0 ml-auto">
          <div 
            key={score}
            className="text-xl md:text-2xl font-black text-gradient-gold animate-score-increment whitespace-nowrap"
          >
            {score}
          </div>
          {bonusScore !== undefined && bonusScore > 0 && (
            <div className="flex items-center justify-end gap-1 text-xs text-success animate-fade-in">
              <Star className="w-3 h-3" />
              <span>+{bonusScore}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}