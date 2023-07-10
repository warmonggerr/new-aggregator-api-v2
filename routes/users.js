const express = require('express');
const router = express.Router();
const users = require("./../controller/users")
const validator = require("../middlewares/validator").validators

router.post("/register", validator.userRegistration, users.register);
router.post("/login", validator.userLogin, users.login);

module.exports = router;