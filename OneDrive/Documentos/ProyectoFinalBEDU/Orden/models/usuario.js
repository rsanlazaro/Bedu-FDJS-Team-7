const { Sequelize, DataTypes } = require("sequelize");

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
module.exports = Usuario;
