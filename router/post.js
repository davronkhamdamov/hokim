const { Router } = require("express");
const rout = Router();
const {
    PostGetOne,
    PostCreate,
    PostGet,
    PostDelete,
    PostUpdate,
    findByCategory,
    PostGetByTuman,
} = require("../controller/post");
const authMiddleware = require("../middleware/auth");

rout.get("/tuman", PostGet);
rout.get("/tuman/:id", PostGetOne);
rout.post("/tuman", authMiddleware, PostCreate);
rout.delete("/tuman", authMiddleware, PostDelete);
rout.put("/tuman", authMiddleware, PostUpdate);
rout.get("/post-by-category/:id", findByCategory);
rout.get("/post-by-tuman/:tuman", PostGetByTuman);

module.exports = rout;
