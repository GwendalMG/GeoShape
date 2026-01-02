# 🎮 Informations pour jouer à deux

## ✅ Configuration terminée !

Tout est prêt pour jouer en mode multijoueur.

---

## 📱 Adresses pour jouer

### Joueur 1 (sur votre Mac) :
**http://localhost:8080/**

### Joueur 2 (sur un autre appareil - même WiFi) :
**http://172.20.10.2:8080/**

⚠️ **Important** : Les deux appareils doivent être sur le **même réseau WiFi**.

---

## 🎯 Comment jouer

### Étape 1 : Les deux joueurs ouvrent le jeu

- **Joueur 1** : http://localhost:8080/
- **Joueur 2** : http://172.20.10.2:8080/

### Étape 2 : Créer une room

**Joueur 1 (Hôte) :**
1. Clique sur "Mode 1v1 en ligne"
2. Clique sur "Créer une room"
3. Entre son pseudo (ex: "Gwendal")
4. Choisit le nombre de pays (10, 20, 30, etc.)
5. Clique sur "Créer la room"
6. Un **code à 6 caractères** apparaît (ex: "ABC123")
7. **Partage ce code** avec le Joueur 2 (par SMS, Discord, etc.)

### Étape 3 : Rejoindre la room

**Joueur 2 (Invité) :**
1. Clique sur "Mode 1v1 en ligne"
2. Clique sur "Rejoindre une room"
3. Entre son pseudo (ex: "Lola")
4. Entre le **code de la room** partagé par le Joueur 1
5. Clique sur "Rejoindre"

### Étape 4 : Lancer la partie

- Une fois les deux joueurs connectés, le **Joueur 1 (Hôte)** voit un bouton "Lancer la partie !"
- Le Joueur 1 clique sur ce bouton
- La partie commence !

### Étape 5 : Jouer

- Les deux joueurs voient le même pays en même temps
- Chaque joueur a **30 secondes** pour deviner
- Le premier à trouver le pays gagne le point
- La partie continue jusqu'à ce que tous les pays soient devinés

---

## 🔧 Si ça ne fonctionne pas

### Le Joueur 2 ne peut pas accéder à l'adresse

1. **Vérifiez le pare-feu Mac :**
   - Système → Réglages → Réseau → Pare-feu
   - Autorisez les connexions entrantes pour Node.js

2. **Vérifiez que les deux appareils sont sur le même WiFi**

3. **Vérifiez l'adresse IP :**
   - Si l'IP a changé, trouvez-la avec :
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

### Erreur lors de la création de room

- Ouvrez la console du navigateur (F12)
- Vérifiez les erreurs
- Vérifiez que la table `game_rooms` existe dans Supabase

---

## 📝 Récapitulatif

- ✅ Fichier .env configuré
- ✅ Table Supabase créée
- ✅ Serveur lancé
- ✅ IP locale : **172.20.10.2**
- ✅ Port : **8080**

**Tout est prêt ! Amusez-vous bien ! 🎉**

