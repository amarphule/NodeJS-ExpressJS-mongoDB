const express = require("express");
const { handleGetShortUrl, handleRedirectUrl } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGetShortUrl);
router.get("/:shortID", handleRedirectUrl);
module.exports = router;
