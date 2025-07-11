const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

/**
 * Middleware pour protéger les routes
 * Vérifie la présence et la validité du token JWT
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extraire le token du header Authorization
      token = req.headers.authorization.split(' ')[1];

      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ajouter l'ID utilisateur à la requête pour les prochains middlewares
      req.userId = decoded.id;

      next();
    } catch (error) {
      console.error('Erreur de vérification du token:', error.message);

      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expiré' });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token invalide' });
      }

      return res.status(401).json({ message: 'Non autorisé' });
    }
  } else {
    return res.status(401).json({ message: 'Non autorisé, pas de token fourni' });
  }
});

module.exports = { protect };
