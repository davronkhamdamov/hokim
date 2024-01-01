const { Router } = require("express");
const rout = Router();
const {
  SupportGetOne,
  SupportCreate,
  SupportGet,
  SupportDelete,
} = require("../controller/support");

rout.get("/support", SupportGet);
rout.get("/support/:id", SupportGetOne);
rout.post("/support", SupportCreate);
rout.delete("/support", SupportDelete);

module.exports = rout;
