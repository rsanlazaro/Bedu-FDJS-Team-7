var DataTypes = require("sequelize").DataTypes;
var _listas_tareas = require("./listas_tareas");

function initModels(sequelize) {
  var listas_tareas = _listas_tareas(sequelize, DataTypes);

  listas_tareas.belongsTo(usuarios, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuarios.hasMany(listas_tareas, { as: "listas_tareas", foreignKey: "idUsuario"});

  return {
    listas_tareas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
