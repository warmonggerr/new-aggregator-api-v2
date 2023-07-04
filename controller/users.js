const {respond} = require("../middlewares/respond");
const {getData} = require("../database/database");

/*
Single object consisting of routing functions to handle unexpected errors (500)
 */
const users = {
    async register(req, res) {
        try {
            console.log("reqBody :: ", req.body);
            console.log(getData());
            respond(res, "success", 200);
        } catch (err) {
            console.log("Error while registering user :: ", err);
            respond(res, err, 500);
        }
    },
    async login(req, res) {
        try {
            console.log("reqBody :: ", req.body);
        } catch (err) {
            console.log("Error while logging user :: ", err);
            respond(res, err, 500);
        }
    }
}

module.exports = users