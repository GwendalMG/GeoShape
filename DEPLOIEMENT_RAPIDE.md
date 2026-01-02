# 🚀 Déploiement rapide sur Vercel (5 minutes)

Pour jouer avec quelqu'un qui n'est pas sur le même WiFi, déployez votre jeu en ligne.

## 📋 Étapes simples

### 1. Créez un compte GitHub (si vous n'en avez pas)

1. Allez sur [github.com](https://github.com)
2. Créez un compte gratuit
3. Créez un nouveau repository (ex: "geo-guess-duel")
4. Uploadez votre code :
   - Ou utilisez GitHub Desktop
   - Ou utilisez les commandes git dans le terminal

### 2. Déployez sur Vercel

1. **Allez sur [vercel.com](https://vercel.com)**
2. **Cliquez sur "Sign Up"** et connectez-vous avec GitHub
3. **Cliquez sur "Add New Project"**
4. **Importez votre repository GitHub** (celui que vous venez de créer)
5. **Configurez le projet :**
   - Framework Preset : **Vite** (détecté automatiquement)
   - Root Directory : `.` (laissez par défaut)
   - Build Command : `npm run build` (déjà configuré)
   - Output Directory : `dist` (déjà configuré)
6. **IMPORTANT : Ajoutez les variables d'environnement**
   - Cliquez sur "Environment Variables"
   - Ajoutez ces deux variables :
     
     **Variable 1 :**
     - Name : `VITE_SUPABASE_URL`
     - Value : `https://oxaooajtaigkvxeixdxs.supabase.co`
     
     **Variable 2 :**
     - Name : `VITE_SUPABASE_PUBLISHABLE_KEY`
     - Value : `sb_publishable_KqkLnaW2o7Rbrai_6Pez1w_4zNVQENP`
7. **Cliquez sur "Deploy"**
8. ⏳ Attendez 2-3 minutes
9. ✅ **Vous recevrez une URL** comme : `https://geo-guess-duel.vercel.app`

---

## 🎮 Utilisation

Une fois déployé, vous aurez une **URL permanente** que vous pouvez partager avec n'importe qui :

**Exemple :** `https://geo-guess-duel.vercel.app`

### Les deux joueurs peuvent maintenant :

1. **Ouvrir cette URL** depuis n'importe où (même pays différents !)
2. **Cliquer sur "Mode 1v1 en ligne"**
3. **L'un crée une room**, l'autre rejoint avec le code
4. **Jouer ensemble** 🎉

---

## 🔄 Mises à jour

Chaque fois que vous modifiez le code :
- Si vous avez connecté GitHub : Vercel redéploie automatiquement
- Sinon : Allez sur votre projet Vercel → "Redeploy"

---

## 💡 Alternative : ngrok (pour tester rapidement)

Si vous voulez juste tester sans déployer :

1. **Téléchargez ngrok** : [ngrok.com/download](https://ngrok.com/download)
2. **Créez un compte** (gratuit)
3. **Lancez ngrok :**
   ```bash
   ./ngrok http 8080
   ```
4. **Utilisez l'URL fournie** (ex: `https://abc123.ngrok.io`)
5. ⚠️ L'URL change à chaque fois avec le plan gratuit

---

## ✅ Résumé

**Pour un déploiement permanent :**
→ Vercel (gratuit, URL permanente, redéploiement automatique)

**Pour tester rapidement :**
→ ngrok (gratuit, URL temporaire)

**Une fois déployé, partagez simplement l'URL avec votre ami et jouez ! 🎮**

