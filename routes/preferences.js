const express = require('express');
const router = express.Router();
const preferenceApis = require("./../controller/preferences")
const verifyToken = require("./../middlewares/validator")
const validator = require("../middlewares/validator").validators


router.get("/preferences", verifyToken, preferenceApis.preferences);
router.put("/preferences", verifyToken, validator.updatePreferences, preferenceApis.updatePreferences);

module.exports = router;