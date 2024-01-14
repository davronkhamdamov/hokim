const express = require("express");
const cors = require("cors");
require("./core/db");
const createError = require("http-errors");
const logger = require("morgan");

const post = require("./router/post");
const supportPost = require("./router/support");
const swiperPost = require("./router/swiperPost");
const postCategory = require("./router/postCategory");
const siyosatCategory = require("./router/siyosatCategory");
const siyosat = require("./router/siyosat");
const publicInformation = require("./router/publicInformation");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use(post);
app.use(swiperPost);
app.use(supportPost);
app.use(postCategory);
app.use(siyosat);
app.use(siyosatCategory);
app.use(publicInformation);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).send({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log("Server is running on the url http://localhost:" + PORT);
});
