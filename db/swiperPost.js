const mongoose = require("mongoose");

const SwiperPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img_url: { type: String, required: true },
});

const SwiperPost = mongoose.model("swiperPosts", SwiperPostSchema);

module.exports = { SwiperPost };
