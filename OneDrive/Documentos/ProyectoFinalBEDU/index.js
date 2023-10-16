const { Sequelize, DataTypes } = require("sequelize");


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

//modelo
const Tarea = sequelize.define("tareas", {
	idTarea: {
	  type: DataTypes.INTEGER,
	  primaryKey: true,
	  autoIncrement: true,
	},
	idUsuario: {
	  type: DataTypes.INTEGER,
	},
	titulo: {
	  type: DataTypes.STRING(255),
	},
	descripcion: {
	  type: DataTypes.STRING(255),
	},
	fechaCreacion: {
	  type: DataTypes.DATE,
	},
	fechalimite: {
	  type: DataTypes.DATEONLY,
	},
	estatus: {
	  type: DataTypes.ENUM("pendiente", "completada", "en progreso"),
	},
	prioridad: {
	  type: DataTypes.ENUM("alta", "media", "baja"),
	},
  },
  {
	// Indica que Sequelize no debe agregar createdAt y updatedAt
	timestamps: false,
  });

  //Creas tarea
  Tarea.create({
	idUsuario: 1,
	titulo: "Tarea de ejemplo",
	descripcion: "Esta es una tarea de ejemplo",
	fechaCreacion: new Date(),
	fechalimite: "2023-12-31",
	estatus: "pendiente",
	prioridad: "alta",
  });
//consultas tarea
async function consultarTareas() {
	try {
	  const todasLasTareas = await Tarea.findAll();
	  console.log(todasLasTareas);
	} catch (error) {
	  console.error("Error al consultar tareas:", error);
	}
  }
  
  consultarTareas();


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