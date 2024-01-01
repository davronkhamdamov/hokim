const mongoose = require("mongoose");

const siyosatCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
});
const siyosatCategory = mongoose.model(
  "siyosat_category",
  siyosatCategorySchema,
);

module.exports = { siyosatCategory };
