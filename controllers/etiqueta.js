const taskService = require('../services/tarea');
const labelService = require('../services/etiqueta');

exports.etiqueta = async function (request, response) {
    const { id } = request.params;
    const user = await labelService.task(id);
    response.json(user);
}

exports.etiquetas = async function (request, response) {
    const users = await labelService.tasks();
    response.json(users);
}

exports.crearEtiqueta = async function (request, response) {
    const { titulo, descripcion, fechaCreacion, fechaLimite, estatus, prioridad, usuarioId, nombre } = request.body;
    const taskCreate = await taskService.createTask({ titulo, descripcion, fechaCreacion, fechaLimite, estatus, prioridad, usuarioId});
    const labelCreate = await labelService.createLabel({ nombre });
    labelCreate.addTask(taskCreate);
    response.json("Etiqueta y tarea agregadas");
}

exports.borrarEtiqueta = async function (request, response) {
    const { id } = request.params;
    await labelService.delete(id);
    response.json("Etiqueta borrada");
}