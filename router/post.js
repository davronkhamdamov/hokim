const { Router } = require("express");
const rout = Router();
const {
  PostGetOne,
  PostCreate,
  PostGet,
  PostDelete,
  PostUpdate,
  findByCategory,
} = require("../controller/post");

rout.get("/siyosat", PostGet);
rout.get("/siyosat/:id", PostGetOne);
rout.post("/siyosat", PostCreate);
rout.delete("/siyosat", PostDelete);
rout.put("/siyosat", PostUpdate);
rout.get("/post-by-category/:id", findByCategory);

module.exports = rout;
