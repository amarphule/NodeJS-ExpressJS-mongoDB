const express = require("express");
const { dbConnect } = require("./dbConnect");

// Load environment variables from .env file
require("dotenv").config();

const app = express();
const PORT = 8000;

dbConnect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log("Error connecting to DB: ", error));

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
