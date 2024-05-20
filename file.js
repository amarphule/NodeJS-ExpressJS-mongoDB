const fs = require("fs");

fs.writeFileSync("./text.txt", "Data from nodejs file");

fs.writeFile(
  "./demo.txt",
  "Async operation need third parameter cb function",
  () => {}
);
