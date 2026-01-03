# 🔄 Comment Redéployer sur Vercel

## ✅ Vous avez configuré les variables d'environnement ?

Parfait ! Maintenant il faut **redéployer** pour que Vercel utilise ces nouvelles variables.

## 🚀 Méthode 1 : Redéploiement Manuel (Recommandé)

### Étapes :

1. **Allez sur Vercel** : [vercel.com](https://vercel.com)
2. **Sélectionnez votre projet**
3. **Allez dans l'onglet "Deployments"** (en haut)
4. **Trouvez le dernier déploiement** (le plus récent en haut de la liste)
5. **Cliquez sur les "..."** (trois points) à droite du déploiement
6. **Cliquez sur "Redeploy"**
7. **Confirmez** si demandé
8. **Attendez** que le build se termine (statut "Ready")

### ⏱️ Temps d'attente

Le redéploiement prend généralement **2-5 minutes**.

## 🔄 Méthode 2 : Redéploiement Automatique

Si vous préférez, vous pouvez aussi :

1. **Faire un petit changement** dans votre code (ex: ajouter un espace dans un fichier)
2. **Pousser sur GitHub** :
   ```bash
   git add .
   git commit -m "Trigger redeploy"
   git push
   ```
3. **Vercel redéploiera automatiquement**

## ✅ Vérification

Une fois le redéploiement terminé :

1. **Ouvrez votre site Vercel** (l'URL de votre déploiement)
2. **Testez le mode multijoueur** :
   - Cliquez sur "Mode 1v1 en ligne"
   - Créez une room
   - Si ça fonctionne, c'est bon ! 🎉

## ⚠️ Important

- Les variables d'environnement sont **prises en compte au moment du build**
- Si vous avez ajouté les variables APRÈS le dernier déploiement, vous DEVEZ redéployer
- Un simple refresh de la page ne suffit pas

---

**En résumé : Redéployez manuellement dans Vercel, c'est le plus rapide ! 🚀**

