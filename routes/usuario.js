const express = require("express");
const router = express.Router();
const { crearUsuario } = require("../controllers/usuario");

router.get("/crearUsuario", crearUsuario)
 
module.exports = router;