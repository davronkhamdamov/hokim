const { Support } = require("../db/support");
const { validateInput } = require("../config/validate");
const { pagination } = require("../config/pagination");

const SupportGet = async (req, res) => {
  const { page, page_size } = pagination(req);
  const support = await Support.find()
    .sort({ created_at: -1 })
    .limit(page_size)
    .skip(page * page_size);
  res.send({
    page,
    count: support?.length,
    page_size,
    data: support,
  });
};

const SupportGetOne = async (req, res) => {
  const { id } = req.params;
  if (!id || !validateInput(id)) {
    return res.status(400).send({
      message:
        "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
  const foundSupport = await Support.findOne({ _id: id });
  if (!foundSupport) {
    return res.send({
      message: "Post not found: " + id,
    });
  }
  res.send({
    data: foundSupport,
  });
};
const SupportCreate = async (req, res) => {
  const newPost = new Support({
    phone: req.body.phone,
    text: req.body.text,
    name: req.body.name,
  });
  await newPost.save();
  res.send({ message: "ok" });
};
const SupportDelete = async (req, res) => {
  const { id } = req.body;
  const foundSupport = await Support.findOne({ _id: id });
  if (!id || !validateInput(id)) {
    return res.status(400).send({
      message:
        "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
  if (!foundSupport) {
    return res.send({
      message: "Post not found: " + req.body.id,
    });
  }
  await Support.findByIdAndDelete(id);
  res.send({ message: "deleted" });
};
module.exports = {
  SupportGet,
  SupportCreate,
  SupportGetOne,
  SupportDelete,
};
