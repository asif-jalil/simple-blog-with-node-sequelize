module.exports = (sequelize, datatype) => {
	const User = sequelize.define('user', {
		name: {
			type: datatype.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		email: {
			type: datatype.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			},
			unique: true
		},
		password: {
			type: datatype.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	});

	User.associate = models => {
		User.hasMany(models.posts, {
			foreignKey: 'userId'
			// as: 'amar'
		});
	};

	return User;
};
