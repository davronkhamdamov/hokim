const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema({
  phone: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

const Support = mongoose.model("support", SupportSchema);

module.exports = { Support };
