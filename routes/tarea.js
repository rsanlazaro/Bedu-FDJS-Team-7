const express = require("express");
const router = express.Router();
const { crearTarea, tarea, tareas, borrarTarea } = require("../controllers/tarea");

router.get("/tareas", tareas)
router.get("/tarea/:id", tarea)
router.post("/crearTarea", crearTarea)
router.get("/borrarTarea/:id", borrarTarea)
 
module.exports = router;