const mongoose = require("mongoose");

const SwiperPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img_url: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

const SwiperPost = mongoose.model("swiperPosts", SwiperPostSchema);

module.exports = { SwiperPost };
