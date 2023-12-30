const { Post } = require("../db/post");
const { validateInput } = require("../config/validate");

const PostGet = async (req, res) => {
  const posts = await Post.find();
  res.send({
    status: "ok",
    data: posts,
  });
};

const PostGetOne = async (req, res) => {
  const { id } = req.params;
  if (!id || !validateInput(id)) {
    return res.status(400).send({
      message:
        "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
  const foundPost = await Post.findOne({ _id: id });
  if (!foundPost) {
    return res.send({
      message: "Post not found: " + id,
    });
  }
  res.send({
    message: "ok",
    data: foundPost,
  });
};
const PostCreate = async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
    img_url: req.body.img_url,
  });
  await newPost.save();
  res.send({ message: "ok" });
};
const PostDelete = async (req, res) => {
  const { id } = req.body;
  const foundPost = await Post.findOne({ _id: id });
  if (!id || !validateInput(id)) {
    return res.status(400).send({
      message:
        "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
  if (!foundPost) {
    return res.send({
      message: "Post not found: " + req.body.id,
    });
  }
  await Post.findByIdAndDelete(id);
  res.send({ message: "deleted" });
};
module.exports = { PostGet, PostCreate, PostGetOne, PostDelete };
