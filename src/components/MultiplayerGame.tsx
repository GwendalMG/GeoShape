import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CountrySilhouette } from "@/components/CountrySilhouette";
import { PlayerCard } from "@/components/PlayerCard";
import { AnswerInput } from "@/components/AnswerInput";
import { Timer } from "@/components/Timer";
import { RotateCcw, Trophy, Crown, Wifi, Lightbulb } from "lucide-react";
import { countries } from "@/data/countries";
import { GameRoom } from "@/hooks/useMultiplayerRoom";
import { cn } from "@/lib/utils";

interface MultiplayerGameProps {
  room: GameRoom;
  playerRole: "host" | "guest" | "player3" | "player4";
  onSubmitAnswer: (answer: string) => Promise<{ correct: boolean; countryName: string }>;
  onTimeUp: () => Promise<void>;
  onNextRound: () => Promise<void>;
  onStartGame: () => Promise<void>;
  onRestart: () => Promise<void>;
  onLeave: () => void;
  loading?: boolean;
  error?: string | null;
}

type GamePhase = "waiting" | "playing" | "revealed";

// Calculate jokers based on rounds: 1 for 10, 2 for 20, 3 for rest
function getJokersCount(rounds: number): number {
  if (rounds <= 10) return 1;
  if (rounds <= 20) return 2;
  return 3;
}

