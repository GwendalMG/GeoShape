# Mode 1-4 Joueurs - Guide

## ✅ Ce qui a été implémenté

### Mode Local (1-4 joueurs) ✅
- **Mode Solo (1 joueur)** : Vous pouvez maintenant jouer seul !
- **Mode 2-4 joueurs** : Choisissez le nombre de joueurs (1, 2, 3 ou 4) dans l'écran de configuration
- **Logique de tour adaptée** : Les tours alternent automatiquement entre tous les joueurs
- **Affichage adaptatif** : Les cartes de joueurs s'adaptent au nombre de joueurs (grille 1x1, 2x1, 3x1, ou 2x2)
- **Couleurs pour tous les joueurs** :
  - Joueur 1 : Bleu (player-one)
  - Joueur 2 : Rose (player-two)
  - Joueur 3 : Vert
  - Joueur 4 : Violet

### Interface
- **GameSetup** : Sélecteur de nombre de joueurs (1-4) avec champs de saisie dynamiques
- **GameBoard** : Support complet pour 1-4 joueurs avec logique de tour adaptée
- **PlayerCard** : Support des joueurs 3 et 4 avec leurs couleurs respectives
- **Timer** : Support des couleurs pour tous les joueurs

## ⚠️ Mode Multijoueur en ligne (2-4 joueurs)

Le mode multijoueur en ligne supporte actuellement **2 joueurs uniquement** (host/guest).

Pour activer le support 2-4 joueurs en ligne, vous devez :

1. **Exécuter le script SQL** dans Supabase :
   - Ouvrez `SQL_4_JOUEURS.sql`
   - Copiez-collez le contenu dans le SQL Editor de Supabase
   - Exécutez la requête

2. **Mettre à jour le code** :
   - Le hook `useMultiplayerRoom` devra être adapté pour gérer les joueurs 3 et 4
   - `MultiplayerLobby` devra permettre de choisir le nombre de joueurs (2-4)
   - `MultiplayerGame` devra afficher jusqu'à 4 joueurs

## 🎮 Comment utiliser le mode 1-4 joueurs local

1. Lancez le jeu
2. Sur l'écran d'accueil, choisissez le nombre de joueurs (1, 2, 3 ou 4)
3. Entrez les noms des joueurs
4. Choisissez le nombre de pays à deviner
5. Cliquez sur "Commencer avec X joueurs !"

### Logique de jeu

- **Mode Solo** : Vous jouez seul, pas de tour alterné
- **Mode 2-4 joueurs** :
  - Si un joueur trouve le pays → passage au joueur suivant pour un nouveau pays
  - Si un joueur ne trouve pas → passage au joueur suivant pour essayer le même pays
  - Si tous les joueurs ont essayé et échoué → révélation de la réponse, puis passage au pays suivant

## 📝 Notes techniques

- Les couleurs des joueurs 3 et 4 sont définies dans `PlayerCard.tsx` et `index.css`
- La logique de tour utilise un index de joueur (0-3) au lieu de player1/player2
- Les scores sont stockés dans un tableau `scores[]` au lieu d'un objet `{player1, player2}`
- Les jokers sont également stockés dans un tableau `jokers[]`

