require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT||3000;

app.get("/", (req, res) => {
  res.send("Hello World! hello");
});

app.listen(port, () => {
  console.log(`Example appp lisening at http://localhost:${port}`);
});
