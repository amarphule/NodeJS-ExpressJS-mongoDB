const express = require("express");
const {
  handleGetShortUrl,
  handleRedirectUrl,
  handleHistory,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGetShortUrl);
router.get("/:shortID", handleRedirectUrl);
router.get("/analytics/:shortID", handleHistory);

module.exports = router;
