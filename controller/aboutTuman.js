const aboutTuman = require("../db/aboutTuman");
aboutTuman.sync({ force: false });
const getAll = async (req, res) => {
    try {
        const allTuman = await aboutTuman.findAll();
        res.send(allTuman);
    } catch (err) {
        res.send(err);
    }
};
const Create = async (req, res) => {
    try {
        await aboutTuman.create(req.body);
        res.status(201).send({
            message: "created",
        });
    } catch (err) {
        res.send(err);
    }
};
const Update = async (req, res) => {
    try {
        await aboutTuman.update(
            { ...req.body, updated_at: new Date() },
            {
                where: { id: req.params.id },
            }
        );
        res.status(204).send();
    } catch (err) {
        res.send(err);
    }
};
const Delete = async (req, res) => {
    try {
        await aboutTuman.destroy({
            where: { id: req.params.id },
        });
        res.status(204).send();
    } catch (err) {
        res.send(err);
    }
};

module.exports = { getAll, Create, Update, Delete };
