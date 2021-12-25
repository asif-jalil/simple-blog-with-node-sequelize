// const mongoose = require('mongoose');
const db = require('../db/db');
const User = require('../user/user.model');

const postSchema = {
	title: {
		type: db.DataTypes.STRING,
		allowNull: false
	},
	body: {
		type: db.DataTypes.TEXT,
		allowNull: false
	},
	category: {
		type: db.DataTypes.STRING
	},
	author: {
		type: db.DataTypes.STRING,
		allowNull: false
	}
};

const Post = db.sequelize.define('post', postSchema);

module.exports = Post;
