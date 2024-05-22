const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// DB connection
mongoose;
dbConnect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("DB error: ", err));

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  job_title: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

app.get("/users", async (req, resp) => {
  const users = await User.find({});
  return resp.json(users);
});

// as "/api/users/:id" route is comman for these request we used .route() method
app
  .route("/api/users/:id")
  .get(async (req, resp) => {
    const user = await User.findById(req.params.id);
    resp.status(200).json({ message: "Success", user });
  })
  .patch(async (req, resp) => {
    const id = req.params.id;
    const body = req.body;

    await User.findByIdAndUpdate(id, body);
    resp.status(200).json({ message: "Success" });
  })
  .delete(async (req, resp) => {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    resp.status(200).json({ message: "Success" });
  });

app.post("/api/users", async (req, resp) => {
  const body = req.body;
  const { first_name, last_name, email, gender, job_title } = body;

  if (!first_name || !email || !gender) {
    return resp.status(400).json("All fields are required..");
  }

  await User.create({
    first_name,
    last_name,
    email,
    gender,
    job_title,
  });

  resp.status(201).json({
    message: "Success",
  });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
