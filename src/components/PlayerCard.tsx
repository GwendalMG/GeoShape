import { cn } from "@/lib/utils";
import { Lightbulb, Star, Snowflake } from "lucide-react";

interface PlayerCardProps {
  playerNumber: 1 | 2 | 3 | 4;
  name: string;
  score: number;
  isActive: boolean;
  isWinner?: boolean;
  jokersLeft?: number;
  jokersHint?: number;
  jokersFreeze?: number;
  jokersSabotage?: number;
  bonusScore?: number;
  isFrozen?: boolean;
}

const PLAYER_COLORS = {
  1: { bg: "bg-player-one/20", text: "text-player-one", border: "border-player-one", glow: "glow-player-one", gradient: "linear-gradient(135deg, hsl(210 100% 50% / 0.15) 0%, hsl(200 100% 40% / 0.1) 100%)" },
  2: { bg: "bg-player-two/20", text: "text-player-two", border: "border-player-two", glow: "glow-player-two", gradient: "linear-gradient(135deg, hsl(340 82% 55% / 0.15) 0%, hsl(320 80% 45% / 0.1) 100%)" },
  3: { bg: "bg-green-500/20", text: "text-green-500", border: "border-green-500", glow: "glow-green-500", gradient: "linear-gradient(135deg, hsl(142 76% 46% / 0.15) 0%, hsl(142 76% 40% / 0.1) 100%)" },
  4: { bg: "bg-purple-500/20", text: "text-purple-500", border: "border-purple-500", glow: "glow-purple-500", gradient: "linear-gradient(135deg, hsl(270 70% 60% / 0.15) 0%, hsl(270 70% 50% / 0.1) 100%)" },
};

export function PlayerCard({ playerNumber, name, score, isActive, isWinner, jokersLeft, jokersHint, jokersFreeze, jokersSabotage, bonusScore, isFrozen = false }: PlayerCardProps) {
  const colors = PLAYER_COLORS[playerNumber];
  
  return (
    <div
      className={cn(
        "relative p-2 md:p-4 rounded-lg md:rounded-xl border-2 transition-all duration-300 card-shadow overflow-hidden",
        isActive && `${colors.border} ${colors.glow} scale-[1.02] md:scale-105`,
        !isActive && "border-border bg-card/50 opacity-60",
        isWinner && "animate-success-pop",
        isFrozen && "border-blue-500/50 bg-blue-500/10 opacity-50"
      )}
      style={{
        background: isActive ? colors.gradient : undefined,
        animation: isActive ? "pulse-glow-slow 3s ease-in-out infinite" : undefined
      }}
    >
      {isWinner && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold z-10">
          🏆 Gagnant !
        </div>
      )}
      
      <div className="relative z-10 flex items-center gap-2 md:gap-3">
        <div
          className={cn(
            "w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-lg font-bold flex-shrink-0",
            colors.bg,
            colors.text
          )}
        >
          {playerNumber}
        </div>
        
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className={cn(
            "text-xs md:text-base font-bold truncate",
            colors.text
          )}>
            {name}
          </h3>
          <p className="text-muted-foreground text-xs hidden md:block truncate">
            {isFrozen ? "❄️ Bloqué !" : isActive ? "À ton tour !" : "En attente..."}
          </p>
          
          {/* Jokers indicator - mobile friendly */}
          <div className="flex items-center gap-2 mt-0.5">
            {jokersHint !== undefined && jokersHint > 0 && (
              <div className="flex items-center gap-1 animate-fade-in">
                <div className="relative">
                  <Lightbulb className="w-3 h-3 text-primary" />
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full"></span>
                  )}
                </div>
                <span className="text-xs text-primary font-semibold">{jokersHint}</span>
              </div>
            )}
            {jokersFreeze !== undefined && jokersFreeze > 0 && (
              <div className="flex items-center gap-1 animate-fade-in">
                <Snowflake className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-blue-500 font-semibold">{jokersFreeze}</span>
              </div>
            )}
          </div>
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