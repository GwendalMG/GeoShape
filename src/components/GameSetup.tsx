import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Users, Zap, Wifi } from "lucide-react";

interface GameSetupProps {
  onStart: (player1Name: string, player2Name: string, rounds: number) => void;
  onMultiplayer?: () => void;
}

export function GameSetup({ onStart, onMultiplayer }: GameSetupProps) {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [rounds, setRounds] = useState(10);
  
  const canStart = player1Name.trim() && player2Name.trim();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 animate-float">
            <Globe className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-black mb-3">
            <span className="text-gradient-gold">GeoShape</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Devine le pays à partir de sa silhouette !
          </p>
        </div>
        
        {/* Setup Form */}
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 card-shadow border border-border">
          <div className="flex items-center gap-2 mb-6 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Joueurs</span>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-player-one/20 flex items-center justify-center text-player-one font-bold text-sm">
                1
              </div>
              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                placeholder="Nom du Joueur 1"
                className="w-full pl-16 pr-4 py-4 bg-background border-2 border-player-one/30 rounded-xl outline-none focus:border-player-one transition-colors"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-player-two/20 flex items-center justify-center text-player-two font-bold text-sm">
                2
              </div>
              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                placeholder="Nom du Joueur 2"
                className="w-full pl-16 pr-4 py-4 bg-background border-2 border-player-two/30 rounded-xl outline-none focus:border-player-two transition-colors"
              />
            </div>
          </div>
          
          {/* Rounds Selection */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-muted-foreground">
              <Zap className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider font-medium">Nombre de pays à deviner</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {[10, 20, 30, 40, 50].map((num) => (
                <button
                  key={num}
                  onClick={() => setRounds(num)}
                  className={`flex-1 min-w-[60px] py-3 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                    rounds === num
                      ? "bg-primary text-primary-foreground glow-gold scale-105"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:border-primary/30"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          
          {/* Start Button */}
          <Button
            onClick={() => onStart(player1Name.trim(), player2Name.trim(), rounds)}
            disabled={!canStart}
            className="w-full py-6 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-gold disabled:opacity-50 disabled:glow-none transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100"
          >
            Commencer le duel local !
          </Button>
          
          {onMultiplayer && (
            <Button
              onClick={onMultiplayer}
              variant="outline"
              className="w-full py-6 text-xl font-bold rounded-xl border-2 mt-4 transition-all duration-200 hover:scale-105 active:scale-95 hover:border-primary/50"
            >
              <Wifi className="w-6 h-6 mr-3" />
              Mode 1v1 en ligne
            </Button>
          )}
        </div>
        
        <p className="text-center text-muted-foreground/60 text-xs md:text-sm mt-4 md:mt-6">
          Chaque joueur aura 30 secondes pour deviner
        </p>
      </div>
    </div>
  );
}
