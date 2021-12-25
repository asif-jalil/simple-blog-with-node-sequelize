const db = require('../db/db');
const Post = require('../posts/posts.model');

const userSchema = {
	name: {
		type: db.DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	email: {
		type: db.DataTypes.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		},
		unique: true
	},
	password: {
		type: db.DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
};

const User = db.sequelize.define('user', userSchema);

module.exports = User;
