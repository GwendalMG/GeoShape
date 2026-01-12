import { useState, useEffect } from "react";
import { GameSetup } from "@/components/GameSetup";
import { GameBoard } from "@/components/GameBoard";
import { MultiplayerLobby } from "@/components/MultiplayerLobby";
import { MultiplayerGame } from "@/components/MultiplayerGame";
import { useMultiplayerRoom } from "@/hooks/useMultiplayerRoom";

interface GameConfig {
  players: string[];
  totalRounds: number;
}

type GameMode = "menu" | "local" | "multiplayer-lobby" | "multiplayer-game";

const Index = () => {
  const [gameMode, setGameMode] = useState<GameMode>("menu");
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  
  const {
    room,
    playerRole,
    loading,
    error,
    createRoom,
    joinRoom,
    startGame,
    submitAnswer,
    handleTimeUp,
    nextRound,
    restartGame,
    leaveRoom,
  } = useMultiplayerRoom();

  // Handle room state changes
  useEffect(() => {
    if (room && gameMode === "multiplayer-lobby") {
      if (room.status === "playing" || room.status === "finished" || room.guest_name) {
        setGameMode("multiplayer-game");
      }
    }
  }, [room, gameMode]);

  const handleStart = (players: string[], rounds: number) => {
    setGameConfig({
      players,
      totalRounds: rounds
    });
    setGameMode("local");
  };
  
  const handleRestart = () => {
    setGameConfig(null);
    setGameMode("menu");
  };

  const handleMultiplayerClick = () => {
    setGameMode("multiplayer-lobby");
  };

  const handleCreateRoom = async (hostName: string, rounds: number) => {
    const code = await createRoom(hostName, rounds);
    return code;
  };

  const handleJoinRoom = async (roomCode: string, guestName: string) => {
    const success = await joinRoom(roomCode, guestName);
    if (success) {
      setGameMode("multiplayer-game");
    }
    return success;
  };

  const handleLeaveMultiplayer = () => {
    leaveRoom();
    setGameMode("menu");
  };

  // Multiplayer game
  if (gameMode === "multiplayer-game" && room && playerRole) {
    return (
      <MultiplayerGame
        room={room}
        playerRole={playerRole}
        onSubmitAnswer={submitAnswer}
        onTimeUp={handleTimeUp}
        onNextRound={nextRound}
        onStartGame={startGame}
        onRestart={restartGame}
        onLeave={handleLeaveMultiplayer}
        loading={loading}
        error={error}
      />
    );
  }

  // Multiplayer lobby
  if (gameMode === "multiplayer-lobby") {
    return (
      <MultiplayerLobby
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
        onBack={() => setGameMode("menu")}
        loading={loading}
        error={error}
      />
    );
  }

  // Local game
  if (gameMode === "local" && gameConfig) {
    return (
      <GameBoard
        players={gameConfig.players}
        totalRounds={gameConfig.totalRounds}
        onRestart={handleRestart}
      />
    );
  }
  
  // Menu
  return (
    <GameSetup 
      onStart={handleStart} 
      onMultiplayer={handleMultiplayerClick}
    />
  );
};

export default Index;
