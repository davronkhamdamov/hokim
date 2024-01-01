const { Router } = require("express");
const {
  siyosatCategoryGet,
  postCategoryUpdate,
  postCategoryCreate,
  postCategoryDelete,
  postCategoryGetOne,
} = require("../controller/postCategory");
const rout = Router();

rout.get("/siyosat-category", siyosatCategoryGet);
rout.get("/siyosat-category/:id", postCategoryGetOne);
rout.post("/siyosat-category", postCategoryCreate);
rout.put("/siyosat-category", postCategoryUpdate);
rout.delete("/siyosat-category", postCategoryDelete);

module.exports = rout;
