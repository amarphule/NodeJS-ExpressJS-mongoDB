const http = require("http");

const server = http.createServer((req, resp) => {
  console.log("url: ", req.url);

  resp.end("Hello response from http server");
});

server.listen("3000", () => {
  console.log("Server running port 3000");
});
