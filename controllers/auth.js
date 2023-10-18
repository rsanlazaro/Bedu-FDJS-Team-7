const { findByUsername } = require("../services/usuario");
const jwt = require("jsonwebtoken");

exports.login = async function (request, response) {
	const { nombreUsuario, contraseña } = request.body;

	const user = await findByUsername(nombreUsuario);

	if (!user) {
		return response.status(401).json({
			message: "Usuario o contraseña inválidos",
			messagedev: "No se encontro el usuario en la base de datos",
			code: "ERR_AUTH",
		});
	}

	if (user.contraseña !== contraseña) {
		return response.status(401).json({
			message: "Usuario o contraseña inválidos",
			messagedev: "No se encontro el usuario en la base de datos",
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