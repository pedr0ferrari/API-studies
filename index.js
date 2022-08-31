const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
const port = 8000;

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/api", (req, res) => {
  res.send("api is working");
});

app.get("/api/:id", (req, res) => {
  res.send("with id " + req.params.id);
});

app.get("/api/:user/:id", (req, res) => {
  res.send("user with id " + req.params.id);
});

app.get("/register", (req, res) => {
  const name = req.query["name"];
  if (name) {
    res.send("user name: " + req.query.name);
  } else {
    res.send("no name was passed");
  }
});

app.get("/contact", (req, res) => {
  const phone = req.query["phone"];
  if (phone) {
    res.send("contact phone: " + req.query.phone);
  } else {
    res.send("no phone was passed");
  }
});

app.listen(port, () => {
  console.log("server initialized with success");
});
