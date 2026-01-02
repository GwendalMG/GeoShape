# 🌐 Guide : Jouer à deux sur des appareils différents

## 📱 Option 1 : Sur le même réseau WiFi (Recommandé)

### Étape 1 : Trouver l'adresse IP de votre ordinateur

**Sur Mac :**
1. Ouvrez **Terminal**
2. Tapez : `ifconfig | grep "inet " | grep -v 127.0.0.1`
3. Vous verrez quelque chose comme : `inet 192.168.1.21`
4. Notez cette adresse IP (ex: `192.168.1.21`)

**Sur Windows :**
1. Ouvrez **Invite de commandes** (cmd)
2. Tapez : `ipconfig`
3. Cherchez "Adresse IPv4" sous "Carte réseau sans fil" ou "Ethernet"
4. Notez cette adresse IP (ex: `192.168.1.21`)

### Étape 2 : Lancer le serveur

Le serveur est déjà configuré pour être accessible sur le réseau. Quand vous lancez `npm run dev`, vous devriez voir :

```
➜  Local:   http://localhost:8080/
➜  Network: http://192.168.1.21:8080/
```

**Notez l'adresse "Network"** (celle qui commence par `192.168.x.x`)

### Étape 3 : Se connecter depuis les deux appareils

**Joueur 1 (sur l'ordinateur qui héberge le serveur) :**
- Ouvrez : `http://localhost:8080/` ou `http://192.168.1.21:8080/`

**Joueur 2 (sur un autre appareil - téléphone, tablette, autre ordinateur) :**
- Assurez-vous d'être sur le **même WiFi**
- Ouvrez : `http://192.168.1.21:8080/` (remplacez par votre IP)

### ⚠️ Si ça ne fonctionne pas

**Vérifiez le pare-feu :**
- Sur Mac : Système → Réglages → Réseau → Pare-feu → Autoriser les connexions entrantes
- Sur Windows : Autorisez le port 8080 dans le pare-feu Windows

---

## 🌍 Option 2 : Déployer en ligne (Pour jouer de n'importe où)

### Déploiement rapide sur Vercel (Gratuit)

1. **Installez Vercel CLI :**
   ```bash
   npm i -g vercel
   ```

2. **Déployez :**
   ```bash
   vercel
   ```
   - Suivez les instructions
   - Vercel vous donnera une URL comme : `https://votre-projet.vercel.app`

3. **Configurez les variables d'environnement :**
   - Dans le dashboard Vercel → Settings → Environment Variables
   - Ajoutez `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY`

4. **Redeployez :**
   ```bash
   vercel --prod
   ```

**Avantages :**
- ✅ Accessible depuis n'importe où (pas besoin du même WiFi)
- ✅ URL permanente
- ✅ Gratuit

---

## 🔧 Option 3 : Utiliser un tunnel (ngrok)

Si vous voulez tester rapidement sans déployer :

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
   - Les deux joueurs utilisent cette même URL

**Note :** L'URL change à chaque fois avec le plan gratuit.

---

## 📝 Résumé rapide

**Pour jouer sur le même WiFi :**
1. ✅ Trouvez votre IP locale (`ifconfig` ou `ipconfig`)
2. ✅ Lancez `npm run dev`
3. ✅ Notez l'adresse "Network" affichée
4. ✅ Joueur 1 : `http://localhost:8080/`
5. ✅ Joueur 2 : `http://VOTRE-IP:8080/` (sur le même WiFi)

**Pour jouer de n'importe où :**
- Déployez sur Vercel (gratuit, permanent)
- Ou utilisez ngrok (gratuit, temporaire)

---

## 🎮 Une fois connectés

Les deux joueurs peuvent maintenant :
1. Cliquer sur "Mode 1v1 en ligne"
2. L'un crée une room, l'autre rejoint avec le code
3. Jouer ensemble ! 🎉

