const Joi = require("joi");

// Validación para la solicitud de inicio de sesión
exports.loginValidation = Joi.object({
  nombreUsuario: Joi.string().required(),
  contraseña: Joi.string().required(),
});
