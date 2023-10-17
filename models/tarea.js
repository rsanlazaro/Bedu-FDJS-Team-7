const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");
const { Sequelize } = require("sequelize");

module.exports = sequelize.define('task', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  // idUsuario: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  //   references: {
  //     model: 'usuarios',
  //     key: 'id'
  //   }
  // },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.Sequelize.fn('current_timestamp')
  },
  fechalimite: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  estatus: {
    type: DataTypes.ENUM('pendiente', 'completada', 'en progreso'),
    allowNull: false
  },
  prioridad: {
    type: DataTypes.ENUM('alta', 'media', 'baja'),
    allowNull: false
  }
}, {
  tableName: 'task',
  timestamps: false
});