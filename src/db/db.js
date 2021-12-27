const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');
const path = require('path');
const fs = require('fs');
const models = {};

const dbURL = dbConfig.db;
if (!dbURL) {
	console.error('Database is not set in env file or config.js');
	return new Error('Database is not set in env file or config.js');
}

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
	host: dbConfig.host,
	dialect: dbConfig.dialect,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});

(async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

const src = __dirname.replace(/\\/g, '/').split('/src')[0].concat('/src');
const srcFiles = fs.readdirSync(src);
srcFiles.forEach(file => {
	const isDir = fs.lstatSync(path.join(src, file)).isDirectory();
	if (isDir) {
		const childFiles = fs.readdirSync(path.join(src, file));

		childFiles.forEach(childFile => {
			if (childFile.includes('.model.js')) {
				const modelName = childFile.split('.model.js')[0];
				models[modelName] = require(`../${file}/${childFile.split('.js')[0]}`)(sequelize, DataTypes);
			}
		});
	}
});

// models.users = require('../users/users.model')(sequelize, DataTypes);
// models.posts = require('../posts/posts.model')(sequelize, DataTypes);

Object.keys(models).forEach(key => {
	if (models[key].associate) {
		models[key].associate(models);
	}
});

sequelize
	.sync({ force: false })
	.then(() => {
		console.log('Re sync done!');
	})
	.catch(err => console.trace(err));

module.exports = models;
