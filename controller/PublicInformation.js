const { PublicInformation } = require("../db/publicInformation");
const { validateInput } = require("../config/validate");
const { pagination } = require("../config/pagination");

const PublicInformationGet = async (req, res) => {
  const { page, page_size } = pagination(req);
  const posts = await PublicInformation.find()
    .sort({ created_at: 1 })
    .limit(page_size)
    .skip(page * page_size);
  res.send({
    page,
    page_size,
    data: posts,
  });
};
const PublicInformationGetOne = async (req, res) => {
  const { id } = req.params;
  if (!id || !validateInput(id)) {
    return res.status(400).send({
      message:
        "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
  const foundPublicInformation = await PublicInformation.findOne({ _id: id });
  if (!foundPublicInformation) {
    return res.send({
      message: "Public Information not found: " + id,
    });
  }
  res.send({
    data: foundPublicInformation,
  });
};
const PublicInformationCreate = async (req, res) => {
  try {
    const newPublicInformation = new PublicInformation({
      title: req.body.title,
      description: req.body.description,
      img_url: req.body.img_url,
    });
    await newPublicInformation.save();
    res.send({ message: "ok" });
  } catch (err) {
    res.send({ message: err.message });
  }
};
const PublicInformationDelete = async (req, res) => {
  try {
    await PublicInformation.findByIdAndDelete(req.body.id);
    return res.send({ message: "deleted" });
  } catch (err) {
    res.send(err.message);
  }
};
const PublicInformationUpdate = async (req, res) => {
  try {
    await PublicInformation.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      img_url: req.body.url,
      description: req.body.description,
      updated_at: new Date(),
    });
    return res.send({
      message: "updated",
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  PublicInformationGet,
  PublicInformationUpdate,
  PublicInformationGetOne,
  PublicInformationDelete,
  PublicInformationCreate,
};
