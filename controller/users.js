const {nanoid} = require("nanoid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {messages} = require("./../util/constants")

const {respond} = require("../middlewares/respond");
const db = require("../database/database");
const {Keys} = require("../util/constants");

function generateAccessToken(id) {
    return jwt.sign({id}, Keys.secretAccessKey, {expiresIn: 900});//Session id expires after 5 minutes
}

/*
Single object consisting of routing functions to handle unexpected errors (500)
 */
const users = {
    async register(req, res) {
        try {
            console.log("reqBody :: ", req.body);
            let users = db.getUsers();
            console.log("users :: ", users);
            let body = req.body;
            const id = nanoid(5);
            const passHash = bcrypt.hashSync(body.password, 8);//todo add req body validation
            const existingUser = users.find((user) => user.username === body.username);
            if (existingUser) {
                respond(res, messages.userExists, 400);
            } else {
                const newUser = {
                    id: id,
                    username: body.username,
                    password: passHash,
                    preferences: body.preferences
                };
                users.push(newUser);
                await db.writeUsers(users);
                respond(res, messages.registrationSuccess, 201);
            }
        } catch (err) {
            console.log("Error while registering user :: ", err);
            respond(res, messages.unexpectedError, 500);
        }
    },
    async login(req, res) {
        try {
            console.log("reqBody :: ", req.body);
            let users = db.getUsers();
            console.log("users :: ", users);
            let body = req.body;
            const existingUser = users.find((user) => user.username === body.username);
            if (!existingUser) {
                return res.status(404).json(messages.userNotFound);
            } else {
                const comparePass = bcrypt.compareSync(body.password, existingUser.password);
                if (!comparePass) {
                    return res.status(401).json(messages.incorrectPassword);
                }
                const accessToken = generateAccessToken(existingUser.id);
                return res.status(200).json({message: messages.loginSuccess, accessToken});
            }
        } catch (err) {
            console.log("Error while logging user :: ", err);
            respond(res, messages.unexpectedError, 500);
        }
    }
}

module.exports = users