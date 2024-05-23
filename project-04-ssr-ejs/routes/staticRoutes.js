const express = require("express");
const { handleGetAllurl } = require("../controllers/url");

const router = express.Router();

router.get("/", handleGetAllurl);

module.exports = router;
