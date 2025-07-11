const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/user');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Configuration CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Routes
app.use('/api/auth', userRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'Service d\'authentification - API running',
    version: '1.0.0'
  });
});

// Gestion des routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion globale des erreurs
app.use((error, req, res, next) => {
  console.error('Erreur:', error);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
  });
});

module.exports = app;
