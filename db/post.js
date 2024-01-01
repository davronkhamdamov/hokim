const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title1: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  img_url: { type: String, required: true, trim: true },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "post_category",
    required: true,
  },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

const Post = mongoose.model("posts", PostSchema);

module.exports = { Post };
