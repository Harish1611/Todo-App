const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

// Start the server at Port 3000
app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
