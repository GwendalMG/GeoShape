import { useState, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  disabled: boolean;
  playerNumber: 1 | 2 | 3 | 4;
  feedback?: "correct" | "wrong" | null;
  isHardCountry?: boolean;
}

const PLAYER_INPUT_COLORS = {
  1: { border: "border-player-one/50", focusBorder: "border-player-one", focusGlow: "focus:glow-player-one", bg: "bg-player-one", hoverBg: "hover:bg-player-one/80", hoverShadow: "hover:shadow-player-one/50" },
  2: { border: "border-player-two/50", focusBorder: "border-player-two", focusGlow: "focus:glow-player-two", bg: "bg-player-two", hoverBg: "hover:bg-player-two/80", hoverShadow: "hover:shadow-player-two/50" },
  3: { border: "border-green-500/50", focusBorder: "border-green-500", focusGlow: "focus:glow-green-500", bg: "bg-green-500", hoverBg: "hover:bg-green-500/80", hoverShadow: "hover:shadow-green-500/50" },
  4: { border: "border-purple-500/50", focusBorder: "border-purple-500", focusGlow: "focus:glow-purple-500", bg: "bg-purple-500", hoverBg: "hover:bg-purple-500/80", hoverShadow: "hover:shadow-purple-500/50" },
};

export function AnswerInput({ onSubmit, disabled, playerNumber, feedback, isHardCountry = false }: AnswerInputProps) {
  const [value, setValue] = useState("");
  const colors = PLAYER_INPUT_COLORS[playerNumber];
  
  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSubmit(value.trim());
      setValue("");
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={cn(
          "relative rounded-xl overflow-hidden transition-all duration-300",
          feedback === "correct" && "animate-success-pop",
          feedback === "wrong" && "animate-shake"
        )}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Quel est ce pays ?"
          className={cn(
            "w-full px-4 py-2 md:px-6 md:py-3 text-base md:text-lg bg-card border-2 rounded-xl outline-none transition-all",
            "placeholder:text-muted-foreground",
            colors.border,
            playerNumber === 1 && "focus:border-player-one focus:glow-player-one",
            playerNumber === 2 && "focus:border-player-two focus:glow-player-two",
            playerNumber === 3 && "focus:border-green-500 focus:glow-green-500",
            playerNumber === 4 && "focus:border-purple-500 focus:glow-purple-500",
            feedback === "correct" && "border-success bg-success/10",
            feedback === "wrong" && "border-destructive bg-destructive/10",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
        
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 md:px-5 md:py-2 rounded-lg font-bold transition-all duration-200 text-sm md:text-base",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "hover:scale-105 active:scale-95",
            colors.bg,
            "text-white",
            colors.hoverBg,
            "hover:shadow-lg",
            colors.hoverShadow
          )}
        >
          Valider
        </button>
      </div>
      
      {feedback && (
        <div className="text-center mt-3 animate-fade-in">
          <p
            className={cn(
              "font-bold text-lg md:text-xl transition-all duration-300",
              feedback === "correct" 
                ? "text-success animate-success-pop" 
                : "text-destructive animate-shake"
            )}
          >
            {feedback === "correct" ? (
              <span>
                {isHardCountry ? (
                  <>
                    🏆 Bravo ! Pays difficile ! +1 point 🎉
                  </>
                ) : (
                  "Bonne réponse !"
                )}
              </span>
            ) : (
              <span>Raté ! -1 point 😅</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
