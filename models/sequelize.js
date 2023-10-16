const { Sequelize } = require("sequelize");

const { MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, FORCE_DB_UPDATE } = process.env;

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: MYSQL_HOST,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
});

exports.sequelize = sequelize;

exports.connect = async function () {
    try {
        await sequelize.authenticate();
        console.log('Conectado con la base de datos');
    } catch (e) {
        console.log('No se pudo conectar a la base de datos');
        console.log(e);
    }
};