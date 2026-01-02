# 🌍 Geo Guess Duel

Un jeu de devinette de pays en duel ! Devinez les pays à partir de leur silhouette, découvrez leur capitale et apprenez des anecdotes fascinantes.

## 🎮 Fonctionnalités

- **Mode Local** : Jouez à deux sur le même écran
- **Mode Multijoueur** : Affrontez un ami en ligne (1v1)
- **30 secondes** par tour pour deviner
- **Capitale et anecdotes** affichées avant la devinette (pédagogique !)
- **Fuzzy matching** : Accepte les orthographes avec petites erreurs
- **Jokers** : Obtenez un indice (première lettre)
- **Design moderne** avec animations fluides

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:8080](http://localhost:8080) dans votre navigateur.

## 🎯 Comment jouer

1. Choisissez le mode (Local ou Multijoueur)
2. Entrez les noms des joueurs
3. Choisissez le nombre de rounds
4. Devinez le pays à partir de sa silhouette !
5. Chaque joueur a 30 secondes par tour
6. Le joueur avec le plus de points gagne

## 🌐 Mode Multijoueur

Le mode multijoueur nécessite une configuration Supabase. Voir `GUIDE_MULTIJOUEUR.md` pour les instructions détaillées.

### Configuration rapide

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un projet
3. Exécutez le SQL de migration (voir `supabase/migrations/`)
4. Créez un fichier `.env` avec vos clés Supabase
5. Redémarrez le serveur

## 📦 Déploiement

### Sur Vercel (Recommandé)

1. Poussez votre code sur GitHub
2. Importez le projet sur [vercel.com](https://vercel.com)
3. Ajoutez les variables d'environnement Supabase
4. Déployez !

Voir `DEPLOIEMENT_RAPIDE.md` pour plus de détails.

## 🛠️ Technologies

- **React** + **TypeScript**
- **Vite** pour le build
- **Tailwind CSS** pour le style
- **Supabase** pour le multijoueur en temps réel
- **shadcn/ui** pour les composants

## 📝 Structure du projet

```
├── src/
│   ├── components/     # Composants React
│   ├── data/          # Données des pays
│   ├── hooks/          # Hooks personnalisés
│   ├── pages/          # Pages de l'application
│   └── integrations/   # Intégrations (Supabase)
├── supabase/
│   └── migrations/     # Migrations SQL
└── public/             # Assets statiques
```

## 🎨 Améliorations récentes

- ✅ Timer augmenté à 30 secondes
- ✅ Fuzzy matching pour accepter les erreurs d'orthographe
- ✅ Affichage de la capitale et de l'anecdote avant la devinette
- ✅ Design optimisé pour éviter le scroll
- ✅ Animations améliorées et feedback visuel

## 📄 Licence

Ce projet est un projet personnel.

## 🙏 Remerciements

- Données des pays : `world-map-country-shapes`
- Composants UI : `shadcn/ui`

---

**Amusez-vous bien ! 🎉**
