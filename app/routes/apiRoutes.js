// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friendsData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/friends", function(req, res) {
  	//console.log(friendsData[0]);
    res.json(friendsData);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/friends", function(req, res) {

  	friendsData.push(req.body);
  	var comparisonArray = [];

  	//Find the total difference between everyone's stats and the user's (req.scores) that just got posted and push each number to an array
  	for(var i = 0; i < friendsData.length; i++) {
  		var compTotal = 0;
  		for(var j = 0; j < friendsData[0].scores.length; j++) {
  			compTotal += Math.abs(friendsData[i].scores[j] - req.body.scores[j]);
  		}
  		comparisonArray.push(compTotal);
  	}

  	//Find the index of the smallest number of the array and use that to pick the match 
  	var index = 0;
		var value = comparisonArray[0];
		for (var i = 0; i < comparisonArray.length; i++) {
		  if (comparisonArray[i] < value) {
		    index = i;
		  }
		}
  	match = friendsData[index];

  	res.json(match);


  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.post("/api/clear", function() {
  //   // Empty out the arrays of data
  //   friedsDataData = [];

  //   console.log(friendsData);
  // });
};