const { connect, sync } = require("./models/sequelize");
const Usuarios = require("./models/usuario");
const Etiquetas = require("./models/etiqueta");
const Tareas = require("./models/tarea");

// // Un usuario tiene muchas tareas
Usuarios.hasMany(Tareas);
Tareas.belongsTo(Usuarios);

// Una tarea tiene muchas etiquetas y una etiqueta está asociada a muchas tareas
Tareas.belongsToMany(Etiquetas, { through: 'tareas_etiquetas', timestamps: false });
Etiquetas.belongsToMany(Tareas, { through: 'tareas_etiquetas', timestamps: false });

exports.initDatabase = async function () {
    await connect();
    // await sync(); // Activar para reiniciar la base de datos
}