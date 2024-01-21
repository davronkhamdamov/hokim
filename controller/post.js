const { validateInput } = require("../config/validate");
const { pagination } = require("../config/pagination");
const PostCategory = require("../db/post_category");
const Post = require("../db/post");
PostCategory.sync({ force: false });
Post.sync({ force: false });
const PostGet = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
    const { count, rows } = await Post.findAndCountAll({
      include: [
        {
          model: PostCategory,
        },
      ],
      order: [["created_at", "ASC"]],
      limit: per_page,
      distinct: true,
      offset: (page - 1) * page,
    });
    const result = pagination({ data: rows, count, page, per_page });
    res.send({
      data: result,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Internal Server Error");
  }
};
const PostGetByTuman = async (req, res) => {
  try {
    const { page, page_size } = pagination(req);

    const condition =
      req.params.tuman !== "Hammasi"
        ? {
            where: {
              field: req.params.field,
              decision: req.params.decision,
            },
          }
        : {};

    const posts = await Post.findAll({
      include: [
        {
          model: PostCategory,
          ...condition,
        },
      ],
      order: [["created_at", "ASC"]],
      limit: page_size,
      offset: page * page_size,
    });

    res.send({
      page,
      count: posts.length,
      page_size,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts by tuman:", error);
    res.status(500).send("Internal Server Error");
  }
};
const PostGetOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || validateInput(id)) {
      return res.status(400).send({
        message: "Input must be a valid identifier.",
      });
    }

    const foundPost = await Post.findOne({
      where: {
        id: id,
      },
    });

    if (!foundPost) {
      return res.status(404).send({
        message: "Post not found: " + id,
      });
    }

    res.send({
      data: foundPost,
    });
  } catch (error) {
    console.error("Error fetching post by id:", error);
    res.status(500).send("Internal Server Error");
  }
};
const PostCreate = async (req, res) => {
  try {
    const { title, description, img_url, category_id, tuman, decision, field } =
      req.body;

    await Post.create({
      title,
      description,
      img_url,
      category_id,
      decision,
      field,
    });

    res.send({ message: "ok" });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).send({ message: err.message });
  }
};
const PostDelete = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || validateInput(id)) {
      return res.status(400).send({
        message: "Input must be a valid identifier.",
      });
    }

    const foundPost = await Post.findOne({
      where: {
        id: id,
      },
    });

    if (!foundPost) {
      return res.status(404).send({
        message: "Post not found: " + id,
      });
    }

    await Post.destroy({
      where: {
        id: id,
      },
    });

    res.send({ message: "deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Internal Server Error");
  }
};

const PostUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { img_url, title, description, decision, field } = req.body;

    if (!id || validateInput(id)) {
      return res.status(400).send({
        message: "Input must be a valid identifier.",
      });
    }

    const foundPost = await Post.findOne({
      where: {
        id: id,
      },
    });

    if (!foundPost) {
      return res.status(404).send({
        message: "Post not found: " + id,
      });
    }

    await Post.update(
      {
        img_url,
        title,
        description,
        decision,
        field,
        updated_at: new Date(),
      },
      {
        where: {
          id: id,
        },
      },
    );

    res.send({ message: "updated" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send("Internal Server Error");
  }
};
const findByCategory = async (req, res) => {
  try {
    const category = await PostCategory.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!category) {
      return res.status(404).send({
        message: "Category not found",
      });
    }

    const { page, page_size } = pagination(req);

    const foundPostsByCategory = await Post.findAll({
      where: {
        category_id: req.params.id,
      },
      order: [["created_at", "ASC"]],
    });

    const totalPosts = await Post.count({
      where: {
        category_id: req.params.id,
      },
    });

    res.send({
      page,
      count: Math.ceil(totalPosts / page_size),
      page_size,
      data: foundPostsByCategory,
    });
  } catch (error) {
    console.error("Error finding posts by category:", error);
    res.status(500).send("Internal Server Error");
  }
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
