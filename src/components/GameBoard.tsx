import { useState, useCallback, useEffect } from "react";
import { Country, getRandomCountries, checkAnswer, countries as allCountries } from "@/data/countries";
import { PlayerCard } from "./PlayerCard";
import { CountrySilhouette } from "./CountrySilhouette";
import { Timer } from "./Timer";
import { AnswerInput } from "./AnswerInput";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Lightbulb, Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameBoardProps {
  players: string[];
  totalRounds: number;
  onRestart: () => void;
}

type GamePhase = "playing" | "revealed" | "finished" | "choosingFreezeTarget" | "choosingSabotageTarget";

interface Jokers {
  hint: number;
  freeze: number;
  sabotage: number;
}

// Random joker assignment for DIFFICILE countries (33.33% each)
function getRandomJoker(): 'FREEZE' | 'SABOTAGE' | 'HINT' {
  const rand = Math.random();
  if (rand < 0.333) return 'FREEZE';
  if (rand < 0.666) return 'SABOTAGE';
  return 'HINT';
}

// Calculate jokers based on rounds: 1 for 10, 2 for 20, 3 for rest
function getJokersCount(rounds: number): number {
  if (rounds <= 10) return 1;
  if (rounds <= 20) return 2;
  return 3;
}

// Player colors for 1-4 players
const PLAYER_COLORS = [
  { bg: "bg-player-one/20", text: "text-player-one", border: "border-player-one", glow: "glow-player-one" },
  { bg: "bg-player-two/20", text: "text-player-two", border: "border-player-two", glow: "glow-player-two" },
  { bg: "bg-green-500/20", text: "text-green-500", border: "border-green-500", glow: "glow-green-500" },
  { bg: "bg-purple-500/20", text: "text-purple-500", border: "border-purple-500", glow: "glow-purple-500" },
];

