const jwt = require("jsonwebtoken");
const db = require("./../database/database");
const { messages, Keys} = require("../util/constants");
const {respond} = require("./respond");

module.exports = async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("Auth header not present")
        respond(res, messages.missingAuth, 401);
    }
    const accessToken = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(accessToken, Keys.secretAccessKey);
        const users = db.getUsers();
        req.user = users.find((user) => user.id === decoded.id);
        if (!req.user) {
            return res.status(401).json({ error: messages.invalidToken });
        }
        next();
    } catch (err) {
        console.log("err :: ", err);
        return res.status(500).json({ error: messages.unexpectedError});
    }
};
