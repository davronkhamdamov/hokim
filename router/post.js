const { Router } = require("express");
const rout = Router();
const {
  PostGetOne,
  PostCreate,
  PostGet,
  PostDelete,
  PostUpdate,
  findByCategory,
  PostGetByTuman,
} = require("../controller/post");

rout.get("/post", PostGet);
rout.get("/post/:id", PostGetOne);
rout.post("/post", PostCreate);
rout.delete("/post", PostDelete);
rout.put("/post", PostUpdate);
rout.get("/post-by-category/:id", findByCategory);
rout.get("/post-by-tuman/:tuman", PostGetByTuman);

module.exports = rout;
