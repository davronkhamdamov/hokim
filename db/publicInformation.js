const mongoose = require("mongoose");

const PublicInformationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  img_url: { type: String, required: true, trim: true },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

const PublicInformation = mongoose.model(
  "public_information",
  PublicInformationSchema,
);

module.exports = { PublicInformation };
