# 🚀 Configuration Vercel pour le Mode Multijoueur

## 📋 Prérequis

Avant de configurer Vercel, assurez-vous d'avoir :
- ✅ Un compte Vercel (gratuit)
- ✅ Votre projet connecté à GitHub
- ✅ Un projet Supabase créé
- ✅ La base de données Supabase configurée (table `game_rooms` créée)

## 🔧 Étapes de Configuration

### 1️⃣ Accéder aux Variables d'Environnement dans Vercel

1. **Connectez-vous à Vercel** : [vercel.com](https://vercel.com)
2. **Sélectionnez votre projet** (GeoShape ou le nom que vous avez donné)
3. **Allez dans Settings** (en haut à droite)
4. **Cliquez sur "Environment Variables"** dans le menu de gauche

### 2️⃣ Ajouter les Variables d'Environnement

Vous devez ajouter **2 variables** pour que le multijoueur fonctionne :

#### Variable 1 : `VITE_SUPABASE_URL`

1. Cliquez sur **"Add New"**
2. **Key** : `VITE_SUPABASE_URL`
3. **Value** : Votre URL Supabase
   - Exemple : `https://oxaooajtaigkvxeixdxs.supabase.co`
   - ⚠️ Trouvez cette valeur dans votre projet Supabase → Settings → API → Project URL
4. **Environments** : Cochez les 3 cases :
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Cliquez sur **"Save"**

#### Variable 2 : `VITE_SUPABASE_PUBLISHABLE_KEY`

1. Cliquez à nouveau sur **"Add New"**
2. **Key** : `VITE_SUPABASE_PUBLISHABLE_KEY`
3. **Value** : Votre clé publique Supabase
   - Exemple : `sb_publishable_KqkLnaW2o7Rbrai_6Pez1w_4zNVQENP`
   - ⚠️ Trouvez cette valeur dans votre projet Supabase → Settings → API → Project API keys → `anon` `public`
4. **Environments** : Cochez les 3 cases :
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Cliquez sur **"Save"**

### 3️⃣ Où Trouver les Valeurs Supabase ?

#### Pour `VITE_SUPABASE_URL` :
1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous et sélectionnez votre projet
3. Allez dans **Settings** (icône d'engrenage en bas à gauche)
4. Cliquez sur **"API"** dans le menu
5. Dans la section **"Project URL"**, copiez l'URL
   - Format : `https://xxxxxxxxxxxxx.supabase.co`

#### Pour `VITE_SUPABASE_PUBLISHABLE_KEY` :
1. Dans la même page **Settings → API**
2. Dans la section **"Project API keys"**
3. Trouvez la clé **`anon` `public`**
4. Cliquez sur l'icône 👁️ pour révéler la clé
5. Copiez la clé complète

⚠️ **Important** : Utilisez la clé **`anon` `public`**, PAS la clé `service_role` (qui est secrète) !

### 4️⃣ Redéployer après Configuration

Après avoir ajouté les variables :

1. **Option A : Redéploiement automatique**
   - Si votre projet est connecté à GitHub, Vercel redéploiera automatiquement au prochain push
   - Faites un petit changement et poussez sur GitHub

2. **Option B : Redéploiement manuel**
   - Allez dans l'onglet **"Deployments"**
   - Cliquez sur les **"..."** du dernier déploiement
   - Cliquez sur **"Redeploy"**
   - ⚠️ Assurez-vous de sélectionner **"Use existing Build Cache"** si proposé

### 5️⃣ Vérifier que ça Fonctionne

1. **Attendez la fin du déploiement** (statut "Ready")
2. **Ouvrez votre site Vercel** (ex: `https://votre-projet.vercel.app`)
3. **Testez le mode multijoueur** :
   - Cliquez sur "Mode 1v1 en ligne"
   - Créez une room
   - Vérifiez que le code de room s'affiche
   - Si vous voyez une erreur, vérifiez la console du navigateur (F12)

## 🔍 Vérification des Variables

Pour vérifier que les variables sont bien configurées :

1. Dans Vercel → Settings → Environment Variables
2. Vous devriez voir :
   ```
   VITE_SUPABASE_URL                    [Production, Preview, Development]
   VITE_SUPABASE_PUBLISHABLE_KEY        [Production, Preview, Development]
   ```

## ⚠️ Problèmes Courants

### Erreur : "Supabase n'est pas configuré"
- **Cause** : Les variables d'environnement ne sont pas définies ou mal nommées
- **Solution** : Vérifiez que les noms sont exactement `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` (avec `VITE_` au début)

### Erreur : "Failed to create room"
- **Cause** : La base de données Supabase n'est pas configurée
- **Solution** : Vérifiez que la table `game_rooms` existe dans Supabase (voir `SQL_A_COPIER.sql`)

### Le site fonctionne mais le multijoueur ne marche pas
- **Cause** : Les variables ne sont pas disponibles dans le build
- **Solution** : Redéployez après avoir ajouté les variables (elles ne sont pas disponibles dans les anciens builds)

### Les variables ne s'affichent pas dans le build
- **Cause** : Les variables doivent commencer par `VITE_` pour être accessibles dans le code
- **Solution** : Vérifiez que vous avez bien `VITE_` au début des noms

## 📝 Checklist de Configuration

- [ ] Compte Vercel créé
- [ ] Projet connecté à GitHub
- [ ] Projet Supabase créé
- [ ] Table `game_rooms` créée dans Supabase
- [ ] Variable `VITE_SUPABASE_URL` ajoutée dans Vercel
- [ ] Variable `VITE_SUPABASE_PUBLISHABLE_KEY` ajoutée dans Vercel
- [ ] Variables configurées pour Production, Preview et Development
- [ ] Projet redéployé après configuration
- [ ] Mode multijoueur testé et fonctionnel

## 🎮 Test Final

Pour tester que tout fonctionne :

1. **Joueur 1** :
   - Va sur votre site Vercel
   - Clique "Mode 1v1 en ligne" → "Créer une room"
   - Entre un pseudo et crée la room
   - Copie le code de room

2. **Joueur 2** :
   - Va sur le même site Vercel (même URL)
   - Clique "Mode 1v1 en ligne" → "Rejoindre une room"
   - Entre un pseudo et le code de room
   - Rejoint la room

3. **Les deux joueurs** :
   - Devraient voir "Prêt à jouer !"
   - Le joueur 1 clique "Lancer la partie !"
   - Le jeu commence ! 🎉

---

**Une fois ces étapes suivies, le mode multijoueur devrait fonctionner en ligne ! 🌍**

