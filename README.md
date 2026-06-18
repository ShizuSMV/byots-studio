# AtelierW — Portfolio & Studio Web

Site vitrine + système de demandes client avec paiement Stripe.

## Stack

- **Frontend** : React 19 + Vite + SASS
- **Backend** : Node.js + Express + Stripe

## Démarrage rapide

### 1. Backend

```bash
cd server
cp .env.example .env
# Remplissez STRIPE_SECRET_KEY dans .env
npm install
npm run dev
```

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Le site tourne sur `http://localhost:5173` et le backend sur `http://localhost:3001`.

## Configuration Stripe

1. Créez un compte sur [stripe.com](https://stripe.com)
2. Récupérez votre clé secrète dans le Dashboard Stripe
3. Ajoutez-la dans `server/.env` : `STRIPE_SECRET_KEY=sk_test_...`
4. En production, remplacez par la clé live `sk_live_...`

## Personnalisation

- **Projets portfolio** : modifiez `PROJECTS` dans `client/src/components/Portfolio.jsx`
- **Services & tarifs** : modifiez `SERVICES` dans `client/src/components/Services.jsx` et `DEPOSITS` dans `server/index.js`
- **Email de contact** : modifiez `uz.shard@gmail.com` dans `Contact.jsx` et `Footer.jsx`
- **Couleurs** : modifiez `client/src/styles/_variables.scss`

## Production

```bash
# Build frontend
cd client && npm run build

# Servir avec Express (ajouter express.static pour le build)
cd server && NODE_ENV=production npm start
```
