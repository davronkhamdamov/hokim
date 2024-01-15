const SiyosatCategory = require("../db/siyosat_category");
SiyosatCategory.sync({ force: false });
const siyosatCategoryGet = async (req, res) => {
  try {
    const categories = await SiyosatCategory.findAll();
    res.send(categories);
  } catch (error) {
    console.error("Error fetching siyosat categories:", error);
    res.status(500).send("Internal Server Error");
  }
};

const siyosatCategoryGetOne = async (req, res) => {
  try {
    const category = await SiyosatCategory.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!category) {
      return res.status(404).send({
        message: "Siyosat category not found",
      });
    }

    res.send(category);
  } catch (error) {
    console.error("Error fetching siyosat category by id:", error);
    res.status(500).send("Internal Server Error");
  }
};

const siyosatCategoryCreate = async (req, res) => {
  try {
    const { title } = req.body;

    const newCategory = await SiyosatCategory.create({
      title,
    });

    res.status(201).send({ message: "created", data: newCategory });
  } catch (error) {
    console.error("Error creating siyosat category:", error);
    res.status(500).send("Internal Server Error");
  }
};

const siyosatCategoryUpdate = async (req, res) => {
  try {
    const { id, title } = req.body;

    const [updatedCount] = await SiyosatCategory.update(
      { title },
      {
        where: {
          id,
        },
      },
    );

    if (updatedCount === 0) {
      return res.status(404).send({
        message: "Siyosat category not found",
      });
    }

    res.send({ message: "updated" });
  } catch (error) {
    console.error("Error updating siyosat category:", error);
    res.status(500).send("Internal Server Error");
  }
};

const siyosatCategoryDelete = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedCount = await SiyosatCategory.destroy({
      where: {
        id,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).send({
        message: "Siyosat category not found",
      });
    }

    res.send({ message: "deleted" });
  } catch (error) {
    console.error("Error deleting siyosat category:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  siyosatCategoryGet,
  siyosatCategoryCreate,
  siyosatCategoryUpdate,
  siyosatCategoryGetOne,
  siyosatCategoryDelete,
};