export function MultiplayerGame({
  room,
  playerRole,
  onSubmitAnswer,
  onTimeUp,
  onNextRound,
  onStartGame,
  onRestart,
  onLeave,
  loading = false,
  error = null,
}: MultiplayerGameProps) {
  const [phase, setPhase] = useState<GamePhase>("waiting");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [revealedCountryName, setRevealedCountryName] = useState<string>("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [playerOnFire, setPlayerOnFire] = useState<"host" | "guest" | null>(null); // Track which player just scored
  
  // Jokers
  const [jokersLeft, setJokersLeft] = useState(0);
  const [hint, setHint] = useState<string | null>(null);

  const isMyTurn = room.current_turn === playerRole;
  const currentCountry = room.current_country_index !== null ? countries[room.current_country_index] : null;

  // Initialize jokers
  useEffect(() => {
    setJokersLeft(getJokersCount(room.total_rounds));
  }, [room.total_rounds]);

  // Reset phase when round changes or turn switches
  useEffect(() => {
    if (room.status === "playing" && !room.round_answered) {
      // New round or turn switch, but round not finished yet
      setPhase("playing");
      // Clear feedback when it's NOT my turn (the other player's turn just started)
      // This ensures I don't see feedback from the previous player
      if (!isMyTurn) {
        setFeedback(null);
      }
      setRevealedCountryName("");
      setIsTimerRunning(isMyTurn); // Only start timer if it's my turn
      setHint(null);
    } else if (room.round_answered) {
      // Round is finished (either someone found it or both failed)
      // Clear feedback if it's NOT my turn (the other player found it)
      // Only keep feedback if I was the one who just played (it's still my turn)
      if (!isMyTurn) {
        // The other player found it or both failed, clear my feedback
        setFeedback(null);
      }
      setPhase("revealed");
      setIsTimerRunning(false);
      // Auto advance to next round after showing the answer (3 seconds, same as local mode)
      const timeoutId = setTimeout(() => {
        onNextRound();
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [room.current_round, room.round_answered, room.status, room.current_turn, isMyTurn, onNextRound]);

  const useJoker = useCallback(() => {
    if (!currentCountry || phase !== "playing" || jokersLeft <= 0 || !isMyTurn) return;
    
    const firstLetter = currentCountry.nameFr.charAt(0).toUpperCase();
    setHint(`La première lettre est : ${firstLetter}`);
    setJokersLeft(prev => prev - 1);
  }, [currentCountry, phase, jokersLeft, isMyTurn]);

  const handleAnswer = useCallback(async (answer: string) => {
    // Double-check it's my turn and round is not answered to prevent double plays
    if (!isMyTurn || phase !== "playing" || room.round_answered) return;

    setIsTimerRunning(false);
    setHint(null);
    const result = await onSubmitAnswer(answer);
    setFeedback(result.correct ? "correct" : "incorrect");
    
    if (result.correct) {
      // Activate fire effect for the player who scored
      setPlayerOnFire(playerRole);
      setTimeout(() => {
        setPlayerOnFire(null);
      }, 2000); // Fire effect lasts 2 seconds
      
      // If it's a hard country, give +1 joker
      if (currentCountry && currentCountry.difficulty === 'DIFFICILE') {
        setJokersLeft(prev => prev + 1);
      }
      
      // If correct, wait 1 second then go to revealed phase (same as local mode)
      setTimeout(() => {
        setPhase("revealed");
        // The round_answered will be set to true, triggering the useEffect
        // which will handle the next round transition after 3 seconds
      }, 1000);
    } else {
      // If wrong, show feedback briefly then clear it (same as local mode)
      // The turn will switch, triggering the useEffect to reset feedback for the other player
      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  }, [isMyTurn, phase, room.round_answered, onSubmitAnswer]);


  const handleTimeUp = useCallback(async () => {
    if (!isMyTurn) return;
    
    setIsTimerRunning(false);
    setHint(null);
    setFeedback("incorrect");

    // Switch turn immediately to let the other player try
    await onTimeUp();

    // Clear feedback after 1 second (same as local mode)
    setTimeout(() => {
      setFeedback(null);
    }, 1000);
  }, [isMyTurn, onTimeUp]);

  // Waiting for guest
  if (room.status === "waiting" && !room.guest_name) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-lg animate-fade-in text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 mb-4 md:mb-6 animate-float">
            <Wifi className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-4">En attente...</h2>
          <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
            Partage ce code avec ton adversaire
          </p>
          <div className="text-4xl md:text-5xl font-black tracking-[0.2em] md:tracking-[0.3em] text-primary mb-6 md:mb-8">
            {room.room_code}
          </div>
          <Button variant="ghost" onClick={onLeave}>
            Annuler
          </Button>
        </div>
      </div>
    );
  }

  // Waiting for host to start
  if (room.status === "waiting" && room.guest_name) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-lg animate-fade-in text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 mb-4 md:mb-6 animate-float">
            <Crown className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-4">Prêt à jouer !</h2>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 card-shadow border border-border mb-6 md:mb-8">
            <div className="flex justify-between items-center">
              <div className="text-left">
                <p className="text-xs md:text-sm text-muted-foreground">Host</p>
                <p className="text-lg md:text-xl font-bold text-player-one truncate max-w-[100px] md:max-w-none">{room.host_name}</p>
              </div>
              <div className="text-xl md:text-2xl font-black">VS</div>
              <div className="text-right">
                <p className="text-xs md:text-sm text-muted-foreground">Guest</p>
                <p className="text-lg md:text-xl font-bold text-player-two truncate max-w-[100px] md:max-w-none">{room.guest_name}</p>
              </div>
            </div>
          </div>
          {playerRole === "host" ? (
            <>
              <Button
                onClick={onStartGame}
                disabled={loading}
                className="py-4 md:py-6 px-8 md:px-12 text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-gold disabled:opacity-50"
              >
                {loading ? "Lancement..." : "Lancer la partie !"}
              </Button>
              {error && (
                <p className="text-destructive text-sm md:text-base mt-4 animate-fade-in">
                  {error}
                </p>
              )}
            </>
          ) : (
            <p className="text-muted-foreground animate-pulse text-sm md:text-base">
              En attente du lancement par l'hôte...
            </p>
          )}
        </div>
      </div>
    );
  }

  // Game finished
  if (room.status === "finished") {
    const numPlayers = 1 + (room.guest_name ? 1 : 0) + (room.player3_name ? 1 : 0) + (room.player4_name ? 1 : 0);
    const scores = [
      { role: "host" as const, name: room.host_name, score: room.host_score },
      ...(room.guest_name ? [{ role: "guest" as const, name: room.guest_name, score: room.guest_score }] : []),
      ...(room.player3_name ? [{ role: "player3" as const, name: room.player3_name, score: room.player3_score || 0 }] : []),
      ...(room.player4_name ? [{ role: "player4" as const, name: room.player4_name, score: room.player4_score || 0 }] : []),
    ];
    
    const maxScore = Math.max(...scores.map(s => s.score));
    const winners = scores.filter(s => s.score === maxScore);
    const isTie = winners.length > 1;
    const iWon = winners.some(w => w.role === playerRole);
    
    // Score denominator: each player guesses approximately total_rounds / numPlayers countries
    const maxScorePerPlayer = Math.ceil(room.total_rounds / numPlayers);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-lg animate-fade-in text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/20 mb-4 md:mb-6 animate-bounce">
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-2">
            {isTie ? "Égalité !" : iWon ? "Victoire !" : "Défaite..."}
          </h2>
          <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
            {isTie
              ? "Match nul, vous êtes aussi forts !"
              : iWon
              ? "Félicitations, tu as gagné !"
              : "Pas de chance, tu feras mieux la prochaine fois !"}
          </p>

          <div className={cn(
            "bg-card/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 card-shadow border border-border mb-6 md:mb-8",
            numPlayers === 2 && "max-w-md mx-auto",
            numPlayers === 3 && "max-w-2xl mx-auto",
            numPlayers === 4 && "max-w-4xl mx-auto"
          )}>
            <div className={cn(
              "grid gap-4 md:gap-6",
              numPlayers === 2 && "grid-cols-2",
              numPlayers === 3 && "grid-cols-3",
              numPlayers === 4 && "grid-cols-2 md:grid-cols-4"
            )}>
              {scores.map((player, index) => {
                const isWinner = winners.some(w => w.role === player.role);
                const playerColors = [
                  { text: "text-player-one", bg: "bg-player-one/10" },
                  { text: "text-player-two", bg: "bg-player-two/10" },
                  { text: "text-green-500", bg: "bg-green-500/10" },
                  { text: "text-purple-500", bg: "bg-purple-500/10" },
                ];
                const color = playerColors[index] || playerColors[0];
                
                return (
                  <div key={player.role} className={cn("text-center", color.bg, "p-4 rounded-xl")}>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">
                      {player.name} {isWinner && "🏆"}
                    </p>
                    <p className={cn("text-3xl md:text-4xl font-black", color.text)}>
                      {player.score}<span className="text-sm md:text-lg text-muted-foreground">/{maxScorePerPlayer}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={onRestart}
              disabled={loading}
              className="py-4 md:py-6 px-8 md:px-12 text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-gold disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Rejouer
            </Button>
            <Button
              onClick={onLeave}
              variant="outline"
              className="py-4 md:py-6 px-8 md:px-12 text-lg md:text-xl font-bold border-2 hover:bg-muted"
            >
              Quitter
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div className="h-screen flex flex-col p-2 md:p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <div className="text-sm md:text-base font-medium text-muted-foreground">
          Pays {room.current_round} / {room.total_rounds}
        </div>
        <Button variant="ghost" size="sm" onClick={onLeave} className="text-xs md:text-sm">
          <RotateCcw className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
          Quitter
        </Button>
      </div>

      {/* Player Cards - Support up to 4 players */}
      {(() => {
        const numPlayers = 1 + (room.guest_name ? 1 : 0) + (room.player3_name ? 1 : 0) + (room.player4_name ? 1 : 0);
        const players = [
          { role: "host" as const, name: room.host_name, score: room.host_score, number: 1 },
          ...(room.guest_name ? [{ role: "guest" as const, name: room.guest_name, score: room.guest_score, number: 2 }] : []),
          ...(room.player3_name ? [{ role: "player3" as const, name: room.player3_name, score: room.player3_score || 0, number: 3 }] : []),
          ...(room.player4_name ? [{ role: "player4" as const, name: room.player4_name, score: room.player4_score || 0, number: 4 }] : []),
        ];

        return (
          <div className={cn(
            "grid gap-2 md:gap-3 mb-2 flex-shrink-0",
            numPlayers === 2 && "grid-cols-2",
            numPlayers === 3 && "grid-cols-3",
            numPlayers === 4 && "grid-cols-2 md:grid-cols-4"
          )}>
            {players.map((player) => (
              <PlayerCard
                key={player.role}
                playerNumber={player.number as 1 | 2 | 3 | 4}
                name={player.name}
                score={player.score}
                isActive={room.current_turn === player.role && phase === "playing"}
                isWinner={false}
                jokersLeft={playerRole === player.role ? jokersLeft : undefined}
                isOnFire={playerOnFire === player.role}
              />
            ))}
          </div>
        );
      })()}

      {/* Timer */}
      {phase === "playing" && isMyTurn && (
        <div className="flex justify-center mb-3 md:mb-4">
          <Timer
            duration={30}
            isRunning={isTimerRunning}
            onTimeUp={handleTimeUp}
            playerNumber={playerRole === "host" ? 1 : 2}
          />
        </div>
      )}

      {/* Silhouette */}
      <div className="flex-1 flex items-center justify-center min-h-0 mb-1">
        <div className="w-full max-w-5xl h-full">
          <CountrySilhouette
            country={currentCountry || countries[0]}
            revealed={phase === "revealed"}
          />
        </div>
      </div>

      {/* Fun Fact - shown during playing phase */}
      {phase === "playing" && currentCountry && (
        <div className="mb-1 animate-fade-in flex-shrink-0">
          {/* Fun Fact Card - Compact */}
          <div className="bg-card/90 backdrop-blur-sm rounded-lg p-2 md:p-3 border-2 border-primary/20 max-w-2xl mx-auto shadow-lg">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Lightbulb className="w-3 h-3 text-primary" />
                </div>
              </div>
              <p className="text-xs md:text-sm text-foreground leading-tight font-medium flex-1">
                {currentCountry.funFact}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hint Display */}
      {hint && phase === "playing" && isMyTurn && (
        <div className="text-center mb-1 animate-fade-in flex-shrink-0">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs md:text-sm">
            <Lightbulb className="w-3 h-3" />
            <span className="font-medium">{hint}</span>
          </div>
        </div>
      )}

      {/* Turn indicator / Answer Input */}
      <div className="mt-2 flex-shrink-0">
        {phase === "playing" && !isMyTurn && (
          <div className="text-center py-6 md:py-8">
            <p className="text-lg md:text-xl text-muted-foreground animate-pulse">
              C'est au tour de {
                room.current_turn === "host" ? room.host_name :
                room.current_turn === "guest" ? room.guest_name :
                room.current_turn === "player3" ? room.player3_name :
                room.current_turn === "player4" ? room.player4_name :
                "..."
              }...
            </p>
          </div>
        )}

        {/* Answer Input - shown in both playing and revealed phases to display feedback (same as local mode) */}
        {((phase === "playing" && isMyTurn) || (phase === "revealed" && feedback)) && (
          <div className="space-y-3 md:space-y-4">
            <AnswerInput
              onSubmit={handleAnswer}
              disabled={phase === "revealed" || !isMyTurn}
              playerNumber={
                playerRole === "host" ? 1 :
                playerRole === "guest" ? 2 :
                playerRole === "player3" ? 3 :
                4
              }
              feedback={feedback === "incorrect" ? "wrong" : feedback}
              isHardCountry={currentCountry?.difficulty === 'DIFFICILE'}
            />
            
            {/* Joker Button - only shown during playing phase */}
            {phase === "playing" && isMyTurn && jokersLeft > 0 && !hint && (
              <div className="text-center">
                <Button
                  onClick={useJoker}
                  variant="outline"
                  size="sm"
                  className="border-primary/50 text-primary hover:bg-primary/10 text-xs md:text-sm"
                >
                  <Lightbulb className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Joker ({jokersLeft})
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}