const { Router } = require("express");
const rout = Router();
const {
    SupportGetOne,
    SupportCreate,
    SupportGet,
    SupportDelete,
} = require("../controller/support");
const authMiddleware = require("../middleware/auth");

rout.get("/support", authMiddleware, SupportGet);
rout.get("/support/:id", authMiddleware, SupportGetOne);
rout.post("/support", SupportCreate);
rout.delete("/support", authMiddleware, SupportDelete);

module.exports = rout;
