const { connect } = require("./models/sequelize");
const Usuarios = require("./models/usuario");
const Etiquetas = require("./models/etiqueta");
const Tareas = require("./models/tarea");

// // Un usuario tiene muchas tareas
// Usuarios.hasMany(Tareas);
// Tareas.belongsTo(Usuarios);

// // Una tarea tiene muchas etiquetas
// Tareas.hasMany(Etiquetas);
// Etiquetas.belongsTo(Tareas);

exports.initDatabase = async function () {
    await connect();
}