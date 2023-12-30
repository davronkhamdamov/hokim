const express = require("express");
const cors = require("cors");
const post = require("./router/post");
require("./core/db");
const swiperPost = require("./router/swiperPost");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(post);
app.use(swiperPost);

app.listen(PORT, () => {
  console.log("Server is running on the url http://localhost:" + PORT);
});
