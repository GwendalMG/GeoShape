# 🎮 Guide Mode Multijoueur 1v1 en ligne

## 📋 Prérequis

Le mode multijoueur nécessite une configuration **Supabase** pour fonctionner. Supabase est une base de données en temps réel qui permet aux joueurs de se connecter et jouer ensemble.

---

## 🚀 Configuration Supabase (5 minutes)

### Étape 1 : Créer un compte Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Cliquez sur **"Start your project"** ou **"Sign up"**
3. Créez un compte (gratuit) avec GitHub, Google, ou email

### Étape 2 : Créer un nouveau projet

1. Une fois connecté, cliquez sur **"New Project"**
2. Remplissez les informations :
   - **Name** : `geo-guess-duel` (ou le nom que vous voulez)
   - **Database Password** : Choisissez un mot de passe fort (⚠️ **SAVEZ-LE**)
   - **Region** : Choisissez la région la plus proche (ex: `West EU (Paris)`)
3. Cliquez sur **"Create new project"**
4. ⏳ Attendez 2-3 minutes que le projet soit créé

### Étape 3 : Récupérer les clés API

1. Dans votre projet Supabase, allez dans **Settings** (icône d'engrenage) → **API**
2. Vous verrez deux informations importantes :
   - **Project URL** : `https://xxxxx.supabase.co`
   - **anon public key** : Une longue clé qui commence par `eyJ...`

### Étape 4 : Créer le fichier `.env`

1. À la racine du projet, créez un fichier nommé `.env`
2. Ajoutez ces lignes (remplacez par vos vraies valeurs) :

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Exemple :**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Étape 5 : Créer la table dans Supabase

1. Dans Supabase, allez dans **SQL Editor** (icône de base de données dans le menu de gauche)
2. Cliquez sur **"New query"**
3. Copiez-collez ce code SQL :

```sql
-- Créer la table game_rooms
CREATE TABLE IF NOT EXISTS game_rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_code TEXT UNIQUE NOT NULL,
  host_name TEXT NOT NULL,
  guest_name TEXT,
  total_rounds INTEGER NOT NULL,
  current_round INTEGER DEFAULT 0,
  current_country_index INTEGER,
  host_score INTEGER DEFAULT 0,
  guest_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'playing', 'finished')),
  current_turn TEXT CHECK (current_turn IN ('host', 'guest')),
  country_indices INTEGER[] NOT NULL,
  round_answered BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer les realtime updates
ALTER PUBLICATION supabase_realtime ADD TABLE game_rooms;

-- Créer un index pour les recherches rapides
CREATE INDEX IF NOT EXISTS idx_room_code ON game_rooms(room_code);
CREATE INDEX IF NOT EXISTS idx_status ON game_rooms(status);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour updated_at
CREATE TRIGGER update_game_rooms_updated_at BEFORE UPDATE ON game_rooms
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

4. Cliquez sur **"Run"** (ou appuyez sur `Ctrl+Enter`)
5. Vous devriez voir "Success. No rows returned"

### Étape 6 : Activer les politiques de sécurité (Row Level Security)

1. Allez dans **Authentication** → **Policies**
2. Ou dans **SQL Editor**, exécutez :

```sql
-- Activer RLS
ALTER TABLE game_rooms ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture à tous
CREATE POLICY "Allow public read access" ON game_rooms
FOR SELECT USING (true);

-- Politique pour permettre l'insertion à tous
CREATE POLICY "Allow public insert" ON game_rooms
FOR INSERT WITH CHECK (true);

-- Politique pour permettre la mise à jour à tous
CREATE POLICY "Allow public update" ON game_rooms
FOR UPDATE USING (true);
```

---

## 🎮 Comment jouer en mode multijoueur

### Pour le Joueur 1 (Hôte) :

1. **Lancez le jeu** : `npm run dev`
2. Cliquez sur **"Mode 1v1 en ligne"**
3. Cliquez sur **"Créer une room"**
4. Entrez votre **pseudo** (ex: "Gwendal")
5. Choisissez le **nombre de pays** (10, 20, 30, etc.)
6. Cliquez sur **"Créer la room"**
7. Un **code à 6 caractères** apparaît (ex: "ABC123")
8. **Partagez ce code** avec votre ami (par SMS, Discord, etc.)

### Pour le Joueur 2 (Invité) :

1. **Lancez le jeu** sur son appareil : `npm run dev`
2. Cliquez sur **"Mode 1v1 en ligne"**
3. Cliquez sur **"Rejoindre une room"**
4. Entrez votre **pseudo** (ex: "Lola")
5. Entrez le **code de la room** que l'hôte vous a donné
6. Cliquez sur **"Rejoindre"**

### Démarrage de la partie :

- Une fois que les deux joueurs sont connectés, l'**hôte** voit un bouton **"Lancer la partie !"**
- L'hôte clique sur ce bouton pour commencer
- Les deux joueurs voient alors le même pays en même temps
- Chaque joueur joue à son tour (30 secondes chacun)
- Le premier à trouver le pays gagne le point
- La partie continue jusqu'à ce que tous les pays soient devinés

---

## 🔧 Dépannage

### Erreur "Failed to create room" ou "Failed to join room"

**Solutions :**
1. Vérifiez que votre fichier `.env` existe et contient les bonnes valeurs
2. Redémarrez le serveur : `npm run dev`
3. Vérifiez que la table `game_rooms` existe dans Supabase (SQL Editor → Tables)
4. Vérifiez que les politiques RLS sont activées

### Erreur "Room not found"

- Vérifiez que le code est correct (majuscules/minuscules)
- Vérifiez que la room n'a pas déjà commencé
- Vérifiez que la room n'est pas pleine (2 joueurs max)

### Les joueurs ne voient pas les mises à jour en temps réel

- Vérifiez que Realtime est activé dans Supabase :
  - Database → Replication
  - Vérifiez que `game_rooms` est dans la liste
- Vérifiez que les politiques RLS permettent la lecture

### Le jeu ne se connecte pas à Supabase

1. Vérifiez la console du navigateur (F12) pour voir les erreurs
2. Vérifiez que `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` sont bien définis
3. Vérifiez que l'URL commence par `https://` et se termine par `.supabase.co`

---

## 💡 Astuces

- **Test local** : Vous pouvez tester avec deux onglets du navigateur ou deux appareils sur le même réseau
- **Code de room** : Le code est valide tant que la partie n'a pas commencé
- **Abandon** : Si un joueur quitte, l'autre peut créer une nouvelle room
- **Performance** : Le mode multijoueur fonctionne mieux avec une bonne connexion internet

---

## 🎯 Résumé rapide

1. ✅ Créer un compte Supabase
2. ✅ Créer un projet
3. ✅ Récupérer URL et clé API
4. ✅ Créer fichier `.env` avec les valeurs
5. ✅ Exécuter le SQL pour créer la table
6. ✅ Activer RLS et Realtime
7. ✅ Redémarrer `npm run dev`
8. ✅ Jouer !

---

**Besoin d'aide ?** Vérifiez les logs dans la console du navigateur (F12) pour voir les erreurs détaillées.

