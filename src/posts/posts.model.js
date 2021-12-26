module.exports = (sequelize, datatype) => {
	const Post = sequelize.define('post', {
		title: {
			type: datatype.STRING,
			allowNull: false
		},
		body: {
			type: datatype.TEXT,
			allowNull: false
		},
		category: {
			type: datatype.STRING
		},
		userId: {
			type: datatype.INTEGER,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		author: {
			type: datatype.STRING,
			allowNull: false
		}
	});

	Post.associate = models => {
		Post.belongsTo(models.users, {
			foreignKey: 'userId'
			// as: 'user'
		});
	};

	return Post;
};
