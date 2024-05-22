const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    required: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  visitHistory: [
    {
      timestamp: {
        type: Number,
      },
    },
  ],
});

const Url = mongoose.model("url", urlSchema);

module.exports = { Url };
