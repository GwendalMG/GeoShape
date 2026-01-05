-- ============================================
-- MIGRATION POUR SUPPORTER 2-4 JOUEURS
-- COPIEZ-COLLEZ DANS LE SQL EDITOR DE SUPABASE
-- ============================================

-- Ajouter les colonnes pour les joueurs 3 et 4
ALTER TABLE public.game_rooms 
ADD COLUMN IF NOT EXISTS player2_name TEXT,
ADD COLUMN IF NOT EXISTS player3_name TEXT,
ADD COLUMN IF NOT EXISTS player4_name TEXT,
ADD COLUMN IF NOT EXISTS player2_score INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS player3_score INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS player4_score INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS num_players INTEGER NOT NULL DEFAULT 2 CHECK (num_players >= 2 AND num_players <= 4);

-- Mettre à jour current_turn pour supporter 1-4 joueurs
-- On garde 'host' et 'guest' pour la compatibilité, mais on peut aussi utiliser 'player1', 'player2', 'player3', 'player4'
ALTER TABLE public.game_rooms 
ALTER COLUMN current_turn TYPE TEXT;

-- Mettre à jour les contraintes pour current_turn
DROP CONSTRAINT IF EXISTS game_rooms_current_turn_check;
ALTER TABLE public.game_rooms 
ADD CONSTRAINT game_rooms_current_turn_check 
CHECK (current_turn IN ('host', 'guest', 'player1', 'player2', 'player3', 'player4'));

-- Mettre à jour round_start_turn de la même manière
ALTER TABLE public.game_rooms 
ALTER COLUMN round_start_turn TYPE TEXT;

DROP CONSTRAINT IF EXISTS game_rooms_round_start_turn_check;
ALTER TABLE public.game_rooms 
ADD CONSTRAINT game_rooms_round_start_turn_check 
CHECK (round_start_turn IN ('host', 'guest', 'player1', 'player2', 'player3', 'player4') OR round_start_turn IS NULL);

-- Migration des données existantes : host -> player1, guest -> player2
-- (Les colonnes host_name et guest_name restent pour la compatibilité)
UPDATE public.game_rooms 
SET 
  player2_name = guest_name,
  num_players = CASE 
    WHEN guest_name IS NOT NULL THEN 2 
    ELSE 1 
  END
WHERE player2_name IS NULL;

-- Note: Pour les nouvelles parties, utilisez:
-- - host_name comme player1_name
-- - guest_name comme player2_name (ou player2_name directement)
-- - player3_name et player4_name pour les joueurs additionnels

