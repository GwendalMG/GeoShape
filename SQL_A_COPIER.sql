-- ============================================
-- COPIEZ-COLLEZ TOUT CE QUI EST CI-DESSOUS
-- DANS LE SQL EDITOR DE SUPABASE
-- ============================================

-- Create game_rooms table for multiplayer rooms
CREATE TABLE IF NOT EXISTS public.game_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_code TEXT NOT NULL UNIQUE,
  host_name TEXT NOT NULL,
  guest_name TEXT,
  total_rounds INTEGER NOT NULL DEFAULT 10,
  current_round INTEGER NOT NULL DEFAULT 0,
  current_country_index INTEGER,
  host_score INTEGER NOT NULL DEFAULT 0,
  guest_score INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'playing', 'finished')),
  current_turn TEXT CHECK (current_turn IN ('host', 'guest')),
  country_indices INTEGER[] NOT NULL DEFAULT '{}',
  round_answered BOOLEAN NOT NULL DEFAULT false,
  round_start_turn TEXT CHECK (round_start_turn IN ('host', 'guest')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public access for anonymous play)
ALTER TABLE public.game_rooms ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read rooms (needed to join)
DROP POLICY IF EXISTS "Anyone can read rooms" ON public.game_rooms;
CREATE POLICY "Anyone can read rooms"
ON public.game_rooms
FOR SELECT
USING (true);

-- Allow anyone to create rooms
DROP POLICY IF EXISTS "Anyone can create rooms" ON public.game_rooms;
CREATE POLICY "Anyone can create rooms"
ON public.game_rooms
FOR INSERT
WITH CHECK (true);

-- Allow anyone to update rooms (for game logic)
DROP POLICY IF EXISTS "Anyone can update rooms" ON public.game_rooms;
CREATE POLICY "Anyone can update rooms"
ON public.game_rooms
FOR UPDATE
USING (true);

-- Allow anyone to delete rooms
DROP POLICY IF EXISTS "Anyone can delete rooms" ON public.game_rooms;
CREATE POLICY "Anyone can delete rooms"
ON public.game_rooms
FOR DELETE
USING (true);

-- Enable realtime for game_rooms table
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_rooms;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_game_rooms_updated_at ON public.game_rooms;
CREATE TRIGGER update_game_rooms_updated_at
BEFORE UPDATE ON public.game_rooms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

