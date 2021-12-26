const db = require('../db/db');

// Create main model
const User = db.users;
const Post = db.posts;

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
	return User.findAll({
		include: [Post]
	});
};
