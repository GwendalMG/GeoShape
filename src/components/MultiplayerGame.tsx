import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CountrySilhouette } from "@/components/CountrySilhouette";
import { PlayerCard } from "@/components/PlayerCard";
import { AnswerInput } from "@/components/AnswerInput";
import { Timer } from "@/components/Timer";
import { RotateCcw, Trophy, Crown, Wifi, Lightbulb, MapPin } from "lucide-react";
import { countries } from "@/data/countries";
import { GameRoom } from "@/hooks/useMultiplayerRoom";
import { cn } from "@/lib/utils";

interface MultiplayerGameProps {
  room: GameRoom;
  playerRole: "host" | "guest";
  onSubmitAnswer: (answer: string) => Promise<{ correct: boolean; countryName: string }>;
  onTimeUp: () => Promise<void>;
  onNextRound: () => Promise<void>;
  onStartGame: () => Promise<void>;
  onLeave: () => void;
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
  onLeave,
}: MultiplayerGameProps) {
  const [phase, setPhase] = useState<GamePhase>("waiting");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [revealedCountryName, setRevealedCountryName] = useState<string>("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Jokers
  const [jokersLeft, setJokersLeft] = useState(0);
  const [hint, setHint] = useState<string | null>(null);

  const isMyTurn = room.current_turn === playerRole;
  const currentCountry = room.current_country_index !== null ? countries[room.current_country_index] : null;

  // Initialize jokers
  useEffect(() => {
    setJokersLeft(getJokersCount(room.total_rounds));
  }, [room.total_rounds]);

  // Reset phase when round changes
  useEffect(() => {
    if (room.status === "playing" && !room.round_answered) {
      setPhase("playing");
      setFeedback(null);
      setRevealedCountryName("");
      setIsTimerRunning(true);
      setHint(null);
    } else if (room.round_answered) {
      setPhase("revealed");
      setIsTimerRunning(false);
      if (currentCountry) {
        setRevealedCountryName(currentCountry.nameFr);
      }
    }
  }, [room.current_round, room.round_answered, room.status, currentCountry]);

  const useJoker = useCallback(() => {
    if (!currentCountry || phase !== "playing" || jokersLeft <= 0 || !isMyTurn) return;
    
    const firstLetter = currentCountry.nameFr.charAt(0).toUpperCase();
    setHint(`La première lettre est : ${firstLetter}`);
    setJokersLeft(prev => prev - 1);
  }, [currentCountry, phase, jokersLeft, isMyTurn]);

  const handleAnswer = useCallback(async (answer: string) => {
    if (!isMyTurn || phase !== "playing") return;

    setIsTimerRunning(false);
    setHint(null);
    const result = await onSubmitAnswer(answer);
    setFeedback(result.correct ? "correct" : "incorrect");
    setRevealedCountryName(result.countryName);
    setPhase("revealed");

    // Auto advance after 3 seconds to see the answer
    setTimeout(() => {
      onNextRound();
    }, 3000);
  }, [isMyTurn, phase, onSubmitAnswer, onNextRound]);


  const handleTimeUp = useCallback(async () => {
    if (!isMyTurn) return;
    
    setIsTimerRunning(false);
    setHint(null);
    setFeedback("incorrect");
    if (currentCountry) {
      setRevealedCountryName(currentCountry.nameFr);
    }
    setPhase("revealed");

    // Switch turn immediately
    await onTimeUp();

    // Then advance to next round after showing the answer
    setTimeout(() => {
      onNextRound();
    }, 3000);
  }, [isMyTurn, currentCountry, onTimeUp, onNextRound]);

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
            <Button
              onClick={onStartGame}
              className="py-4 md:py-6 px-8 md:px-12 text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-gold"
            >
              Lancer la partie !
            </Button>
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
    const hostWins = room.host_score > room.guest_score;
    const guestWins = room.guest_score > room.host_score;
    const tie = room.host_score === room.guest_score;
    const iWon = (playerRole === "host" && hostWins) || (playerRole === "guest" && guestWins);
    
    // Score denominator: each player guesses half the countries
    const maxScorePerPlayer = Math.ceil(room.total_rounds / 2);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-lg animate-fade-in text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/20 mb-4 md:mb-6 animate-bounce">
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-2">
            {tie ? "Égalité !" : iWon ? "Victoire !" : "Défaite..."}
          </h2>
          <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
            {tie
              ? "Match nul, vous êtes aussi forts !"
              : iWon
              ? "Félicitations, tu as gagné !"
              : "Pas de chance, tu feras mieux la prochaine fois !"}
          </p>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 card-shadow border border-border mb-6 md:mb-8">
            <div className="flex justify-between items-center">
              <div className="text-left">
                <p className="text-xs md:text-sm text-muted-foreground">
                  {room.host_name} {hostWins && "🏆"}
                </p>
                <p className="text-3xl md:text-4xl font-black text-player-one">
                  {room.host_score}<span className="text-sm md:text-lg text-muted-foreground">/{maxScorePerPlayer}</span>
                </p>
              </div>
              <div className="text-xl md:text-2xl font-bold text-muted-foreground">-</div>
              <div className="text-right">
                <p className="text-xs md:text-sm text-muted-foreground">
                  {room.guest_name} {guestWins && "🏆"}
                </p>
                <p className="text-3xl md:text-4xl font-black text-player-two">
                  {room.guest_score}<span className="text-sm md:text-lg text-muted-foreground">/{maxScorePerPlayer}</span>
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={onLeave}
            className="py-4 md:py-6 px-8 md:px-12 text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-gold"
          >
            <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Nouvelle partie
          </Button>
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

      {/* Player Cards */}
      <div className="grid grid-cols-2 gap-2 md:gap-3 mb-2 flex-shrink-0">
        <PlayerCard
          playerNumber={1}
          name={room.host_name}
          score={room.host_score}
          isActive={room.current_turn === "host" && phase === "playing"}
          isWinner={false}
          jokersLeft={playerRole === "host" ? jokersLeft : undefined}
        />
        <PlayerCard
          playerNumber={2}
          name={room.guest_name || "Guest"}
          score={room.guest_score}
          isActive={room.current_turn === "guest" && phase === "playing"}
          isWinner={false}
          jokersLeft={playerRole === "guest" ? jokersLeft : undefined}
        />
      </div>

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

      {/* Capital and Fun Fact - shown during playing phase */}
      {phase === "playing" && currentCountry && (
        <div className="mb-1 animate-fade-in space-y-1 flex-shrink-0">
          {/* Capital Badge - Compact */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border-2 border-primary/40 rounded-lg px-3 py-1.5 animate-pulse-glow">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-bold text-xs md:text-sm text-primary">
                Capitale : <span className="text-foreground">{currentCountry.capital}</span>
              </span>
            </div>
          </div>
          
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
              C'est au tour de {room.current_turn === "host" ? room.host_name : room.guest_name}...
            </p>
          </div>
        )}

        {phase === "playing" && isMyTurn && (
          <div className="space-y-3 md:space-y-4">
            <AnswerInput
              onSubmit={handleAnswer}
              disabled={false}
              playerNumber={playerRole === "host" ? 1 : 2}
              feedback={feedback === "incorrect" ? "wrong" : feedback}
            />
            
            {/* Joker Button */}
            {jokersLeft > 0 && !hint && (
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

        {/* Revealed - just show the country name */}
        {phase === "revealed" && currentCountry && (
          <div className="text-center animate-fade-in space-y-3 md:space-y-4">
            <p className={cn(
              "text-lg md:text-xl font-bold",
              feedback === "correct" ? "text-success" : "text-destructive"
            )}>
              {feedback === "correct" ? "✓ Bonne réponse !" : "✗ Mauvaise réponse..."}
            </p>
            <p className="text-lg md:text-xl font-bold text-foreground">
              C'était : {revealedCountryName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}