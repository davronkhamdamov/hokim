const { Router } = require("express");
const {
  postCategoryGet,
  postCategoryUpdate,
  postCategoryCreate,
  postCategoryDelete,
  postCategoryGetOne,
} = require("../controller/postCategory");
const rout = Router();

rout.get("/post-category", postCategoryGet);
rout.get("/post-category/:id", postCategoryGetOne);
rout.post("/post-category", postCategoryCreate);
rout.put("/post-category", postCategoryUpdate);
rout.delete("/post-category", postCategoryDelete);

module.exports = rout;
