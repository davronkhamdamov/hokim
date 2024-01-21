const SwiperPost = require("../db/swiperPost");
const { validateInput } = require("../config/validate");
SwiperPost.sync({ force: false });
const swiperPostGet = async (req, res) => {
  try {
    const posts = await SwiperPost.findAll({
      order: [["created_at", "DESC"]],
    });

    res.send({
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching SwiperPosts:", error);
    res.status(500).send("Internal Server Error");
  }
};

const swiperPostGetOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || validateInput(id)) {
      return res.status(400).send({
        message: "Input must be a valid identifier.",
      });
    }

    const foundPost = await SwiperPost.findOne({
      where: {
        id: id,
      },
    });

    if (!foundPost) {
      return res.status(404).send({
        message: "SwiperPost not found: " + id,
      });
    }

    res.send({
      message: "ok",
      data: foundPost,
    });
  } catch (error) {
    console.error("Error fetching SwiperPost by id:", error);
    res.status(500).send("Internal Server Error");
  }
};

const swiperPostCreate = async (req, res) => {
  try {
    const { title, description, img_url } = req.body;
    await SwiperPost.create({
      title,
      description,
      img_url,
    });

    res.send({ message: "ok" });
  } catch (error) {
    console.error("Error creating SwiperPost:", error);
    res.status(500).send("Internal Server Error");
  }
};

const swiperPostDelete = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id || validateInput(id)) {
      return res.status(400).send({
        message: "Input must be a valid identifier.",
      });
    }

    const foundPost = await SwiperPost.findOne({
      where: {
        id: id,
      },
    });

    if (!foundPost) {
      return res.status(404).send({
        message: "SwiperPost not found: " + req.body.id,
      });
    }

    await SwiperPost.destroy({
      where: {
        id: id,
      },
    });

    res.send({ message: "deleted" });
  } catch (error) {
    console.error("Error deleting SwiperPost:", error);
    res.status(500).send("Internal Server Error");
  }
};

const swiperPostUpdate = async (req, res) => {
  try {
    const { img_url, title, description } = req.body;

    if (!req.params.id || validateInput(req.params.id)) {
      return res.status(400).send({
        message: "Input must be a valid identifier.",
      });
    }

    const foundPost = await SwiperPost.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!foundPost) {
      return res.status(404).send({
        message: "SwiperPost not found: " + req.params.id,
      });
    }

    await SwiperPost.update(
      {
        img_url,
        title,
        description,
        updated_at: new Date(),
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    res.send({ message: "updated" });
  } catch (error) {
    console.error("Error updating SwiperPost:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  swiperPostGet,
  swiperPostCreate,
  swiperPostGetOne,
  swiperPostDelete,
  swiperPostUpdate,
};
