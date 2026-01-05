# Joker Freeze - Documentation

## ✅ Fonctionnalités implémentées

### Système de jokers à deux types

1. **Joker Indice (Hint)** :
   - Utilisé pour obtenir la première lettre du pays
   - Nombre initial basé sur le nombre de rounds (1 pour 10, 2 pour 20, 3 pour le reste)
   - Affiché avec l'icône 💡 (Lightbulb)

2. **Joker Freeze** :
   - Obtenu quand un joueur trouve un pays difficile (DIFFICILE)
   - Permet de bloquer un autre joueur pendant un tour
   - Affiché avec l'icône ❄️ (Snowflake)

### Mécanisme de blocage

1. **Utilisation du joker Freeze** :
   - Le joueur clique sur le bouton "Freeze" pendant son tour
   - Une interface modale s'affiche pour choisir quel joueur bloquer
   - Le joueur ne peut pas se bloquer lui-même
   - Le joker est consommé immédiatement

2. **Effet du blocage** :
   - Le joueur gelé est sauté automatiquement quand c'est son tour
   - Le tour passe au joueur suivant
   - Le blocage dure un seul tour (réinitialisé après avoir sauté le joueur)
   - Le joueur gelé voit "❄️ Bloqué !" sur sa carte

### Interface utilisateur

1. **PlayerCard** :
   - Affiche le nombre de jokers Hint (💡) et Freeze (❄️) séparément
   - Affiche "❄️ Bloqué !" quand le joueur est gelé
   - Bordure bleue et opacité réduite pour le joueur gelé

2. **Boutons de jokers** :
   - Bouton "Indice" (avec icône 💡) pour utiliser un joker indice
   - Bouton "Freeze" (avec icône ❄️) pour utiliser un joker freeze
   - Les deux boutons sont affichés côte à côte si disponibles

3. **Interface de sélection** :
   - Modale avec liste des joueurs disponibles
   - Affichage des numéros et noms des joueurs
   - Bouton "Annuler" pour revenir sans utiliser le joker

### Logique de jeu

1. **Obtention du joker Freeze** :
   - Quand un joueur trouve un pays avec `difficulty === 'DIFFICILE'`
   - Le joueur reçoit +1 joker Freeze (en plus du point)

2. **Gestion du tour** :
   - La fonction `getNextPlayerIndex` saute automatiquement le joueur gelé
   - Un `useEffect` détecte quand c'est le tour d'un joueur gelé et le saute
   - Le freeze est réinitialisé après avoir sauté le joueur

3. **Réinitialisation** :
   - Le freeze est réinitialisé au début de chaque nouveau round
   - Le freeze est réinitialisé après avoir sauté le joueur gelé

## 📝 Notes techniques

- Les jokers sont stockés dans un objet `{ hint: number, freeze: number }[]`
- Le `frozenPlayerIndex` est un state qui stocke l'index du joueur gelé
- La logique de skip est gérée dans `getNextPlayerIndex` et un `useEffect`
- Le freeze ne dure qu'un seul tour (réinitialisé après utilisation)

## 🎮 Utilisation

1. Trouver un pays difficile → obtenir un joker Freeze
2. Pendant son tour, cliquer sur "Freeze"
3. Choisir le joueur à bloquer dans la modale
4. Le joueur choisi sera sauté lors de son prochain tour

