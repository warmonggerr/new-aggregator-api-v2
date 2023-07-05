const express = require('express');
const router = express.Router();
const verifyToken = require("./../middlewares/validator")
const newsApis = require("./../controller/news");

router.get("/news", verifyToken, newsApis.news);
router.get("/sources", newsApis.sources);

module.exports = router;