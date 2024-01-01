const mongoose = require("mongoose");

const postCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
});
const postCategory = mongoose.model("post_category", postCategorySchema);

module.exports = { postCategory };
