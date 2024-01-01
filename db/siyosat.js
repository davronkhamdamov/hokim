const mongoose = require("mongoose");

const siyosatSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  img_url: { type: String, required: true, trim: true },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "siyosat_category",
    required: true,
  },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

const Siyosat = mongoose.model("siyosat", siyosatSchema);

module.exports = { Siyosat };
