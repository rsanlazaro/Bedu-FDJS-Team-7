const express = require("express");
const passport = require("passport");
const authController = require("C:\Users\aleid\OneDrive\Documentos\ProyectoFinalBEDU\Orden\Controllers");

const router = express.Router();

// Ruta para autenticación
router.post("/login", authController.login);

// Ruta protegida
router.get(
  "/protegida",
  passport.authenticate("jwt", { session: false }),
  function (request, response) {
    console.log(request.user);
    response.send("Sólo usuarios con sesión pueden ver esto");
  }
);

// Ruta pública
router.get("/publica", function (request, response) {
  response.send("Cualquiera puede ver esta ruta :D");
});

module.exports = router;
