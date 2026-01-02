# 🎮 Guide de démarrage - Geo Guess Duel

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** (version 18 ou supérieure) - [Télécharger ici](https://nodejs.org/)
- **npm** (généralement inclus avec Node.js)

Pour vérifier que vous avez Node.js installé :
```bash
node --version
npm --version
```

## 🚀 Installation et lancement

### Étape 1 : Installer les dépendances

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
npm install
```

Cette commande va installer toutes les dépendances nécessaires (React, Vite, Tailwind CSS, etc.).

### Étape 2 : Lancer le serveur de développement

Une fois les dépendances installées, lancez le serveur de développement :

```bash
npm run dev
```

Vous devriez voir un message comme :
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Étape 3 : Ouvrir le jeu dans votre navigateur

Ouvrez votre navigateur et allez à l'adresse affichée (généralement `http://localhost:5173/`)

## 🎯 Modes de jeu

### Mode Local (Solo)
- **Fonctionne sans configuration supplémentaire**
- Deux joueurs jouent sur le même écran
- Chaque joueur a 30 secondes pour deviner le pays
- Le joueur qui trouve le pays gagne le point
- À la fin, le joueur avec le plus de points gagne

### Mode Multijoueur (en ligne)
- **Nécessite une configuration Supabase**
- Permet de jouer avec un ami à distance
- Un joueur crée une salle et partage un code
- L'autre joueur rejoint avec le code

## ⚙️ Configuration Supabase (optionnel - pour le multijoueur)

Si vous voulez utiliser le mode multijoueur, vous devez configurer Supabase :

1. **Créer un compte Supabase** : [https://supabase.com](https://supabase.com)

2. **Créer un nouveau projet** dans Supabase

3. **Créer un fichier `.env`** à la racine du projet avec :
   ```
   VITE_SUPABASE_URL=votre_url_supabase
   VITE_SUPABASE_PUBLISHABLE_KEY=votre_clé_publique
   ```

4. **Exécuter les migrations** :
   - Les migrations SQL sont dans le dossier `supabase/migrations/`
   - Vous pouvez les exécuter depuis l'interface Supabase (SQL Editor)

**Note** : Le mode local fonctionne parfaitement sans Supabase ! Vous pouvez jouer en solo sans aucune configuration supplémentaire.

## 🎮 Comment jouer

1. **Choisir le mode de jeu** :
   - **Local** : Pour jouer à deux sur le même écran
   - **Multijoueur** : Pour jouer en ligne (nécessite Supabase)

2. **Configurer la partie** :
   - Entrer les noms des joueurs
   - Choisir le nombre de rounds (10, 20, 30, etc.)

3. **Jouer** :
   - Une silhouette de pays s'affiche
   - Vous avez 30 secondes pour deviner
   - Tapez le nom du pays (en français ou en anglais)
   - Le système accepte les petites erreurs d'orthographe
   - Utilisez les jokers pour obtenir un indice (première lettre)

4. **Découvrir** :
   - Quand le pays est révélé, vous voyez :
     - Le nom du pays
     - La capitale
     - Une anecdote intéressante sur le pays

5. **Gagner** :
   - Le joueur avec le plus de points à la fin gagne !

## 🛠️ Commandes utiles

```bash
# Lancer le serveur de développement
npm run dev

# Créer une version de production
npm run build

# Prévisualiser la version de production
npm run preview

# Vérifier le code (linting)
npm run lint
```

## ❓ Problèmes courants

### "Cannot find module" ou erreurs d'import
→ Exécutez `npm install` pour installer les dépendances

### Le serveur ne démarre pas
→ Vérifiez que le port 5173 n'est pas déjà utilisé
→ Essayez de tuer le processus : `lsof -ti:5173 | xargs kill -9`

### Erreurs Supabase en mode multijoueur
→ Vérifiez que votre fichier `.env` est correctement configuré
→ Assurez-vous que les migrations ont été exécutées

## 🎉 Amusez-vous bien !

Le jeu est maintenant prêt ! Profitez de votre partie de Geo Guess Duel ! 🌍

