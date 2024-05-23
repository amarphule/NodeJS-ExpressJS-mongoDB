const express = require("express");
const {
  handleGetShortUrl,
  handleRedirectUrl,
  handleHistory,
  handleGetAllurl,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGetShortUrl);
router.get("/", handleGetAllurl);
router.get("/:shortID", handleRedirectUrl);
router.get("/analytics/:shortID", handleHistory);

module.exports = router;
