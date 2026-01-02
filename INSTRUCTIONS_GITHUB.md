# 📦 Instructions pour créer le repository GitHub

## ✅ Étape 1 : Le repo Git local est prêt

Le projet a été initialisé avec Git et le premier commit a été fait.

---

## 🔗 Étape 2 : Créer le repository sur GitHub

### Option A : Via l'interface web (Recommandé)

1. **Allez sur [github.com](https://github.com)**
2. **Connectez-vous** (ou créez un compte si nécessaire)
3. **Cliquez sur le "+" en haut à droite** → "New repository"
4. **Remplissez les informations :**
   - Repository name : `geo-guess-duel` (ou le nom que vous voulez)
   - Description : "Jeu de devinette de pays en duel"
   - Visibilité : **Public** ou **Private** (comme vous préférez)
   - ⚠️ **NE COCHEZ PAS** "Initialize this repository with a README" (le repo existe déjà)
5. **Cliquez sur "Create repository"**

### Option B : Via GitHub CLI (si installé)

```bash
gh repo create geo-guess-duel --public --source=. --remote=origin --push
```

---

## 🔗 Étape 3 : Connecter le repo local au repo GitHub

Une fois le repository créé sur GitHub, vous verrez des instructions. Exécutez ces commandes dans votre terminal :

```bash
cd "/Users/gwendalmarie-gourves/Downloads/geo-guess-duel-main 2"

# Remplacez VOTRE_USERNAME par votre nom d'utilisateur GitHub
# Remplacez geo-guess-duel par le nom de votre repo si différent
git remote add origin https://github.com/VOTRE_USERNAME/geo-guess-duel.git

# Poussez le code
git branch -M main
git push -u origin main
```

**Exemple :**
```bash
git remote add origin https://github.com/gwendal/geo-guess-duel.git
git branch -M main
git push -u origin main
```

---

## ✅ Étape 4 : Vérification

1. Allez sur votre repository GitHub
2. Vous devriez voir tous vos fichiers
3. Le fichier `.env` ne devrait **PAS** apparaître (il est dans .gitignore)

---

## 🚀 Étape 5 : Déployer sur Vercel

Maintenant que votre code est sur GitHub :

1. **Allez sur [vercel.com](https://vercel.com)**
2. **Cliquez sur "Add New Project"**
3. **Importez votre repository GitHub** (celui que vous venez de créer)
4. **Configurez :**
   - Framework : Vite (détecté automatiquement)
   - Build Command : `npm run build`
   - Output Directory : `dist`
5. **Ajoutez les variables d'environnement :**
   - `VITE_SUPABASE_URL` = `https://oxaooajtaigkvxeixdxs.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = `sb_publishable_KqkLnaW2o7Rbrai_6Pez1w_4zNVQENP`
6. **Cliquez sur "Deploy"**
7. ⏳ Attendez 2-3 minutes
8. ✅ **Vous aurez une URL permanente** comme : `https://geo-guess-duel.vercel.app`

---

## 📝 Commandes Git utiles pour plus tard

Si vous modifiez le code et voulez mettre à jour GitHub :

```bash
# Voir les changements
git status

# Ajouter les fichiers modifiés
git add .

# Faire un commit
git commit -m "Description de vos changements"

# Envoyer sur GitHub
git push
```

---

## ⚠️ Important

- Le fichier `.env` est dans `.gitignore` et ne sera **PAS** envoyé sur GitHub (c'est normal et sécurisé)
- Les variables d'environnement doivent être configurées dans Vercel
- Ne partagez jamais vos clés Supabase publiquement

---

**Une fois le repo créé sur GitHub et connecté, vous pourrez déployer sur Vercel en 2 clics ! 🚀**

