module.exports = (sequelize, datatype) => {
	const Post = sequelize.define(
		'post',
		{
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
			author: {
				type: datatype.STRING,
				allowNull: false
			}
		},
		{
			tableName: 'posts'
		}
	);

	Post.associate = models => {
		Post.belongsTo(models.user, {
			foreignKey: 'userId'
		});
	};

	return Post;
};
