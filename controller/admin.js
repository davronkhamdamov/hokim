const jwt = require("jsonwebtoken");

const Admin = (req, res) => {
    const { login, password } = req.body;
    if (login === process.env.LOGIN && password === process.env.PASSWORD) {
        const oneHour = 3600000;
        const expirationDate = new Date(Date.now() + oneHour);
        res.send({
            token: jwt.sign(
                { id: process.env.ACTION },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            ),
            expirationDate,
            message: "Access granted",
        });
    } else {
        res.status(400).send({
            message: "Login or password incorrect",
        });
    }
};

module.exports = Admin;
