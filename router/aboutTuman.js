const { Router } = require("express");
const rout = Router();
const { getAll, Update, Create, Delete } = require("../controller/aboutTuman");
const authMiddleware = require("../middleware/auth");

rout.get("/tuman-about", getAll);
rout.post("/tuman-about", authMiddleware, Create);
rout.delete("/tuman-about/:id", authMiddleware, Delete);
rout.put("/tuman-about/:id", authMiddleware, Update);

module.exports = rout;
