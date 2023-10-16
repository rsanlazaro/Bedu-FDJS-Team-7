const jwt = require("jsonwebtoken");
const { Usuario } = require("../models/usuario");
const JWT_SECRET = "contraseña!!!";

// Servicio para generar un token JWT
exports.generateToken = (user) => {
  return jwt.sign({ id: user.id }, JWT_SECRET);
};
