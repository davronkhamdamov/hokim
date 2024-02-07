const { Router } = require("express");
const rout = Router();
const {
    swiperPostGet,
    swiperPostGetOne,
    swiperPostCreate,
    swiperPostDelete,
    swiperPostUpdate,
} = require("../controller/swiperPost");
const authMiddleware = require("../middleware/auth");

rout.get("/swiper-post", swiperPostGet);
rout.get("/swiper-post/:id", swiperPostGetOne);
rout.post("/swiper-post", authMiddleware, swiperPostCreate);
rout.delete("/swiper-post", authMiddleware, swiperPostDelete);
rout.put("/swiper-post/:id", authMiddleware, swiperPostUpdate);
module.exports = rout;
