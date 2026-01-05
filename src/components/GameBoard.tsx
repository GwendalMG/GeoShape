import { useState, useCallback, useEffect } from "react";
import { Country, getRandomCountries, checkAnswer } from "@/data/countries";
import { PlayerCard } from "./PlayerCard";
import { CountrySilhouette } from "./CountrySilhouette";
import { Timer } from "./Timer";
import { AnswerInput } from "./AnswerInput";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameBoardProps {
  player1Name: string;
  player2Name: string;
  totalRounds: number;
  onRestart: () => void;
}

type GamePhase = "playing" | "revealed" | "finished";

// Calculate jokers based on rounds: 1 for 10, 2 for 20, 3 for rest
function getJokersCount(rounds: number): number {
  if (rounds <= 10) return 1;
  if (rounds <= 20) return 2;
  return 3;
}

export function GameBoard({ player1Name, player2Name, totalRounds, onRestart }: GameBoardProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [phase, setPhase] = useState<GamePhase>("playing");
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [roundResults, setRoundResults] = useState<Array<{ winner: 1 | 2 | null }>>([]);
  const [roundStartPlayer, setRoundStartPlayer] = useState<1 | 2>(1); // Track who started the round
  const [playerOnFire, setPlayerOnFire] = useState<1 | 2 | null>(null); // Track which player just scored
    
    // Jokers state
  const [jokers, setJokers] = useState({ player1: 0, player2: 0 });
  const [hint, setHint] = useState<string | null>(null);
  
  useEffect(() => {
    setCountries(getRandomCountries(totalRounds));
    const jokersCount = getJokersCount(totalRounds);
    setJokers({ player1: jokersCount, player2: jokersCount });
    // Round 0 always starts with player 1
    setCurrentPlayer(1);
    setRoundStartPlayer(1);
  }, [totalRounds]);
  
  const currentCountry = countries[currentRound];
  
  const useJoker = useCallback(() => {
    if (!currentCountry || phase !== "playing") return;
    
    const currentJokerKey = currentPlayer === 1 ? "player1" : "player2";
    if (jokers[currentJokerKey] <= 0) return;
    
    // Generate hint: first letter of French name
    const firstLetter = currentCountry.nameFr.charAt(0).toUpperCase();
    setHint(`La première lettre est : ${firstLetter}`);
    setJokers(prev => ({
      ...prev,
      [currentJokerKey]: prev[currentJokerKey] - 1
    }));
  }, [currentCountry, currentPlayer, jokers, phase]);
  
  const handleAnswer = useCallback((answer: string) => {
    if (!currentCountry || phase !== "playing") return;
    
    const isCorrect = checkAnswer(answer, currentCountry);
    setIsTimerRunning(false);
    setHint(null);
    
    if (isCorrect) {
      setFeedback("correct");
      setScores((prev) => ({
        ...prev,
        [currentPlayer === 1 ? "player1" : "player2"]: prev[currentPlayer === 1 ? "player1" : "player2"] + 1
      }));
      setRoundResults((prev) => [...prev, { winner: currentPlayer }]);
      
      // Activate fire effect for the player who scored
      setPlayerOnFire(currentPlayer);
      setTimeout(() => {
        setPlayerOnFire(null);
      }, 2000); // Fire effect lasts 2 seconds
      
      // If it's a hard country, give +1 joker
      if (currentCountry.difficulty === 'DIFFICILE') {
        const currentJokerKey = currentPlayer === 1 ? "player1" : "player2";
        setJokers((prev) => ({
          ...prev,
          [currentJokerKey]: prev[currentJokerKey] + 1
        }));
      }
      
      setTimeout(() => {
        setPhase("revealed");
        setTimeout(() => {
          // If correct, go to next round and alternate starting player
          goToNextRound(true);
        }, 3000); // 3 seconds to see the answer
      }, 1000);
    } else {
      setFeedback("wrong");
      
      setTimeout(() => {
        setFeedback(null);
        setHint(null);
        if (currentPlayer === 1) {
          // Player 1 failed, switch to player 2 to try the same country
          setCurrentPlayer(2);
          setIsTimerRunning(true);
          setPhase("playing");
        } else {
          // Player 2 failed, and player 1 already failed
          // Both players failed, go to next round
          setRoundResults((prev) => [...prev, { winner: null }]);
          setPhase("revealed");
          setTimeout(() => {
            // If both failed, go to next round and alternate starting player
            goToNextRound(false);
          }, 3000); // 3 seconds to see the answer
        }
      }, 1000);
    }
  }, [currentCountry, currentPlayer, phase]);
  
  
  const handleTimeUp = useCallback(() => {
    setFeedback("wrong");
    setHint(null);
    
    setTimeout(() => {
      setFeedback(null);
      if (currentPlayer === 1) {
        // Player 1 time up, switch to player 2 to try the same country
        setCurrentPlayer(2);
        setIsTimerRunning(true);
        setPhase("playing");
      } else {
        // Player 2 time up, and player 1 already failed
        // Both players failed, go to next round
        setRoundResults((prev) => [...prev, { winner: null }]);
        setPhase("revealed");
        setTimeout(() => {
          // If both failed, go to next round and alternate starting player
          goToNextRound(false);
        }, 3000); // 3 seconds to see the answer
      }
    }, 1000);
  }, [currentPlayer]);
  
  const goToNextRound = (wasCorrect: boolean) => {
    if (currentRound + 1 >= totalRounds) {
      setPhase("finished");
    } else {
      const nextRoundNum = currentRound + 1;
      setCurrentRound(nextRoundNum);
      
      // Determine next starting player:
      // - If someone found the country: alternate from the current starting player
      // - If both failed: alternate from the current starting player (so the other player starts)
      const nextStartPlayer: 1 | 2 = roundStartPlayer === 1 ? 2 : 1;
      setCurrentPlayer(nextStartPlayer);
      setRoundStartPlayer(nextStartPlayer);
      setPhase("playing");
      setIsTimerRunning(true);
      setFeedback(null);
      setHint(null);
    }
  };
  
  if (!currentCountry && phase !== "finished") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">Chargement...</div>
      </div>
    );
  }
  
  if (phase === "finished") {
    const winner = scores.player1 > scores.player2 ? 1 : scores.player2 > scores.player1 ? 2 : null;
    const winnerName = winner === 1 ? player1Name : winner === 2 ? player2Name : null;
    
    // Score denominator: each player guesses half the countries
    const maxScorePerPlayer = Math.ceil(totalRounds / 2);
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 animate-fade-in">
        <div className="text-center mb-6 md:mb-10">
          <Trophy className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto mb-4 md:mb-6 animate-float" />
          <h1 className="text-2xl md:text-4xl font-black mb-4">
            {winner ? (
              <>
                <span className={winner === 1 ? "text-player-one" : "text-player-two"}>
                  {winnerName}
                </span>{" "}
                <span className="text-foreground">gagne !</span>
              </>
            ) : (
              <span className="text-gradient-gold">Égalité !</span>
            )}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl mb-6 md:mb-10">
          <div className={cn(
            "p-4 md:p-6 rounded-2xl border-2 card-shadow text-center",
            winner === 1 ? "border-player-one glow-player-one" : "border-border bg-card/50"
          )}>
            {winner === 1 && <div className="text-2xl mb-2">🏆</div>}
            <h3 className="text-lg md:text-xl font-bold text-player-one mb-2">{player1Name}</h3>
            <div className="text-4xl md:text-5xl font-black text-gradient-gold mb-1">
              {scores.player1}<span className="text-lg md:text-xl text-muted-foreground">/{maxScorePerPlayer}</span>
            </div>
          </div>
          <div className={cn(
            "p-4 md:p-6 rounded-2xl border-2 card-shadow text-center",
            winner === 2 ? "border-player-two glow-player-two" : "border-border bg-card/50"
          )}>
            {winner === 2 && <div className="text-2xl mb-2">🏆</div>}
            <h3 className="text-lg md:text-xl font-bold text-player-two mb-2">{player2Name}</h3>
            <div className="text-4xl md:text-5xl font-black text-gradient-gold mb-1">
              {scores.player2}<span className="text-lg md:text-xl text-muted-foreground">/{maxScorePerPlayer}</span>
            </div>
          </div>
        </div>
        
        <Button
          onClick={onRestart}
          className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-gold"
        >
          <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          Rejouer
        </Button>
      </div>
    );
  }
  
  return (
    <div className="h-screen p-2 md:p-4 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 md:mb-3 flex-shrink-0">
        <div className="text-muted-foreground">
          <span className="text-lg md:text-xl font-bold text-foreground">{currentRound + 1}</span>
          <span className="text-xs md:text-base">/{totalRounds}</span>
        </div>
        
        <Timer
          duration={30}
          isRunning={isTimerRunning}
          onTimeUp={handleTimeUp}
          playerNumber={currentPlayer}
          key={`${currentRound}-${currentPlayer}`}
        />
        
        <Button
          variant="ghost"
          onClick={onRestart}
          className="text-muted-foreground hover:text-foreground p-1 md:p-2"
          size="sm"
        >
          <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
      </div>
      
      {/* Player Cards */}
      <div className="grid grid-cols-2 gap-2 md:gap-3 mb-2 flex-shrink-0">
        <PlayerCard
          playerNumber={1}
          name={player1Name}
          score={scores.player1}
          isActive={currentPlayer === 1 && phase === "playing"}
          jokersLeft={jokers.player1}
          isOnFire={playerOnFire === 1}
        />
        <PlayerCard
          playerNumber={2}
          name={player2Name}
          score={scores.player2}
          isActive={currentPlayer === 2 && phase === "playing"}
          jokersLeft={jokers.player2}
          isOnFire={playerOnFire === 2}
        />
      </div>
      
      {/* Country Silhouette - Compact */}
      <div className="flex-1 flex items-center justify-center min-h-0 mb-1 md:mb-2">
        <div className="w-full max-w-5xl flex items-center justify-center animate-scale-in h-full">
          <CountrySilhouette
            country={currentCountry}
            revealed={phase === "revealed"}
          />
        </div>
      </div>
      
      {/* Fun Fact - shown during playing phase */}
      {phase === "playing" && currentCountry && (
        <div className="mb-1 md:mb-2 animate-fade-in flex-shrink-0">
          {/* Fun Fact Card - Compact */}
          <div className="bg-card/90 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-3 border-2 border-primary/20 max-w-2xl mx-auto shadow-lg">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <Lightbulb className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                </div>
              </div>
              <p className="text-xs md:text-sm text-foreground leading-tight font-medium flex-1">
                {currentCountry.funFact}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Hint Display - Compact */}
      {hint && phase === "playing" && (
        <div className="text-center mb-1 animate-fade-in flex-shrink-0">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs md:text-sm">
            <Lightbulb className="w-3 h-3" />
            <span className="font-medium">{hint}</span>
          </div>
        </div>
      )}
      
      {/* Answer Input */}
      {phase === "playing" && (
        <div className="space-y-2 flex-shrink-0">
          <AnswerInput
            onSubmit={handleAnswer}
            disabled={!isTimerRunning}
            playerNumber={currentPlayer}
            feedback={feedback}
            isHardCountry={currentCountry?.difficulty === 'DIFFICILE'}
          />
          
          {/* Joker Button */}
          {jokers[currentPlayer === 1 ? "player1" : "player2"] > 0 && !hint && (
            <div className="text-center">
              <Button
                onClick={useJoker}
                variant="outline"
                size="sm"
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-200 active:scale-95 text-xs md:text-sm"
              >
                <Lightbulb className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Joker ({jokers[currentPlayer === 1 ? "player1" : "player2"]})
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Revealed - just show the country name */}
      {phase === "revealed" && (
        <div className="text-center animate-fade-in flex-shrink-0">
          <p className="text-lg md:text-xl font-bold text-success">
            C'était : {currentCountry.nameFr}
          </p>
        </div>
      )}
    </div>
  );
}