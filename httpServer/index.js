const http = require("http");
const fs = require("fs");
const url = require("url");
const { getClientIp } = require("./utils");

const server = http.createServer((req, resp) => {
  const { method } = req;
  const clientIp = getClientIp(req);

  const logMessage = `${new Date().toISOString()} - Request from ${clientIp}: ${method} ${
    req.url
  }
}\n`;
  // used url package
  // const parsedUrl = url.parse(req.url);
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/favicon.ico") {
    return resp.end();
  }

  fs.appendFile("./server.log", logMessage, (err) => {
    if (err) {
      console.log("Fail to write log file: ", err);
    }
  });

  switch (pathname) {
    case "/":
      resp.end("Homepage");
      break;
    case "/about":
      const name = query.q;
      console.log("about ", query);
      resp.end(`I am ${name}`);
      break;
    case "/search":
      const search = query.search_query;
      console.log(query);
      resp.end(`You are looking for ${search}`);
      break;
    default:
      resp.end("404 page not found");
  }
});

server.listen("3000", () => {
  console.log("Server running port 3000");
});
