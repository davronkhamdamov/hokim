const jwt = require("jsonwebtoken");

const Admin = (req, res) => {
    const { login, password } = req.body;
    if (login === process.env.LOGIN && password === process.env.PASSWORD) {
        const oneHour = 3600000;
        const expirationDate = new Date(Date.now() + oneHour);
        res.cookie(
            "authorization",
            jwt.sign({ id: process.env.ACTION }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            }),
            {
                expires: expirationDate,
                secure: true,
            }
        );
        res.send({
            message: "Access granted",
        });
    } else {
        res.status(400).send({
            message: "Login or password incorrect",
        });
    }
};

module.exports = Admin;
