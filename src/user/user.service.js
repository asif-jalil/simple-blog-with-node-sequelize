const User = require('./user.model');
const Post = require('../posts/posts.model');

module.exports.createUser = userInfo => {
	return User.create(userInfo);
};

module.exports.findUserByEmail = email => {
	return User.findOne({ where: { email: email } });
};

module.exports.findUserById = id => {
	return User.findOne({ where: { id: id } });
};

module.exports.findUsers = () => {
	return User.findAll({});
};
