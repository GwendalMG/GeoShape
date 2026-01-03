# 🎮 Comment jouer avec quelqu'un en ligne

## 📋 Étapes rapides

### Pour le Joueur 1 (Créer la room)

1. **Ouvrez votre site déployé** (l'URL Vercel)
2. **Cliquez sur "Mode 1v1 en ligne"**
3. **Cliquez sur "Créer une room"**
4. **Entrez votre pseudo** et choisissez le nombre de pays (10, 20, 30, 40 ou 50)
5. **Cliquez sur "Créer la room"**
6. **Un code de 6 lettres apparaît** (ex: `ABC123`)
7. **Copiez ce code** (bouton avec l'icône copier) et **envoyez-le à votre ami**

### Pour le Joueur 2 (Rejoindre la room)

1. **Ouvrez le même site** (la même URL Vercel)
2. **Cliquez sur "Mode 1v1 en ligne"**
3. **Cliquez sur "Rejoindre une room"**
4. **Entrez votre pseudo** et **le code reçu** (ex: `ABC123`)
5. **Cliquez sur "Rejoindre"**

### Une fois les deux joueurs connectés

- Les deux joueurs voient l'écran "Prêt à jouer !" avec les deux pseudos
- **Le Joueur 1 (host) clique sur "Lancer la partie !"**
- Le jeu commence ! 🎉

## 💡 Conseils

- **Partagez l'URL de votre site Vercel** avec votre ami (ex: `https://votre-projet.vercel.app`)
- Le code de la room est en **majuscules** et fait **6 caractères**
- Vous pouvez jouer depuis **n'importe où** (pas besoin d'être sur le même réseau WiFi)
- Le jeu fonctionne en **temps réel** grâce à Supabase

## ⚠️ Si ça ne fonctionne pas

1. **Vérifiez que les deux joueurs sont sur le même site** (même URL)
2. **Vérifiez que le code est correct** (majuscules, 6 caractères)
3. **Vérifiez la console du navigateur** (F12) pour voir les erreurs
4. **Assurez-vous que Supabase est bien configuré** dans Vercel (variables d'environnement)

## 🎯 Exemple concret

**Joueur 1 (Alice) :**
1. Va sur `https://votre-projet.vercel.app`
2. Clique "Mode 1v1 en ligne" → "Créer une room"
3. Entre "Alice" et choisit 20 pays
4. Reçoit le code `XYZ789`
5. Envoie le code à Bob via WhatsApp/Discord/etc.

**Joueur 2 (Bob) :**
1. Va sur `https://votre-projet.vercel.app`
2. Clique "Mode 1v1 en ligne" → "Rejoindre une room"
3. Entre "Bob" et le code `XYZ789`
4. Rejoint la room

**Les deux :**
- Voient "Prêt à jouer ! Alice VS Bob"
- Alice clique "Lancer la partie !"
- Le jeu commence ! 🚀

---

**Amusez-vous bien ! 🌍**

