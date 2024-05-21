const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 3000;

app.get("/users", (req, resp) => {
  return resp.json(users);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
