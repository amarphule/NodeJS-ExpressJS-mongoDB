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
    const user = users.find((user) => user.id === id);
    resp.json(user);
  })
  .patch(() => {
    // Todo: update user
  })
  .delete(() => {
    // Todo: Delete user
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
