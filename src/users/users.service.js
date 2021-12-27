const db = require('../db/db');

// Create main model
const User = db.user;
const Post = db.post;

module.exports.createUser = userInfo => {
	return User.create(userInfo);
};

module.exports.findUserByEmail = email => {
	return User.findOne({ where: { email: email } });
};

module.exports.findUserById = id => {
	return User.findOne({ where: { id: id } });
};

module.exports.findUserById = (id) => {
	return User.findOne({
		where: {id: id},
		attributes: ['id', 'name'],
		include: [Post]
	});
};
