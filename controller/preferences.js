const {respond} = require("../middlewares/respond");
const db = require("../database/database");
const {messages} = require("../util/constants");

const preferences = async (req, res) => {
    respond(res, req.user.preferences, 200);
}

const updatePreferences = async (req, res) => {
    console.log("reqBody :: ", req.body);
    let usersData = JSON.parse(JSON.stringify(db.getUsers()));
    const userIndex = usersData.findIndex((user) => user.id === req.user.id);
    if (userIndex === -1) {
        respond(res, messages.userNotFound, 404)
    }
    usersData[userIndex].preferences = req.body;
    db.writeUsers(usersData);
    respond(res, "OK", 200);
}

module.exports = {
    preferences,
    updatePreferences
}