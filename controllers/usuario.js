const userService = require('../services/usuario');

exports.usuario = async function (request, response) {
    const { id } = request.params;
    const user = await userService.user(id);
    response.json(user);
}

exports.usuarios = async function (request, response) {
    const users = await userService.users();
    response.json(users);
}

exports.crearUsuario = async function (request, response) {
    const { nombreUsuario, email, contraseña } = request.body;
    const userCreate = await userService.createUser({ nombreUsuario, email, contraseña });
    response.json(userCreate);
}

exports.borrarUsuario = async function (request, response) {
    const { id } = request.params;
    await userService.delete(id);
    response.json("Usuario borrado");
}