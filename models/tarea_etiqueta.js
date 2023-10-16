const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tareas_etiquetas', {
    tareas_etiquetas: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tareaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'etiquetas',
        key: 'id'
      }
    },
    etiquetaId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tareas_etiquetas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tareas_etiquetas" },
        ]
      },
      {
        name: "tareaId",
        using: "BTREE",
        fields: [
          { name: "tareaId" },
        ]
      },
    ]
  });
};
