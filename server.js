// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var tables = require('./data/table');
var waitlist = require('./data/waitlist')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./pages/home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "./pages/tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "./pages/reserve.html"));
  });

// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays all tables
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });

// Create New Tabless - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);

  tables.push(newTable);

  res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
