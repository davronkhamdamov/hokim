const mongoose = require("mongoose");
const { data } = require("../config/viloyat");
const hududlarSchema = new mongoose.Schema({
  tuman: { type: String, enum: data, require: true },
  updated_at: { type: Date, default: new Date() },
  created_at: { type: Date, default: new Date() },
});
const hududlar = mongoose.model("hududlar", hududlarSchema);

module.exports = hududlar;
