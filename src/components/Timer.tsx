import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TimerProps {
  duration: number;
  isRunning: boolean;
  onTimeUp: () => void;
  playerNumber: 1 | 2 | 3 | 4;
}

const PLAYER_TIMER_COLORS = {
  1: "hsl(var(--player-one))",
  2: "hsl(var(--player-two))",
  3: "hsl(142 76% 46%)",
  4: "hsl(270 70% 60%)",
};

export function Timer({ duration, isRunning, onTimeUp, playerNumber }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, isRunning]);
  
  useEffect(() => {
    if (!isRunning) return;
    
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTimeUp]);
  
  const percentage = (timeLeft / duration) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const isLow = timeLeft <= 5;
  const isWarning = timeLeft <= 10 && timeLeft > 5;
  
  // Progressive color based on urgency
  const getTimerColor = () => {
    if (isLow) return "hsl(var(--destructive))";
    if (isWarning) return "hsl(25 95% 53%)"; // Orange
    return PLAYER_TIMER_COLORS[playerNumber];
  };
  
  const getTextColor = () => {
    if (isLow) return "text-destructive";
    if (isWarning) return "text-orange-500";
    return "text-foreground";
  };
  
  return (
    <div className="relative w-20 h-20 md:w-28 md:h-28">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={getTimerColor()}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            "transition-all duration-1000 ease-linear",
            (isLow || isWarning) && "animate-pulse-glow"
          )}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "text-2xl md:text-3xl font-black transition-colors duration-300",
            getTextColor()
          )}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
