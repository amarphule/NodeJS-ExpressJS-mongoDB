# Building REST API's using Nodejs and Expresjs

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

## Usage

```js
const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 3000;

app.get("/users", (req, resp) => {
  return resp.json(users);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
