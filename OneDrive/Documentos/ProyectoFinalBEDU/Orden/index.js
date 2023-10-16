require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { Sequelize, DataTypes } = require("sequelize");
const authRouter = require("./routes/authRoutes");

app.use(express.json());

const JWT_SECRET = "contraseña!!!";

// Sequelize
const sequelize = new Sequelize("todolist", "aleidy", "Alrs2002", {
  dialect: "mysql",
  host: "localhost",
});

// ... Definición de modelos y relaciones

//autenticación JWT
passport.use(
  new Strategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    function (payload, done) {
      // Busca al usuario en la base de datos por su ID.
      Usuario.findByPk(payload.id)
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch((error) => {
          done(error, false);
        });
    }
  )
);

app.use(express.json());

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

app.listen(8080, function () {
  console.log("> Servidor escuchando puerto 8080");
});
