const app = require("./app");
const express = require("express");
const csp = require("helmet-csp");
const path = require("path");
require("../db/mongoose");

const port = process.env.PORT;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["www.com", "data:"],
    },
  })
);

app.listen(port, () => console.log("Listening on port " + port));
