const db = require("../db/db");

// create main model
const Post = db.post;
const User = db.user;

module.exports.createPost = async function (post) {
  return await Post.create(post);
};

module.exports.getPosts = async function () {
  return await Post.findAll({
    include: [{ model: User, attributes: ["id", "name"] }],
  });
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

module.exports.getPostByPagination = async function (offset, limit) {
  return await Post.findAll({ offset: offset, limit: limit });
};
