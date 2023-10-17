const taskService = require('../services/tarea');
const labelService = require('../services/etiqueta');

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
    const { titulo, descripcion, fechaCreacion, fechaLimite, estatus, prioridad, usuarioId, nombre } = request.body;
    const taskCreate = await taskService.createTask({ titulo, descripcion, fechaCreacion, fechaLimite, estatus, prioridad, usuarioId});
    const labelCreate = await labelService.createLabel({ nombre });
    labelCreate.addTask(taskCreate);
    response.json("Etiqueta y tarea agregadas");
}

exports.borrarTarea = async function (request, response) {
    const { id } = request.params;
    await taskService.delete(id);
    response.json("Tarea borrada");
}