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

rout.get("/tuman", PostGet);
rout.get("/tuman/:id", PostGetOne);
rout.post("/tuman", PostCreate);
rout.delete("/tuman", PostDelete);
rout.put("/tuman", PostUpdate);
rout.get("/post-by-category/:id", findByCategory);
rout.get("/post-by-tuman/:tuman", PostGetByTuman);

module.exports = rout;
