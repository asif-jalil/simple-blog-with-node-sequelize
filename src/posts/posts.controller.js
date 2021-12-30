const postService = require('./posts.service');
const multer = require('multer');
const path = require('path');
const {
	mkdirSync,
	constants,
	promises: { access }
} = require('fs');

module.exports.createPosts = async function (req, res) {
	const imgName = req.file.destination + req.file.filename;
	const post = {
		...req.body,
		image: imgName,
		userId: req.params.userId
	};

	try {
		const createdPost = await postService.createPost(post);
		return res.status(200).json(createdPost);
	} catch (e) {
		return res.status(500).json({ error: true, message: 'Failed to create your post. Please try again' });
	}
};

module.exports.getPosts = async function (req, res) {
	try {
		const posts = await postService.getPosts();
		return res.status(200).json(posts);
	} catch (e) {
		return res.status(500).json({ error: true, message: 'Failed to fetch your posts. Please try again' });
	}
};

module.exports.getPostById = async function (req, res) {
	const postId = req.params.id;

	try {
		const post = await postService.getPostById(postId);
		return res.status(200).json(post);
	} catch (e) {
		return res.status(500).json({ error: true, message: 'Failed to fetch your posts. Please try again' });
	}
};

module.exports.updatePostById = async function (req, res) {
	const postId = req.params.id;
	const update = req.body;

	try {
		await postService.updatePostById(postId, update);
		return res.status(200).json({ message: 'Your post has been updated successfully' });
	} catch (e) {
		return res.status(500).json({ error: true, message: 'Something went wrong when update your post. Please try again' });
	}
};
module.exports.deletePostById = async function (req, res) {
	const postId = req.params.id;

	try {
		await postService.deletePostById(postId);
		return res.status(200).json({ message: 'Your post has been deleted successfully' });
	} catch (e) {
		return res.status(500).json({ error: true, message: 'Something went wrong when deleting your post. Please try again' });
	}
};

module.exports.getPostByPagination = async function (req, res) {
	const pageNumber = req.query.page || 1;
	const perPage = req.query.posts || 3;

	const limit = Number(perPage);
	const offset = Number(pageNumber * limit - limit);

	try {
		const posts = await postService.getPostByPagination(offset, limit);
		return res.status(200).json(posts);
	} catch (e) {
		return res.status(500).json({ error: true, message: 'Please enter a valid url' });
	}
};

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const dir = req.originalUrl.split('/')[1];
		const filePath = `src/assets/img/${dir}`;
		mkdirSync(filePath, { recursive: true });
		cb(null, filePath);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	}
});

module.exports.upload = multer({
	storage: storage,
	limits: {
		fileSize: '1000000'
	},
	fileFilter: function (req, file, cb) {
		const fileTypes = /jpeg|jpg|png/;
		const mimeType = fileTypes.test(file.mimetype);
		const extname = fileTypes.test(path.extname(file.originalname));

		if (mimeType && extname) {
			return cb(null, true);
		}

		cb(new Error('Give proper file format to upload'));
	}
}).single('image');
