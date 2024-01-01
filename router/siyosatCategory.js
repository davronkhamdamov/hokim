const { Router } = require("express");
const {
  siyosatCategoryGet,
  siyosatCategoryUpdate,
  siyosatCategoryCreate,
  siyosatCategoryDelete,
  siyosatCategoryGetOne,
} = require("../controller/siyosat-category");
const rout = Router();

rout.get("/siyosat-category", siyosatCategoryGet);
rout.get("/siyosat-category/:id", siyosatCategoryGetOne);
rout.post("/siyosat-category", siyosatCategoryCreate);
rout.put("/siyosat-category", siyosatCategoryUpdate);
rout.delete("/siyosat-category", siyosatCategoryDelete);

module.exports = rout;
