const Support = require("../db/support");
const { validateInput } = require("../config/validate");
const { pagination } = require("../config/pagination");
Support.sync({ force: false });
const SupportGet = async (req, res) => {
  try {
    const { page, page_size } = pagination(req);
    const support = await Support.findAll({
      order: [["created_at", "DESC"]],
      limit: page_size,
      offset: page * page_size,
    });

    res.send({
      page,
      count: support?.length,
      page_size,
      data: support,
    });
  } catch (error) {
    console.error("Error fetching support:", error);
    res.status(500).send("Internal Server Error");
  }
};

const SupportGetOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !validateInput(id)) {
      return res.status(400).send({
        message: "Input must be a valid identifier.",
      });
    }

    const foundSupport = await Support.findOne({
      where: {
        id: id,
      },
    });

    if (!foundSupport) {
      return res.status(404).send({
        message: "Support not found: " + id,
      });
    }

    res.send({
      data: foundSupport,
    });
  } catch (error) {
    console.error("Error fetching support by id:", error);
    res.status(500).send("Internal Server Error");
  }
};

const SupportCreate = async (req, res) => {
  try {
    const { phone, text, name } = req.body;
    await Support.create({
      phone,
      text,
      name,
    });

    res.send({ message: "ok" });
  } catch (error) {
    console.error("Error creating support:", error);
    res.status(500).send("Internal Server Error");
  }
};

const SupportDelete = async (req, res) => {
  try {
    const { id } = req.body;
    const foundSupport = await Support.findOne({ where: { id: id } });

    if (!id || !validateInput(id)) {
      return res.status(400).send({
        message: "Input must be a valid identifier.",
      });
    }

    if (!foundSupport) {
      return res.status(404).send({
        message: "Support not found: " + req.body.id,
      });
    }

    await Support.destroy({
      where: {
        id: id,
      },
    });

    res.send({ message: "deleted" });
  } catch (error) {
    console.error("Error deleting support:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  SupportGet,
  SupportCreate,
  SupportGetOne,
  SupportDelete,
};
