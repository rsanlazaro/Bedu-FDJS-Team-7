const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { Usuario } = require("../models/usuario");
const JWT_SECRET = "contraseña!!!";

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
