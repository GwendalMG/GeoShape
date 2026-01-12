-- ============================================
-- MIGRATION POUR AJOUTER MAX_PLAYERS
-- COPIEZ-COLLEZ DANS LE SQL EDITOR DE SUPABASE
-- ============================================

-- Ajouter la colonne max_players pour limiter le nombre de joueurs (2, 3 ou 4)
ALTER TABLE public.game_rooms 
ADD COLUMN IF NOT EXISTS max_players INTEGER NOT NULL DEFAULT 2;

-- Ajouter une contrainte pour s'assurer que max_players est entre 2 et 4
ALTER TABLE public.game_rooms 
DROP CONSTRAINT IF EXISTS game_rooms_max_players_check;

ALTER TABLE public.game_rooms 
ADD CONSTRAINT game_rooms_max_players_check 
CHECK (max_players >= 2 AND max_players <= 4);

