module.exports = (sequelize, datatype) => {
	const Post = sequelize.define(
		'post',
		{
			image: {
				type: datatype.STRING
			},
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
