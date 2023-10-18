const { connect, sync } = require("./models/sequelize");

const Label = require('./models/etiqueta');
const Task = require('./models/tarea');
const User = require('./models/usuario');

// Un usuario tiene muchas tareas
User.hasMany(Task);
Task.belongsTo(User);

// Una tarea tiene muchas etiquetas y una etiqueta está asociada a muchas tareas
Task.belongsToMany(Label, { through: 'tasks_labels', timestamps: false });
Label.belongsToMany(Task, { through: 'tasks_labels', timestamps: false });

exports.initDatabase = async function () {
    await connect();
    // await sync(); // Activar para reiniciar la base de datos
}