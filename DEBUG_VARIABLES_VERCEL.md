# 🔍 Debug : Erreur "Supabase n'est pas configuré"

## ❌ Problème

Vous voyez l'erreur : **"Supabase n'est pas configuré. Vérifiez les variables d'environnement."**

Cela signifie que les variables d'environnement ne sont pas accessibles dans votre build Vercel.

## 🔧 Solutions par Étapes

### Étape 1 : Vérifier les Variables dans Vercel

1. **Allez sur Vercel** : [vercel.com](https://vercel.com)
2. **Sélectionnez votre projet**
3. **Settings** → **Environment Variables**
4. **Vérifiez que vous avez exactement** :
   - `VITE_SUPABASE_URL` (avec `VITE_` au début !)
   - `VITE_SUPABASE_PUBLISHABLE_KEY` (avec `VITE_` au début !)

⚠️ **Important** : Les noms doivent commencer par `VITE_` pour être accessibles dans le code !

### Étape 2 : Vérifier les Valeurs

**Pour `VITE_SUPABASE_URL` :**
- Doit ressembler à : `https://xxxxxxxxxxxxx.supabase.co`
- ⚠️ Pas d'espace avant/après
- ⚠️ Commence par `https://`

**Pour `VITE_SUPABASE_PUBLISHABLE_KEY` :**
- Doit ressembler à : `sb_publishable_xxxxxxxxxxxxx` ou `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- ⚠️ Pas d'espace avant/après
- ⚠️ C'est la clé `anon` `public`, PAS la `service_role`

### Étape 3 : Vérifier les Environnements

Assurez-vous que les variables sont activées pour :
- ✅ **Production**
- ✅ **Preview**
- ✅ **Development**

### Étape 4 : Redéployer OBLIGATOIREMENT

**Les variables ne sont disponibles que dans les NOUVEAUX builds !**

1. **Allez dans "Deployments"**
2. **Cliquez sur les "..."** du dernier déploiement
3. **Cliquez sur "Redeploy"**
4. **⚠️ IMPORTANT** : Décochez "Use existing Build Cache" si cette option apparaît
5. **Attendez** que le build se termine

### Étape 5 : Vérifier dans les Logs de Build

1. **Allez dans "Deployments"**
2. **Cliquez sur le dernier déploiement**
3. **Cliquez sur "Build Logs"**
4. **Cherchez** des erreurs ou des warnings

## 🧪 Test de Débogage

Pour vérifier si les variables sont bien chargées, vous pouvez temporairement ajouter ce code dans votre console navigateur (F12) :

```javascript
console.log('URL:', import.meta.env.VITE_SUPABASE_URL');
console.log('KEY:', import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
```

**Si vous voyez `undefined`** → Les variables ne sont pas chargées

## ✅ Checklist Complète

- [ ] Variables nommées exactement `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY`
- [ ] Variables activées pour Production, Preview ET Development
- [ ] Valeurs copiées sans espaces avant/après
- [ ] Projet redéployé APRÈS avoir ajouté les variables
- [ ] Build terminé avec succès (statut "Ready")
- [ ] Testé après le redéploiement

## 🔄 Si Ça Ne Fonctionne Toujours Pas

### Option 1 : Supprimer et Recréer les Variables

1. **Supprimez** les variables existantes dans Vercel
2. **Recréez-les** une par une
3. **Redéployez**

### Option 2 : Vérifier le Format des Valeurs

**URL Supabase :**
- ✅ Correct : `https://oxaooajtaigkvxeixdxs.supabase.co`
- ❌ Incorrect : `https://oxaooajtaigkvxeixdxs.supabase.co/` (pas de slash à la fin)
- ❌ Incorrect : `oxaooajtaigkvxeixdxs.supabase.co` (manque https://)

**Clé Publique :**
- ✅ Correct : `sb_publishable_KqkLnaW2o7Rbrai_6Pez1w_4zNVQENP`
- ✅ Correct : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (format JWT)
- ❌ Incorrect : Si elle contient des retours à la ligne ou espaces

### Option 3 : Vérifier dans Supabase

1. **Allez sur Supabase** : [supabase.com](https://supabase.com)
2. **Sélectionnez votre projet**
3. **Settings** → **API**
4. **Vérifiez** que vous copiez bien :
   - **Project URL** (pas Project API URL)
   - **anon public** key (pas service_role)

## 📝 Exemple de Configuration Correcte

Dans Vercel → Settings → Environment Variables :

```
Key: VITE_SUPABASE_URL
Value: https://oxaooajtaigkvxeixdxs.supabase.co
Environments: ✅ Production ✅ Preview ✅ Development

Key: VITE_SUPABASE_PUBLISHABLE_KEY
Value: sb_publishable_KqkLnaW2o7Rbrai_6Pez1w_4zNVQENP
Environments: ✅ Production ✅ Preview ✅ Development
```

## 🎯 Solution Rapide

**La solution la plus courante :**

1. **Vérifiez** que les noms commencent par `VITE_`
2. **Redéployez** le projet (sans cache si possible)
3. **Attendez** la fin du build
4. **Testez** à nouveau

---

**Dans 90% des cas, le problème vient du fait que le projet n'a pas été redéployé après avoir ajouté les variables ! 🔄**

