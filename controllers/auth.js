const userService = require("../services/usuario");
const jwt = require("jsonwebtoken");

exports.login = async function (request, response) {
	const { nombreUsuario, contraseña } = request.body;

	const user = await userService.findByUsername(nombreUsuario);
	if (!user) {
		return response.status(401).json({
			message: "Usuario incorrecto",
			messagedev: "No se encontro el usuario en la base de datos",
			code: "ERR_AUTH",
		});
	}

	if (user.contraseña !== contraseña) {
		return response.status(401).json({
			message: "La contraseña es inválida",
			messagedev: "No se encontro el usuario con la contraseña en la base de datos",
			code: "ERR_AUTH",
		});
	}

	const token = jwt.sign(
		{ id: user.id, nombreUsuario: user.nombreUsuario },
		process.env.JWT_SECRET
	);

	response.status(200).json({
		jwt: token,
	});
};