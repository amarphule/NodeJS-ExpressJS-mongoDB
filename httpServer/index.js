const http = require("http");
const fs = require("fs");

const server = http.createServer((req, resp) => {
  const { method, url } = req;
  fs.appendFile(
    "./server.log",
    `${new Date().toISOString()} - Request: ${method} ${url}\n`,
    (err) => {
      if (err) {
        console.log("Fail to write log file: ", err);
      }
    }
  );
  resp.end("Hello response from http server");
});

server.listen("3000", () => {
  console.log("Server running port 3000");
});
