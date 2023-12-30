const { Router } = require("express");
const rout = Router();
const {
  PostGetOne,
  PostCreate,
  PostGet,
  PostDelete,
} = require("../controller/post");

rout.get("/post", PostGet);
rout.get("/post/:id", PostGetOne);
rout.post("/post", PostCreate);
rout.delete("/post", PostDelete);

module.exports = rout;
