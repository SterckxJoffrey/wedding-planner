const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch((err) => console.error('Erreur MongoDB :', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/weddings', require('./routes/weddingRoutes'));
app.use('/api/guests', require('./routes/guestRoutes'));
app.use('/api/vendors', require('./routes/vendorRoutes'));
app.use('/api/budgets', require('./routes/budgetRoutes'));

// Lancement du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
