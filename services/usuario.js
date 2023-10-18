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

exports.findByUsername = function (username) {
	return User.findOne({
		where: {
			username,
		},
	});
};

exports.findById = function (id) {
	return User.findByPk(id);
};