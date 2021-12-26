const postService = require('./posts.service');

module.exports.createPosts = async function (req, res) {
	const post = {
		...req.body,
		userId: req.params.id
	};
	const createdPost = await postService.createPost(post);
	return res.status(200).json(createdPost);
};

module.exports.getPosts = async function (req, res) {
	const posts = await postService.getPosts();
	return res.status(200).json(posts);
};

module.exports.getPostById = async function (req, res) {
	const postId = req.params.id;
	const post = await postService.getPostById(postId);
	return res.status(200).json(post);
};

module.exports.updatePostById = async function (req, res) {
	const postId = req.params.id;
	const update = req.body;
	await postService.updatePostById(postId, update);
	return res.status(200).json({ message: 'Your post has been updated successfully' });
};
module.exports.deletePostById = async function (req, res) {
	const postId = req.params.id;
	await postService.deletePostById(postId);
	return res.status(200).json({ message: 'Your post has been deleted successfully' });
};
