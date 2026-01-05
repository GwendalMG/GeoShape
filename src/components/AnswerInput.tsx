import { useState, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  disabled: boolean;
  playerNumber: 1 | 2;
  feedback?: "correct" | "wrong" | null;
  isHardCountry?: boolean;
}

export function AnswerInput({ onSubmit, disabled, playerNumber, feedback, isHardCountry = false }: AnswerInputProps) {
  const [value, setValue] = useState("");
  const isPlayerOne = playerNumber === 1;
  
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
            isPlayerOne
              ? "border-player-one/50 focus:border-player-one focus:glow-player-one"
              : "border-player-two/50 focus:border-player-two focus:glow-player-two",
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
            isPlayerOne
              ? "bg-player-one text-white hover:bg-player-one/80 hover:shadow-lg hover:shadow-player-one/50"
              : "bg-player-two text-white hover:bg-player-two/80 hover:shadow-lg hover:shadow-player-two/50"
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
                    🏆 Excellent ! Pays difficile trouvé ! 🏆
                  </>
                ) : (
                  "Bonne réponse !"
                )}
              </span>
            ) : (
              <span>Mauvaise réponse...</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
