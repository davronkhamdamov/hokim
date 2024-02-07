const { Router } = require("express");
const rout = Router();
const Admin = require("../controller/admin");
const AuthMiddleware = require("../middleware/auth");

rout.post("/login", Admin);
rout.get("/is-admin", AuthMiddleware, (req, res) => {
    res.sendStatus(200);
});

module.exports = rout;
