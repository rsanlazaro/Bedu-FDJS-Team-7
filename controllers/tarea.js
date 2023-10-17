const taskService = require('../services/tarea');

exports.tarea = async function (request, response) {
    const { id } = request.params;
    const user = await taskService.task(id);
    response.json(user);
}

exports.tareas = async function (request, response) {
    const users = await taskService.tasks();
    response.json(users);
}

exports.crearTarea = async function (request, response) {
    const { titulo, descripcion, fechaCreacion, fechaLimite, estatus, prioridad, usuarioId } = request.body;
    const userCreate = await taskService.createTask({ titulo, descripcion, fechaCreacion, fechaLimite, estatus, prioridad, usuarioId });
    response.json(userCreate);
}

exports.borrarTarea = async function (request, response) {
    const { id } = request.params;
    await taskService.delete(id);
    response.json("Tarea borrada");
}