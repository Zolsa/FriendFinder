// Dependencies
// ===========================================================
var express = require("express");
var bodyParser = require("body-parser");


var app = express();
var PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});



// Get all characters
// app.get("/all", function(req, res) {
//   res.json(characters);
// });

// // Search for Specific Character (or all characters) - provides JSON
// app.get("/api/:characters?", function(req, res) {
//   var chosen = req.params.characters;

//   if (chosen) {
//     console.log(chosen);

//     for (var i = 0; i < characters.length; i++) {
//       if (chosen === characters[i].routeName) {
//         return res.json(characters[i]);
//       }
//     }
//     return res.json(false);
//   }
//   return res.json(characters);
// });

// // Create New Characters - takes in JSON input
// app.post("/api/new", function(req, res) {
//   // req.body hosts is equal to the JSON post sent from the user
//   var newcharacter = req.body;

//   console.log(newcharacter);

//   // We then add the json the user sent to the character array
//   characters.push(newcharacter);

//   // We then display the JSON to the users
//   res.json(newcharacter);
// });

// // Starts the server to begin listening
// // =============================================================
// app.listen(PORT, function() {
//   console.log("App listening on PORT " + PORT);
// });