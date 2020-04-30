import express from "express";
import path from "path";
import open from "open";
import compression from "compression";

const port = 3000;
const app = express(); // instance of express

app.use(compression()); // this is NOT for actual production use.
//This is just useful for hosting the minified production build for local debuggin purpose.
app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err); // eslint-disable-line no-console
  } else {
    open("http://localhost:" + port);
  }
});
