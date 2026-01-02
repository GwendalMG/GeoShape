# 🔧 Fix : Page bleue sur Vercel

## Problème identifié

Quand vous déployez sur Vercel, vous ne voyez qu'une page bleue (le background) mais pas le contenu. Cela signifie que :
- Le CSS se charge (d'où le background bleu)
- Mais le JavaScript React ne se charge pas correctement

## ✅ Corrections appliquées

1. **Configuration Vite améliorée** : Ajout de `base: "/"` pour les chemins relatifs
2. **Configuration Vercel améliorée** : Headers de cache pour les assets
3. **Gestion d'erreurs Supabase** : L'app ne crash plus si Supabase n'est pas configuré
4. **BrowserRouter avec basename** : Pour éviter les problèmes de routing

## 🚀 Étapes pour redéployer

### 1. Poussez les changements sur GitHub

```bash
cd "/Users/gwendalmarie-gourves/Downloads/geo-guess-duel-main 2"
git add .
git commit -m "Fix: Configuration pour déploiement Vercel"
git push
```

### 2. Dans Vercel

1. **Allez sur votre projet Vercel**
2. **Vérifiez les variables d'environnement** :
   - Settings → Environment Variables
   - Assurez-vous d'avoir :
     - `VITE_SUPABASE_URL` = `https://oxaooajtaigkvxeixdxs.supabase.co`
     - `VITE_SUPABASE_PUBLISHABLE_KEY` = `sb_publishable_KqkLnaW2o7Rbrai_6Pez1w_4zNVQENP`
3. **Redeployez** :
   - Allez dans "Deployments"
   - Cliquez sur les "..." du dernier déploiement
   - Cliquez sur "Redeploy"
   - Ou attendez que Vercel redéploie automatiquement (si GitHub est connecté)

### 3. Vérifiez les logs de build

Dans Vercel, allez dans votre déploiement → "Build Logs" pour voir s'il y a des erreurs.

## 🔍 Diagnostic

Si ça ne fonctionne toujours pas :

1. **Ouvrez la console du navigateur** (F12) sur votre site déployé
2. **Vérifiez les erreurs** :
   - Erreurs 404 ? → Problème de routing
   - Erreurs de variables d'environnement ? → Vérifiez les variables dans Vercel
   - Erreurs JavaScript ? → Problème de build

3. **Vérifiez que les fichiers sont bien déployés** :
   - Ouvrez les DevTools → Network
   - Rechargez la page
   - Vérifiez que `index.html` et les fichiers JS/CSS se chargent (status 200)

## 📝 Configuration Vercel recommandée

Dans les Settings de votre projet Vercel :

- **Framework Preset** : Vite
- **Build Command** : `npm run build`
- **Output Directory** : `dist`
- **Install Command** : `npm install`
- **Root Directory** : `.` (racine)

## ✅ Checklist

- [ ] Code poussé sur GitHub
- [ ] Variables d'environnement configurées dans Vercel
- [ ] Build réussi (vérifiez les logs)
- [ ] Pas d'erreurs dans la console du navigateur
- [ ] Les fichiers JS/CSS se chargent (Network tab)

---

**Une fois ces corrections appliquées et redéployées, le jeu devrait fonctionner ! 🎉**

