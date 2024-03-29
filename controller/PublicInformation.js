const PublicInformation = require("../db/publicInformation");
const { validateInput } = require("../config/validate");
const { pagination } = require("../config/pagination");
PublicInformation.sync({ force: false });
const PublicInformationGet = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
    const { count, rows } = await PublicInformation.findAndCountAll({
      order: [["created_at", "ASC"]],
      limit: per_page,
      distinct: true,
      offset: (page - 1) * page,
    });
    res.send(pagination({ data: rows, count, page, per_page }));
  } catch (error) {
    console.error("Error fetching public information:", error);
    res.status(500).send("Internal Server Error");
  }
};

const PublicInformationGetOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || validateInput(id)) {
      return res.status(400).send({
        message: "Input must be a valid identifier.",
      });
    }

    const foundPublicInformation = await PublicInformation.findOne({
      where: {
        id: id,
      },
    });

    if (!foundPublicInformation) {
      return res.status(404).send({
        message: "Public Information not found: " + id,
      });
    }

    res.send({
      data: foundPublicInformation,
    });
  } catch (error) {
    console.error("Error fetching public information by id:", error);
    res.status(500).send("Internal Server Error");
  }
};

const PublicInformationCreate = async (req, res) => {
  try {
    const { title, description, img_url } = req.body;
    await PublicInformation.create({
      title,
      description,
      img_url,
    });

    res.send({ message: "ok" });
  } catch (error) {
    console.error("Error creating public information:", error);
    res.status(500).send("Internal Server Error");
  }
};

const PublicInformationDelete = async (req, res) => {
  try {
    await PublicInformation.destroy({
      where: {
        id: req.body.id,
      },
    });

    return res.send({ message: "deleted" });
  } catch (error) {
    console.error("Error deleting public information:", error);
    res.status(500).send("Internal Server Error");
  }
};

const PublicInformationUpdate = async (req, res) => {
  try {
    const { id, title, description, img_url } = req.body;
    await PublicInformation.update(
      {
        title,
        description,
        img_url,
        updated_at: new Date(),
      },
      {
        where: {
          id: id,
        },
      },
    );

    return res.send({ message: "updated" });
  } catch (error) {
    console.error("Error updating public information:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  PublicInformationGet,
  PublicInformationUpdate,
  PublicInformationGetOne,
  PublicInformationDelete,
  PublicInformationCreate,
};
