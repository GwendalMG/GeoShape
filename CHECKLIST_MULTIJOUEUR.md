# ✅ Checklist : Prêt pour Jouer en Ligne ?

## 📋 Vérifications Finales

### 1️⃣ Variables d'Environnement Vercel ✅
- [ ] `VITE_SUPABASE_URL` configurée dans Vercel
- [ ] `VITE_SUPABASE_PUBLISHABLE_KEY` configurée dans Vercel
- [ ] Variables disponibles pour Production, Preview et Development
- [ ] Projet redéployé après configuration des variables

### 2️⃣ Base de Données Supabase ⚠️ IMPORTANT
- [ ] Table `game_rooms` créée dans Supabase
- [ ] Politiques (policies) configurées pour permettre lecture/écriture

**Comment vérifier :**
1. Allez sur [supabase.com](https://supabase.com)
2. Sélectionnez votre projet
3. Allez dans **"Table Editor"** (menu de gauche)
4. Vérifiez que la table **`game_rooms`** existe

**Si la table n'existe pas :**
1. Allez dans **"SQL Editor"** (menu de gauche)
2. Ouvrez le fichier `SQL_A_COPIER.sql` de votre projet
3. Copiez tout le contenu SQL
4. Collez dans l'éditeur SQL de Supabase
5. Cliquez sur **"Run"** (ou F5)
6. Vérifiez qu'il n'y a pas d'erreur

### 3️⃣ Déploiement Vercel ✅
- [ ] Site déployé et accessible
- [ ] Build réussi (statut "Ready")
- [ ] Pas d'erreurs dans les logs de build

### 4️⃣ Test Final 🎮

**Test simple :**
1. Ouvrez votre site Vercel (ex: `https://votre-projet.vercel.app`)
2. Cliquez sur **"Mode 1v1 en ligne"**
3. Cliquez sur **"Créer une room"**
4. Entrez un pseudo et créez la room

**Si ça fonctionne :**
- ✅ Un code de room s'affiche
- ✅ Pas d'erreur dans la console (F12)
- ✅ Vous êtes prêt à jouer !

**Si ça ne fonctionne pas :**
- ❌ Vérifiez la console du navigateur (F12 → Console)
- ❌ Vérifiez que la table `game_rooms` existe dans Supabase
- ❌ Vérifiez que les variables d'environnement sont bien configurées

## 🎯 Résumé : Vous êtes Prêt Si...

✅ Variables d'environnement configurées dans Vercel  
✅ Table `game_rooms` créée dans Supabase  
✅ Projet redéployé sur Vercel  
✅ Test de création de room fonctionne  

## 🚀 Si Tout est OK

Vous pouvez maintenant :
1. **Créer une room** sur votre site Vercel
2. **Partager le code** avec un ami
3. **Jouer ensemble** en ligne !

---

**La plupart du temps, le problème vient de la table Supabase qui n'est pas créée. Vérifiez ça en premier ! 🔍**

