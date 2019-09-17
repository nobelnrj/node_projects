const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Create the Filepath
  let Filepath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension of the file
  let Extension = path.extname(Filepath);

  // Create Content Type
  let contentType = "text/html";

  //Check the extension type and set content type
  switch (Extension) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
  }

  // Read File
  fs.readFile(Filepath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // File missing
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          "utf8",
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content);
          }
        );
      } else {
        // Some Server error
        res.writeHead(500);
        res.end(`Server not found : ${err.code}`);
      }
    } else {
      //success
      fs.readFile(Filepath, "utf8", (err, content) => {
        res.writeHead(200, contentType);
        res.end(content);
      });
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running... on port ${PORT}`));
