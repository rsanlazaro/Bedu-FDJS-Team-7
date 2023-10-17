const express = require("express");
const router = express.Router();
const { crearUsuario, usuario, usuarios, borrarUsuario } = require("../controllers/usuario");

router.get("/usuarios", usuarios)
router.get("/usuario/:id", usuario)
router.post("/crearUsuario", crearUsuario)
router.get("/borrarUsuario/:id", borrarUsuario)
 
module.exports = router;