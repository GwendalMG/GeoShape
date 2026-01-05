import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Zap, Wifi } from "lucide-react";

interface GameSetupProps {
  onStart: (players: string[], rounds: number) => void;
  onMultiplayer?: () => void;
}

const PLAYER_COLORS = [
  { bg: "bg-player-one/20", text: "text-player-one", border: "border-player-one" },
  { bg: "bg-player-two/20", text: "text-player-two", border: "border-player-two" },
  { bg: "bg-green-500/20", text: "text-green-500", border: "border-green-500" },
  { bg: "bg-purple-500/20", text: "text-purple-500", border: "border-purple-500" },
];

export function GameSetup({ onStart, onMultiplayer }: GameSetupProps) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(["", "", "", ""]);
  const [rounds, setRounds] = useState(10);
  
  const canStart = playerNames.slice(0, numPlayers).every(name => name.trim());
  
  const handlePlayerNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };
  
  const handleStart = () => {
    onStart(playerNames.slice(0, numPlayers).map(name => name.trim()), rounds);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black mb-3">
            <span className="text-foreground">Geo</span>
            <span className="text-gradient-gold">Shape</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Devine le pays à partir de sa silhouette !
          </p>
        </div>
        
        {/* Setup Form */}
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 card-shadow border border-border">
          <div className="flex items-center gap-2 mb-6 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Nombre de joueurs</span>
          </div>
          
          {/* Number of players selector */}
          <div className="flex gap-3 mb-6">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setNumPlayers(num)}
                className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                  numPlayers === num
                    ? "bg-primary text-primary-foreground glow-gold scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:border-primary/30"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Joueurs</span>
          </div>
          
          <div className="space-y-4 mb-8">
            {Array.from({ length: numPlayers }).map((_, index) => {
              const color = PLAYER_COLORS[index];
              return (
                <div key={index} className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${color.bg} flex items-center justify-center ${color.text} font-bold text-sm`}>
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={playerNames[index]}
                    onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                    placeholder={`Nom du Joueur ${index + 1}`}
                    className={`w-full pl-16 pr-4 py-4 bg-background border-2 ${color.border}/30 rounded-xl outline-none focus:${color.border} transition-colors`}
                  />
                </div>
              );
            })}
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
            onClick={handleStart}
            disabled={!canStart}
            className="w-full py-6 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-gold disabled:opacity-50 disabled:glow-none transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100"
          >
            {numPlayers === 1 ? "Commencer la partie solo !" : `Commencer avec ${numPlayers} joueurs !`}
          </Button>
          
          {onMultiplayer && (
            <Button
              onClick={onMultiplayer}
              variant="outline"
              className="w-full py-6 text-xl font-bold rounded-xl border-2 mt-4 transition-all duration-200 hover:scale-105 active:scale-95 hover:border-primary/50"
            >
              <Wifi className="w-6 h-6 mr-3" />
              Mode multijoueur en ligne (2-4 joueurs)
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
