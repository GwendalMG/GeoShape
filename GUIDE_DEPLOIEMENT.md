# 🚀 Guide de déploiement en ligne (Vercel)

Pour jouer avec quelqu'un qui n'est pas sur le même WiFi, vous devez déployer l'application en ligne.

## Option 1 : Déploiement sur Vercel (Recommandé - Gratuit)

### Méthode 1 : Via l'interface web (Le plus simple)

1. **Allez sur [vercel.com](https://vercel.com)**
2. **Créez un compte** (gratuit) avec GitHub
3. **Cliquez sur "Add New Project"**
4. **Importez votre projet :**
   - Si votre code est sur GitHub : connectez votre repo
   - Sinon : créez un repo GitHub d'abord
5. **Configurez le projet :**
   - Framework Preset : **Vite**
   - Root Directory : `.` (racine)
   - Build Command : `npm run build`
   - Output Directory : `dist`
6. **Ajoutez les variables d'environnement :**
   - Cliquez sur "Environment Variables"
   - Ajoutez :
     - `VITE_SUPABASE_URL` = `https://oxaooajtaigkvxeixdxs.supabase.co`
     - `VITE_SUPABASE_PUBLISHABLE_KEY` = `sb_publishable_KqkLnaW2o7Rbrai_6Pez1w_4zNVQENP`
7. **Cliquez sur "Deploy"**
8. ⏳ Attendez 2-3 minutes
9. ✅ Vous recevrez une URL comme : `https://votre-projet.vercel.app`

### Méthode 2 : Via la ligne de commande

1. **Installez Vercel CLI :**
   ```bash
   npm i -g vercel
   ```

2. **Connectez-vous :**
   ```bash
   vercel login
   ```

3. **Déployez :**
   ```bash
   cd "/Users/gwendalmarie-gourves/Downloads/geo-guess-duel-main 2"
   vercel
   ```
   - Suivez les instructions
   - Quand on vous demande les variables d'environnement, ajoutez :
     - `VITE_SUPABASE_URL` = `https://oxaooajtaigkvxeixdxs.supabase.co`
     - `VITE_SUPABASE_PUBLISHABLE_KEY` = `sb_publishable_KqkLnaW2o7Rbrai_6Pez1w_4zNVQENP`

4. **Pour déployer en production :**
   ```bash
   vercel --prod
   ```

---

## Option 2 : Déploiement sur Netlify (Alternative gratuite)

1. **Allez sur [netlify.com](https://netlify.com)**
2. **Créez un compte** (gratuit)
3. **Cliquez sur "Add new site" → "Import an existing project"**
4. **Connectez votre repo GitHub** ou déployez depuis un dossier
5. **Configurez :**
   - Build command : `npm run build`
   - Publish directory : `dist`
6. **Ajoutez les variables d'environnement** dans Site settings → Environment variables
7. **Déployez !**

---

## Option 3 : Utiliser ngrok (Temporaire, pour tester)

Si vous voulez juste tester rapidement sans déployer :

1. **Installez ngrok :**
   - Téléchargez sur [ngrok.com](https://ngrok.com)
   - Créez un compte gratuit

2. **Lancez ngrok :**
   ```bash
   ngrok http 8080
   ```

3. **Utilisez l'URL fournie :**
   - ngrok vous donne une URL comme : `https://abc123.ngrok.io`
   - Partagez cette URL avec votre ami
   - ⚠️ L'URL change à chaque fois avec le plan gratuit

---

## ✅ Après le déploiement

Une fois déployé, vous aurez une URL permanente comme :
- `https://geo-guess-duel.vercel.app`

**Les deux joueurs peuvent maintenant :**
1. Ouvrir cette URL depuis n'importe où
2. Jouer ensemble sans être sur le même WiFi
3. Partager l'URL avec qui ils veulent

---

## 🎯 Recommandation

**Pour un déploiement permanent et gratuit :**
→ Utilisez **Vercel** (Option 1, Méthode 1 via l'interface web)

C'est le plus simple et vous aurez une URL permanente que vous pourrez partager avec n'importe qui !

