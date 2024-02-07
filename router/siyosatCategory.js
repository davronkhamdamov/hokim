const { Router } = require("express");
const {
    siyosatCategoryGet,
    siyosatCategoryUpdate,
    siyosatCategoryCreate,
    siyosatCategoryDelete,
    siyosatCategoryGetOne,
} = require("../controller/siyosat-category");
const rout = Router();
const authMiddleware = require("../middleware/auth");

rout.get("/siyosat-category", siyosatCategoryGet);
rout.get("/siyosat-category/:id", siyosatCategoryGetOne);
rout.post("/siyosat-category", authMiddleware, siyosatCategoryCreate);
rout.put("/siyosat-category", authMiddleware, siyosatCategoryUpdate);
rout.delete("/siyosat-category", authMiddleware, siyosatCategoryDelete);

module.exports = rout;
