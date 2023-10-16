const { Sequelize } = require("sequelize");


// Conexión con MySQL
const sequelize = new Sequelize({
	// Indicamos que vamos a conectarnos con MySQL
	dialect: "mysql",

	// Cuál es el host de la base de datos
	host: "localhost",

	// Usuario para conectarse a MySQL
	username: "aleidy",

	// Contraseña para conectarse a MySQL
	password: "Alrs2002",

	// El nombre de la base de datos
	database: "todolist",
});

async function connect() {
	try {
		await sequelize.authenticate();
		console.log("> Conectado a la base de datos :D");
	} catch (e) {
		console.error("> No se pudo conectar con la base de datos :(");
		console.error(e);
	}
}

connect();