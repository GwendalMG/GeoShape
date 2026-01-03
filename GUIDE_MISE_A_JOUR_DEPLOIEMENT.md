# 🚀 Guide : Mettre à jour le code déployé

## 📋 Étapes pour mettre à jour GitHub et Vercel

### 1️⃣ Pousser les changements sur GitHub

**Option A : Via le terminal (recommandé)**

```bash
cd "/Users/gwendalmarie-gourves/Downloads/geo-guess-duel-main 2"
git add -A
git commit -m "Description de vos changements"
git push
```

**Option B : Via l'interface GitHub**
- Allez sur votre repository GitHub
- Utilisez l'interface web pour faire un commit et push

### 2️⃣ Vérifier que Vercel redéploie automatiquement

Si votre projet Vercel est connecté à GitHub, **Vercel redéploie automatiquement** dès que vous poussez sur GitHub.

**Pour vérifier :**
1. Allez sur [vercel.com](https://vercel.com)
2. Ouvrez votre projet
3. Allez dans l'onglet **"Deployments"**
4. Vous devriez voir un nouveau déploiement en cours (avec un statut "Building" ou "Ready")

**Si Vercel ne redéploie pas automatiquement :**
1. Dans Vercel, allez dans **Settings** → **Git**
2. Vérifiez que la connexion GitHub est active
3. Si besoin, reconnectez votre repository

### 3️⃣ Redéployer manuellement (si nécessaire)

Si Vercel ne redéploie pas automatiquement :

1. Allez dans **Deployments**
2. Cliquez sur les **"..."** du dernier déploiement
3. Cliquez sur **"Redeploy"**
4. Attendez que le build se termine

### 4️⃣ Vérifier les variables d'environnement dans Vercel

**Important :** Assurez-vous que les variables d'environnement sont bien configurées :

1. Dans Vercel, allez dans **Settings** → **Environment Variables**
2. Vérifiez que vous avez :
   - `VITE_SUPABASE_URL` = `https://oxaooajtaigkvxeixdxs.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = `sb_publishable_KqkLnaW2o7Rbrai_6Pez1w_4zNVQENP`

3. Si les variables n'existent pas, ajoutez-les :
   - Cliquez sur **"Add New"**
   - Entrez le nom de la variable
   - Entrez la valeur
   - Sélectionnez les environnements (Production, Preview, Development)
   - Cliquez sur **"Save"**

### 5️⃣ Vérifier que le déploiement fonctionne

1. Allez sur votre URL Vercel (ex: `https://votre-projet.vercel.app`)
2. Testez le jeu pour vérifier que tout fonctionne
3. Si vous voyez une page bleue ou des erreurs :
   - Vérifiez les logs de build dans Vercel (onglet "Deployments" → cliquez sur le déploiement → "Build Logs")
   - Vérifiez la console du navigateur (F12) pour voir les erreurs

## 🔍 Checklist de vérification

- [ ] Code poussé sur GitHub
- [ ] Vercel a détecté le nouveau commit (vérifier dans "Deployments")
- [ ] Le build s'est terminé avec succès (statut "Ready")
- [ ] Les variables d'environnement sont configurées dans Vercel
- [ ] Le site fonctionne correctement (pas de page bleue)
- [ ] Le mode multijoueur fonctionne (testez avec un ami)

## ⚠️ Problèmes courants

### Le build échoue dans Vercel
- Vérifiez les logs de build pour voir l'erreur
- Assurez-vous que `package.json` contient bien le script `build`
- Vérifiez que toutes les dépendances sont installées

### Le site ne se met pas à jour
- Videz le cache de votre navigateur (Ctrl+Shift+R ou Cmd+Shift+R)
- Vérifiez que le nouveau déploiement est bien "Ready" dans Vercel
- Attendez quelques minutes (parfois il y a un délai de propagation)

### Erreurs de variables d'environnement
- Vérifiez que les variables sont bien nommées (avec `VITE_` au début)
- Vérifiez que les valeurs sont correctes
- Redéployez après avoir ajouté/modifié les variables

## 📝 Commandes rapides

```bash
# Voir l'état des fichiers
git status

# Ajouter tous les fichiers modifiés
git add -A

# Créer un commit
git commit -m "Description des changements"

# Pousser sur GitHub
git push

# Voir les derniers commits
git log --oneline -5
```

---

**Une fois ces étapes suivies, votre code sera à jour sur GitHub et Vercel ! 🎉**

