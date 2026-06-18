import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

// Deposit amounts in cents (30% of base price)
const DEPOSITS = {
  vitrine: 14900,      // 149€
  ecommerce: 38900,    // 389€
  application: 59900, // 599€
};

const SERVICE_NAMES = {
  vitrine: 'Site Vitrine',
  ecommerce: 'Site E-commerce',
  application: 'Application Web',
};

app.post('/api/create-checkout', async (req, res) => {
  const { serviceType, projectName, description, email, budget } = req.body;

  if (!serviceType || !DEPOSITS[serviceType]) {
    return res.status(400).json({ error: 'Type de service invalide.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Acompte — ${SERVICE_NAMES[serviceType]}`,
              description: projectName
                ? `Projet : ${projectName}`
                : 'Démarrage de projet web sur mesure',
            },
            unit_amount: DEPOSITS[serviceType],
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email || undefined,
      success_url: `${CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/cancel`,
      metadata: {
        serviceType,
        projectName: projectName || '',
        description: description?.substring(0, 500) || '',
        budget: budget || '',
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: 'Erreur lors de la création du paiement.' });
  }
});

// Webhook Stripe (optionnel mais recommandé)
app.post('/api/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Paiement reçu pour:', session.metadata.projectName, '— Email:', session.customer_email);
    // TODO: envoyer un email de confirmation, créer la demande en BDD, etc.
  }

  res.json({ received: true });
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
