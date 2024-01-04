const express = require("express");
const cors = require("cors");
require("./core/db");

const post = require("./router/post");
const supportPost = require("./router/support");
const swiperPost = require("./router/swiperPost");
const postCategory = require("./router/postCategory");
const siyosatCategory = require("./router/siyosatCategory");
const siyosat = require("./router/siyosat");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "ok",
  });
});

app.use(post);
app.use(swiperPost);
app.use(supportPost);
app.use(postCategory);
app.use(siyosat);
app.use(siyosatCategory);

app.listen(PORT, () => {
  console.log("Server is running on the url http://localhost:" + PORT);
});
