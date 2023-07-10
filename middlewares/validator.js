const jwt = require("jsonwebtoken");
const Joi = require("joi");
const db = require("./../database/database");
const {messages, Keys} = require("../util/constants");
const {respond} = require("./respond");

module.exports = async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("Auth header not present")
        respond(res, messages.missingAuth, 401);
    }
    console.log("Auth Header :: ", authHeader);
    const accessToken = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(accessToken, Keys.secretAccessKey);
        const users = db.getUsers();
        req.user = users.find((user) => user.id === decoded.id);
        if (!req.user) {
            return res.status(401).json({error: messages.invalidToken});
        }
        next();
    } catch (err) {
        console.log("err :: ", err);
        return res.status(500).json({error: messages.unexpectedError});
    }
};

const userRegistration = (req, res, next) => {
    const userValidator = Joi.object({
        emailId: Joi.string().email().required().label("emailId"),
        password: Joi.string().min(6).max(10).required().label("password"),
        preferences: Joi.object({
            sources: Joi.array().items(Joi.string()).required(),
            categories: Joi.array().items(Joi.string()).required(),
        }).required(),
    });

    const {error, values} = userValidator.validate(req.body);

    if (error) {
        respond(res, error.message, 400);
    } else {
        next();
    }
}

const userLogin = (req, res, next) => {
    const loginValidator = Joi.object({
        emailId: Joi.string().email().required().label("emailId"),
        password: Joi.string().min(6).max(10).required().label("password"),
    });

    const {error, values} = loginValidator.validate(req.body);

    if (error) {
        respond(res, error.message, 400);
    } else {
        next();
    }
}

module.exports.validators = {
    userRegistration,
    userLogin
}
