const Task = require('../models/tarea');

exports.createTask = function (task) {
    return Task.create(task);
};

exports.tasks = function () {
    return Task.findAll();
}

exports.task = function (id) {
    return Task.findByPk(id);
}

exports.delete = function (id) {
    Task.destroy({
        where: {
            id: id
        },
    });
}