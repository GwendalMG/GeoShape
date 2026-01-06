import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { countries, checkAnswer } from "@/data/countries";

export interface GameRoom {
  id: string;
  room_code: string;
  host_name: string;
  guest_name: string | null;
  total_rounds: number;
  current_round: number;
  current_country_index: number | null;
  host_score: number;
  guest_score: number;
  status: "waiting" | "playing" | "finished";
  current_turn: "host" | "guest" | null;
  country_indices: number[];
  round_answered: boolean;
  round_start_turn: "host" | "guest" | null; // Track who started the current round
  created_at: string;
  updated_at: string;
}

interface UseMultiplayerRoomReturn {
  room: GameRoom | null;
  isHost: boolean;
  playerRole: "host" | "guest" | null;
  loading: boolean;
  error: string | null;
  createRoom: (hostName: string, totalRounds: number) => Promise<string | null>;
  joinRoom: (roomCode: string, guestName: string) => Promise<boolean>;
  startGame: () => Promise<void>;
  submitAnswer: (answer: string) => Promise<{ correct: boolean; countryName: string }>;
  handleTimeUp: () => Promise<void>;
  nextRound: () => Promise<void>;
  leaveRoom: () => void;
}

function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function useMultiplayerRoom(): UseMultiplayerRoomReturn {
  const [room, setRoom] = useState<GameRoom | null>(null);
  const [playerRole, setPlayerRole] = useState<"host" | "guest" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to room changes
  useEffect(() => {
    if (!room?.id) return;

    const channel = supabase
      .channel(`room-${room.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "game_rooms",
          filter: `id=eq.${room.id}`,
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            setRoom(null);
            setPlayerRole(null);
          } else {
            const newRoom = payload.new as GameRoom;
            setRoom(newRoom);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [room?.id]);

  const createRoom = useCallback(async (hostName: string, totalRounds: number): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
        setError("Supabase n'est pas configuré. Vérifiez les variables d'environnement.");
        return null;
      }

      const roomCode = generateRoomCode();
      const countryIndices = shuffleArray(
        Array.from({ length: countries.length }, (_, i) => i)
      ).slice(0, totalRounds);

      const { data, error: insertError } = await supabase
        .from("game_rooms")
        .insert({
          room_code: roomCode,
          host_name: hostName,
          total_rounds: totalRounds,
          country_indices: countryIndices,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setRoom(data as GameRoom);
      setPlayerRole("host");
      return roomCode;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create room");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const joinRoom = useCallback(async (roomCode: string, guestName: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
        setError("Supabase n'est pas configuré. Vérifiez les variables d'environnement.");
        return false;
      }

      // Find the room
      const { data: existingRoom, error: findError } = await supabase
        .from("game_rooms")
        .select()
        .eq("room_code", roomCode.toUpperCase())
        .eq("status", "waiting")
        .single();

      if (findError || !existingRoom) {
        setError("Room not found or game already started");
        return false;
      }

      if (existingRoom.guest_name) {
        setError("Room is full");
        return false;
      }

      // Join the room
      const { data, error: updateError } = await supabase
        .from("game_rooms")
        .update({ guest_name: guestName })
        .eq("id", existingRoom.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setRoom(data as GameRoom);
      setPlayerRole("guest");
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join room");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const startGame = useCallback(async () => {
    if (!room || playerRole !== "host") {
      setError("Vous devez être l'hôte pour lancer la partie");
      return;
    }

    if (!room.guest_name) {
      setError("Un adversaire doit rejoindre la room avant de lancer la partie");
      return;
    }

    if (!room.country_indices || room.country_indices.length === 0) {
      setError("Erreur: Aucun pays n'a été sélectionné pour cette partie");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Update room to start the game
      // Try to set round_start_turn, but handle gracefully if column doesn't exist
      const updatePayload: any = {
        status: "playing",
        current_round: 1,
        current_country_index: room.country_indices[0],
        current_turn: "host", // Always start with host
        round_answered: false,
        round_start_turn: "host", // Track that host started round 1
      };

      const { data, error: updateError } = await supabase
        .from("game_rooms")
        .update(updatePayload)
        .eq("id", room.id)
        .select()
        .single();

      if (updateError) {
        // If error is about round_start_turn column not existing, retry without it
        if (updateError.message?.includes("round_start_turn") || updateError.code === "PGRST116") {
          const { data: retryData, error: retryError } = await supabase
            .from("game_rooms")
            .update({
              status: "playing",
              current_round: 1,
              current_country_index: room.country_indices[0],
              current_turn: "host",
              round_answered: false,
            })
            .eq("id", room.id)
            .select()
            .single();

          if (retryError) {
            throw retryError;
          }

          if (retryData) {
            setRoom(retryData as GameRoom);
            return;
          }
        } else {
          throw updateError;
        }
      }

      if (data) {
        setRoom(data as GameRoom);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to start game";
      setError(errorMessage);
      console.error("Error starting game:", err);
    } finally {
      setLoading(false);
    }
  }, [room, playerRole]);

  const submitAnswer = useCallback(async (answer: string): Promise<{ correct: boolean; countryName: string }> => {
    if (!room || room.current_country_index === null) {
      return { correct: false, countryName: "" };
    }

    // Verify it's actually this player's turn to prevent double plays
    const isMyTurn = room.current_turn === playerRole;
    if (!isMyTurn) {
      console.warn("Attempted to submit answer when it's not my turn");
      return { correct: false, countryName: "" };
    }

    // Verify round is not already answered
    if (room.round_answered) {
      console.warn("Attempted to submit answer when round is already answered");
      return { correct: false, countryName: "" };
    }

    const currentCountry = countries[room.current_country_index];
    // Use the same checkAnswer function that includes fuzzy matching
    const isCorrect = checkAnswer(answer, currentCountry);

    const updates: Partial<GameRoom> = {};

    if (isCorrect) {
      // If correct, mark round as answered and give point
      // Don't switch turn - we'll go to next round directly
      updates.round_answered = true;
      if (playerRole === "host") {
        updates.host_score = room.host_score + 1;
      } else {
        updates.guest_score = room.guest_score + 1;
      }
    } else {
      // If wrong, apply penalty based on difficulty
      // ONLY TRES_FACILE incurs penalty (-1 point)
      // FACILE and DIFFICILE have NO penalty (0 point) - do nothing
      if (currentCountry && currentCountry.difficulty === 'TRES_FACILE') {
        if (playerRole === "host") {
          updates.host_score = Math.max(0, room.host_score - 1);
        } else {
          updates.guest_score = Math.max(0, room.guest_score - 1);
        }
      }
      // For FACILE and DIFFICILE: no penalty, score remains unchanged
      // If wrong, switch turn to let the other player try
      // This allows the other player to try the same country
      const nextTurn = room.current_turn === "host" ? "guest" : "host";
      updates.current_turn = nextTurn;
      
      // Check if both players have tried
      // Round 1 starts with host, round 2 with guest, etc.
      // If we're switching back to the player who should have started this round, both have tried
      const expectedRoundStart = room.current_round % 2 === 1 ? "host" : "guest";
      const roundStartTurn = room.round_start_turn || expectedRoundStart;
      
      if (nextTurn === roundStartTurn) {
        // We're switching back to the starting player, meaning both have tried and both failed
        updates.round_answered = true; // Mark as answered so we can move to next round
      }
      // Otherwise, the other player still needs to try
      // So don't mark as answered yet
    }

    await supabase
      .from("game_rooms")
      .update(updates)
      .eq("id", room.id);

    return { correct: isCorrect, countryName: currentCountry.name };
  }, [room, playerRole]);

  const handleTimeUp = useCallback(async () => {
    if (!room || room.current_country_index === null) return;

    // Apply penalty based on difficulty when time is up
    // ONLY TRES_FACILE incurs penalty (-1 point)
    // FACILE and DIFFICILE have NO penalty (0 point) - do nothing
    const currentCountry = countries[room.current_country_index];
    const updates: Partial<GameRoom> = {};
    
    if (currentCountry && currentCountry.difficulty === 'TRES_FACILE') {
      if (room.current_turn === "host") {
        updates.host_score = Math.max(0, room.host_score - 1);
      } else {
        updates.guest_score = Math.max(0, room.guest_score - 1);
      }
    }
    // For FACILE and DIFFICILE: no penalty, score remains unchanged

    // Switch turn immediately when time is up
    const nextTurn = room.current_turn === "host" ? "guest" : "host";

    // Check if both players have tried (similar logic to submitAnswer)
    // Rounds always start with host, so:
    // - If host's time is up → switch to guest (guest can try)
    // - If guest's time is up → switch back to host (both have tried, end round)
    updates.current_turn = nextTurn; // Switch turn immediately

    // Check if both players have tried
    // Round 1 starts with host, round 2 with guest, etc.
    // If we're switching back to the player who should have started this round, both have tried
    const expectedRoundStart = room.current_round % 2 === 1 ? "host" : "guest";
    const roundStartTurn = room.round_start_turn || expectedRoundStart;
    
    if (nextTurn === roundStartTurn) {
      // We're switching back to the starting player, meaning both have tried and both failed
      updates.round_answered = true; // Mark as answered so we can move to next round
    }
    // Otherwise, the other player still needs to try
    // So don't mark as answered yet

    await supabase
      .from("game_rooms")
      .update(updates)
      .eq("id", room.id);
  }, [room]);

  const nextRound = useCallback(async () => {
    if (!room) return;

    const nextRoundNum = room.current_round + 1;

    if (nextRoundNum > room.total_rounds) {
      await supabase
        .from("game_rooms")
        .update({ status: "finished" })
        .eq("id", room.id);
    } else {
      // Alternate starting player based on who started the previous round
      // If previous round started with host, next round starts with guest, and vice versa
      // This ensures strict alternation regardless of who found the country or who failed
      const previousRoundStart = room.round_start_turn || (room.current_round % 2 === 1 ? "host" : "guest");
      const nextTurn: "host" | "guest" = previousRoundStart === "host" ? "guest" : "host";
      
      // Build update payload - try to include round_start_turn
      const updatePayload: any = {
        current_round: nextRoundNum,
        current_country_index: room.country_indices[nextRoundNum - 1],
        current_turn: nextTurn, // Alternate starting player
        round_answered: false,
        round_start_turn: nextTurn, // Track who starts this round
      };
      
      const { error: updateError } = await supabase
        .from("game_rooms")
        .update(updatePayload)
        .eq("id", room.id);

      // If error is about round_start_turn, retry without it
      if (updateError && (updateError.message?.includes("round_start_turn") || updateError.code === "PGRST116")) {
        delete updatePayload.round_start_turn;
        await supabase
          .from("game_rooms")
          .update(updatePayload)
          .eq("id", room.id);
      }
    }
  }, [room]);

  const leaveRoom = useCallback(() => {
    setRoom(null);
    setPlayerRole(null);
    setError(null);
  }, []);

  return {
    room,
    isHost: playerRole === "host",
    playerRole,
    loading,
    error,
    createRoom,
    joinRoom,
    startGame,
    submitAnswer,
    handleTimeUp,
    nextRound,
    leaveRoom,
  };
}
