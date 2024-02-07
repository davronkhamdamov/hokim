const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
    try {
        const { authorization } = req.cookies;
        const decoded = jwt.verify(authorization, "Secret key");
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.clearCookie("authorization");
        res.status(401).json({ message: "Unauthorized" });
    }
};
