const express = require('express');
const router = express.Router();
const postController = require('../posts/posts.controller');
const { isAuthenticated } = require('../users/users.controller');
const { logRequest } = require('../posts/posts.middleware');

router.get('/', function (req, res) {
	return res.json({ message: 'App is running' });
});
router.post('/posts/:userId', isAuthenticated, postController.createPosts);
router.get('/posts', postController.getPosts);
router.get('/posts/single/:id', postController.getPostById);
router.get('/posts/pagination', postController.getPostByPagination);
router.put('/posts/:id', postController.updatePostById);
router.delete('/posts/:id', postController.deletePostById);

module.exports = router;
