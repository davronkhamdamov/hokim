const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
    try {
        const { auth } = req.headers;
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
