const Joi = require("joi");

exports.createUserSchema = Joi.object({
	nombreUsuario: Joi.string()
		.min(5)
		.max(50)
		.pattern(/^(?=.{5,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
		.required(),
	email: Joi.string().max(100).email().required(),
	"contraseña": Joi.string().min(8).max(50).required(),
});

exports.loginSchema = Joi.object({
	nombreUsuario: Joi.string().min(5).max(50).required(),
	"contraseña": Joi.string().min(8).max(50).required(),
});