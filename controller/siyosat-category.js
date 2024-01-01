const { siyosatCategory } = require("../db/siyosat_category");
const siyosatCategoryGet = async (req, res) => {
  res.send(await siyosatCategory.find());
};
const siyosatCategoryGetOne = async (req, res) => {
  res.send(await siyosatCategory.findOne({ _id: req.body.id }));
};
const siyosatCategoryDelete = async (req, res) => {
  try {
    await siyosatCategory.findByIdAndDelete(req.body.id);
    return res.send({ message: "deleted" });
  } catch (err) {
    res.send(err.message);
  }
};
const siyosatCategoryUpdate = async (req, res) => {
  try {
    await siyosatCategory.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
    });
    return res.send({
      message: "updated",
    });
  } catch (err) {
    res.send(err.message);
  }
};
const siyosatCategoryCreate = async (req, res) => {
  try {
    const newSiyosatCategory = new siyosatCategory({
      title: req.body.title,
    });
    await newSiyosatCategory.save();
    return res.status(201).send({ message: "created" });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  siyosatCategoryGet,
  siyosatCategoryCreate,
  siyosatCategoryUpdate,
  siyosatCategoryGetOne,
  siyosatCategoryDelete,
};
