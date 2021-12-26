const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');
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

// models.Sequelize = Sequelize;
// models.sequelize = sequelize;

models.user = require('../user/user.model')(sequelize, DataTypes);
models.post = require('../posts/posts.model')(sequelize, DataTypes);

Object.keys(models).forEach(key => {
	if (models[key].associate) {
		console.log(models[key]);
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
