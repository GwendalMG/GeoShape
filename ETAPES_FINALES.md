# ✅ Étapes finales pour activer le mode multijoueur

## ✅ Étape 1 : Fichier .env créé ✓

Le fichier `.env` a été créé avec vos identifiants Supabase.

---

## 🔧 Étape 2 : Créer la table dans Supabase (IMPORTANT)

Vous devez exécuter le SQL dans votre projet Supabase :

### Instructions :

1. **Allez sur votre projet Supabase :**
   - https://supabase.com/dashboard/project/oxaooajtaigkvxeixdxs

2. **Ouvrez le SQL Editor :**
   - Cliquez sur "SQL Editor" dans le menu de gauche (icône de base de données)

3. **Créez une nouvelle requête :**
   - Cliquez sur "New query"

4. **Copiez-collez ce code SQL :**

```sql
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
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public access for anonymous play)
ALTER TABLE public.game_rooms ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read rooms (needed to join)
CREATE POLICY IF NOT EXISTS "Anyone can read rooms"
ON public.game_rooms
FOR SELECT
USING (true);

-- Allow anyone to create rooms
CREATE POLICY IF NOT EXISTS "Anyone can create rooms"
ON public.game_rooms
FOR INSERT
WITH CHECK (true);

-- Allow anyone to update rooms (for game logic)
CREATE POLICY IF NOT EXISTS "Anyone can update rooms"
ON public.game_rooms
FOR UPDATE
USING (true);

-- Allow anyone to delete rooms
CREATE POLICY IF NOT EXISTS "Anyone can delete rooms"
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
```

5. **Exécutez le SQL :**
   - Cliquez sur "Run" (ou appuyez sur `Ctrl+Enter` / `Cmd+Enter`)
   - Vous devriez voir "Success. No rows returned"

6. **Vérifiez que la table existe :**
   - Allez dans "Table Editor" dans le menu de gauche
   - Vous devriez voir la table `game_rooms`

---

## 🚀 Étape 3 : Redémarrer le serveur

Une fois le SQL exécuté, redémarrez le serveur pour que les changements prennent effet :

```bash
# Arrêtez le serveur actuel (Ctrl+C)
# Puis relancez :
npm run dev
```

---

## 🎮 Étape 4 : Tester le mode multijoueur

1. **Ouvrez le jeu** : http://localhost:8080/ (ou l'adresse Network affichée)

2. **Testez la création d'une room :**
   - Cliquez sur "Mode 1v1 en ligne"
   - Cliquez sur "Créer une room"
   - Entrez un pseudo
   - Cliquez sur "Créer la room"
   - Un code devrait apparaître

3. **Si vous voyez une erreur :**
   - Ouvrez la console du navigateur (F12)
   - Vérifiez les erreurs
   - Vérifiez que le SQL a bien été exécuté

---

## 📱 Pour jouer à deux sur des appareils différents

### Sur le même WiFi :

1. **Trouvez votre IP locale :**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
   Notez l'adresse (ex: `192.168.1.21`)

2. **Joueur 1 (sur votre Mac) :**
   - http://localhost:8080/

3. **Joueur 2 (sur un autre appareil) :**
   - http://192.168.1.21:8080/ (remplacez par votre IP)

### Vérifiez le pare-feu :
- Système → Réglages → Réseau → Pare-feu
- Autorisez les connexions entrantes

---

## ✅ Checklist

- [x] Fichier .env créé avec les bonnes valeurs
- [ ] SQL exécuté dans Supabase
- [ ] Table `game_rooms` visible dans Table Editor
- [ ] Serveur redémarré
- [ ] Test de création de room réussi

---

**Une fois tout ça fait, le mode multijoueur devrait fonctionner ! 🎉**

