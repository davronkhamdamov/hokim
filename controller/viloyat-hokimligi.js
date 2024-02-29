const ViloyatHokimligi = require("../db/viloyatHokimligi");
const { validateInput } = require("../config/validate");
ViloyatHokimligi.sync({ force: true });

async function ViloyatCreate(req, res) {
    const newData = ViloyatHokimligi.create({ text: req.body.text });
    try {
        await newData.save();
        res.send({
            message: "Yaratildi",
        });
    } catch (error) {
        console.error("Error creating SwiperPost:", error);
        res.status(500).send("Internal Server Error");
    }
}
async function ViloyatGet(req, res) {
    const data = await ViloyatHokimligi.findAll();
    res.send(data);
}
async function ViloyatDelete(req, res) {
    try {
        const { id } = req.params;

        if (!id || validateInput(id)) {
            return res.status(400).send({
                message: "Input must be a valid identifier.",
            });
        }
        const foundData = await ViloyatHokimligi.findOne({
            where: { id },
        });
        if (!foundData) {
            return res.status(404).send({
                message: "Not found",
            });
        }
        foundData.destroy({ where: { id } });
        res.send({ message: "deleted" });
    } catch (error) {
        console.error("Error deleting SwiperPost:", error);
        res.status(500).send("Internal Server Error");
    }
}
async function ViloyatUpdate(req, res) {
    try {
        const { id, text } = req.body;

        if (!id || validateInput(id)) {
            return res.status(400).send({
                message: "Input must be a valid identifier.",
            });
        }
        const foundData = await ViloyatHokimligi.findOne({
            where: { id },
        });
        if (!foundData) {
            return res.status(404).send({
                message: "Not found",
            });
        }
        foundData.update(
            {
                text,
            },
            {
                where: { id },
            }
        );
        res.send({ message: "updated" });
    } catch (error) {
        console.error("Error deleting SwiperPost:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    ViloyatCreate,
    ViloyatGet,
    ViloyatDelete,
    ViloyatUpdate,
};
