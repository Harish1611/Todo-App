const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

// Set up default mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

// Mongoose Schema for individual to-do list items
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

const Item = new mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to your TO DO LIST",
});

const item2 = new Item({
  name: "Hit the + button to add a new item",
});

const item3 = new Item({
  name: "<---- Hit this to delete an item",
});

const defaultItems = [item1, item2, item3];

// Mongoose Schema for custom lists
const listSchema = {
  name: String,
  items: [itemSchema],
};

const List = mongoose.model("List", listSchema);

// Default route for the home page
app.get("/", function (req, res) {
  // Find all items in the collection
  Item.find({})
    .then((foundItems) => {
      if (foundItems.length === 0) {
        // Insert default items if the collection is empty
        Item.insertMany(defaultItems)
          .then(() => {
            console.log("Default items inserted");
            // Redirect to the home page to display the default items
            res.redirect("/");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Render the home page and pass the found items
        res.render("list", { listTitle: "Today", newListItems: foundItems });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// About Page
app.get("/about", function (req, res) {
  res.render("about");
});

// Start the server at Port 3000
app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
