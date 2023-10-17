const express = require("express");
const router = express.Router();
const { crearUsuario, usuario, usuarios, borrarUsuario } = require("../controllers/usuario");
/**
 * @openapi
 * /routes/usuario:
 *   get:
 *     tags:
 *       - Usuario
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
// Ruta protegida
router.get("/usuarios", usuarios)
router.get("/usuario/:id", usuario)
router.post("/crearUsuario", crearUsuario)
router.get("/borrarUsuario/:id", borrarUsuario)
 
module.exports = router;