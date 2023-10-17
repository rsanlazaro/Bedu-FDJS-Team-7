const express = require("express");
const router = express.Router();
const { crearEtiqueta, etiqueta, etiquetas, borrarEtiqueta } = require("../controllers/etiqueta");

router.get("/etiquetas", etiquetas)
router.get("/etiqueta/:id", etiqueta)
router.post("/crearEtiqueta", crearEtiqueta)
router.get("/borrarEtiqueta/:id", borrarEtiqueta)
 
module.exports = router;