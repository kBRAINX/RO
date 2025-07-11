const asyncHandler = require ('express-async-handler');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

const client = require('../db');

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Vérifiez les informations de connexion dans la base de données
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  
  const query2 = 'SELECT id FROM users WHERE email = $1';
  try {
    const result = await client.query(query, values);

    if (result.rows.length === 1) { 
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const result1 = await client.query(query2, values);
        res.status(200).send({ 
          userId: result1.rows, 
          token: jwt.sign(
            {userId: result1.rows},
            'RANDOM_TOKEN_SEECRET',
            {expiresIn: '24h'}
          ) 
        });
      } else {
        res.status(401).json({ status: 401, message: 'Identifiants invalides' });
      }
    } else {
      res.status(401).json({status: 401, message: 'Identifiants invalides' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});

exports.registerUser = asyncHandler( async (req, res) => {
  const { email, password } = req.body;
  
  // Vérifiez si l'utilisateur existe déjà dans la base de données
  const checkQuery = 'SELECT * FROM users WHERE email = $1';
  const checkValues = [email];

  const query = 'SELECT id FROM users WHERE email = $1';
  
  // Ajoutez un nouvel utilisateur si l'email n'existe pas déjà
  const insertQuery = 'INSERT INTO users (email, password) VALUES ($1, $2)';
  
  try {
    const checkResult = await client.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertValues = [email, hashedPassword];
      await client.query(insertQuery, insertValues);
      const result1 = await client.query(query, checkValues);
      res.status(200).send({ 
        userId: result1.rows, 
        token: jwt.sign(
          {userId: result1.rows},
          'RANDOM_TOKEN_SEECRET',
          {expiresIn: '24h'}
        ) 
        });
    } else {
      res.status(409).json({ message: 'Cet email est déjà utilisé' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
});

exports.getAllHouse = asyncHandler(async (req, res) => {
  const id_user = req.auth.userId[0].id;

  const query = 'SELECT H.id, H.url_img, H.titre_bien, H.prix, H.nbr_pieces, H.nbr_chambres, H.surface, H.dpe, H.ges, H.description, H.adresse_bien FROM house H INNER JOIN users U ON H.id_user = U.id WHERE U.id = $1';
  const values = [id_user]

  try {
    const result = await client.query(query, values);
    res.send({ status: "ok", data: result.rows });
  } catch (error) {
    console.error('Erreur lors de la récupération des maisons :', error);
    res.send({ status: error });
  }
});

exports.insertHouse = asyncHandler(async (req, res) => {
  const id_user = req.auth.userId[0].id;
  const { url_img, titre_bien, prix, nbr_pieces, nbr_chambres, surface, description, dpe, ges, adresse_bien } = req.body;

  try {

    // proceed with insertion
    const insertQuery = `INSERT INTO house (url_img, titre_bien, prix, nbr_pieces, nbr_chambres, surface, description, dpe, ges, adresse_bien, id_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    const insertValues = [url_img, titre_bien, prix, nbr_pieces, nbr_chambres, surface, description, dpe, ges, adresse_bien, id_user];

    await client.query(insertQuery, insertValues);
    res.status(200).json({ message: 'Insertion réussie' });
  } catch (error) {
    console.error("Erreur lors de l'insertion du bien :", error);
    res.status(500).json({ message: 'Erreur lors de l\'insertion' });
  }
});

exports.deleteProperty = asyncHandler(async (req, res) => {
  const id_house = req.params.id;

  const query = 'DELETE FROM house WHERE id = $1';
  const value = [id_house]

  try {
    const result = await client.query(query, value);
    res.send({ status: "ok", data: result.rows });
  } catch (error) {
    console.error('Erreur lors de la suppréssion de la maison :', error);
    res.send({ status: error });
  }
});

exports.updateProperty = asyncHandler(async (req, res) => {
  const id_house = req.params.id;
  const { url_img, titre_bien, prix, nbr_pieces, nbr_chambres, surface, description } = req.body;

  const query = 'UPDATE house SET url_img = $1, titre_bien = $2, prix = $3, nbr_pieces = $4, nbr_chambres = $5, surface = $6, description = $7 WHERE id = $8';
  const value = [url_img, titre_bien, prix, nbr_pieces, nbr_chambres, surface, description, id_house];

  try {
    const result = await client.query(query, value);
    res.send({ status: "ok", data: result.rows });
  } catch (error) {
    console.error('Erreur lors de la modification du bien :', error);
    res.send({ status: error });
  }
});
















