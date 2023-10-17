const Label = require('../models/etiqueta');

exports.createLabel = function (label) {
    return Label.create(label);
};

exports.labels = function () {
    return Label.findAll();
}

exports.label = function (id) {
    return Label.findByPk(id);
}

exports.delete = function (id) {
    Label.destroy({
        where: {
            id: id
        },
    });
}