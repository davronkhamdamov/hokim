const { Router } = require("express");
const rout = Router();

const {
    PublicInformationDelete,
    PublicInformationGetOne,
    PublicInformationGet,
    PublicInformationUpdate,
    PublicInformationCreate,
} = require("../controller/PublicInformation");
const authMiddleware = require("../middleware/auth");

rout.get("/public", PublicInformationGet);
rout.get("/public/:id", PublicInformationGetOne);
rout.post("/public", authMiddleware, PublicInformationCreate);
rout.delete("/public", authMiddleware, PublicInformationDelete);
rout.put("/public", authMiddleware, PublicInformationUpdate);

module.exports = rout;
