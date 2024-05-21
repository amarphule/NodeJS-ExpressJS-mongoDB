const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 3000;

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
  // Todo: Create user
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
