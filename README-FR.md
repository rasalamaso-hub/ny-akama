# NY AKAMA Pro — étape 2 (Firebase + boutique commune)

Cette étape adapte le fichier HTML fourni et ajoute une première intégration Firebase Authentication + Cloud Firestore, tout en gardant les écrans existants.

## Fonctionnement prévu
- Un compte Firebase authentifié par e-mail/mot de passe.
- Le rôle vient de `users/{uid}.role` dans Firestore, jamais du stockage local ni d'un code local.
- `admin` : accès gérant complet.
- `commercial` : accès Boutique et Historique, comme dans l'interface existante.
- Bocaux, mises en bouteille, lots/stock et produits sont des collections partagées.
- Chaque nouvelle vente est enregistrée avec `uid` et le nom du profil; les commerciaux ne lisent que leurs propres ventes; l'administrateur lit toutes les ventes.
- PWA de base pour préparer l'installation sur Android.

## À configurer avant le test
1. Créez un projet sur https://console.firebase.google.com/.
2. Activez Authentication > Sign-in method > Email/Password.
3. Créez Cloud Firestore.
4. Créez une application Web et copiez la configuration dans `firebase-config.js` en remplaçant les valeurs `VOTRE_...`.
5. Dans Firebase Authentication, créez les comptes. Copiez l'UID de chaque compte.
6. Dans Firestore, créez `users/{UID}` avec les champs `role` (`admin` ou `commercial`) et `name` (nom affiché). Le premier profil admin doit être créé depuis la console Firebase, car les règles interdisent aux utilisateurs de se donner le rôle admin.
7. Publiez les règles de `firestore.rules` dans Firestore > Règles.
8. Testez d'abord avec des données non critiques, sur deux comptes différents.
9. Déployez sur Vercel seulement après validation; ajoutez le domaine Vercel dans Authentication > Authorized domains.

## Limites à traiter avant la production
- Les données historiques enregistrées seulement dans l'ancien `localStorage` ne sont pas migrées automatiquement. Exportez/sauvegardez l'ancien appareil avant toute migration.
- Le stock partagé exige une gestion de concurrence lors de ventes simultanées. Les écritures de quantité actuelles sont à tester et devraient être remplacées par une transaction Firestore pour éviter les quantités incohérentes si deux commerciaux vendent au même moment.
- Les règles limitent les écritures du commercial aux diminutions de quantité, mais elles ne constituent pas encore une transaction de vente atomique. Un audit sécurité et des tests de règles sont requis avant production.
- Le cache PWA met en cache l'interface, pas les opérations de vente hors ligne. Les ventes nécessitent une connexion confirmée.
- `firebase-config.js` est ignoré par Git. Créez-le localement à partir de ce dossier et gardez les valeurs de configuration client; n'ajoutez jamais de clé de compte de service.
- La première connexion échouera tant que la configuration et le document `users/{uid}` ne sont pas créés.
