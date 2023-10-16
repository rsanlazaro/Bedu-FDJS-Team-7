const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { ExtractJwt } = require("passport-jwt");
const { Usuario } = require("../models/usuario");

const JWT_SECRET = "contraseña!!!";

// Controlador para la ruta "/login"
exports.login = function (request, response) {
  const { nombreUsuario, contraseña } = request.body;

  // Busca al usuario en la base de datos por nombre de usuario y contraseña.
  Usuario.findOne({ where: { nombreUsuario, contraseña } })
    .then((user) => {
      if (user) {
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        response.status(200).json({ jwt: token });
      } else {
        response.status(401).json({
          error: "Usuario o contraseña inválidos",
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error: "Error de base de datos" });
    });
};
