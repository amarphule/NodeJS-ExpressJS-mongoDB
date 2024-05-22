const { User } = require("../models/user");

async function handleGetAllUsers(req, resp) {
  const users = await User.find({});
  return resp.json(users);
}

async function handleCreateNewUser(req, resp) {
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
}
async function handleGetSingleUser(req, resp) {
  const user = await User.findById(req.params.id);
  resp.status(200).json({ message: "Success", user });
}
async function handleUpdateSingleUser(req, resp) {
  const id = req.params.id;
  const body = req.body;

  await User.findByIdAndUpdate(id, body);
  resp.status(200).json({ message: "Success" });
}
async function handleDeleteSingleUser(req, resp) {
  const id = req.params.id;
  await User.deleteOne({ _id: id });
  resp.status(200).json({ message: "Success" });
}

module.exports = {
  handleGetAllUsers,
  handleCreateNewUser,
  handleDeleteSingleUser,
  handleGetSingleUser,
  handleUpdateSingleUser,
};
