// // require('rootpath')();

// // Environment variables
require("dotenv").config();

// Database connection
const { initDatabase } = require("./db");
initDatabase();

const express         = require("express");
const app             = express();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const authRouter = require("./routes/authRoutes");
app.use(express.json());

const {swaggerDocs: v1SwaggerDocs} = require('./routes/swagger')

// const JWT_SECRET = "contraseña!!!";
// const User = require('../models/usuario');
//autenticación JWT
// passport.use(
//   new Strategy(
//     {
//       secretOrKey: JWT_SECRET,
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     },
//     function (payload, done) {
//       // Busca al usuario en la base de datos por su ID.
//       User.findByPk(payload.id)
//         .then((user) => {
//           if (user) {
//             done(null, user);
//           } else {
//             done(null, false);
//           }
//         })
//         .catch((error) => {
//           done(error, false);
//         });
//     }
//   )
// );

app.get(
  "/protegida",
  passport.authenticate("jwt", { session: false }),
  function (request, response) {
    console.log(request.user);
    response.send("Sólo usuarios con sesión pueden ver esto");
  }
);

app.get("/publica", function (request, response) {
  response.send("Cualquiera puede ver esta ruta");
});

app.use("/auth", authRouter); // Rutas de autenticación

const userRouter = require("./routes/usuario");
const taskRouter = require("./routes/tarea");
const labelRouter = require("./routes/etiqueta");
const authRouter = require("./routes/authRoutes");

app.use(userRouter);
app.use(taskRouter);
app.use(labelRouter);
app.use(authRouter);

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello from Node.js!')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
  v1SwaggerDocs(app, 8080);
})