const { Router } = require("express");
const rout = Router();
const Admin = require("../controller/admin");

rout.post("/login", Admin);

module.exports = rout;
