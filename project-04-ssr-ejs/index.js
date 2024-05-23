const express = require("express");
const { dbConnect } = require("./dbConnect");
const urlRouter = require("./routes/url");
const path = require("path");

// Load environment variables from .env file
require("dotenv").config();

const app = express();
const PORT = 8000;

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Set the directory where the template files are located
app.set("views", path.join(__dirname, "views"));

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
dbConnect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log("Error connecting to DB: ", error));

// Routes
app.use("/url", urlRouter);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
