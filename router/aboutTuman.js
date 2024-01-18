const { Router } = require("express");
const rout = Router();
const { getAll, Update, Create, Delete } = require("../controller/aboutTuman");

rout.get("/tuman-about", getAll);
rout.post("/tuman-about", Create);
rout.delete("/tuman-about/:id", Delete);
rout.put("/tuman-about/:id", Update);

module.exports = rout;
