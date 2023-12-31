const User = require('../models/usuario');

exports.createUser = function (user) {
    return User.create(user);
};

exports.users = function () {
    return User.findAll();
}

exports.user = function (id) {
    return User.findByPk(id);
}

exports.delete = function (id) {
    User.destroy({
        where: {
            id: id
        },
    });
}

exports.findByUsername = function (nombreUsuario) {
	return User.findOne({
		where: {
			nombreUsuario,
		},
	});
};

exports.findById = function (id) {
	return User.findByPk(id);
};