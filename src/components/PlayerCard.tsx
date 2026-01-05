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
}

export function PlayerCard({ playerNumber, name, score, isActive, isWinner, jokersLeft, bonusScore, isOnFire = false }: PlayerCardProps) {
  const isPlayerOne = playerNumber === 1;
  
  return (
    <div
      className={cn(
        "relative p-2 md:p-4 rounded-lg md:rounded-xl border-2 transition-all duration-300 card-shadow",
        isActive && isPlayerOne && "border-player-one glow-player-one scale-[1.02] md:scale-105",
        isActive && !isPlayerOne && "border-player-two glow-player-two scale-[1.02] md:scale-105",
        !isActive && "border-border bg-card/50 opacity-60",
        isWinner && "animate-success-pop",
        isOnFire && "animate-fire-effect border-orange-500"
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
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold">
          🏆 Gagnant !
        </div>
      )}
      
      <div className="flex items-center gap-2 md:gap-3">
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