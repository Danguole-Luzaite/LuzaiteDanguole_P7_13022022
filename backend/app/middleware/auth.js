const jwt = require('jsonwebtoken');
const db = require("../models");
require('dotenv').config()

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "l'utilisateur n'est pas autorisé !";
    } else {
      next();
    }  
  } catch {
    res.status (401).json({ error: new Error ('Requête invalide !') });
  }
};