const http = require("http");
const fs = require("fs");

const getClientIp = (req) => {
  const xForwordedFor = req.headers["x-forworded-for"];

  let ip = xForwordedFor
    ? xForwordedFor.split(",")[0].trim()
    : req.connection.remoteAddress || req.socket.remoteAddress;

  // Check if the IP is an IPv6-mapped IPv4 address
  if (ip.startsWith("::ffff:")) {
    ip = ip.substring(7);
  }
  return ip;
};

const server = http.createServer((req, resp) => {
  const { method, url } = req;
  const clientIp = getClientIp(req);
  fs.appendFile(
    "./server.log",
    `${new Date().toISOString()} - Request from ${clientIp}: ${method} ${url}\n`,
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
