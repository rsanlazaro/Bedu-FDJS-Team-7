// require('rootpath')();

// Environment variables
require("dotenv").config();

// Database connection
const { initDatabase } = require("./db");
initDatabase();

app.use(express.json());

const express         = require("express");
const app             = express();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const authRouter = require("./routes/authRoutes");

const JWT_SECRET = "contraseña!!!";

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

// fs              = require('fs'),
// cors            = require('cors'),
// morgan          = require('morgan'),
// bodyParser      = require("body-parser"),
// methodOverride  = require("method-override"),
// router          = express.Router(),
// jwt             = require('jsonwebtoken');
// mongoose        = require('mongoose');

// const errorHandler = require('_helpers/error-handler');

// Setup Connection to DB
// Connection with mongoose
// exports.db = mongoose.connect('mongodb://'+process.env.DB_HOST+process.env.DB_DATABASE,{ useNewUrlParser: true });

// DB Migration/Seeders
// const UserMigration = require('models/migration/user.migration');

// Middlewares
// const JWTauth = require('middleware/JWT.js');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(morgan('dev'));
// app.use(methodOverride());
// app.use(router);
// app.use(cors());

// API routes
// const Seeder = require('models/migration/Seeder');
// router.get('/',function(req, res)
// {
//  Seeder.Seed();    
//  res.status(200).json({message:"Hello, Seed API Works!"});
// });
  
//Protected api route example.
// app.get('/api/protected',JWTauth.validate,(req,res) => {
//     jwt.verify(req.token,process.env.JWT_TOKEN,(err,data) => {
//         if (err) {
//             res.status(403).json(err);
//         }else{
//             res.status(200).json({message:'successful logged',data});
//         }
//     });
// });

//GROUP APP ROUTES
// app.use('/auth',require('routes/AuthRoutes'));
// app.use('/tvshows',require('routes/TvShowsRoutes'));

// global error handler
// app.use(errorHandler);

// import routes and use

// Start server
// Option WITH port from environment variables
// app.listen(process.env.PORT, function(){        
//     console.log("Node server running on http://localhost:"+process.env.PORT);
// });
// Option WITHOUT port from environment variables

app.listen(8080, function(){        
    console.log("Node server running on http://localhost:8080");
});