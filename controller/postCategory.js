const { postCategory } = require("../db/post_category");
const postCategoryGet = async (req, res) => {
  res.send(await postCategory.find());
};
const postCategoryGetOne = async (req, res) => {
  res.send(await postCategory.findOne({ _id: req.body.id }));
};
const postCategoryDelete = async (req, res) => {
  try {
    await postCategory.findByIdAndDelete(req.body.id);
    return res.send({ message: "deleted" });
  } catch (err) {
    res.send(err.message);
  }
};
const postCategoryUpdate = async (req, res) => {
  try {
    await postCategory.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
    });
    return res.send({
      message: "updated",
    });
  } catch (err) {
    res.send(err.message);
  }
};
const postCategoryCreate = async (req, res) => {
  try {
    const newPostCategory = new postCategory({
      title: req.body.title,
    });
    await newPostCategory.save();
    return res.status(201).send({ message: "created" });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  siyosatCategoryGet: postCategoryGet,
  postCategoryCreate,
  postCategoryUpdate,
  postCategoryGetOne,
  postCategoryDelete,
};
