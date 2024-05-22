const express = require("express");
const { dbConnect } = require("./dbConnect");
const urlRouter = require("./routes/url");

// Load environment variables from .env file
require("dotenv").config();

const app = express();
const PORT = 8000;

// Encode json
app.use(express.json());

// Database connection
dbConnect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log("Error connecting to DB: ", error));

// Routes
app.use("/url", urlRouter);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
