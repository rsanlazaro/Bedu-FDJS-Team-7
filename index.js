// // require('rootpath')();

// // Environment variables
require("dotenv").config();

// Database connection
const { initDatabase } = require("./db");
initDatabase();

// const path = require("path");
const express         = require("express");
const app             = express();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const authRouter = require("./routes/authRoutes");
app.use(express.json());

// const JWT_SECRET = "contraseña!!!";
const {swaggerDocs: v1SwaggerDocs} = require('./routes/swagger')

// //autenticación JWT
// passport.use(
//   new Strategy(
//     {
//       secretOrKey: JWT_SECRET,
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     },
//     function (payload, done) {
//       // Busca al usuario en la base de datos por su ID.
//       Usuario.findByPk(payload.id)
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
  response.send("Cualquiera puede ver esta ruta :D");
});

app.use("/auth", authRouter); // Rutas de autenticación

const userRouter = require("./routes/usuario");
const taskRouter = require("./routes/tarea");
const labelRouter = require("./routes/etiqueta");

app.use(userRouter);
app.use(taskRouter);
app.use(labelRouter);

// app.listen(8080, function(){
//     console.log("Node server running on http://localhost:8080");
//     v1SwaggerDocs(app, 8080);
// });

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello from Node.js!')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
  v1SwaggerDocs(app, 8080);
})