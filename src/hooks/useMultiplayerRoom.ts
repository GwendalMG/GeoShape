import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { countries } from "@/data/countries";

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
    if (!room || playerRole !== "host") return;

    try {
      await supabase
        .from("game_rooms")
        .update({
          status: "playing",
          current_round: 1,
          current_country_index: room.country_indices[0],
          current_turn: "host",
          round_answered: false,
        })
        .eq("id", room.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start game");
    }
  }, [room, playerRole]);

  const submitAnswer = useCallback(async (answer: string): Promise<{ correct: boolean; countryName: string }> => {
    if (!room || room.current_country_index === null) {
      return { correct: false, countryName: "" };
    }

    const currentCountry = countries[room.current_country_index];
    const normalizedAnswer = answer.toLowerCase().trim();
    const normalizedName = currentCountry.name.toLowerCase();
    const normalizedNameFr = currentCountry.nameFr.toLowerCase();

    const isCorrect = normalizedAnswer === normalizedName || 
                      normalizedAnswer === normalizedNameFr;

    const updates: Partial<GameRoom> = {
      round_answered: true,
    };

    if (isCorrect) {
      if (playerRole === "host") {
        updates.host_score = room.host_score + 1;
      } else {
        updates.guest_score = room.guest_score + 1;
      }
    }

    await supabase
      .from("game_rooms")
      .update(updates)
      .eq("id", room.id);

    return { correct: isCorrect, countryName: currentCountry.name };
  }, [room, playerRole]);

  const nextRound = useCallback(async () => {
    if (!room) return;

    const nextRoundNum = room.current_round + 1;

    if (nextRoundNum > room.total_rounds) {
      await supabase
        .from("game_rooms")
        .update({ status: "finished" })
        .eq("id", room.id);
    } else {
      await supabase
        .from("game_rooms")
        .update({
          current_round: nextRoundNum,
          current_country_index: room.country_indices[nextRoundNum - 1],
          current_turn: room.current_turn === "host" ? "guest" : "host",
          round_answered: false,
        })
        .eq("id", room.id);
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
    nextRound,
    leaveRoom,
  };
}
