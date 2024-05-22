# Building and Connecting REST API's using Nodejs and Expresjs and MongoDB

- Install [Node](https://nodejs.org/en/download/package-manager) on your machine.
- The creation of dummy User data use [Mockaroo](https://www.mockaroo.com/) and change the format to JSON.

## Initiate with an empty directory

### Installation

Add Package.json file by using the command

```bash
npm init
```

Add Express package from npm

```bash
npm install express
```

Add Mongoose package from npm

```bash
npm install mongoose
```

## Usage

```js
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

mongoose
  .connect("mongoose connection string")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("DB error: ", err));

const userSchema = new mongoose.Schema({
  first_name: {
    type: string,
    required: true,
  },
  last_name: {
    type: string,
  },
  email: {
    type: string,
    required: true,
    unique: true,
  },
  gender: {
    type: string,
    required: true,
  },
  job_title: {
    type: string,
  },
});

const User = mongoose.model("user", userSchema);

app.get("/users", (req, resp) => {
  const users = User.find({});
  return resp.json(users);
});

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
