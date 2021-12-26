const db = require('../db/db');

// create main model
const Post = db.posts;

module.exports.createPost = async function (post) {
	return await Post.create(post);
};

module.exports.getPosts = async function () {
	return await Post.findAll({});
};

module.exports.getPostById = async function (postId) {
	return await Post.findOne({ where: { id: postId } });
};

module.exports.updatePostById = async function (postId, update) {
	return await Post.update(update, { where: { id: postId } });
};

module.exports.deletePostById = async function (postId) {
	return await Post.destroy({ where: { id: postId } });
};
