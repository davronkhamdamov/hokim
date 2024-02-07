const { Router } = require("express");
const {
    postCategoryGet,
    postCategoryUpdate,
    postCategoryCreate,
    postCategoryDelete,
    postCategoryGetOne,
} = require("../controller/postCategory");
const rout = Router();
const authMiddleware = require("../middleware/auth");

rout.get("/post-category", postCategoryGet);
rout.get("/post-category/:id", postCategoryGetOne);
rout.post("/post-category", authMiddleware, postCategoryCreate);
rout.put("/post-category", authMiddleware, postCategoryUpdate);
rout.delete("/post-category", authMiddleware, postCategoryDelete);

module.exports = rout;
