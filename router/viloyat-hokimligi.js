const { Router } = require("express");
const rout = Router();
const {
    ViloyatCreate,
    ViloyatGet,
    ViloyatDelete,
    ViloyatUpdate,
} = require("../controller/viloyat-hokimligi");
const authMiddleware = require("../middleware/auth");

rout.get("/viloyat-hokimligi", ViloyatGet);
rout.post("/viloyat-hokimligi", authMiddleware, ViloyatCreate);
rout.put("/viloyat-hokimligi", authMiddleware, ViloyatUpdate);
rout.delete(
    "/viloyat-hokimligi",
    authMiddleware,
    authMiddleware,
    ViloyatDelete
);

module.exports = rout;
