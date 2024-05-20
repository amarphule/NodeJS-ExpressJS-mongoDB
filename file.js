const fs = require("fs");

// fs.writeFileSync("./text.txt", "Data from nodejs file");

// fs.writeFile(
//   "./demo.txt",
//   "Async operation need third parameter cb function",
//   () => {}
// );

console.log(fs.readFileSync("./contact.txt", "utf-8"));
console.log(
  fs.readFile("./text.txt", "utf-8", (error, data) => {
    console.log(data);
  })
);

fs.mkdir("demoDir/a/b", { recursive: true }, () => {});
