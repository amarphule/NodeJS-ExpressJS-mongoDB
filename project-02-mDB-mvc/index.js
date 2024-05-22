const express = require("express");
const { connectToDb } = require("./connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 3000;

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// DB connection
dbConnect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("DB error: ", err));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
