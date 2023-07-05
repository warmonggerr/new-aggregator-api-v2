const express = require('express');
const router = express.Router();
const preferenceApis = require("./../controller/preferences")
const verifyToken = require("./../middlewares/validator")


router.get("/preferences", verifyToken, preferenceApis.preferences);
router.put("/preferences", verifyToken, preferenceApis.updatePreferences);

module.exports = router;