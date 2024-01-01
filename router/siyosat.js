const { Router } = require("express");
const rout = Router();
const {
  siyosatGetOne,
  siyosatGet,
  siyosatCreate,
  siyosatDelete,
  siyosatUpdate,
  findByCategory,
} = require("../controller/siyosat");

rout.get("/siyosat", siyosatGet);
rout.get("/siyosat/:id", siyosatGetOne);
rout.post("/siyosat", siyosatCreate);
rout.delete("/siyosat", siyosatDelete);
rout.put("/siyosat", siyosatUpdate);
rout.get("/siyosat-by-category/:id", findByCategory);

module.exports = rout;
