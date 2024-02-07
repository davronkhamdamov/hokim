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
const authMiddleware = require("../middleware/auth");

rout.get("/siyosat", siyosatGet);
rout.get("/siyosat/:id", siyosatGetOne);
rout.post("/siyosat", authMiddleware, siyosatCreate);
rout.delete("/siyosat", authMiddleware, siyosatDelete);
rout.put("/siyosat", authMiddleware, siyosatUpdate);
rout.get("/siyosat-by-category/:id", findByCategory);

module.exports = rout;
