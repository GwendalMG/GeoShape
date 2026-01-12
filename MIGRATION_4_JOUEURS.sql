-- ============================================
-- MIGRATION POUR SUPPORT DE 4 JOUEURS
-- COPIEZ-COLLEZ DANS LE SQL EDITOR DE SUPABASE
-- ============================================

-- Ajouter les colonnes pour les joueurs 3 et 4
ALTER TABLE public.game_rooms 
ADD COLUMN IF NOT EXISTS player3_name TEXT,
ADD COLUMN IF NOT EXISTS player4_name TEXT,
ADD COLUMN IF NOT EXISTS player3_score INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS player4_score INTEGER NOT NULL DEFAULT 0;

-- Modifier current_turn pour supporter jusqu'à 4 joueurs
-- Supprimer l'ancienne contrainte si elle existe
ALTER TABLE public.game_rooms 
DROP CONSTRAINT IF EXISTS game_rooms_current_turn_check;

-- Ajouter la nouvelle contrainte pour supporter 4 joueurs
ALTER TABLE public.game_rooms 
ADD CONSTRAINT game_rooms_current_turn_check 
CHECK (current_turn IN ('host', 'guest', 'player3', 'player4') OR current_turn IS NULL);

-- Faire de même pour round_start_turn
ALTER TABLE public.game_rooms 
DROP CONSTRAINT IF EXISTS game_rooms_round_start_turn_check;

ALTER TABLE public.game_rooms 
ADD CONSTRAINT game_rooms_round_start_turn_check 
CHECK (round_start_turn IN ('host', 'guest', 'player3', 'player4') OR round_start_turn IS NULL);

