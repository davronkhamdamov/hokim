const { Router } = require("express");
const rout = Router();

const {
  PublicInformationDelete,
  PublicInformationGetOne,
  PublicInformationGet,
  PublicInformationUpdate,
  PublicInformationCreate,
} = require("../controller/PublicInformation");

rout.get("/public", PublicInformationGet);
rout.get("/public/:id", PublicInformationGetOne);
rout.post("/public", PublicInformationCreate);
rout.delete("/public", PublicInformationDelete);
rout.put("/public", PublicInformationUpdate);

module.exports = rout;
