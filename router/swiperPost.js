const { Router } = require("express");
const rout = Router();
const {
  swiperPostGet,
  swiperPostGetOne,
  swiperPostCreate,
  swiperPostDelete,
} = require("../controller/swiperPost");

rout.get("/swiper-post", swiperPostGet);
rout.get("/swiper-post/:id", swiperPostGetOne);
rout.post("/swiper-post", swiperPostCreate);
rout.delete("/swiper-post", swiperPostDelete);
module.exports = rout;
