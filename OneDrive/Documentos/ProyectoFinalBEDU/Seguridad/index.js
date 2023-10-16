const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { Sequelize, DataTypes } = require("sequelize");
app.use(express.json());

const JWT_SECRET = "contraseña!!!";

// Sequelize
const sequelize = new Sequelize("todolist", "aleidy", "Alrs2002", {
  dialect: "mysql",
  host: "localhost",
});

// modelos 
const Usuario = sequelize.define("Usuario", {
  nombreUsuario: DataTypes.STRING,
  email: DataTypes.STRING,
  contraseña: DataTypes.STRING,
});

const ListaTareas = sequelize.define("ListaTareas", {
  nombre: DataTypes.STRING,
  descripcion: DataTypes.STRING,
});

const Tarea = sequelize.define("Tarea", {
  titulo: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  fechaCreacion: DataTypes.DATE,
  fechalimite: DataTypes.DATE,
  estatus: DataTypes.ENUM("pendiente", "completada", "en progreso"),
  prioridad: DataTypes.ENUM("alta", "media", "baja"),
});

const Etiqueta = sequelize.define("Etiqueta", {
  nombre: DataTypes.STRING,
});

const TareaEtiquetas = sequelize.define("TareaEtiquetas", {
    tareaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Tarea,
        key: 'id',
      },
    },
    etiquetaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Etiqueta,
        key: 'id',
      },
    },
  });
  

// relación entre las tablas
Usuario.hasMany(ListaTareas, { foreignKey: 'idUsuario' });
ListaTareas.belongsTo(Usuario, { foreignKey: 'idUsuario' });

ListaTareas.hasMany(Tarea, { foreignKey: 'idLista' });
Tarea.belongsTo(ListaTareas, { foreignKey: 'idLista' });

Tarea.belongsToMany(Etiqueta, { through: TareaEtiquetas, foreignKey: 'tareaId' });
Etiqueta.belongsToMany(Tarea, { through: TareaEtiquetas, foreignKey: 'etiquetaId' });

// relación entre Usuario y Tarea 
Usuario.hasMany(Tarea, { foreignKey: 'idUsuario' });
Tarea.belongsTo(Usuario, { foreignKey: 'idUsuario' });

// relación entre Usuario y Etiqueta 
Usuario.belongsToMany(Etiqueta, { through: 'UsuarioEtiquetas', foreignKey: 'usuarioId' });
Etiqueta.belongsToMany(Usuario, { through: 'UsuarioEtiquetas', foreignKey: 'etiquetaId' });



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

app.post("/login", function (request, response) {
  const { nombreUsuario, contraseña } = request.body;

  // Busca al usuario en la base de datos por nombre de usuario y contraseña.
  Usuario.findOne({ where: { nombreUsuario, contraseña } })
    .then((user) => {
      if (user) {
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        response.status(200).json({ jwt: token });
      } else {
        response.status(401).json({
          error: "Usuario o contraseña inválidos",
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error: "Error de base de datos" });
    });
});

app.listen(8080, function () {
  console.log("> Servidor escuchando puerto 8080");
});
