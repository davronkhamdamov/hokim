const Siyosat = require("../db/siyosat");
const SiyosatCategory = require("../db/siyosat_category");
const { validateInput } = require("../config/validate");
const { pagination } = require("../config/pagination");
Siyosat.sync({ force: false });
SiyosatCategory.sync({ force: false });
const siyosatGet = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
        const { count, rows } = await Siyosat.findAndCountAll({
            include: [{ model: SiyosatCategory }],
            order: [["created_at", "ASC"]],
            limit: per_page,
            distinct: true,
            offset: (page - 1) * page,
        });
        res.send(pagination({ data: rows, count, page, per_page }));
    } catch (error) {
        console.error("Error fetching siyosat:", error);
        res.status(500).send("Internal Server Error");
    }
};

const siyosatGetOne = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || validateInput(id)) {
            return res.status(400).send({
                message: "Input must be a valid identifier.",
            });
        }

        const foundSiyosat = await Siyosat.findOne({
            where: {
                id: id,
            },
        });

        if (!foundSiyosat) {
            return res.status(404).send({
                message: "Siyosat not found: " + id,
            });
        }

        res.send({
            data: foundSiyosat,
        });
    } catch (error) {
        console.error("Error fetching siyosat by id:", error);
        res.status(500).send("Internal Server Error");
    }
};

const siyosatCreate = async (req, res) => {
    try {
        const { title, description, img_url, category_id } = req.body;
        await Siyosat.create({
            title,
            description,
            img_url,
            category_id,
        });

        res.send({ message: "ok" });
    } catch (error) {
        console.error("Error creating siyosat:", error);
        res.status(500).send("Internal Server Error");
    }
};

const siyosatDelete = async (req, res) => {
    try {
        const { id } = req.body;
        const foundSiyosat = await Siyosat.findOne({ where: { id: id } });

        if (!id || validateInput(id)) {
            return res.status(400).send({
                message: "Input must be a valid identifier.",
            });
        }

        if (!foundSiyosat) {
            return res.status(404).send({
                message: "Siyosat not found: " + req.body.id,
            });
        }

        await Siyosat.destroy({
            where: {
                id: id,
            },
        });

        res.send({ message: "deleted" });
    } catch (error) {
        console.error("Error deleting siyosat:", error);
        res.status(500).send("Internal Server Error");
    }
};

const siyosatUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { img_url, title, description } = req.body;

        if (!id || validateInput(id)) {
            return res.status(400).send({
                message: "Input must be a valid identifier.",
            });
        }

        const foundSiyosat = await Siyosat.findOne({
            where: {
                id: id,
            },
        });

        if (!foundSiyosat) {
            return res.status(404).send({
                message: "Siyosat not found: " + req.params.id,
            });
        }

        await Siyosat.update(
            {
                img_url,
                title,
                description,
                updated_at: new Date(),
            },
            {
                where: {
                    id: id,
                },
            }
        );

        res.send({ message: "updated" });
    } catch (error) {
        console.error("Error updating siyosat:", error);
        res.status(500).send("Internal Server Error");
    }
};

const findByCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const siyosatCategory = await SiyosatCategory.findOne({
            where: { id: id },
        });

        if (!siyosatCategory) {
            return res.status(404).send({
                message: "Category not found",
            });
        }

        const { page, page_size } = pagination(req);

        const foundSiyosatByCategory = await Siyosat.findAll({
            where: {
                category_id: id,
            },
            order: [["created_at", "ASC"]],
        });

        res.send({
            page,
            count: foundSiyosatByCategory.length,
            page_size,
            data: foundSiyosatByCategory,
        });
    } catch (error) {
        console.error("Error finding siyosat by category:", error);
        res.status(500).send("Internal Server Error");
    }
};
module.exports = {
    siyosatGet,
    siyosatCreate,
    siyosatGetOne,
    siyosatDelete,
    siyosatUpdate,
    findByCategory,
};
