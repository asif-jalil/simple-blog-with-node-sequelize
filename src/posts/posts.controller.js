const postService = require("./posts.service");

module.exports.createPosts = async function (req, res) {
  const post = {
    ...req.body,
    userId: req.params.userId,
  };

  try {
    const createdPost = await postService.createPost(post);
    return res.status(200).json(createdPost);
  } catch (e) {
    return res.status(500).json({ error: true, message: "Failed to create your post. Please try again" });
  }
};

module.exports.getPosts = async function (req, res) {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
  } catch (e) {
    return res.status(500).json({ error: true, message: "Failed to fetch your posts. Please try again" });
  }
};

module.exports.getPostById = async function (req, res) {
  const postId = req.params.id;

  try {
    const post = await postService.getPostById(postId);
    return res.status(200).json(post);
  } catch (e) {
    return res.status(500).json({ error: true, message: "Failed to fetch your posts. Please try again" });
  }
};

module.exports.updatePostById = async function (req, res) {
  const postId = req.params.id;
  const update = req.body;

  try {
    await postService.updatePostById(postId, update);
    return res.status(200).json({ message: "Your post has been updated successfully" });
  } catch (e) {
    return res.status(500).json({ error: true, message: "Something went wrong when update your post. Please try again" });
  }
};
module.exports.deletePostById = async function (req, res) {
  const postId = req.params.id;

  try {
    await postService.deletePostById(postId);
    return res.status(200).json({ message: "Your post has been deleted successfully" });
  } catch (e) {
    return res.status(500).json({ error: true, message: "Something went wrong when deleting your post. Please try again" });
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
    return res.status(500).json({ error: true, message: "Please enter a valid url" });
  }
};
