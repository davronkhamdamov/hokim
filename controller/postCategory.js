const PostCategory = require("../db/post_category");
PostCategory.sync({ force: false });
const postCategoryGet = async (req, res) => {
  try {
    res.send(await PostCategory.findAll());
  } catch (error) {
    console.error("Error fetching post categories:", error);
    res.status(500).send("Internal Server Error");
  }
};

const postCategoryGetOne = async (req, res) => {
  try {
    res.send(await PostCategory.findOne({ where: { id: req.params.id } }));
  } catch (error) {
    console.error("Error fetching post category by id:", error);
    res.status(500).send("Internal Server Error");
  }
};

const postCategoryDelete = async (req, res) => {
  try {
    await PostCategory.destroy({ where: { id: req.body.id } });
    return res.send({ message: "deleted" });
  } catch (error) {
    console.error("Error deleting post category:", error);
    res.status(500).send("Internal Server Error");
  }
};

const postCategoryUpdate = async (req, res) => {
  try {
    await PostCategory.update(
      { title: req.body.title },
      { where: { id: req.body.id } },
    );
    return res.send({ message: "updated" });
  } catch (error) {
    console.error("Error updating post category:", error);
    res.status(500).send("Internal Server Error");
  }
};

const postCategoryCreate = async (req, res) => {
  try {
    await PostCategory.create({ title: req.body.title });
    return res.status(201).send({ message: "created" });
  } catch (error) {
    console.error("Error creating post category:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  postCategoryGet,
  postCategoryCreate,
  postCategoryUpdate,
  postCategoryGetOne,
  postCategoryDelete,
};
