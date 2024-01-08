const { Post } = require("../db/post");
const { validateInput } = require("../config/validate");
const { pagination } = require("../config/pagination");
const { postCategory } = require("../db/post_category");

const PostGet = async (req, res) => {
  const { page, page_size } = pagination(req);
  const posts = await Post.find()
    .populate("category")
    .sort({ created_at: 1 })
    .limit(page_size)
    .skip(page * page_size);
  res.send({
    page,
    count: posts.length,
    page_size,
    data: posts,
  });
};
const PostGetByTuman = async (req, res) => {
  const { page, page_size } = pagination(req);
  const posts = await Post.find({ tuman: req.params.tuman })
    .populate("category")
    .sort({ created_at: 1 })
    .limit(page_size)
    .skip(page * page_size);
  res.send({
    page,
    count: posts.length,
    page_size,
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
    data: foundPost,
  });
};
const PostCreate = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      img_url: req.body.img_url,
      category: req.body.category_id,
      tuman: req.body.tuman,
    });
    await newPost.save();
    res.send({ message: "ok" });
  } catch (err) {
    res.send({ message: err.message });
  }
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
const PostUpdate = async (req, res) => {
  const { img_url, title, description, tuman } = req.body;
  if (!req.params.id || !validateInput(req.params.id)) {
    return res.status(400).send({
      message:
        "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
  const foundPost = await Post.findOne({ _id: req.params.id });
  if (!foundPost) {
    return res.send({
      message: "Swiper Post not found: " + req.params.id,
    });
  }
  await Post.findByIdAndUpdate(req.params.id, {
    img_url,
    title,
    description,
    tuman,
    updated_at: new Date(),
  });
  res.send({ message: "updated" });
};
const findByCategory = async (req, res) => {
  const category = await postCategory.findOne({ _id: req.params.id });
  if (!category) {
    return res.status(404).send({
      message: "Category not found",
    });
  }
  const { page, page_size } = pagination(req);
  const foundPostsByCategory = await Post.find({ category: req.params.id })
    .sort({ created_at: 1 })
    .limit(page_size)
    .skip(page * page_size);
  res.send({
    page,
    count: Math.ceil(
      (await Post.countDocuments({ category: req.params.id })) / page_size,
    ),
    page_size,
    data: foundPostsByCategory,
  });
};
module.exports = {
  PostGet,
  PostCreate,
  PostGetOne,
  PostDelete,
  PostUpdate,
  findByCategory,
  PostGetByTuman,
};
