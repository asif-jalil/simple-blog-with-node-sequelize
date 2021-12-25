const Post = require('./posts.model');

module.exports.createPost = async function (post) {
	return Post.create(post);
};

module.exports.getPosts = async function () {
	return Post.findAll({});
};

module.exports.getPostById = async function (postId) {
	return Post.findOne({ where: { id: postId } });
};

module.exports.updatePostById = async function (postId, update) {
	return Post.findByIdAndUpdate(update, { where: { id: postId } });
};

module.exports.deletePostById = async function (postId) {
	return Post.destroy({ where: { id: postId } });
};
