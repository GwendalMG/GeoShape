# 🚀 Comment lancer le serveur de développement

## Problème détecté
Le serveur ne peut pas démarrer à cause d'un problème de permissions avec le fichier `.env`.

## Solution : Lancer manuellement dans votre terminal

### 1. Ouvrez un terminal
- Sur Mac : `Cmd + Espace` → tapez "Terminal" → Entrée
- Ou utilisez le terminal intégré de Cursor

### 2. Naviguez vers le dossier du projet
```bash
cd "/Users/gwendalmarie-gourves/Downloads/geo-guess-duel-main 2"
```

### 3. Lancez le serveur
```bash
npm run dev
```

### 4. Attendez le message de confirmation
Vous devriez voir quelque chose comme :
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
```

### 5. Ouvrez l'URL dans votre navigateur
- Cliquez sur l'URL `http://localhost:8080/` 
- Ou copiez-collez-la dans votre navigateur

## Si le port 8080 est occupé
Vite utilisera automatiquement un autre port (8081, 8082, etc.). Regardez dans le terminal l'URL exacte affichée.

## Pour arrêter le serveur
Dans le terminal, appuyez sur `Ctrl + C`

---

**Une fois le serveur lancé, vous pourrez tester le jeu en mode local ! 🎮**

