const { Siyosat } = require("../db/siyosat");
const { validateInput } = require("../config/validate");
const { pagination } = require("../config/pagination");
const { siyosatCategory } = require("../db/siyosat_category");

const siyosatGet = async (req, res) => {
  const { page, page_size } = pagination(req);
  const siyosat = await Siyosat.find()
    .populate("category")
    .sort({ created_at: 1 })
    .limit(page_size)
    .skip(page * page_size);
  res.send({
    page,
    count: siyosat.length,
    page_size,
    data: siyosat,
  });
};

const siyosatGetOne = async (req, res) => {
  const { id } = req.params;
  if (!id || !validateInput(id)) {
    return res.status(400).send({
      message:
        "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
  const foundSiyosat = await Siyosat.findOne({ _id: id });
  if (!foundSiyosat) {
    return res.send({
      message: "Siyosat not found: " + id,
    });
  }
  res.send({
    data: foundSiyosat,
  });
};
const siyosatCreate = async (req, res) => {
  try {
    const newPost = new Siyosat({
      title: req.body.title,
      description: req.body.description,
      img_url: req.body.img_url,
      category: req.body.category,
    });
    await newPost.save();
    res.send({ message: "ok" });
  } catch (err) {
    res.send({ message: err.message });
  }
};
const siyosatDelete = async (req, res) => {
  const { id } = req.body;
  const foundSiyosat = await Siyosat.findOne({ _id: id });
  if (!id || !validateInput(id)) {
    return res.status(400).send({
      message:
        "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
  if (!foundSiyosat) {
    return res.send({
      message: "Post not found: " + req.body.id,
    });
  }
  await Siyosat.findByIdAndDelete(id);
  res.send({ message: "deleted" });
};
const siyosatUpdate = async (req, res) => {
  const { img_url, title, description } = req.body;
  if (!req.params.id || !validateInput(req.params.id)) {
    return res.status(400).send({
      message:
        "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
  const foundSiyosat = await Siyosat.findOne({ _id: req.params.id });
  if (!foundSiyosat) {
    return res.send({
      message: "Siyosat Post not found: " + req.params.id,
    });
  }
  await Siyosat.findByIdAndUpdate(req.params.id, {
    img_url,
    title,
    description,
    updated_at: new Date(),
  });
  res.send({ message: "updated" });
};
const findByCategory = async (req, res) => {
  const siyosat = await siyosatCategory.findOne({ _id: req.params.id });
  if (!siyosat) {
    return res.status(404).send({
      message: "Category not found",
    });
  }
  const { page, page_size } = pagination(req);
  const foundSiyosatByCategory = await Siyosat.find({ category: req.params.id })
    .find({ _id: req.params.id })
    .sort({ created_at: 1 })
    .limit(page_size)
    .skip(page * page_size);
  res.send({
    page,
    count: foundSiyosatByCategory.length,
    page_size,
    data: foundSiyosatByCategory,
  });
};
module.exports = {
  siyosatGet,
  siyosatCreate,
  siyosatGetOne,
  siyosatDelete,
  siyosatUpdate,
  findByCategory,
};
