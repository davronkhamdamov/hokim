const { SwiperPost } = require("../db/swiperPost");
const { validateInput } = require("../config/validate");
const { pagination } = require("../config/pagination");
const swiperPostGet = async (req, res) => {
  const { page, page_size } = pagination(req);
  const posts = await SwiperPost.find()
    .sort({ created_at: -1 })
    .limit(page_size)
    .skip(page * page_size);
  res.send({
    page,
    count: posts.length,
    page_size,
    data: posts,
  });
};

const swiperPostGetOne = async (req, res) => {
  const { id } = req.params;
  if (!id || !validateInput(id)) {
    return res.status(400).send({
      message:
        "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
  const foundPost = await SwiperPost.findOne({ id: id });
  if (!foundPost) {
    return res.send({
      message: "Swiper post not found : " + id,
    });
  }
  res.send({
    message: "ok",
    data: foundPost,
  });
};
const swiperPostCreate = async (req, res) => {
  const newPost = new SwiperPost({
    title: req.body.title,
    description: req.body.description,
    img_url: req.body.img_url,
  });
  await newPost.save();
  res.send({ message: "ok" });
};
const swiperPostDelete = async (req, res) => {
  const { id } = req.body;
  if (!id || !validateInput(id)) {
    return res.status(400).send({
      message:
        "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
  const foundPost = await SwiperPost.findOne({ _id: id });
  if (!foundPost) {
    return res.send({
      message: "Swiper Post not found: " + id,
    });
  }
  await SwiperPost.findByIdAndDelete(id);
  res.send({ message: "deleted" });
};
const swiperPostUpdate = async (req, res) => {
  const { img_url, title, description } = req.body;
  if (!req.params.id || !validateInput(req.params.id)) {
    return res.status(400).send({
      message:
        "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
  const foundPost = await SwiperPost.findOne({ _id: req.params.id });
  if (!foundPost) {
    return res.send({
      message: "Swiper Post not found: " + req.params.id,
    });
  }
  await SwiperPost.findByIdAndUpdate(req.params.id, {
    img_url,
    title,
    description,
    updated_at: new Date(),
  });
  res.send({ message: "updated" });
};
module.exports = {
  swiperPostGet,
  swiperPostCreate,
  swiperPostGetOne,
  swiperPostDelete,
  swiperPostUpdate,
};
