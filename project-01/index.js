const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 3000;

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, resp) => {
  return resp.json(users);
});

// as "/api/users/:id" route is comman for these request we used .route() method
app
  .route("/api/users/:id")
  .get((req, resp) => {
    const id = Number(req.params.id);
    let user = users.find((user) => user.id === id);
    // Check if the user was found and removed
    if (!user) {
      resp.status(404).json({ status: "Error", message: "User not found" });
      return;
    }
    resp.json(user);
  })
  .patch((req, resp) => {
    const id = Number(req.params.id);

    let userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      resp.status(404).json({ status: "Error", message: "User not found" });
      return;
    }

    const updatedUser = { ...users[userIndex], ...req.body };

    users[userIndex] = updatedUser;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) throw err;
      resp.json({ status: "Successfully Update", id });
    });
  })
  .delete((req, resp) => {
    let initialLength = users.length;
    const id = Number(req.params.id);

    const updatedUsers = users.filter((user) => user.id !== id);

    // Check if the user was found and removed
    if (users.length === initialLength) {
      resp.status(404).json({ status: "Error", message: "User not found" });
      return;
    }

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(updatedUsers), (err) => {
      if (err) throw err;
      resp.json({ status: "Successfully deleted", id });
    });
  });

app.post("/api/users", (req, resp) => {
  const body = req.body;

  users.push({ id: users.length + 1, ...body });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) throw err;
    resp.json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