export function GameBoard({ players, totalRounds, onRestart }: GameBoardProps) {
  // Safety check
  if (!players || players.length === 0 || totalRounds <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-destructive">Erreur : Configuration invalide</div>
      </div>
    );
  }
  
  const numPlayers = players.length;
  const isSolo = numPlayers === 1;
  
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [scores, setScores] = useState<number[]>(new Array(numPlayers).fill(0));
  const [attemptsPerPlayer, setAttemptsPerPlayer] = useState<number[]>(new Array(numPlayers).fill(0)); // Nombre de fois que chaque joueur a cherché un pays
  const [phase, setPhase] = useState<GamePhase>("playing");
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [roundResults, setRoundResults] = useState<Array<{ winner: number | null }>>([]);
  const [roundStartPlayerIndex, setRoundStartPlayerIndex] = useState(0);
  // Removed playerOnFire - no green animation on score
  const [attemptsThisRound, setAttemptsThisRound] = useState(0);
  const [frozenPlayerIndex, setFrozenPlayerIndex] = useState<number | null>(null); // Player who is frozen this round
  
  // Jokers state - array for each player with hint (indice), freeze, and sabotage jokers
  // hint = joker indice (révèle la 1ère lettre), separate from initial hint jokers
  const [jokers, setJokers] = useState<Jokers[]>(() => {
    return new Array(numPlayers).fill(null).map(() => ({ hint: 0, freeze: 0, sabotage: 0 }));
  });
  
  // Initial hint jokers (given at start) - separate from hint jokers obtained from DIFFICILE countries
  const [initialHints, setInitialHints] = useState<number[]>(() => {
    if (numPlayers === 0) return [];
    const jokersCount = getJokersCount(totalRounds);
    return new Array(numPlayers).fill(jokersCount);
  });
  const [hint, setHint] = useState<string | null>(null);
  const [sabotagedPlayers, setSabotagedPlayers] = useState<Map<number, { fakeFunFact: string; saboteurName: string }>>(new Map()); // Map of player index to fake fun fact and saboteur name
  const [lastSabotageReveal, setLastSabotageReveal] = useState<{ playerIndex: number; saboteurName: string } | null>(null);
  // Removed jokerObtainedMessage - jokers are added silently
  
  // Auto-hide sabotage reveal message after 3 seconds
  useEffect(() => {
    if (lastSabotageReveal) {
      const timer = setTimeout(() => {
        setLastSabotageReveal(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastSabotageReveal]);

  // Clear sabotage reveal message when player changes
  useEffect(() => {
    setLastSabotageReveal(null);
  }, [currentPlayerIndex]);
  
  useEffect(() => {
    try {
      const randomCountries = getRandomCountries(totalRounds);
      if (randomCountries.length === 0) {
        console.error("getRandomCountries returned empty array for", totalRounds, "rounds");
        return;
      }
      setCountries(randomCountries);
      const jokersCount = getJokersCount(totalRounds);
      setJokers(new Array(numPlayers).fill(null).map(() => ({ hint: 0, freeze: 0, sabotage: 0 })));
      setInitialHints(new Array(numPlayers).fill(jokersCount));
      setCurrentPlayerIndex(0);
      setRoundStartPlayerIndex(0);
      setAttemptsThisRound(0);
      setAttemptsPerPlayer(new Array(numPlayers).fill(0)); // Réinitialiser les tentatives
      setFrozenPlayerIndex(null);
      setSabotagedPlayers(new Map());
      setLastSabotageReveal(null);
      setPhase("playing");
      setIsTimerRunning(true);
    } catch (error) {
      console.error("Error initializing game:", error);
    }
  }, [totalRounds, numPlayers]);
  
  const currentCountry = countries.length > 0 && currentRound < countries.length ? countries[currentRound] : undefined;
  
  // Helper to get next player index, skipping frozen player
  const getNextPlayerIndex = useCallback((currentIndex: number): number => {
    let nextIndex = (currentIndex + 1) % numPlayers;
    // If next player is frozen, skip to the one after
    // Keep skipping until we find a non-frozen player
    while (frozenPlayerIndex !== null && nextIndex === frozenPlayerIndex) {
      nextIndex = (nextIndex + 1) % numPlayers;
      // Prevent infinite loop if all players are frozen (shouldn't happen)
      if (nextIndex === currentIndex) break;
    }
    return nextIndex;
  }, [numPlayers, frozenPlayerIndex]);
  
  const goToNextRound = useCallback((wasCorrect: boolean) => {
    if (currentRound + 1 >= totalRounds) {
      setPhase("finished");
    } else {
      const nextRoundNum = currentRound + 1;
      setCurrentRound(nextRoundNum);
      
      // Determine next starting player: alternate based on round number
      let nextStartPlayerIndex = nextRoundNum % numPlayers;
      
      // Reset frozen state for new round
      setFrozenPlayerIndex(null);
      
      setCurrentPlayerIndex(nextStartPlayerIndex);
      setRoundStartPlayerIndex(nextStartPlayerIndex);
      setAttemptsThisRound(0);
      setPhase("playing");
      setIsTimerRunning(true);
      setFeedback(null);
      setHint(null);
    }
  }, [currentRound, totalRounds, numPlayers]);
  
  const useHintJoker = useCallback(() => {
    if (!currentCountry || phase !== "playing" || !jokers[currentPlayerIndex]) return;
    
    // Check if player has initial hint jokers or hint jokers from DIFFICILE countries
    const hasInitialHint = (initialHints && initialHints[currentPlayerIndex] > 0) || false;
    const hasHintJoker = (jokers[currentPlayerIndex] && jokers[currentPlayerIndex].hint > 0) || false;
    
    if (!hasInitialHint && !hasHintJoker) return;
    
    // Generate hint: first letter of French name
    const firstLetter = currentCountry.nameFr.charAt(0).toUpperCase();
    setHint(`Indice : La première lettre est ${firstLetter}`);
    
    // Use initial hint first, then hint joker
    if (hasInitialHint) {
      setInitialHints(prev => {
        const newHints = [...prev];
        newHints[currentPlayerIndex] = newHints[currentPlayerIndex] - 1;
        return newHints;
      });
    } else {
      setJokers(prev => {
        const newJokers = [...prev];
        newJokers[currentPlayerIndex] = { ...newJokers[currentPlayerIndex], hint: newJokers[currentPlayerIndex].hint - 1 };
        return newJokers;
      });
    }
  }, [currentCountry, currentPlayerIndex, jokers, initialHints, phase]);
  
  const useFreezeJoker = useCallback(() => {
    if (phase !== "playing" || !jokers[currentPlayerIndex] || jokers[currentPlayerIndex].freeze <= 0) return;
    
    // Show interface to choose which player to freeze
    setPhase("choosingFreezeTarget");
  }, [currentPlayerIndex, jokers, phase]);
  
  const freezePlayer = useCallback((targetPlayerIndex: number) => {
    if (targetPlayerIndex === currentPlayerIndex) return; // Can't freeze yourself
    if (!jokers[currentPlayerIndex] || jokers[currentPlayerIndex].freeze <= 0) return;
    
    // Use freeze joker
    setJokers(prev => {
      const newJokers = [...prev];
      newJokers[currentPlayerIndex] = { ...newJokers[currentPlayerIndex], freeze: newJokers[currentPlayerIndex].freeze - 1 };
      return newJokers;
    });
    
    // Freeze the target player for this round
    setFrozenPlayerIndex(targetPlayerIndex);
    setPhase("playing");
  }, [currentPlayerIndex, jokers]);
  
  const useSabotageJoker = useCallback(() => {
    if (phase !== "playing" || !jokers[currentPlayerIndex] || jokers[currentPlayerIndex].sabotage <= 0) return;
    
    // Show interface to choose which player to sabotage
    setPhase("choosingSabotageTarget");
  }, [currentPlayerIndex, jokers, phase]);
  
  const sabotagePlayer = useCallback((targetPlayerIndex: number) => {
    if (targetPlayerIndex === currentPlayerIndex) return; // Can't sabotage yourself
    if (!jokers[currentPlayerIndex] || jokers[currentPlayerIndex].sabotage <= 0) return;
    if (!currentCountry) return;
    
    // Use sabotage joker
    setJokers(prev => {
      const newJokers = [...prev];
      newJokers[currentPlayerIndex] = { ...newJokers[currentPlayerIndex], sabotage: newJokers[currentPlayerIndex].sabotage - 1 };
      return newJokers;
    });
    
    // Get a random fake fun fact from another country
    const otherCountries = allCountries.filter(c => c.id !== currentCountry.id);
    if (otherCountries.length === 0) return; // Safety check
    const randomCountry = otherCountries[Math.floor(Math.random() * otherCountries.length)];
    
    // Sabotage the target player - they'll see the fake fun fact on their NEXT turn (not same turn)
    // Only apply if target player is NOT currently playing (not same turn)
    if (targetPlayerIndex !== currentPlayerIndex) {
      setSabotagedPlayers(prev => {
        const newMap = new Map(prev);
        newMap.set(targetPlayerIndex, { 
          fakeFunFact: randomCountry.funFact, 
          saboteurName: players[currentPlayerIndex] 
        });
        return newMap;
      });
    }
    
    setPhase("playing");
  }, [currentPlayerIndex, jokers, currentCountry, players]);
  
  const handleAnswer = useCallback((answer: string) => {
    if (!currentCountry || phase !== "playing") return;
    
    // Incrémenter le compteur de tentatives pour ce joueur
    setAttemptsPerPlayer(prev => {
      const newAttempts = [...prev];
      newAttempts[currentPlayerIndex] = newAttempts[currentPlayerIndex] + 1;
      return newAttempts;
    });
    
    const isCorrect = checkAnswer(answer, currentCountry);
    setIsTimerRunning(false);
    setHint(null);
    
    // Check if player was sabotaged and reveal it
    if (sabotagedPlayers.has(currentPlayerIndex)) {
      const sabotageInfo = sabotagedPlayers.get(currentPlayerIndex)!;
      setLastSabotageReveal({ playerIndex: currentPlayerIndex, saboteurName: sabotageInfo.saboteurName });
      // Remove from sabotaged players
      setSabotagedPlayers(prev => {
        const newMap = new Map(prev);
        newMap.delete(currentPlayerIndex);
        return newMap;
      });
    }
    
    if (isCorrect) {
      setFeedback("correct");
      
      // Calculate points based on difficulty
      let pointsToAdd = 1;
      if (currentCountry.difficulty === 'TRES_FACILE' || currentCountry.difficulty === 'FACILE') {
        pointsToAdd = 1;
      } else if (currentCountry.difficulty === 'DIFFICILE') {
        pointsToAdd = 1;
      }
      
      setScores((prev) => {
        const newScores = [...prev];
        newScores[currentPlayerIndex] = newScores[currentPlayerIndex] + pointsToAdd;
        return newScores;
      });
      setRoundResults((prev) => [...prev, { winner: currentPlayerIndex }]);
      
      // No fire effect - removed as per UX requirements
      
      // If it's a DIFFICILE country, give random joker (33.33% each: FREEZE, SABOTAGE, HINT)
      if (currentCountry.difficulty === 'DIFFICILE') {
        const randomJoker = getRandomJoker();
        setJokers((prev) => {
          const newJokers = [...prev];
          if (randomJoker === 'FREEZE') {
            newJokers[currentPlayerIndex] = { ...newJokers[currentPlayerIndex], freeze: newJokers[currentPlayerIndex].freeze + 1 };
          } else if (randomJoker === 'SABOTAGE') {
            newJokers[currentPlayerIndex] = { ...newJokers[currentPlayerIndex], sabotage: newJokers[currentPlayerIndex].sabotage + 1 };
          } else {
            newJokers[currentPlayerIndex] = { ...newJokers[currentPlayerIndex], hint: newJokers[currentPlayerIndex].hint + 1 };
          }
          return newJokers;
        });
        // No message - just update the counter silently
      }
      
      setTimeout(() => {
        setPhase("revealed");
        setTimeout(() => {
          // If correct, go to next round and move to next player
          goToNextRound(true);
        }, 3000);
      }, 1000);
    } else {
      setFeedback("wrong");
      
      // Calculate points penalty based on difficulty
      let pointsToSubtract = 0;
      if (currentCountry.difficulty === 'TRES_FACILE' || currentCountry.difficulty === 'FACILE') {
        pointsToSubtract = 1;
      } else if (currentCountry.difficulty === 'DIFFICILE') {
        pointsToSubtract = 0; // No penalty for DIFFICILE
      }
      
      if (pointsToSubtract > 0) {
        setScores((prev) => {
          const newScores = [...prev];
          newScores[currentPlayerIndex] = Math.max(0, newScores[currentPlayerIndex] - pointsToSubtract);
          return newScores;
        });
      }
      
      setAttemptsThisRound(prev => prev + 1);
      
      setTimeout(() => {
        setFeedback(null);
        setHint(null);
        
        // Check if all players have tried
        if (attemptsThisRound >= numPlayers - 1) {
          // All players failed, go to next round
          setRoundResults((prev) => [...prev, { winner: null }]);
          setPhase("revealed");
          setTimeout(() => {
            goToNextRound(false);
          }, 3000);
        } else {
          // Move to next player to try the same country (skip frozen player)
          const nextPlayerIndex = getNextPlayerIndex(currentPlayerIndex);
          setCurrentPlayerIndex(nextPlayerIndex);
          setIsTimerRunning(true);
          setPhase("playing");
        }
      }, 1000);
    }
  }, [currentCountry, currentPlayerIndex, phase, numPlayers, attemptsThisRound, getNextPlayerIndex, goToNextRound, sabotagedPlayers]);
  
  const handleTimeUp = useCallback(() => {
    if (!currentCountry) return;
    
    // Incrémenter le compteur de tentatives pour ce joueur
    setAttemptsPerPlayer(prev => {
      const newAttempts = [...prev];
      newAttempts[currentPlayerIndex] = newAttempts[currentPlayerIndex] + 1;
      return newAttempts;
    });
    
    setFeedback("wrong");
    setHint(null);
    
    // Check if player was sabotaged and reveal it
    if (sabotagedPlayers.has(currentPlayerIndex)) {
      const sabotageInfo = sabotagedPlayers.get(currentPlayerIndex)!;
      setLastSabotageReveal({ playerIndex: currentPlayerIndex, saboteurName: sabotageInfo.saboteurName });
      // Remove from sabotaged players
      setSabotagedPlayers(prev => {
        const newMap = new Map(prev);
        newMap.delete(currentPlayerIndex);
        return newMap;
      });
    }
    
    // Calculate points penalty based on difficulty
    // TRES_FACILE raté: -1 point, FACILE raté: 0 point, DIFFICILE raté: 0 point
    let pointsToSubtract = 0;
    if (currentCountry.difficulty === 'TRES_FACILE') {
      pointsToSubtract = 1;
    } else if (currentCountry.difficulty === 'FACILE' || currentCountry.difficulty === 'DIFFICILE') {
      pointsToSubtract = 0; // No penalty for FACILE or DIFFICILE
    }
    
    if (pointsToSubtract > 0) {
      setScores((prev) => {
        const newScores = [...prev];
        newScores[currentPlayerIndex] = Math.max(0, newScores[currentPlayerIndex] - pointsToSubtract);
        return newScores;
      });
    }
    
    setAttemptsThisRound(prev => prev + 1);
    
    setTimeout(() => {
      setFeedback(null);
      
      // Check if all players have tried
      if (attemptsThisRound >= numPlayers - 1) {
        // All players failed, go to next round
        setRoundResults((prev) => [...prev, { winner: null }]);
        setPhase("revealed");
        setTimeout(() => {
          goToNextRound(false);
        }, 3000);
      } else {
        // Move to next player to try the same country (skip frozen player)
        const nextPlayerIndex = getNextPlayerIndex(currentPlayerIndex);
        setCurrentPlayerIndex(nextPlayerIndex);
        setIsTimerRunning(true);
        setPhase("playing");
      }
    }, 1000);
  }, [currentCountry, currentPlayerIndex, numPlayers, attemptsThisRound, getNextPlayerIndex, sabotagedPlayers]);
  
  // Check if current player is frozen and skip their turn
  useEffect(() => {
    if (phase === "playing" && frozenPlayerIndex === currentPlayerIndex && isTimerRunning) {
      // Current player is frozen, skip their turn
      setIsTimerRunning(false);
      const timeoutId = setTimeout(() => {
        const nextPlayerIndex = getNextPlayerIndex(currentPlayerIndex);
        setCurrentPlayerIndex(nextPlayerIndex);
        setIsTimerRunning(true);
        setFrozenPlayerIndex(null); // Reset freeze after skipping
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [phase, frozenPlayerIndex, currentPlayerIndex, isTimerRunning, getNextPlayerIndex]);
  
  // Safety check: ensure countries are loaded and currentCountry exists
  if (phase !== "finished") {
    if (countries.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="animate-pulse text-xl text-muted-foreground">Chargement des pays...</div>
        </div>
      );
    }
    if (!currentCountry || currentRound >= countries.length) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-xl text-destructive">Erreur : Pays introuvable (Round {currentRound + 1}/{countries.length})</div>
        </div>
      );
    }
  }
  
  if (phase === "finished") {
    const maxScore = Math.max(...scores);
    const winners = scores.map((score, index) => score === maxScore ? index : -1).filter(index => index !== -1);
    const isTie = winners.length > 1;
    
    // Score denominator: each player guesses approximately totalRounds / numPlayers countries
    const maxScorePerPlayer = Math.ceil(totalRounds / numPlayers);
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 animate-fade-in">
        <div className="text-center mb-6 md:mb-10">
          <Trophy className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto mb-4 md:mb-6 animate-float" />
          <h1 className="text-2xl md:text-4xl font-black mb-4">
            {isTie ? (
              <span className="text-gradient-gold">Égalité !</span>
            ) : (
              <>
                <span className={cn(
                  winners[0] === 0 && "text-player-one",
                  winners[0] === 1 && "text-player-two",
                  winners[0] === 2 && "text-green-500",
                  winners[0] === 3 && "text-purple-500"
                )}>
                  {players[winners[0]]}
                </span>{" "}
                <span className="text-foreground">gagne !</span>
              </>
            )}
          </h1>
        </div>
        
        <div className={cn(
          "grid gap-4 md:gap-6 w-full max-w-4xl mb-6 md:mb-10",
          numPlayers === 1 && "grid-cols-1 max-w-md",
          numPlayers === 2 && "grid-cols-1 md:grid-cols-2",
          numPlayers === 3 && "grid-cols-1 md:grid-cols-3",
          numPlayers === 4 && "grid-cols-2 md:grid-cols-4"
        )}>
          {players.map((name, index) => {
            const isWinner = winners.includes(index);
            const color = PLAYER_COLORS[index];
            return (
              <div
                key={index}
                className={cn(
                  "p-4 md:p-6 rounded-2xl border-2 card-shadow text-center",
                  isWinner ? `${color.border} ${color.glow}` : "border-border bg-card/50"
                )}
              >
                {isWinner && <div className="text-2xl mb-2">🏆</div>}
                <h3 className={cn(
                  "text-lg md:text-xl font-bold mb-2",
                  color.text
                )}>
                  {name}
                </h3>
                <div className="text-4xl md:text-5xl font-black text-gradient-gold mb-1">
                  {scores[index]}<span className="text-lg md:text-xl text-muted-foreground">/{attemptsPerPlayer[index] || 1}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex gap-4">
          <Button
            onClick={() => {
              // Rejouer: keep same players, reset everything
              setCountries(getRandomCountries(totalRounds));
              const jokersCount = getJokersCount(totalRounds);
              setJokers(new Array(numPlayers).fill(null).map(() => ({ hint: 0, freeze: 0, sabotage: 0 })));
              setInitialHints(new Array(numPlayers).fill(jokersCount));
              setScores(new Array(numPlayers).fill(0));
              setAttemptsPerPlayer(new Array(numPlayers).fill(0));
              setCurrentRound(0);
              setCurrentPlayerIndex(0);
              setRoundStartPlayerIndex(0);
              setAttemptsThisRound(0);
              setFrozenPlayerIndex(null);
              setSabotagedPlayers(new Map());
              setLastSabotageReveal(null);
              setPhase("playing");
              setIsTimerRunning(true);
              setFeedback(null);
              setHint(null);
              setRoundResults([]);
            }}
            className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl"
          >
            <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Rejouer
          </Button>
          <Button
            onClick={onRestart}
            className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-gold"
          >
            <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Nouvelle partie
          </Button>
        </div>
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
          playerNumber={(currentPlayerIndex + 1) as 1 | 2 | 3 | 4}
          key={`${currentRound}-${currentPlayerIndex}`}
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
      <div className={cn(
        "grid gap-2 md:gap-3 mb-2 flex-shrink-0",
        numPlayers === 1 && "grid-cols-1",
        numPlayers === 2 && "grid-cols-2",
        numPlayers === 3 && "grid-cols-3",
        numPlayers === 4 && "grid-cols-2 md:grid-cols-4"
      )}>
        {players.map((name, index) => {
          const initialHintCount = (initialHints && initialHints[index]) || 0;
          const hintJokerCount = (jokers[index] && jokers[index].hint) || 0;
          const freezeCount = (jokers[index] && jokers[index].freeze) || 0;
          const sabotageCount = (jokers[index] && jokers[index].sabotage) || 0;
          return (
            <PlayerCard
              key={index}
              playerNumber={(index + 1) as 1 | 2 | 3 | 4}
              name={name}
              score={scores[index] || 0}
              isActive={currentPlayerIndex === index && phase === "playing"}
              jokersLeft={initialHintCount + hintJokerCount + freezeCount + sabotageCount}
              jokersHint={initialHintCount + hintJokerCount}
              jokersFreeze={freezeCount}
              jokersSabotage={sabotageCount}
              isFrozen={frozenPlayerIndex === index}
            />
          );
        })}
      </div>
      
      {/* Country Silhouette - Compact */}
      {currentCountry && (
        <div className="flex-1 flex items-center justify-center min-h-0 mb-1 md:mb-2">
          <div className="w-full max-w-5xl flex items-center justify-center animate-scale-in h-full">
            <CountrySilhouette
              country={currentCountry}
              revealed={phase === "revealed"}
            />
          </div>
        </div>
      )}
      
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
                {/* Show fake fun fact if player is sabotaged, otherwise show real one */}
                {sabotagedPlayers.has(currentPlayerIndex) 
                  ? sabotagedPlayers.get(currentPlayerIndex)!.fakeFunFact 
                  : currentCountry.funFact}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Sabotage Reveal Message - Reduced duration to 2 seconds */}
      {lastSabotageReveal && (
        <div className="mb-2 animate-fade-in flex-shrink-0">
          <div className="bg-destructive/20 border-2 border-destructive/50 rounded-lg p-3 max-w-2xl mx-auto">
            <p className="text-sm text-destructive font-medium text-center">
              Tu as été saboté par {lastSabotageReveal.saboteurName} ! L'anecdote était fausse 😈
            </p>
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
      {phase === "playing" && currentCountry && (
        <div className="space-y-2 flex-shrink-0">
          <AnswerInput
            onSubmit={handleAnswer}
            disabled={!isTimerRunning}
            playerNumber={(currentPlayerIndex + 1) as 1 | 2 | 3 | 4}
            feedback={feedback}
            isHardCountry={currentCountry?.difficulty === 'DIFFICILE'}
          />
          
          {/* Joker Buttons */}
          <div className="flex gap-2 justify-center">
            {((initialHints && initialHints[currentPlayerIndex] > 0) || (jokers[currentPlayerIndex] && jokers[currentPlayerIndex].hint > 0)) && !hint && (
              <Button
                onClick={useHintJoker}
                variant="outline"
                size="sm"
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-200 active:scale-95 text-xs md:text-sm"
                title="Révèle la 1ère lettre du pays"
              >
                <Lightbulb className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Indice ({((initialHints && initialHints[currentPlayerIndex]) || 0) + (jokers[currentPlayerIndex]?.hint || 0)})
              </Button>
            )}
            {jokers[currentPlayerIndex] && jokers[currentPlayerIndex].freeze > 0 && (
              <Button
                onClick={useFreezeJoker}
                variant="outline"
                size="sm"
                className="border-blue-500/50 text-blue-500 hover:bg-blue-500/10 hover:border-blue-500 hover:scale-105 transition-all duration-200 active:scale-95 text-xs md:text-sm"
                title="Bloquer un adversaire pendant un tour"
              >
                <Snowflake className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Freeze ({jokers[currentPlayerIndex].freeze})
              </Button>
            )}
            {jokers[currentPlayerIndex] && jokers[currentPlayerIndex].sabotage > 0 && (
              <Button
                onClick={useSabotageJoker}
                variant="outline"
                size="sm"
                className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500 hover:scale-105 transition-all duration-200 active:scale-95 text-xs md:text-sm"
                title="Donner une fausse anecdote à un adversaire"
              >
                💣 Sabotage ({jokers[currentPlayerIndex].sabotage})
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Revealed phase - no message displayed */}
      
      {/* Freeze Target Selection */}
      {phase === "choosingFreezeTarget" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-card rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 border-2 border-primary/20">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">
              Choisir un joueur à bloquer
            </h3>
            <p className="text-muted-foreground text-sm mb-6 text-center">
              Le joueur choisi sera bloqué pendant un tour
            </p>
            <div className="space-y-3">
              {players.map((name, index) => {
                if (index === currentPlayerIndex) return null; // Can't freeze yourself
                const color = PLAYER_COLORS[index];
                return (
                  <Button
                    key={index}
                    onClick={() => freezePlayer(index)}
                    variant="outline"
                    className={cn(
                      "w-full py-4 text-left justify-start",
                      color.border,
                      "hover:" + color.border,
                      "hover:bg-" + color.bg.replace("/20", "/30")
                    )}
                  >
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center mr-3", color.bg, color.text)}>
                      {index + 1}
                    </div>
                    <span className={color.text}>{name}</span>
                  </Button>
                );
              })}
            </div>
            <Button
              onClick={() => setPhase("playing")}
              variant="ghost"
              className="w-full mt-4"
            >
              Annuler
            </Button>
          </div>
        </div>
      )}
      
      {/* Sabotage Target Selection */}
      {phase === "choosingSabotageTarget" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-card rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 border-2 border-primary/20">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">
              Choisir un joueur à saboter
            </h3>
            <p className="text-muted-foreground text-sm mb-6 text-center">
              Le joueur choisi verra une fausse anecdote lors de son prochain tour
            </p>
            <div className="space-y-3">
              {players.map((name, index) => {
                if (index === currentPlayerIndex) return null; // Can't sabotage yourself
                const color = PLAYER_COLORS[index];
                return (
                  <Button
                    key={index}
                    onClick={() => sabotagePlayer(index)}
                    variant="outline"
                    className={cn(
                      "w-full py-4 text-left justify-start",
                      color.border,
                      "hover:" + color.border,
                      "hover:bg-" + color.bg.replace("/20", "/30")
                    )}
                  >
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center mr-3", color.bg, color.text)}>
                      {index + 1}
                    </div>
                    <span className={color.text}>{name}</span>
                  </Button>
                );
              })}
            </div>
            <Button
              onClick={() => setPhase("playing")}
              variant="ghost"
              className="w-full mt-4"
            >
              Annuler
            </Button>
          </div>
        </div>
      )}
      
    </div>
  );
}
